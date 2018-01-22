import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Home from 'components/home';
import { Resumes, NewResume, Resume, EditResume } from 'containers/resume';
import rootReducer from 'reducers/root.reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    logger
  )
);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Resumes} />
            <Route exact path="/resumes" component={Resumes} />
            <Route path="/resumes/new" component={NewResume} />
            <Route exact path="/resume/:id" component={Resume} />
            <Route path="/resume/:id/edit" component={EditResume} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Root;
