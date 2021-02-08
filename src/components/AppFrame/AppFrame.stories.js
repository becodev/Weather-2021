import React from "react";
import AppFrame from "./AppFrame";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "AppFrame",
  component: AppFrame,
};

export const AppFrameExample = () => (
  <Router>
    <AppFrame>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit fugit est
      vel eveniet molestias accusamus ipsam amet ratione? Ullam eius magni ea
      aliquid quam labore animi. Doloremque laborum assumenda provident.
    </AppFrame>
  </Router>
);
