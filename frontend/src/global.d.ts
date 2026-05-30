// For CSS Modules (Container-Design.module.css)
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For Standard CSS files
declare module '*.css';

// Swiper specific styles
declare module 'swiper/css';
declare module 'swiper/css/effect-flip';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';