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
import { selectors } from '../../slices/channelsSlice.js';
import { useSocket } from '../../hooks/index.jsx';

const RenameChannelModal = ({ handleClose, channelData }) => {
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  const socket = useSocket();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const validate = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('errors.usernameMinMax'))
      .max(20, t('errors.usernameMinMax'))
      .notOneOf([...channels.map((channel) => channel.name), ...leoProfanity.words], ({ value }) => (leoProfanity.words.includes(value) ? t('errors.notCorrectChannelName') : t('errors.unique')))
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: channelData.name,
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const channel = {
        id: channelData.id,
        name: leoProfanity.clean(values.name),
      };
      try {
        await socket.renameChannel(channel);
        handleClose();
        toast.success(t('modals.rename.success'));
      } catch (error) {
        formik.setSubmitting(false);
        toast.error(t('errors.network'));
      }
    },
  });

  return (
    <>
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.rename.renameChannel')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <FormControl
            onChange={formik.handleChange}
            id="name"
            name="name"
            required=""
            className="mb-2"
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
            ref={inputRef}
            autoComplete="off"
          />
          <FormLabel htmlFor="name" className="visually-hidden">
            {t('modals.rename.nameChannel')}
          </FormLabel>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              onClick={handleClose}
              variant="secondary"
              className="me-2"
            >
              {t('modals.rename.cancel')}
            </Button>
            <Button
              onClick={formik.handleSubmit}
              type="submit"
              variant="primary"
            >
              {t('modals.rename.send')}
            </Button>
          </div>
        </Form>
      </ModalBody>
    </>
  );
};

export default RenameChannelModal;
