import React, { useState } from 'react';
import parse from 'html-react-parser';
import right_caret from '../assets/img/right_caret.png';
import down_caret from '../assets/img/down_caret.png';
import { Col, Collapse } from 'react-bootstrap';

export const SeeMore = ({ title, text }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(!open);
    e.preventDefault();
    return false;
  };

  return (
    <Col className="bs-holder">
      <p>
        <a className="bs-link" href="/#" role="button" onClick={handleClick}>
          {title}
          {!open && <img id="rightCaret" src={right_caret} alt="right caret" />}
          {open && <img id="downCaret" src={down_caret} alt="right caret" />}
        </a>
      </p>
      <Collapse in={open}>
        <div className="bs">{parse(text)}</div>
      </Collapse>
    </Col>
  );
};
