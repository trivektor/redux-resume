import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetch from 'cross-fetch';
import DocumentTitle from 'react-document-title';
import * as actionCreators from 'actions';
import ResumeForm from 'components/resume/resume-form';
import getCSRFToken from 'utils/get-csrf-token';

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

    fetch('/api/resumes', {
      method: 'POST',
      body: JSON.stringify({
        resume: newResume,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': getCSRFToken(),
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
      <DocumentTitle title={newResume.title}>
        <section className="container">
          <h1 className="page-header">{newResume.title || ''}</h1>
          <form onSubmit={this.handleSubmit}>
            <ResumeForm resume={newResume} />
          </form>
        </section>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newResume: state.newResume,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewResume);
