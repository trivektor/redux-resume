const resumes = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RESUMES_SUCCESS': {
      return action.payload.resumes;
    }
    default:
      return state;
  }
};

export default resumes;
