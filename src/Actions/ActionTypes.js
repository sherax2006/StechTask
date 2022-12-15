export const LOGIN_FORM = "LOGIN";
export const APPLY_FILTER = "USERFILTER";


export const action_login = (username, pass) => {  
  return {
    type: "LOGIN",
    usName: username,
    userPass: pass,
  };
};

export const apply_filter=()=>{
  return {
    type:"USERFILTER",
  }
}
