import React from 'react';
import { compose as recompose, withHandlers, withStateHandlers, withProps, withPropsOnChange, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import FontAwesome from 'react-fontawesome';
import uuidv4 from 'uuid/v4';
import isEmpty from 'lodash/isEmpty';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import * as actionCreators from 'actions';
import ResumeSectionItem from 'components/section/resume-section-item';

const SortableResumeSectionItem = SortableElement(({ section }) => <ResumeSectionItem section={section} />);

const SortableResumeSections = SortableContainer(({ sections }) => (
  <section>
    { sections.map((s, index) => <SortableResumeSectionItem section={s} index={index} key={s.id || s.uuid} />) }
  </section>
));

const ResumeSections = (props) => {
  const { resume, sections = [], onAddSection, onSaveSections, onSortEnd } = props;

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
          <Button bsStyle="primary" onClick={() => onSaveSections(resume.id, sections)}>
            <FontAwesome name="save" />
            {' '}
            Save
          </Button>
        </aside>
      </div>
      <SortableResumeSections sections={sections} onSortEnd={onSortEnd} />
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

const ResumeSectionsContainer = (props) => {
  return <ResumeSections {...props} />
};

recompose(
  withStateHandlers(
    (props) => {
      return {
        sections: props.sections,
      };
    },
    {
      onSortEnd: (props) => ({ oldIndex, newIndex }) => {
        console.log(props);
        return {
          sections: arrayMove(props.sections, oldIndex, newIndex),
        }
      },
    }
  )
)(ResumeSections);

const mapStateToProps = (state) => {
  return {
    sections: state.sections,
  };
};

export default recompose(
  connect(mapStateToProps, mapDispatchToProps),

  lifecycle({
    componentDidMount() {
      const {
        actions,
        resume,
      } = this.props;

      actions.fetchSections(resume.id);
    },
  }),

  withHandlers({
    onAddSection: (props) => () => {
      props.actions.addSection({
        uuid: uuidv4(),
        name: 'New Section',
        body: '...',
        isNew: true,
      });
    },

    onSaveSections: (props) => (resumeId, sections) => {
      props.actions.saveSections(resumeId, sections);
    },

    onSortEnd: ({ oldIndex, newIndex }) => {

    },
  })
)(ResumeSectionsContainer);
