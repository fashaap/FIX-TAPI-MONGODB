const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('secretOrPrivateKey must have a value');
  }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '180d' }); // 6 bulan

  return { accessToken, refreshToken };
}

module.exports = generateTokens;
