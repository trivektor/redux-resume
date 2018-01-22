const newResume = (state = {
  title: 'Untitled',
  isNew: true,
}, action) => {
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
