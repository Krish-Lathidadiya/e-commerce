function isTokenExpired(exp) {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > exp;
}

module.exports = { isTokenExpired };
