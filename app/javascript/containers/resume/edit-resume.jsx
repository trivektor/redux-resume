import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import fetch from 'cross-fetch';
import { compose as recompose, withHandlers, lifecycle } from 'recompose';
import * as actionCreators from 'actions';
import ResumeForm from 'components/resume/resume-form';
import getCSRFToken from 'utils/get-csrf-token';

const EditResume = (props) => {
  const { resume, onSubmit } = props;

  return (
    <DocumentTitle title={resume.title || ''}>
      <section className="container">
        <h1 className="page-header">
          <span className="text-muted">Edit</span>: {resume.title}
        </h1>
        <form onSubmit={onSubmit}>
          <ResumeForm resume={resume} />
        </form>
      </section>
    </DocumentTitle>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    resume: state.resume,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default recompose(
  connect(mapStateToProps, mapDispatchToProps),

  lifecycle({
    componentDidMount() {
      this.props.actions.fetchResume(this.props.match.params.id);
    },
  }),

  withHandlers({
    onSubmit: (props) => (event) => {
      event.preventDefault();

      const {
        resume,
      } = props;

      fetch(`/api/resumes/${resume.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': getCSRFToken(),
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          resume,
        }),
      });
    },
  })
)(EditResume);
