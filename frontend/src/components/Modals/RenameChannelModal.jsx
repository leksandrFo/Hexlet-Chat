import { useEffect, useRef } from 'react';
import {
  ModalHeader, ModalTitle, ModalBody, Form, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { selectors } from '../../slices/channelsSlice.js';
import { useSocket } from '../../hooks/index.jsx';

const RenameChannelModal = ({ handleClose, channelData }) => {
  const channels = useSelector(selectors.selectAll);
  // const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  // console.log(activeChannelId);
  const inputRef = useRef();
  const socket = useSocket();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
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
      name: channelData.name,
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const channel = {
        id: channelData.id,
        name: values.name,
      };
      try {
        await socket.renameChannel(channel);
        handleClose();
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
          Переименовать канал
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
              variant="secondary"
              className="me-2"
            >
              Отменить
            </Button>
            <Button
              onClick={formik.handleSubmit}
              type="submit"
              variant="primary"
            >
              Отправить
            </Button>
          </div>
        </Form>
      </ModalBody>
    </div>
  );
};

export default RenameChannelModal;
