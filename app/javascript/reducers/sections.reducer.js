const sections = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SECTIONS_SUCCESS': {
      return action.payload.sections;
    }

    case 'ADD_SECTION': {
      return [
        ...state,
        action.payload
      ];
    }

    default: {
      return state;
    }
  }
};

export default sections;
