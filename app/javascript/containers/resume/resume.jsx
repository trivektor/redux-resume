import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import * as actionCreators from 'actions';
import ResumeForm from 'components/resume/resume-form';
import getCSRFToken from 'utils/get-csrf-token';

class Resume extends Component {
  componentWillMount() {
    this.props.actions.fetchResume(this.props.match.params.id);
  }

  render() {
    const {
      resume,
    } = this.props;

    return (
      <DocumentTitle title={resume.title || ''}>
        <section className="container">
          <h1 className="page-header">
            {resume.title}
            <Link to="/resumes" className="btn btn-info pull-right">View All</Link>
          </h1>
          <strong>Description:</strong>
          <p>{resume.description}</p>
        </section>
      </DocumentTitle>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
