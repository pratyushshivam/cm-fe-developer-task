export const DEPARTMENT_NAME = "DEPARTMENT_NAME";
export const CHECKBOX_NUMBER = "CHECKBOX_NUMBER";
export const departmentNameHandler = (departmentName) => {
  return async function (dispatch) {
    try {
      if (departmentName) {
        dispatch({
          type: DEPARTMENT_NAME,
          payload: departmentName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const checkboxNumberHandler = (checkboxNumber) => {
  return async function (dispatch) {
    try {
      if (checkboxNumber) {
        dispatch({
          type: CHECKBOX_NUMBER,
          payload: checkboxNumber,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
