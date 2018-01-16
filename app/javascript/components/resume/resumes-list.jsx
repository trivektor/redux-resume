import React from 'react';

const ResumesList = ({ resumes }) => {
  return (
    <ul className="list-unstyled">
      {
        resumes.map((r) => {
          return (
            <li key={r.id.n}>
              <h3 className="lead">{r.title}</h3>
              <p>{r.description}</p>
            </li>
          );
        })
      }
    </ul>
  )
}

export default ResumesList;
