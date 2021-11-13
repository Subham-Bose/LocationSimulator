const { Client } = require("@googlemaps/google-maps-services-js");
const fs = require("fs");

let result;
const config = {
  method: "get",
  url: "https://maps.googleapis.com/maps/api/directions/json",
  headers: {},
};
const client = new Client({});

module.exports = function getAllDirectionData(origin, destination) {
  return client.directions(
    {
      params: {
        origin: origin,
        destination: destination,
        key: "Enter the api key here",
      },
      timeout: 1000,
    },
    config
  );
};
