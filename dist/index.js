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

var undefined$1 = undefined;

// Auto-import CSS when component is used
if (typeof window !== 'undefined') {
  // Check if CSS is already loaded
  const existingLink = document.querySelector('link[href*="PageLoader"]');
  if (!existingLink) {
    // This will be handled by the build system, but we ensure it's available
    console.log('PageLoader CSS should be imported automatically');
  }
}

// Simple route change detection - each PageLoader instance will trigger loading on mount

// Animation configurations - now dynamic based on duration
const createTextAnimation = duration => ({
  initial: {
    opacity: 1
  },
  enter: {
    opacity: 0,
    left: -100,
    transition: {
      duration: .75,
      delay: (duration - 1500) / 1000,
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
      ease: [0.33, 1, 0.68, 1]
    }
  }
});
const createCurveAnimation = (initialPath, targetPath, duration) => ({
  initial: {
    d: initialPath
  },
  enter: {
    d: targetPath,
    transition: {
      duration: .75,
      delay: (duration - 1500) / 1000,
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
});
const createTranslateAnimation = duration => ({
  initial: {
    left: "-300px"
  },
  enter: {
    left: "-100vw",
    transition: {
      duration: .75,
      delay: (duration - 1500) / 1000,
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
});
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
  duration = 3000,
  isLoading: externalIsLoading,
  onLoadingComplete,
  customLoader,
  customStyles,
  autoRouteLoading = true,
  onRouteChange
}) {
  // const router = useRouter();
  const [dimensions, setDimensions] = React.useState({
    width: null,
    height: null
  });
  const [internalIsLoading, setInternalIsLoading] = React.useState(true);
  const [showSwipeAnimation, setShowSwipeAnimation] = React.useState(false);
  const [showLoadingCircle, setShowLoadingCircle] = React.useState(true);

  // Use external loading state if provided, otherwise use internal state
  const isLoading = externalIsLoading !== undefined ? externalIsLoading : internalIsLoading;

  // Route change detection effect
  React.useEffect(() => {
    if (autoRouteLoading && externalIsLoading === undefined) {
      console.log('PageLoader mounted, setting up route detection');

      // Set initial loading state
      setInternalIsLoading(true);
      setShowSwipeAnimation(true);
      setShowLoadingCircle(true);

      // Listen for route changes
      const handleRouteChange = () => {
        console.log('Route changed to:', window.location.pathname);
        setInternalIsLoading(true);
        setShowSwipeAnimation(true);
        setShowLoadingCircle(true);
        if (onRouteChange) {
          onRouteChange();
        }
      };

      // Listen for popstate (back/forward navigation)
      window.addEventListener('popstate', handleRouteChange);

      // Override history methods to catch programmatic navigation
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
      history.pushState = function (...args) {
        originalPushState.apply(history, args);
        setTimeout(handleRouteChange, 0);
      };
      history.replaceState = function (...args) {
        originalReplaceState.apply(history, args);
        setTimeout(handleRouteChange, 0);
      };

      // Cleanup
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
    }
  }, [autoRouteLoading, externalIsLoading, onRouteChange]);

  // Prevent scroll when loading
  React.useEffect(() => {
    if (isLoading) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);
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

    // Show swipe animation when loading starts
    if (isLoading) {
      setShowSwipeAnimation(true);
      setShowLoadingCircle(true);

      // Hide loading circle before swipe animation completes
      const hideCircleTimer = setTimeout(() => {
        setShowLoadingCircle(false);
      }, Math.max(0, duration - 1500)); // Hide circle 1.5 seconds before loading completes

      // Only set internal timer if no external loading state is provided
      if (externalIsLoading === undefined) {
        const loadingTimer = setTimeout(() => {
          console.log('Loading completed, setting isLoading to false');
          setInternalIsLoading(false);
        }, duration);
        return () => {
          window.removeEventListener("resize", resize);
          clearTimeout(hideCircleTimer);
          clearTimeout(loadingTimer);
        };
      }
      return () => {
        window.removeEventListener("resize", resize);
        clearTimeout(hideCircleTimer);
      };
    }
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [duration, externalIsLoading, isLoading]);

  // Handle external loading completion
  React.useEffect(() => {
    if (externalIsLoading === false && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [externalIsLoading, onLoadingComplete]);

  // Reset animations when loading completes
  React.useEffect(() => {
    if (!isLoading) {
      // Reset immediately when loading completes
      setShowSwipeAnimation(false);
      setShowLoadingCircle(true); // Reset for next time
    }
  }, [isLoading]);
  console.log('PageLoader render - isLoading:', isLoading, 'showSwipeAnimation:', showSwipeAnimation, 'showLoadingCircle:', showLoadingCircle, 'route:', window?.location?.pathname);

  // Create dynamic animations based on duration
  const textAnimation = createTextAnimation(duration);
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
  }), isLoading && showLoadingCircle && /*#__PURE__*/React.createElement("div", {
    className: "loading-container",
    style: customStyles
  }, animationType === 'circle' ? /*#__PURE__*/React.createElement("div", {
    className: "loading-circle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner"
  })) : animationType === 'text' ? /*#__PURE__*/React.createElement("div", {
    className: "loading-text"
  }, loadingText) : animationType === 'custom' && customLoader ? /*#__PURE__*/React.createElement("div", {
    className: "custom-loader"
  }, customLoader) : /*#__PURE__*/React.createElement("div", {
    className: "loading-text"
  }, loadingText)), showSwipeAnimation && isLoading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(framerMotion.motion.p, _extends({
    className: "route"
  }, anim(textAnimation)), "page load"), dimensions.width != null && /*#__PURE__*/React.createElement(SVG, _extends({}, dimensions, {
    duration: duration
  }))), !isLoading && children);
}
const SVG = ({
  height,
  width,
  duration
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
  const translateAnimation = createTranslateAnimation(duration);
  const curveAnimation = createCurveAnimation(initialPath, targetPath, duration);
  return /*#__PURE__*/React.createElement(framerMotion.motion.svg, anim(translateAnimation), /*#__PURE__*/React.createElement(framerMotion.motion.path, anim(curveAnimation)));
};

exports.PageLoader = PageLoader;
exports.PageLoaderCSS = undefined$1;
exports.default = PageLoader;
//# sourceMappingURL=index.js.map
