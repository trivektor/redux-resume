import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetch from 'cross-fetch';
import DocumentTitle from 'react-document-title';
import { compose as recompose, withHandlers, lifecycle } from 'recompose';
import { toastr } from 'react-redux-toastr';
import * as actionCreators from 'actions';
import ResumeForm from 'components/resume/resume-form';
import getCSRFToken from 'utils/get-csrf-token';

const NewResume = (props) => {
  const { newResume, actions, onSubmit } = props;

  return (
    <DocumentTitle title={newResume.title}>
      <section className="container">
        <form onSubmit={onSubmit}>
          <ResumeForm resume={newResume} />
        </form>
      </section>
    </DocumentTitle>
  );
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

export default recompose(
  connect(mapStateToProps, mapDispatchToProps),

  withHandlers({
    onSubmit: (props) => (event) => {
      event.preventDefault();

      const {
        newResume,
        actions,
        history,
      } = props;

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
        toastr.success('Resume created');
        history.push('/resumes');
      });
    },
  }),
)(NewResume);
