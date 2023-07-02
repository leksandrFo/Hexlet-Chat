import { useEffect, useRef } from 'react';
import {
  ModalHeader, ModalTitle, ModalBody, Form, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { selectors } from '../../slices/channelsSlice.js';
import { useSocket } from '../../hooks/index.jsx';

const AddChannelModal = ({ handleClose }) => {
  const channels = useSelector(selectors.selectAll);
  // const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  // console.log(activeChannelId);
  const inputRef = useRef();
  const socket = useSocket();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validate = yup.object().shape({
    name: yup
      .string()
      .min(3).max(20)
      .notOneOf(channels.map((channel) => channel.name))
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const channel = {
        name: values.name,
      };
      try {
        await socket.createChannel(channel);
        handleClose();
        formik.setSubmitting(false);
      } catch (error) {
        formik.setSubmitting(false);
        throw error;
      }
    },
  });

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          Добавить канал
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
            Имя канала
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
              Отменить
            </Button>
            <Button
              onClick={formik.handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Отправить
            </Button>
          </div>
        </Form>
      </ModalBody>
    </div>
  );
};

export default AddChannelModal;
