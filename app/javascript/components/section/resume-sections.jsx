import React from 'react';
import { compose as recompose, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import FontAwesome from 'react-fontawesome';
import uuidv4 from 'uuid/v4';
import * as actionCreators from 'actions';
import ResumeSectionItem from 'components/section/resume-section-item';

const ResumeSections = (props) => {
  const { sections, onAddSection } = props;

  return (
    <section style={{ marginTop: 40 }}>
      <div className="clearfix" style={{ marginBottom: 40 }}>
        <h3 className="pull-left" style={{ marginTop: 0 }}>Sections ({sections.length})</h3>
        <aside className="pull-right">
          <Button bsStyle="success" onClick={onAddSection}>
            <FontAwesome name="plus" />
            {' '}
            New Section
          </Button>
          {' '}
          <Button bsStyle="primary">
            <FontAwesome name="save" />
            {' '}
            Save
          </Button>
        </aside>
      </div>
      {
        sections.map((s, index) => {
          return <ResumeSectionItem key={s.uuid} section={s} />
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
      props.actions.addSection({
        uuid: uuidv4(),
        title: 'New Section',
        body: '...',
      });
    }
  })
)(ResumeSections);
