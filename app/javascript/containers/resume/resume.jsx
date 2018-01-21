import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import * as actionCreators from 'actions';

class Resume extends Component {
  constructor(props) {
    super(props);
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
          <p>
          </p>
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
