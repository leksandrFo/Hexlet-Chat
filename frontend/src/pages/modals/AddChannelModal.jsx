import { useEffect, useRef } from 'react';
import {
  ModalHeader, ModalTitle, ModalBody, Form, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelsSlice';
import { useSocket } from '../../hooks/index.jsx';

const AddChannelModal = ({ handleClose }) => {
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  const socket = useSocket();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validate = yup.object().shape({
    name: yup
      .string()
      .min(3, t('errors.usernameMinMax'))
      .max(20, t('errors.usernameMinMax'))
      .notOneOf(channels.map((channel) => channel.name), t('errors.unique'))
      .notOneOf(leoProfanity.words, t('errors.notCorrectChannelName'))
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const channel = {
        name: leoProfanity.clean(values.name),
      };
      try {
        console.log(channel);
        await socket.createChannel(channel);
        handleClose();
        toast.success(t('modals.add.success'));
        formik.setSubmitting(false);
      } catch (error) {
        formik.setSubmitting(false);
        toast.error(t('errors.network'));
      }
    },
  });

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.add.addChannel')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <FormControl
            onChange={formik.handleChange}
            name="name"
            required=""
            className="mb-2 form-control"
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
            ref={inputRef}
          />
          <FormLabel className="visually-hidden" htmlFor="name">
            {t('modals.add.nameChannel')}
          </FormLabel>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              onClick={handleClose}
              type="button"
              className="me-2 btn btn-secondary"
            >
              {t('modals.add.cancel')}
            </Button>
            <Button
              onClick={formik.handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              {t('modals.add.send')}
            </Button>
          </div>
        </Form>
      </ModalBody>
    </div>
  );
};

export default AddChannelModal;
