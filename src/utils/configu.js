export const isLogin = () => {
  if (localStorage.getItem("access")) {
    return true;
  }

  return false;
};
