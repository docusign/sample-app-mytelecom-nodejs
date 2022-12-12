import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

export const Card = (props) => {
  return (
    <div className={`col h-card ${props.additionalClass}`}>
      <div className="h-card-body">
        <div className="h-card-top">
          <img className="h-card-image" src={props.img} alt="" />
          <h4 className="h-card-title">{props.title}</h4>
          <h5 className="h-card-description">{props.description}</h5>
          <Link to={props.linkTo} rel="noopener noreferrer">
            <button className="h-card-button" type="button">
              {props.getStarted}
            </button>
          </Link>

          <h5 className="h-card-features">{props.featureTitle}</h5>
        </div>
        <ul>{parse(props.featureList)}</ul>
      </div>
    </div>
  );
};
