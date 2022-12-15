import { LoginUt } from "../Utility/Utility";
const initialSate = {
  per_page: 20,
  page_no: 1,
  order_by: "id",
  order_type: "desc",
};
const UserReducer = (state = initialSate, action) => {
  switch (action.type) {
    case "CHANGE_OREDR":
      return LoginUt(initialSate, {
        order_by: action.value,
      });

    case "ORDER_TYPE":
      return LoginUt(initialSate, {
        order_type: action.value,
      });

    case "PER_PAGE":
      return LoginUt(initialSate, {
        per_page: action.value,
      });

    default:
      return state;
  }
};

export default UserReducer;
