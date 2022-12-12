import { Col, Form, Row } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';

const ErrorMessageContainer = ({ children }) => (
  <Form.Control.Feedback type="invalid" style={{ display: 'block', textAlign: 'right' }}>
    {children}
  </Form.Control.Feedback>
);

const Input = ({ id, label, labelProps, errors, register, validations }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId={id}>
      <Form.Label {...labelProps}>{label}</Form.Label>
      <Col>
        <Form.Control size="sm" {...register(id, validations)} />
        <ErrorMessage errors={errors} name={id} as={<ErrorMessageContainer />} />
      </Col>
    </Form.Group>
  );
};

export default Input;
