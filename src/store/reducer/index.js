export const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING_MOVIES":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};
