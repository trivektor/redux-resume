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
        <FormGroup>
          <Button type="submit" bsStyle="primary" bsSize="lg">
            { resume.isNew ? 'Create' : 'Update' }
          </Button>
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
