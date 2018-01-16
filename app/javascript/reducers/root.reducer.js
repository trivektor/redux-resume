import { combineReducers } from 'redux';
import resumes from 'reducers/resumes.reducer';

const rootReducer = combineReducers({
  resumes,
});

export default rootReducer;
