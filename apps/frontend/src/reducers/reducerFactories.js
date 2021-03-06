export const handleRequest = state => ({
  ...state,
  isFetching: true,
  error: null
});

export const handleRequestSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  content: action.payload,
  error: null
});

export const handleRequestError = (state, error) => ({
  ...state,
  isFetching: false,
  content: {},
  error: error.payload
});

export const handlePageableRequestSuccess = (state, action) => ({ 
  ...state,
  isFetching: false,
  totalPages: action.payload.totalPages,
  content: action.payload.content,
  error: null
});

export const handleRequestPageableError = (state, error) => ({
  ...state,
  isFetching: false,
  content: [],
  error: error.payload
});