import { createAction } from 'redux-actions';
import fetch from 'cross-fetch';

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
export const fetchResumesSuccess = createAction(FETCH_RESUMES_SUCCESS, (resumes) => resumes);
