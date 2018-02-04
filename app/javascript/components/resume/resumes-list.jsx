import React from 'react';
import ResumeItem from 'components/resume/resume-item';

const ResumesList = ({ resumes }) => {
  return (
    <section>
      {
        resumes.map((r) => {
          return (
            <ResumeItem resume={r} key={r.id} />
          );
        })
      }
    </section>
  );
}

export default ResumesList;
