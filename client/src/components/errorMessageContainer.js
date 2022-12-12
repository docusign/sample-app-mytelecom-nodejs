import { Form } from 'react-bootstrap';

export const ErrorMessageContainer = ({ children }) => (
  <Form.Control.Feedback type="invalid" style={{ display: 'block', textAlign: 'right' }}>
    {children}
  </Form.Control.Feedback>
);
