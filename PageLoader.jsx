import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import "./PageLoader.scss";

// Animation configurations
const text = {
    initial: {
        opacity: 1,
    },
    enter: {
        opacity: 0,
        left: -100,
        transition: {duration: .75, delay: 3.35, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {left: "47.5%"}
    },
    exit: {
        opacity: 1,
        left: "40%",
        transition: {duration: .5, delay: .4, ease: [0.33, 1, 0.68, 1]}
    }
}

const curve = (initialPath, targetPath) => {
    return {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: {duration: .75, delay: 3.35, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: initialPath,
            transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
        }
    }
}

const translate = {
    initial: {
        left: "-300px"
    },
    enter: {
        left: "-100vw",
        transition: {duration: .75, delay: 3.35, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {
            left: "100vw"
        }
    },
    exit: {
        left: "-300px",
        transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
    }
}

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


export default function PageLoader({children, backgroundColor="#ffffff", loadingText="Loading...", animationType="circle", duration=3000}) {
    // const router = useRouter();
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })
    
    const [isLoading, setIsLoading] = useState(true)

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
        
        // Set loading duration
        const loadingTimer = setTimeout(() => {
            console.log('Loading completed, setting isLoading to false')
            setIsLoading(false)
        }, duration)
        
        return () => {
            window.removeEventListener("resize", resize);
            clearTimeout(loadingTimer);
        }
    }, [duration])
    
    console.log('PageLoader render - isLoading:', isLoading)
    
    return (
    <div className='page curve' style={{backgroundColor}}>
       <div style={{opacity: dimensions.width == null ? 1 : 0}} className='background'/>
       
        {/* CSS Loading Animation */}
        {isLoading && (
            <div className="loading-container">
                {animationType === 'circle' ? (
                    <div className="loading-circle">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="loading-text">
                        {loadingText}
                    </div>
                )}
            </div>
        )}
       
       <motion.p className='route' {...anim(text)}>
            {/* {routes[router.route]} */}
            page load
        </motion.p>
       {dimensions.width != null && <SVG {...dimensions}/>}
        {
            children
        }
    </div>
    )
}

const SVG = ({height, width}) => {

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

    return (
        <motion.svg {...anim(translate)}>
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    )
}
