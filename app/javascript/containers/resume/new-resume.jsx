import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetch from 'cross-fetch';

class NewResume extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      newResume,
      actions,
      history,
    } = this.props;

    const token = document.getElementsByName('csrf-token')[0].getAttribute('content');

    fetch('/api/resumes', {
      method: 'POST',
      body: JSON.stringify({
        resume: newResume,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
    }).then(() => {
      history.push('/resumes');
    });
  }

  render() {
    const {
      newResume,
      actions,
    } = this.props;

    return (
      <section className="container">
        <h1 className="page-header">New Resume</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              placeholder="Title"
              value={newResume.title}
              onChange={(event) => actions.modifyResumeProps({ title: event.target.value })} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Description"
              value={newResume.description}
              onChange={(event) => actions.modifyResumeProps({ description: event.target.value })} />
          </FormGroup>
          <FormGroup>
            <Button type="submit" bsStyle="primary" bsSize="lg">Create</Button>
            {' '}
            <Link className="btn btn-link" to="/resumes">Cancel</Link>
          </FormGroup>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newResume: state.newResume,
  };
};

export default connect(mapStateToProps, null)(NewResume);
