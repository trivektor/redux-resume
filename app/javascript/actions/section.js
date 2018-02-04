import { createAction } from 'redux-actions';
import fetch from 'cross-fetch';
import getCSRFToken from 'utils/get-csrf-token';

export const addSection = createAction('ADD_SECTION');

export const removeSection = createAction('REMOVE_SECTION');

export const modifySectionProps = createAction('MODIFY_SECTION_PROPS');

export const fetchSectionsSuccess = createAction('FETCH_SECTIONS_SUCCESS');

export const fetchSections = (resumeId) => {
  return (dispatch) => {
    fetch(`/api/resumes/${resumeId}/sections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': getCSRFToken(),
      },
    }).then((response) => response.json()).then((sections) => {
      dispatch(fetchSectionsSuccess(sections));
    });
  }
};

export const saveSections = (resumeId, sections) => {
  return (dispatch) => {
    fetch(`/api/resumes/${resumeId}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': getCSRFToken(),
      },
      body: JSON.stringify({
        sections: sections.map((s) => {
          return {
            body: s.body,
            name: s.name,
          };
        }),
      }),
    }).then(() => {
      dispatch(fetchSections(resumeId));
    });
  };
};
