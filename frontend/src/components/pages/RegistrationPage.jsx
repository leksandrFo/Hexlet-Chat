import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, FormControl, FormLabel } from 'react-bootstrap';
import useAuth from '../../hooks/index.jsx';
import routes from '../../routes/routes.js';
import registrationImage from '../../assets/registrationImage.jpg';

const validate = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(20),
  password: yup
    .string()
    .trim()
    .required()
    .min(6),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref('password')]),
});

const RegistrationPage = () => {
  const [registration, setRegistration] = useState(false);
  const auth = useAuth();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      setRegistration(false);
      try {
        const { data } = await axios.post(routes.registrationPath(), {
          username: values.username,
          password: values.password,
        });
        auth.logIn(data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setRegistration(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src="/static/media/avatar_1.6084447160acc893a24d.jpg" className="rounded-circle" alt="Регистрация" />
                </div>
                <Form className="w-50">
                  <h1 className="text-center mb-4">
                    Регистрация
                  </h1>
                  <div className="form-floating mb-3">
                    <FormControl placeholder="От 3 до 20 символов" name="username" autocomplete="username" required="" id="username" className="form-control is-invalid" value="" />
                    <FormLabel className="form-label" for="username">
                      Имя пользователя
                    </FormLabel>
                    <div placement="right" className="invalid-tooltip">
                      Обязательное поле
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <FormControl placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autocomplete="new-password" type="password" id="password" className="form-control" value="" />
                    <div className="invalid-tooltip">
                      Обязательное поле
                    </div>
                    <FormLabel className="form-label" for="password">
                      Пароль
                    </FormLabel>
                  </div>
                  <div className="form-floating mb-4">
                    <FormControl placeholder="Пароли должны совпадать" name="confirmPassword" required="" autocomplete="new-password" type="password" id="confirmPassword" className="form-control" value="" />
                    <div className="invalid-tooltip" />
                    <FormLabel className="form-label" for="confirmPassword">
                      Подтвердите пароль
                    </FormLabel>
                  </div>
                  <button type="submit" className="w-100 btn btn-outline-primary">
                    Зарегистрироваться
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
