const { degreeToRadian, radianToDegree } = require("./DegreeRadianConverter");

function calculateGLatLong(lat, long, bearing, d) {
  const earthRadius = 6371000;

  lat = degreeToRadian(lat);
  long = degreeToRadian(long);

  let Ad = d / earthRadius;

  let Lat2 = Math.asin(
    Math.sin(lat) * Math.cos(Ad) +
      Math.cos(lat) * Math.sin(Ad) * Math.cos(bearing)
  );
  let Lng2 =
    long +
    Math.atan2(
      Math.sin(bearing) * Math.sin(Ad) * Math.cos(lat),
      Math.cos(Ad) - Math.sin(lat) * Math.sin(Lat2)
    );
  let reslat = radianToDegree(Lat2);
  let reslng = radianToDegree(Lng2);

  return { lat: reslat, lng: reslng };
}

module.exports = calculateGLatLong;
