import { createAction } from 'redux-actions';
import fetch from 'cross-fetch';
import { fetchSections } from './section';

const FETCH_RESUMES_START = 'FETCH_RESUMES_START';
const FETCH_RESUMES_SUCCESS = 'FETCH_RESUMES_SUCCESS';

export const fetchResumesStart = createAction(FETCH_RESUMES_START);
export const fetchResumes = () => {
  return (dispatch) => {
    dispatch(fetchResumesStart());

    fetch('api/resumes').then(response => response.json()).then(resumes => {
      dispatch(fetchResumesSuccess(resumes));
    });
  };
};
export const fetchResumesSuccess = createAction(FETCH_RESUMES_SUCCESS);

const FETCH_RESUME_START = 'FETCH_RESUME_START';
const FETCH_RESUME_SUCCESS = 'FETCH_RESUME_SUCCESS';

export const fetchResumeStart = createAction(FETCH_RESUME_START);
export const fetchResume = (id) => {
  return (dispatch) => {
    dispatch(fetchResumeStart());

    fetch(`/api/resumes/${id}`).then(response => response.json()).then((resume) => {
      dispatch(fetchResumeSuccess(resume));
      dispatch(fetchSections(id));
    });
  };
};
export const fetchResumeSuccess = createAction(FETCH_RESUME_SUCCESS);

const MODIFY_RESUME_PROPS = 'MODIFY_RESUME_PROPS';

export const modifyResumeProps = createAction(MODIFY_RESUME_PROPS);

const DELETE_RESUME = 'DELETE_RESUME';

export const deleteResume = (id) => {
  return (dispatch) => {
    const token = document.getElementsByName('csrf-token')[0].getAttribute('content');

    return fetch(`/api/resumes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': token,
      },
      credentials: 'same-origin',
    });
  };
};
