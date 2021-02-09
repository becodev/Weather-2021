import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Clouds from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";

const WelcomeScreen = ({ children }) => {
  const myRefDiv = useRef(null);
  const [vanta, setVanta] = useState(0);

  useEffect(() => {
    if (!vanta) {
      //si vanta no esta activo, lo activamos
      setVanta(
        Clouds({
          THREE,
          el: myRefDiv.current,
        })
      );
    }

    return () => {
      if (vanta) {
        vanta.destroy();
        console.log("Recursos liberados");
        //liberamos los recursos de vanta
      }
    };
  }, [vanta]);
  //end useEffect

  return <div ref={myRefDiv}>welcome screen</div>;
};

WelcomeScreen.propTypes = {
  children: PropTypes.node,
};

export default WelcomeScreen;
