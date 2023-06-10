import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, FormControl, FormLabel } from 'react-bootstrap';
import loginImage from '../../assets/loginImage.jpg';

const validate = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validate,
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
                  />
                  <FormLabel htmlFor="username">Ваш ник</FormLabel>
                </div>
                <div className="form-floating mb-4">
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
                  />
                  <FormLabel className="form-label" htmlFor="password">Пароль</FormLabel>
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
