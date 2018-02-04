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

    case 'REMOVE_SECTION': {
      const sections = [...state];

      sections.splice(action.payload, 1);

      return sections;
    }

    default: {
      return state;
    }
  }
};

export default sections;
