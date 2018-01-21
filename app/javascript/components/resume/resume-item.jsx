import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions';

const ResumeItem = ({ resume, actions }) => {
  const {
    title,
    description,
    id,
  } = resume;

  const onClick = () => {
    if (confirm('Are you sure?')) {
      actions.deleteResume(id);
    }
  }

  return (
    <li>
      <strong>
        <Link to={`/resume/${id}`}>{title}</Link>
      </strong>
      <Button
        bsStyle="danger"
        bsSize="sm"
        className="pull-right"
        onClick={onClick}>
        Delete
      </Button>
      <p>{description}</p>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ResumeItem);
