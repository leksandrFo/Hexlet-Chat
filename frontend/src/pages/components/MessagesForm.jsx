import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { Form, FormControl, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { useAuth, useSocket } from '../../hooks/index.jsx';

const validate = yup.object().shape({
  body: yup.string().required(),
});

const MessagesForm = ({ activeChannelId }) => {
  const auth = useAuth();
  const socket = useSocket();
  const input = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    input.current.focus();
  }, [activeChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const message = {
        channelId: activeChannelId,
        username: auth.userName,
        body: leoProfanity.clean(values.body),
      };
      try {
        await socket.sendMessage(message);
        resetForm();
      } catch (error) {
        setSubmitting(false);
        toast.error(t('errors.network'));
      }
    },
  });

  return (
    <Form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <FormControl
          name="body"
          required=""
          aria-label={t('chatPage.inputLabel')}
          placeholder={t('chatPage.inputPlaceholder')}
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
          <span className="visually-hidden">{t('chatPage.send')}</span>
        </Button>
      </div>
    </Form>
  );
};

export default MessagesForm;
