import React from 'react';
import { compose as recompose, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import * as actionCreators from 'actions';
import ResumeSectionItem from 'components/section/resume-section-item';

const ResumeSections = (props) => {
  const { sections, onAddSection } = props;

  return (
    <section>
      <hr />
      <div className="clearfix">
        <h2 className="pull-left">Sections ({sections.length})</h2>
        <Button bsStyle="success" className="pull-right" onClick={onAddSection}>Add</Button>
      </div>
      {
        sections.map((s, index) => {
          return <ResumeSectionItem key={index} section={s} index={index} />
        })
      }
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    sections: state.sections,
  };
};

export default recompose(
  connect(mapStateToProps, mapDispatchToProps),

  withHandlers({
    onAddSection: (props) => () => {
      props.actions.addSection({ title: 'New Section', body: '...' });
    }
  })
)(ResumeSections);
