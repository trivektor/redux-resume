import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { compose as recompose, lifecycle } from 'recompose';
import DocumentTitle from 'react-document-title';
import * as actionCreators from 'actions';
import ResumeForm from 'components/resume/resume-form';
import ResumeSections from 'components/section/resume-sections';
import getCSRFToken from 'utils/get-csrf-token';

const Resume = (props) => {
  const { resume } = props;

  return (
    <DocumentTitle title={resume.title || ''}>
      <section className="container">
        <h1 className="page-header">
          {resume.title}
          <Link to="/resumes" className="btn btn-info pull-right">View All</Link>
        </h1>
        <strong>Description:</strong>
        <p>{resume.description}</p>
        <ResumeSections />
      </section>
    </DocumentTitle>
  );
}

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
  })
)(Resume);
