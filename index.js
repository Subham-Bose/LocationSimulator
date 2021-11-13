const decodePolyline = require("./modules/DecodePolyline");
const {
  getCoordinatesDDistanceMetersApart,
} = require("./modules/DistanceCalculator");
const getAllDirectionData = require("./modules/googleDirections");

let origin = [12.93175, 77.62872];
let destination = [12.92662, 77.63696];
let d = 50;

function populate(result) {
  let polylines = [];
  let arr = result.routes[0].legs[0].steps;
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    var poly = arr[i].polyline.points;
    polylines.push(poly);
  }
  return polylines;
}

const start = async (origin, destination, d) => {
  try {
    const result = await getAllDirectionData(origin, destination)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e.message);
      });

    let polylines = populate(result);
    let partialCoordinates = [];
    for (let i = 0; i < polylines.length; i++) {
      let temp = decodePolyline(polylines[i]);
      partialCoordinates.push(temp);
    }

    let final = [];
    partialCoordinates.map((coor) => {
      final.push(getCoordinatesDDistanceMetersApart(coor, d));
    });
    const merge = final.flat(1);
    merge.map((obj) => console.log(obj.lat + "," + obj.lng + ","));
    return merge;
  } catch (err) {
    console.log(err);
  }
};

start(origin, destination, d);
