const newResume = (state = {}, action) => {
  switch (action.type) {
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

export default newResume;
