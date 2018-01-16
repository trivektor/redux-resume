import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <section className="container">
        <h1 className="page-header">Home</h1>
        <Link to="/resumes">Resumes</Link>
      </section>
    );
  }
}

export default Home;
