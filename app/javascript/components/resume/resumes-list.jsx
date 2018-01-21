import React from 'react';
import { Link } from 'react-router-dom';

const ResumesList = ({ resumes }) => {
  return (
    <ul className="list-unstyled">
      {
        resumes.map((r) => {
          return (
            <li key={r.id}>
              <h3 className="lead">
                <Link to={`/resume/${r.id}`}>{r.title}</Link>
              </h3>
              <p>{r.description}</p>
            </li>
          );
        })
      }
    </ul>
  );
}

export default ResumesList;
