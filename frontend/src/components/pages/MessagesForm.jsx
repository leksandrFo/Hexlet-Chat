import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, FormControl, Button } from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useAuth, useSocket } from '../../hooks/index.jsx';

const validate = yup.object().shape({
  body: yup.string().required(),
});

const MessagesForm = ({ activeChannelId }) => {
  const auth = useAuth();
  const socket = useSocket();
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const message = {
        channelId: activeChannelId,
        username: auth.getUserName(),
        body: values,
      };
      try {
        await socket.sendMessage(message);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <FormControl
          name="body"
          required=""
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          id="body"
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.body}
          onChange={formik.handleChange}
          ref={input}
        />
        <Button
          type="submit"
          disabled={formik.errors.body}
          variant="group-vertical"
        >
          <BsArrowRightSquare viewBox="0 0 16 16" size="20" fill="currentColor" />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </div>
    </Form>
  );
};

export default MessagesForm;
