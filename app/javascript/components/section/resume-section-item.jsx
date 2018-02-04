import React from 'react';
import { compose as recompose, withHandlers, withState } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
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
    <div className="clearfix">
      <h4 className="pull-left" style={{ marginTop: 0 }}>{section.title}</h4>
      <aside className="pull-right">
        <Button bsSize="xs" onClick={() => setEditMode(!editMode)}>
          <FontAwesome name="pencil" />
          {' '}
          Update
        </Button>
        {' '}
        <Button bsSize="xs" bsStyle="danger" onClick={() => onRemoveSection(section.uuid)}>
          <FontAwesome name="trash" />
          {' '}
          Remove
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
      rows="10"
      value={section.body}
      onChange={(event) => onFieldChange('body', event.target.value, section.uuid)} />
  );

  const normalBody = (
    <div>{section.body}</div>
  );

  return (
    <Panel style={{ margin: '40px 0' }}>
      <Panel.Heading>
        { editMode ? editModeTitle : normalTitle }
      </Panel.Heading>
      <Panel.Body>
        { editMode ? editModeBody : normalBody }
      </Panel.Body>
    </Panel>
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
