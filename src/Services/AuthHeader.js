const AuthHeader = () => {
  const Access = localStorage.getItem("access");

  if (Access) {
    return { Authorization: "Bearer " + Access };
  } else {
    return {};
  }
};

export default AuthHeader;
