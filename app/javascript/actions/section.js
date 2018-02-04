import { createAction } from 'redux-actions';

export const addSection = createAction('ADD_SECTION');

export const removeSection = createAction('REMOVE_SECTION');

export const modifySectionProps = createAction('MODIFY_SECTION_PROPS');
