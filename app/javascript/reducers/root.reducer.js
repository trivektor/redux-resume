import { combineReducers } from 'redux';
import resumes from 'reducers/resumes.reducer';
import resume from 'reducers/resume.reducer';
import newResume from 'reducers/new-resume.reducer';

const rootReducer = combineReducers({
  resumes,
  resume,
  newResume,
});

export default rootReducer;
