import React from 'react';
import { compose as recompose, withHandlers, withState } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import * as actionCreators from 'actions';

const ResumeSectionItem = (props) => {
  const {
    section,
    onFieldChange,
    onRemoveSection,
    setEditMode,
    editMode,
  } = props;

  const normalTitle = (
    <div className="clearfix page-header">
      <h4 className="pull-left" style={{ marginTop: 0 }}>{section.title}</h4>
      <aside className="pull-right">
        <Button bsSize="sm" onClick={() => setEditMode(!editMode)}>
          <FontAwesome name="pencil" />
        </Button>
        {' '}
        <Button bsSize="sm" bsStyle="danger" onClick={() => onRemoveSection(section.uuid)}>
          <FontAwesome name="trash" />
        </Button>
      </aside>
    </div>
  );

  const editModeTitle = (
    <InputGroup>
      <FormControl
        value={section.title}
        onChange={(event) => onFieldChange('title', event.target.value, section.uuid)} />
      <InputGroup.Addon onClick={() => setEditMode(!editMode)}>
        <FontAwesome name="check" />
      </InputGroup.Addon>
    </InputGroup>
  );

  const editModeBody = (
    <FormControl
      componentClass="textarea"
      style={{ marginTop: 20 }}
      rows="10"
      value={section.body}
      onChange={(event) => onFieldChange('body', event.target.value, section.uuid)} />
  );

  const normalBody = (
    <div>{section.body}</div>
  );

  return (
    <div style={{ margin: '40px 0' }}>
      { editMode ? editModeTitle : normalTitle }
      { editMode ? editModeBody : normalBody }
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default recompose(
  connect(null, mapDispatchToProps),

  withHandlers({
    onFieldChange: (props) => (prop, value, uuid) => {
      props.actions.modifySectionProps({
        prop,
        value,
        uuid,
      });
    },

    onRemoveSection: (props) => (index) => {
      props.actions.removeSection(index);
    },
  }),

  withState('editMode', 'setEditMode', false)
)(ResumeSectionItem);
