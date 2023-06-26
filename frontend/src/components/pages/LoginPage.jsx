import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, FormControl, FormLabel } from 'react-bootstrap';
import { useAuth } from '../../hooks/index.jsx';
import routes from '../../routes/routes.js';
import loginImage from '../../assets/loginImage.jpg';

const validate = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
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
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        auth.logIn(data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
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
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} className="rounded-circle" alt="Войти" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <FormControl
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={authFailed}
                    ref={inputRef}
                  />
                  <FormLabel htmlFor="username">Ваш ник</FormLabel>
                </div>
                <div className="form-floating mb-5">
                  <FormControl
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className="form-control"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={authFailed}
                  />
                  <FormLabel htmlFor="password">Пароль</FormLabel>
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                  )}
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
