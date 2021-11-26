import React from "react";
/**
 * Compnente de carga
 * @param {boolean} props 
 * @returns view de carga
 */
function Loader(props) {
  const { isBusy } = props;
  return (
    <div>
      {isBusy ? (
        <div className="loader">
          <div className="centered">
            <div className="rotater"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Loader;
