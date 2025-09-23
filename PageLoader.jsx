import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import "./PageLoader.scss";

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
const createTextAnimation = (duration) => ({
    initial: {
        opacity: 1,
    },
    enter: {
        opacity: 0,
        left: -100,
        transition: {duration: .75, delay: (duration - 1500) / 1000, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {left: "47.5%"}
    },
    exit: {
        opacity: 1,
        left: "40%",
        transition: {duration: .5, ease: [0.33, 1, 0.68, 1]}
    }
})

const createCurveAnimation = (initialPath, targetPath, duration) => ({
    initial: {
        d: initialPath
    },
    enter: {
        d: targetPath,
        transition: {duration: .75, delay: (duration - 1500) / 1000, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
        d: initialPath,
        transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
    }
})

const createTranslateAnimation = (duration) => ({
    initial: {
        left: "-300px"
    },
    enter: {
        left: "-100vw",
        transition: {duration: .75, delay: (duration - 1500) / 1000, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {
            left: "100vw"
        }
    },
    exit: {
        left: "-300px",
        transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
    }
})

const routes = {
    "/": "Home",
    "/about": "About",
    "/contact": "Contact"
}

const anim = (variants) => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    }
}


export default function PageLoader({children, backgroundColor="#ffffff", loadingText="Loading...", animationType="circle", duration=3000, isLoading: externalIsLoading, onLoadingComplete, customLoader, customStyles, autoRouteLoading=true, onRouteChange}) {
    // const router = useRouter();
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })
    
    const [internalIsLoading, setInternalIsLoading] = useState(true)
    const [showSwipeAnimation, setShowSwipeAnimation] = useState(false)
    const [showLoadingCircle, setShowLoadingCircle] = useState(true)
    
    // Use external loading state if provided, otherwise use internal state
    const isLoading = externalIsLoading !== undefined ? externalIsLoading : internalIsLoading

    // Route change detection effect
    useEffect(() => {
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
            
            history.pushState = function(...args) {
                originalPushState.apply(history, args);
                setTimeout(handleRouteChange, 0);
            };
            
            history.replaceState = function(...args) {
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
    useEffect(() => {
        if (isLoading) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden'
        } else {
            // Restore scrolling
            document.body.style.overflow = 'unset'
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isLoading])

    useEffect(() => {
        console.log('PageLoader mounted, isLoading:', isLoading)
        
        function resize(){
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        resize();
        window.addEventListener("resize", resize)
        
        // Show swipe animation when loading starts
        if (isLoading) {
            setShowSwipeAnimation(true)
            setShowLoadingCircle(true)
            
            // Hide loading circle before swipe animation completes
            const hideCircleTimer = setTimeout(() => {
                setShowLoadingCircle(false)
            }, Math.max(0, duration - 1500)) // Hide circle 1.5 seconds before loading completes
            
            // Only set internal timer if no external loading state is provided
            if (externalIsLoading === undefined) {
                const loadingTimer = setTimeout(() => {
                    console.log('Loading completed, setting isLoading to false')
                    setInternalIsLoading(false)
                }, duration)
                
                return () => {
                    window.removeEventListener("resize", resize);
                    clearTimeout(hideCircleTimer);
                    clearTimeout(loadingTimer);
                }
            }
            
            return () => {
                window.removeEventListener("resize", resize);
                clearTimeout(hideCircleTimer);
            }
        }
        
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [duration, externalIsLoading, isLoading])
    
    // Handle external loading completion
    useEffect(() => {
        if (externalIsLoading === false && onLoadingComplete) {
            onLoadingComplete();
        }
    }, [externalIsLoading, onLoadingComplete])
    
    // Reset animations when loading completes
    useEffect(() => {
        if (!isLoading) {
            // Reset immediately when loading completes
            setShowSwipeAnimation(false)
            setShowLoadingCircle(true) // Reset for next time
        }
    }, [isLoading])
    
    console.log('PageLoader render - isLoading:', isLoading, 'showSwipeAnimation:', showSwipeAnimation, 'showLoadingCircle:', showLoadingCircle, 'route:', window?.location?.pathname)
    
    // Create dynamic animations based on duration
    const textAnimation = createTextAnimation(duration)
    const translateAnimation = createTranslateAnimation(duration)
    
    return (
    <div className='page curve' style={{backgroundColor}}>
       <div style={{opacity: dimensions.width == null ? 1 : 0}} className='background'/>
       
        {/* CSS Loading Animation */}
        {isLoading && showLoadingCircle && (
            <div className="loading-container" style={customStyles}>
                {animationType === 'circle' ? (
                    <div className="loading-circle">
                        <div className="spinner"></div>
                    </div>
                ) : animationType === 'text' ? (
                    <div className="loading-text">
                        {loadingText}
                    </div>
                ) : animationType === 'custom' && customLoader ? (
                    <div className="custom-loader">
                        {customLoader}
                    </div>
                ) : (
                    <div className="loading-text">
                        {loadingText}
                    </div>
                )}
            </div>
        )}
       
       {/* Swipe Animation - only show when loading */}
       {showSwipeAnimation && isLoading && (
           <>
               <motion.p className='route' {...anim(textAnimation)}>
                    {/* {routes[router.route]} */}
                    page load
                </motion.p>
                {dimensions.width != null && <SVG {...dimensions} duration={duration}/>}
           </>
       )}
        {!isLoading && children}
    </div>
    )
}

const SVG = ({height, width, duration}) => {

    const initialPath = `
        M300 0 
        Q0 ${height / 2} 300 ${height}
        L${width + 300} ${height}
        Q${width + 600} ${height / 2} ${width + 300} 0
        L0 0
    `

    const targetPath = `
        M300 0
        Q0 ${height / 2} 300 ${height}
        L${width} ${height}
        Q${width} ${height / 2} ${width} 0
        L0 0
    `

    const translateAnimation = createTranslateAnimation(duration)
    const curveAnimation = createCurveAnimation(initialPath, targetPath, duration)

    return (
        <motion.svg {...anim(translateAnimation)}>
            <motion.path {...anim(curveAnimation)} />
        </motion.svg>
    )
}
