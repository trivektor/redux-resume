import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'
import resumes from 'reducers/resumes.reducer';
import resume from 'reducers/resume.reducer';
import newResume from 'reducers/new-resume.reducer';

const rootReducer = combineReducers({
  resumes,
  resume,
  newResume,
  toastr: toastrReducer,
});

export default rootReducer;
