import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

class NewResume extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <section className="container">
        <h1 className="page-header">New Resume</h1>
        <form>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl placeholder="Title" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Description" />
          </FormGroup>
          <FormGroup>
            <Button bsStyle="primary" bsSize="lg">Create</Button>
            {' '}
            <Link className="btn btn-link" to="/resumes">Cancel</Link>
          </FormGroup>
        </form>
      </section>
    );
  }
}

export default NewResume;
