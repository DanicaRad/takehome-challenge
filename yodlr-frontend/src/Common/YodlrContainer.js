import React from "react";

function YodlrContainer({children}) {

  //mt-5 pt-5
  
  return (
    <div className="flex justify-content-center align-self-center">
      <div className="display-4 text-center text-primary p-2 mt-5">Yodlr</div>
      <div className="h5 text-center p-2">No one knows what it does.</div>
      <div className="text-center m-auto">
        { children }
      </div>
    </div>
  );
};

export default YodlrContainer;