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
  const { section, onTitleChange, setEditMode, editMode, index, onRemoveSection } = props;
  const normalTitle = (
    <div className="clearfix page-header">
      <h3 className="pull-left" style={{ marginTop: 0 }}>{section.title}</h3>
      <aside className="pull-right">
        <Button bsSize="sm" onClick={() => setEditMode(!editMode)}>
          <FontAwesome name="pencil" />
        </Button>
        {' '}
        <Button bsSize="sm" bsStyle="danger" onClick={() => onRemoveSection(index)}>
          <FontAwesome name="trash" />
        </Button>
      </aside>
    </div>
  );

  const editModeTitle = (
    <InputGroup>
      <FormControl value={section.title} onChange={onTitleChange} />
      <InputGroup.Addon onClick={() => setEditMode(!editMode)}>
        <FontAwesome name="check" />
      </InputGroup.Addon>
    </InputGroup>
  );

  const editModeBody = (
    <FormControl
      componentClass="textarea"
      placeholder="Enter section description..."
      style={{ marginTop: 20 }}
      rows="10" />
  );

  const normalBody = (
    <div>{section.body}</div>
  );

  return (
    <div>
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
    onTitleChange: (props) => (event) => {
      // TO BE IMPLEMENTED
    },

    onRemoveSection: (props) => (index) => {
      props.actions.removeSection(index);
    },
  }),

  withState('editMode', 'setEditMode', false)
)(ResumeSectionItem);
