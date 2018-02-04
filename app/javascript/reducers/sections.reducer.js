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
      return state.filter((s) => s.uuid !== action.payload);
    }

    case 'MODIFY_SECTION_PROPS': {
      const { prop, uuid, value } = action.payload;

      return state.map((s) => {
        return s.uuid === uuid ?  {
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
