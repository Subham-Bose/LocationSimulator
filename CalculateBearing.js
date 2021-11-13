const { degreeToRadian, radianToDegree } = require("./DegreeRadianConverter");

function calculateBearing(lat1, long1, lat2, long2) {
  let rlong1 = degreeToRadian(long1);
  let rlong2 = degreeToRadian(long2);

  let longDiff = rlong2 - rlong1;
  let rLat1 = degreeToRadian(lat1);
  let rLat2 = degreeToRadian(lat2);

  let x = Math.cos(rLat2) * Math.sin(longDiff);
  let y =
    Math.cos(rLat1) * Math.sin(rLat2) -
    Math.cos(rLat2) * Math.sin(rLat1) * Math.cos(longDiff);

  let res = Math.atan2(x, y);

  return res;
}

module.exports = calculateBearing;
