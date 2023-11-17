/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['res.cloudinary.com']
  },

  compiler:{
    styledComponents:true,
  },
  serverless: {
    maxPayload: 10 * 1024 * 1024, 
    compress: true,
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
  experimental: {
    forceSwcTransforms: true,
  },
 
 

 }
 
 module.exports = nextConfig
 