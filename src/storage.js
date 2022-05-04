const initialState = {
  name: "",
  email: "",
  image: "",
  recommends: "",
  newDisneys: "",
  originals: "",
  trendings: "",
  allInfo: "",
};
const Storage = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        name: action.name,
        email: action.email,
        image: action.image,
      };
    case "LOGOUT":
      return {
        name: null,
        email: null,
        image: null,
      };
    case "MOVIES":
      return {
        recommends: action.recommends,
        newDisneys: action.newDisneys,
        originals: action.originals,
        trendings: action.trendings,
      };
    case "M":
      return {
        allInfo: action.allInfo,
      };
    default:
      return state;
  }
};
export default Storage;
