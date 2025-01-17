import { give } from '../services/jwthai.js';

const check = (token) => {
  return (req, res, next) => {
    req.user = null;
    const value = req.cookies[token];

    if (!value) {
      return next();
    }

    try {
      const payload = give(value);
      if (!payload) {
        return next();
      }
      req.user = payload;
    } catch (error) {
      console.error('Error in middleware:', error);
    }

    return next();
  };
};

export default check;
