import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import { compose as recompose, lifecycle } from 'recompose';
import * as actionCreators from 'actions';
import ResumesList from 'components/resume/resumes-list';

const mapStateToProps = (state, ownProps) => {
  return {
    resumes: state.resumes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

const Resumes = (props) => {
  const { resumes } = props;

  return (
    <DocumentTitle title="All Resumes">
      <section className="container">
        <h1 className="page-header">
          Resumes ({resumes.length})
          <Link to="/resumes/new" className="btn btn-success pull-right">New Resume</Link>
        </h1>
        <ResumesList resumes={resumes} />
      </section>
    </DocumentTitle>
  );
};

export default recompose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.actions.fetchResumes();
    },
  }),
)(Resumes);
