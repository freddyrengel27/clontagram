import { useState, useEffect, useRef } from "react";
import defaultImg from "../../assets/img/defaultImage.png";

const LazyLoad = ({children}) =>{

    const elementRef = useRef();
    const [showLazy, setShowLazy] = useState(false);

    useEffect(() =>{

        const onChange = (entries, observer) =>{
            const el = entries[0];
            if(el.isIntersecting){
                setShowLazy(true);
                observer.disconnect();
            }
        }

        const observer = new IntersectionObserver(onChange, {rootMargin: "10px"})
        observer.observe(elementRef.current);

        return () => observer.disconnect();

    });

    
        return(
            <div ref={elementRef} className="lazyLoad">
                 {showLazy ? children : <img className="lazyImg" src={defaultImg} />}
            </div>
        )
};

export default LazyLoad;
