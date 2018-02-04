const sections = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SECTIONS_SUCCESS': {
      return action.payload;
    }

    case 'ADD_SECTION': {
      return [
        ...state,
        action.payload
      ];
    }

    case 'REMOVE_SECTION': {
      return state.filter((s) => {
        return s.isNew ? s.uuid !== action.payload : s.id !== action.payload;
      });
    }

    case 'MODIFY_SECTION_PROPS': {
      const { prop, identifier, value } = action.payload;

      return state.map((s) => {
        const match = s.isNew ? s.uuid === identifier : s.id === identifier;

        return match ?  {
          ...s,
          [prop]: value,
        } : s;
      });
    }

    default: {
      return state;
    }
  }
};

export default sections;
