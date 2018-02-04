import React from 'react';
import { compose as recompose, withHandlers, withState, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
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
  } = props;

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
        <Button bsSize="xs" bsStyle="danger" onClick={() => onRemoveSection(section.isNew ? section.uuid : section.id)}>
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
        value={section.name}
        onChange={(event) => onFieldChange('name', event.target.value, section.isNew ? section.uuid : section.id)} />
      <InputGroup.Addon onClick={() => setEditMode(!editMode)}>
        <FontAwesome name="check" />
      </InputGroup.Addon>
    </InputGroup>
  );

  const editModeBody = (
    <ReactMde
      textAreaProps={{ rows: 10 }}
      commands={ReactMdeCommands.getDefaultCommands()}
      value={reactMdeValue}
      onChange={(value) => {
        const identifier = section.isNew ? section.uuid : section.id;

        onUpdateMdeEditor(value, 'body', identifier);

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

  withState('editMode', 'setEditMode', false),

  withStateHandlers(
    (props) => {
      return {
        reactMdeValue: {
          text: props.section.body,
        },
      };
    },
    {
      onUpdateMdeEditor: () => (value, body, identifier) => {
        return {
          reactMdeValue: value,
        };
      },
    },
  ),
)(ResumeSectionItem);
