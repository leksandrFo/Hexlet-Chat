import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, FormControl, FormLabel } from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';
import { appRoutes } from '../routes/routes.js';
import registrationImage from '../assets/registrationImage.jpg';

const RegistrationPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validate = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, t('errors.usernameMinMax'))
      .max(20, t('errors.usernameMinMax'))
      .notOneOf(leoProfanity.words, t('errors.notCorrectUsername'))
      .required(t('errors.required')),
    password: yup
      .string()
      .trim()
      .min(6, t('errors.passwordMin'))
      .required(t('errors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('errors.passwordMatch'))
      .required(t('errors.required')),
  });

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
        const { from } = location.state || { from: { pathname: appRoutes.chatPage() } };
        navigate(from);
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          formik.errors.username = t('errors.alreadyExists');
          return;
        }
        toast.error(t('errors.network'));
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
                <img src={registrationImage} className="rounded-circle" alt={t('registrationPage.signUp')} />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">
                  {t('registrationPage.signUp')}
                </h1>
                <div className="form-floating mb-3">
                  <FormControl
                    onChange={formik.handleChange}
                    placeholder={t('errors.usernameMinMax')}
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className="form-floating mb-3"
                    value={formik.values.username}
                    isInvalid={(formik.touched.username && formik.errors.username) || authFailed}
                    ref={inputRef}
                  />
                  <FormLabel className="form-label" htmlFor="username">
                    {t('registrationPage.username')}
                  </FormLabel>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.touched.username && formik.errors.username}
                  </Form.Control.Feedback>
                </div>
                <div className="form-floating mb-3">
                  <FormControl
                    onChange={formik.handleChange}
                    placeholder={t('errors.passwordMin')}
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className="form-control"
                    value={formik.values.password}
                    isInvalid={(formik.errors.password && formik.touched.password)}
                  />
                  <FormLabel className="form-label" htmlFor="password">
                    {t('registrationPage.password')}
                  </FormLabel>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password && formik.errors.password}
                  </Form.Control.Feedback>
                </div>
                <div className="form-floating mb-4">
                  <FormControl
                    onChange={formik.handleChange}
                    placeholder={t('errors.passwordMatch')}
                    name="confirmPassword"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={formik.values.confirmPassword}
                    isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                  />
                  <FormLabel className="form-label" htmlFor="confirmPassword">
                    {t('registrationPage.confirmPassword')}
                  </FormLabel>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword && formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </div>
                <button type="submit" className="w-100 btn btn-outline-primary">
                  {t('registrationPage.submit')}
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
