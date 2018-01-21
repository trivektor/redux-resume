import React from 'react';
import ResumeItem from 'components/resume/resume-item';

const ResumesList = ({ resumes }) => {
  return (
    <ul className="list-unstyled">
      {
        resumes.map((r) => {
          return (
            <ResumeItem resume={r} key={r.id} />
          );
        })
      }
    </ul>
  );
}

export default ResumesList;
