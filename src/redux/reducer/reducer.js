import * as AuthActions from "../actions/actions";
const initialState = {
  departmentName: "",
  checkboxNumber: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActions.DEPARTMENT_NAME:
      return {
        ...state,
        departmentName: action.payload,
      };
    case AuthActions.CHECKBOX_NUMBER:
      return {
        ...state,
        checkboxNumber: action.payload,
      };
    default:
      return state;
  }
}
