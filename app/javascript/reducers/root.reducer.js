import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'
import resumes from 'reducers/resumes.reducer';
import resume from 'reducers/resume.reducer';
import newResume from 'reducers/new-resume.reducer';
import sections from 'reducers/sections.reducer';

const rootReducer = combineReducers({
  resumes,
  resume,
  newResume,
  sections,
  toastr: toastrReducer,
});

export default rootReducer;
