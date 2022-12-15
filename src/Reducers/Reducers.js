import { LOGIN_FORM } from "../Actions/ActionTypes";
import { LoginUt } from "../Utility/Utility";
import ACLOGIN from "../Actions/ActionCreater";

const initialSate = {
  username: "",
  password: "",
};
const reducers = (state = initialSate, action) => {
  switch (action.type) {
    case LOGIN_FORM:
      return LoginUt(
        initialSate,
        ACLOGIN.USERLOGIN(action.usName, action.userPass)
      );
    default:
      return state;
  }
};

export default reducers;
