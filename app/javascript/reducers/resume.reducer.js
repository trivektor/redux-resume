const resume = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_RESUME_SUCCESS': {
      return action.payload.resume;
    }
    case 'MODIFY_RESUME_PROPS': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default resume;
