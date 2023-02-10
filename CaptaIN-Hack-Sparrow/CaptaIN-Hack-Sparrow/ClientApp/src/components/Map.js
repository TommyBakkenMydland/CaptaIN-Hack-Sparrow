import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

export default function Map(props) {
  const mapContainer = useRef(null);
  const accessToken =
    "pk.eyJ1IjoiaGFja3NwYXJyb3ciLCJhIjoiY2xkeDNtNzdtMGRraTNzcGtxMWVnNXk3MSJ9.rGpkDDZxPyJCHrf6cl4lGA";

  const destination = [-13.84697223438431, 64.87539383277971];
  const start = [5.588272058883149, 57.63670370186216];

  function addShipsToMap(map) {
    var _markers = [];
    Array.from(props.ships).forEach((ship) => {
      _markers.push({
        ship: ship,
        marker: new mapboxgl.Marker().setLngLat([
          ship.longditude,
          ship.latitude,
        ]),
      });
    });
    return _markers;
  }

  function getRaidCoordinates(shipDic) {
    var coordinates = [];

    shipDic.forEach((marker) => {
      coordinates.push(marker.longditude, marker.latitude);
    });

    return coordinates;
  }

  var images = {
    large: "/large.png",
    medium: "/medium.png",
    small: "/small.png",
  };

  const addAllImagesToMap = (map) => {
    map.loadImage(images.large, (error, image) => {
      if (error) throw error;
      map.addImage("large", image);
    });

    map.loadImage(images.medium, (error, image) => {
      if (error) throw error;
      map.addImage("medium", image);
    });

    map.loadImage(images.small, (error, image) => {
      if (error) throw error;
      map.addImage("small", image);
    });

    map.loadImage("/pirate.png", (error, image) => {
      if (error) throw error;
      map.addImage("pirate", image);
    });
  };

  const addImageToMarker = (map, ship) => {
    // Add a data source containing one point feature.
    map.addSource(ship.ship.id, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: ship.marker.getLngLat().toArray(),
            },
          },
        ],
      },
    });

    // Add a layer to use the image to represent the data.
    map.addLayer({
      id: ship.ship.id,
      type: "symbol",
      source: ship.ship.id, // reference the data source
      layout: {
        "icon-image": getShipImage(ship.ship), // reference the image
        "icon-size": 0.8,
      },
    });
  };

  const getShipImage = (ship) =>
    ship.length > 10000
      ? "pirate"
      : ship.length > 50
      ? "large"
      : ship.length > 20
      ? "medium"
      : "small";

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [5.296245, 60.171987],
      zoom: 5,
    });

    map.on("load", () => {
      // ship to raid
      var shipDic = addShipsToMap(map);
      addAllImagesToMap(map);

      const ship1 = shipDic[0];
      const ship2 = shipDic[1];

      shipDic.forEach((ship) => {
        addImageToMarker(map, ship);
      });

      // Define the line geometry

      var raidPoints = shipDic
        .filter((ship) => ship.ship.length > 20)
        .map((ship) => ship.marker.getLngLat().toArray());
      raidPoints.push(destination);
      const lineGeometry = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: raidPoints,
        },
      };

      // Add the line to the map
      map.addSource("line", {
        type: "geojson",
        data: lineGeometry,
      });

      map.addLayer({
        id: "line",
        type: "line",
        source: "line",
        paint: {
          "line-color": "#ff0000",
          "line-width": 2,
        },
      });
    });
  }, []);

  return <div ref={mapContainer} style={{ height: "700px", width: "100%" }} />;
}
