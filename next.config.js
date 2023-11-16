/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['res.cloudinary.com']
  },
  compiler:{
    styledComponents:true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      return config;
    }
 
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-card-slider-component/dist/Slider.css': false,
    };
 
    return config;
  },
 

 }
 
 module.exports = nextConfig
 