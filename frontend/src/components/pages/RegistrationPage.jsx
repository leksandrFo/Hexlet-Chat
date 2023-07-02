import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, FormControl, FormLabel } from 'react-bootstrap';
import { useAuth } from '../../hooks/index.jsx';
import registrationImage from '../../assets/registrationImage.jpg';

const validate = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(20)
    .required(),
  password: yup
    .string()
    .min(6)
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required(),
});

const RegistrationPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await auth.signUp(values);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          formik.errors.username = 'Такой пользователь уже существует';
          return;
        }
        throw error;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={registrationImage} className="rounded-circle" alt="Регистрация" />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">
                  Регистрация
                </h1>
                <div className="form-floating mb-3">
                  <FormControl
                    onChange={formik.handleChange}
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autocomplete="username"
                    required=""
                    id="username"
                    className="form-floating mb-3"
                    value={formik.values.username}
                    isInvalid={(formik.touched.username && formik.errors.username) || authFailed}
                    ref={inputRef}
                  />
                  <FormLabel className="form-label" htmlFor="username">
                    Имя пользователя
                  </FormLabel>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.touched.username && formik.errors.username}
                  </Form.Control.Feedback>
                </div>
                <div className="form-floating mb-3">
                  <FormControl
                    onChange={formik.handleChange}
                    placeholder="Не менее 6 символов"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autocomplete="new-password"
                    type="password"
                    id="password"
                    className="form-control"
                    value={formik.values.password}
                    isInvalid={(formik.errors.password && formik.touched.password)}
                  />
                  <FormLabel className="form-label" htmlFor="password">
                    Пароль
                  </FormLabel>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password && formik.errors.password}
                  </Form.Control.Feedback>
                </div>
                <div className="form-floating mb-4">
                  <FormControl
                    onChange={formik.handleChange}
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required=""
                    autocomplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={formik.values.confirmPassword}
                    isInvalid={formik.errors.password && formik.touched.password}
                  />
                  <FormLabel className="form-label" htmlFor="confirmPassword">
                    Подтвердите пароль
                  </FormLabel>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword && formik.errors.confirmPassword}
                  </Form.Control.Feedback>
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
  );
};

export default RegistrationPage;
