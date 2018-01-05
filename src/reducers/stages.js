const initialState = {
  fetching: false,
  fetched: false,
  stages: null,
  error: null
}

const StagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Fetch_Stages_Start": {
      return { ...state, fetching: true };
    }
    case "Fetch_Stages_End": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        stages: action.payload
      };
    }
    default: {
      return { ...state, fetching: false, error: action.payload };
    }
  }
};

export default StagesReducer;
