export const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  };
  
  export const slideInFromTop = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { duration: 0.5 },
  };
  
  export const bounceEffect = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };
  