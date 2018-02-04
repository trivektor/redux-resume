import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions';

class ResumeForm extends Component {
  render() {
    const {
      resume,
      actions,
    } = this.props;

    return (
      <div>
        <h1 className="page-header">
          {resume.title}
          <Button type="submit" bsStyle="primary" className="pull-right">
            { resume.isNew ? 'Create' : 'Update' }
          </Button>
        </h1>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            placeholder="Title"
            value={resume.title}
            onChange={(event) => actions.modifyResumeProps({ title: event.target.value })} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Description"
            value={resume.description}
            onChange={(event) => actions.modifyResumeProps({ description: event.target.value })} />
        </FormGroup>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ResumeForm);
