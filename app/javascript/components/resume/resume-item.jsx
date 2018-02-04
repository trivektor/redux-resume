import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import FontAwesome from 'react-fontawesome';
import * as actionCreators from 'actions';

const ResumeItem = ({ resume, actions }) => {
  const {
    title,
    description,
    id,
  } = resume;

  const onClick = () => {
    if (confirm('Are you sure?')) {
      actions.deleteResume(id).then(() => {
        toastr.success('Resume deleted');
        actions.fetchResumes();
      });
    }
  }

  return (
    <Panel>
      <Panel.Heading>
        <strong className="lead">
          <Link to={`/resume/${id}`}>{title}</Link>
        </strong>
        <aside className="pull-right">
          <Link
            to={`resume/${id}/edit`}
            className="btn btn-info btn-xs">
            <FontAwesome name="pencil" />
            {' '}
            Edit
          </Link>
          {' '}
          <Button
            bsStyle="danger"
            bsSize="xs"
            onClick={onClick}>
            <FontAwesome name="trash" />
            {' '}
            Delete
          </Button>
        </aside>
      </Panel.Heading>
      <Panel.Body>{description}</Panel.Body>
    </Panel>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ResumeItem);
