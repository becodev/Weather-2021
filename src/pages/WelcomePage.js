import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <div>
        <Link to="/main">Ir a main</Link>
      </div>
      Welcome
    </div>
  );
};

export default WelcomePage;
