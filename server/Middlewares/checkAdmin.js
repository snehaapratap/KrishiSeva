export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const userRole = req.user.role;
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: "Access denied. Invalid role." });
    }
    next();
  };
};
