import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, FormControl, FormLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';
import { serverRoutes } from '../routes/routes.js';
import loginImage from '../assets/loginImage.jpg';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validate = yup.object().shape({
    username: yup
      .string()
      .required(t('errors.required')),
    password: yup
      .string()
      .required(t('errors.required')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validate,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(serverRoutes.loginPath(), values);
        auth.logIn(data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        toast.error(t('errors.network'));
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={loginImage} className="rounded-circle" alt={t('loginPage.enter')} />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
                  <div className="form-floating mb-3">
                    <FormControl
                      name="username"
                      autoComplete="username"
                      required=""
                      placeholder={t('loginPage.username')}
                      id="username"
                      className="form-control"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                    <FormLabel htmlFor="username">{t('loginPage.username')}</FormLabel>
                  </div>
                  <div className="form-floating mb-5">
                    <FormControl
                      name="password"
                      autoComplete="current-password"
                      required=""
                      placeholder={t('loginPage.password')}
                      type="password"
                      id="password"
                      className="form-control"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={authFailed}
                    />
                    <FormLabel htmlFor="password">{t('loginPage.password')}</FormLabel>
                    {authFailed && (
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t('errors.authFailed')}
                      </Form.Control.Feedback>
                    )}
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('loginPage.submit')}</button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('loginPage.noAccount')}</span>
                  {' '}
                  <a href="/signup">{t('loginPage.signUp')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
