const VMSHeader = () => {
    const Access = localStorage.getItem("access-token");
  
    if (Access) {
      return { Authorization: "Bearer " + Access };
    } else {
      return {};
    }
  };
  
  export default VMSHeader;
  