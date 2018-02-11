import React from 'react';
import { compose as recompose, withHandlers, withState, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import ReactMarkdown from 'react-markdown';
import get from 'lodash/get';
import * as actionCreators from 'actions';

const ResumeSectionItem = (props) => {
  const {
    section,
    onFieldChange,
    onRemoveSection,
    onUpdateMdeEditor,
    setEditMode,
    editMode,
    reactMdeValue,
    actions,
    commitSectionUpdate,
    discardSectionUpdate,
  } = props;
  const identifier = section.isNew ? section.uuid : section.id;

  const normalTitle = (
    <div className="clearfix">
      <h4 className="pull-left" style={{ marginTop: 0 }}>{section.name}</h4>
      <aside className="pull-right">
        <Button bsSize="xs" onClick={() => setEditMode(!editMode)}>
          <FontAwesome name="pencil" />
          {' '}
          Update
        </Button>
        {' '}
        <Button bsSize="xs" bsStyle="danger" onClick={() => onRemoveSection(identifier)}>
          <FontAwesome name="trash" />
          {' '}
          Remove
        </Button>
      </aside>
    </div>
  );

  const editModeTitle = (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl
          value={section.name}
          onChange={(event) => onFieldChange('name', event.target.value, identifier)} />
        <Button bsStyle="info" onClick={commitSectionUpdate} style={{ margin: '0 8px' }}>
          <FontAwesome name="check" />
          {' '}
          Update
        </Button>
        <Button bsStyle="danger" onClick={discardSectionUpdate}>
          <FontAwesome name="ban" />
          {' '}
          Discard
        </Button>
      </div>
  );

  const editModeBody = (
    <ReactMde
      textAreaProps={{ rows: 10 }}
      commands={ReactMdeCommands.getDefaultCommands()}
      value={reactMdeValue}
      onChange={(value) => {
        onUpdateMdeEditor(value);
        onFieldChange('body', value.text, identifier);
      }}
      showdownOptions={{}} />
  );

  const normalBody = (
    <ReactMarkdown source={section.body} />
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

  withState('editMode', 'setEditMode', false),

  withStateHandlers(
    (props) => {
      const { section } = props;

      return {
        reactMdeValue: {
          text: section.body,
        },
        originalSection: section,
      };
    },
    {
      onUpdateMdeEditor: () => (value) => ({ reactMdeValue: value }),

      onUpdateOriginalSection: () => (section) => ({ originalSection: section }),
    },
  ),

  withHandlers({
    onFieldChange: (props) => (prop, value, identifier) => {
      props.actions.modifySectionProps({
        prop,
        value,
        identifier,
      });
    },

    onRemoveSection: (props) => (identifier) => {
      props.actions.removeSection(identifier);
    },
  }),

  withHandlers({
    commitSectionUpdate: (props) => () => {
      const {
        setEditMode,
        editMode,
        onFieldChange,
        onUpdateOriginalSection,
        section,
      } = props;
      const identifier = section.isNew ? section.uuid : section.id;

      setEditMode(!editMode);
      onFieldChange('body', section.body, identifier);
      onFieldChange('name', section.name, identifier);
      onUpdateOriginalSection(section);
    },

    discardSectionUpdate: (props) => () => {
      const {
        setEditMode,
        editMode,
        onUpdateMdeEditor,
        onFieldChange,
        originalSection,
        section,
      } = props;
      const identifier = section.isNew ? section.uuid : section.id;

      setEditMode(!editMode);
      onUpdateMdeEditor({ text: originalSection.body });
      onFieldChange('body', originalSection.body, identifier);
      onFieldChange('name', originalSection.name, identifier);
    },
  }),
)(ResumeSectionItem);
