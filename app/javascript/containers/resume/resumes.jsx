import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import * as actionCreators from 'actions';
import ResumesList from 'components/resume/resumes-list';

class Resumes extends Component {
  componentWillMount() {
    this.props.actions.fetchResumes();
  }

  render() {
    const { resumes } = this.props;

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
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Resumes);
