'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var framerMotion = require('framer-motion');

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

// Animation configurations
const text = {
  initial: {
    opacity: 1
  },
  enter: {
    opacity: 0,
    left: -100,
    transition: {
      duration: .75,
      delay: 3.35,
      ease: [0.76, 0, 0.24, 1]
    },
    transitionEnd: {
      left: "47.5%"
    }
  },
  exit: {
    opacity: 1,
    left: "40%",
    transition: {
      duration: .5,
      delay: .4,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};
const curve = (initialPath, targetPath) => {
  return {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: {
        duration: .75,
        delay: 3.35,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: {
      d: initialPath,
      transition: {
        duration: .75,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };
};
const translate = {
  initial: {
    left: "-300px"
  },
  enter: {
    left: "-100vw",
    transition: {
      duration: .75,
      delay: 3.35,
      ease: [0.76, 0, 0.24, 1]
    },
    transitionEnd: {
      left: "100vw"
    }
  },
  exit: {
    left: "-300px",
    transition: {
      duration: .75,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};
const anim = variants => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit"
  };
};
function PageLoader({
  children,
  backgroundColor = "#ffffff",
  loadingText = "Loading...",
  animationType = "circle",
  duration = 3000
}) {
  // const router = useRouter();
  const [dimensions, setDimensions] = React.useState({
    width: null,
    height: null
  });
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    console.log('PageLoader mounted, isLoading:', isLoading);
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    resize();
    window.addEventListener("resize", resize);

    // Set loading duration
    const loadingTimer = setTimeout(() => {
      console.log('Loading completed, setting isLoading to false');
      setIsLoading(false);
    }, duration);
    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(loadingTimer);
    };
  }, [duration]);
  console.log('PageLoader render - isLoading:', isLoading);
  return /*#__PURE__*/React.createElement("div", {
    className: "page curve",
    style: {
      backgroundColor
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: dimensions.width == null ? 1 : 0
    },
    className: "background"
  }), isLoading && /*#__PURE__*/React.createElement("div", {
    className: "loading-container"
  }, animationType === 'circle' ? /*#__PURE__*/React.createElement("div", {
    className: "loading-circle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "loading-text"
  }, loadingText)), /*#__PURE__*/React.createElement(framerMotion.motion.p, _extends({
    className: "route"
  }, anim(text)), "page load"), dimensions.width != null && /*#__PURE__*/React.createElement(SVG, dimensions), children);
}
const SVG = ({
  height,
  width
}) => {
  const initialPath = `
        M300 0 
        Q0 ${height / 2} 300 ${height}
        L${width + 300} ${height}
        Q${width + 600} ${height / 2} ${width + 300} 0
        L0 0
    `;
  const targetPath = `
        M300 0
        Q0 ${height / 2} 300 ${height}
        L${width} ${height}
        Q${width} ${height / 2} ${width} 0
        L0 0
    `;
  return /*#__PURE__*/React.createElement(framerMotion.motion.svg, anim(translate), /*#__PURE__*/React.createElement(framerMotion.motion.path, anim(curve(initialPath, targetPath))));
};

exports.PageLoader = PageLoader;
exports.default = PageLoader;
//# sourceMappingURL=index.js.map
