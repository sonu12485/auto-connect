const initialState = {
  loggedIn: false,
  type: null,
  name: null,
  email: null,
  profilePic: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        loggedIn: true,
        type: action.payload.type,
        name: action.payload.name,
        email: action.payload.email,
        profilePic: action.payload.profilePic
      };

    case "FETCH_USER_DETAILS":
      return {
        loggedIn: true,
        type: action.payload.type,
        name: action.payload.name,
        email: action.payload.email,
        profilePic: action.payload.profilePic
      };

    default:
      return state;
  }
}
