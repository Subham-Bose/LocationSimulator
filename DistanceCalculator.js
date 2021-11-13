const { degreeToRadian } = require("./DegreeRadianConverter");
const calculateBearing = require("./CalculateBearing");
const calculateGLatLong = require("./CalculateNextCoordinate");

function distanceInMeterBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371000;

  var dLat = degreeToRadian(lat2 - lat1);
  var dLon = degreeToRadian(lon2 - lon1);

  lat1 = degreeToRadian(lat1);
  lat2 = degreeToRadian(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function getCoordinatesDDistanceMetersApart(Coordinates, d) {
  let array = [];
  let start = Coordinates[0];
  let startlat = start.lat;
  let startlng = start.lng;
  array.push({ lat: startlat, lng: startlng });
  let trackIndex = 1;

  while (trackIndex < Coordinates.length) {
    let intermidiateCoordinate = Coordinates[trackIndex];
    let dist = distanceInMeterBetweenEarthCoordinates(
      startlat,
      startlng,
      intermidiateCoordinate.lat,
      intermidiateCoordinate.lng
    );
    if (dist >= d) {
      let bearing = calculateBearing(
        startlat,
        startlng,
        intermidiateCoordinate.lat,
        intermidiateCoordinate.lng
      );
      res = calculateGLatLong(startlat, startlng, bearing, d);
      startlat = res.lat;
      startlng = res.lng;
      array.push({ lat: startlat, lng: startlng });
    } else {
      trackIndex++;
    }
  }
  return array;
}

module.exports = {
  distanceInMeterBetweenEarthCoordinates,
  getCoordinatesDDistanceMetersApart,
};
