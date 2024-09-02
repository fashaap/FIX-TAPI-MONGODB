const jwt = require("jsonwebtoken");
const ROLE = require("../json/userRole.json");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

const verifyTokenAndSuperAdmin = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    const { role } = decoded;
    const validRoles = [ROLE.superAdmin];

    if (validRoles.includes(role)) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ error: 'Insufficient privileges' });
    }
  });
}


const verifyTokenAndAdmin = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    const { role } = decoded;
    const validRoles = [ROLE.superAdmin, ROLE.admin];

    if (validRoles.includes(role)) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ error: 'Insufficient privileges' });
    }
  });

}

const verifyTokenAndViewer = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    const { role } = decoded;
    const validRoles = [ROLE.viewer, ROLE.superAdmin, ROLE.admin];

    if (validRoles.includes(role)) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ error: 'Insufficient privileges' });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndSuperAdmin,
  verifyTokenAndAdmin,
  verifyTokenAndViewer
}