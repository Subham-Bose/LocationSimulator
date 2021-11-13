function degreeToRadian(x) {
  return (x * Math.PI) / 180;
}
function radianToDegree(x) {
  return (x * 180) / Math.PI;
}

module.exports = { degreeToRadian, radianToDegree };
