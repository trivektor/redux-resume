import React from 'react';
import { compose as recompose, withHandlers, withState } from 'recompose';
import FontAwesome from 'react-fontawesome';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';

const ResumeSectionItem = (props) => {
  const { section, onTitleChange, setEditMode, editMode } = props;
  const normalTitle = (
    <h3 className="lead">
      {section.title}
      {' '}
      {' '}
      <Button bsSize="xs" onClick={() => setEditMode(!editMode)}>
        <FontAwesome name="pencil" />
      </Button>
    </h3>
  );

  const editModeTitle = (
    <InputGroup>
      <FormControl value={section.title} onChange={onTitleChange} />
      <InputGroup.Addon>
        <FontAwesome name="check" onClick={() => setEditMode(!editMode)} />
      </InputGroup.Addon>
    </InputGroup>
  );

  return (
    <div>
      <div className="page-header">
        { editMode ? editModeTitle : normalTitle }
      </div>
    </div>
  );
};

export default recompose(
  withHandlers({
    onTitleChange: (props) => (event) => {
    }
  }),

  withState('editMode', 'setEditMode', false)
)(ResumeSectionItem);
