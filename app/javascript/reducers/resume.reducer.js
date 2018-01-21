const resume = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_RESUME_SUCCESS': {
      return action.payload.resume;
    }
    default: {
      return state;
    }
  }
};

export default resume;
