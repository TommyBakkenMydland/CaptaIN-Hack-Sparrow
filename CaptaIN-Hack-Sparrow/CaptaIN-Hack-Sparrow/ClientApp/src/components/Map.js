import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

export default function Map(props) {
  const mapContainer = useRef(null);
  const accessToken =
    "pk.eyJ1IjoiaGFja3NwYXJyb3ciLCJhIjoiY2xkeDNtNzdtMGRraTNzcGtxMWVnNXk3MSJ9.rGpkDDZxPyJCHrf6cl4lGA";

  const [shipDic, setMarkers] = useState([]);

  function addShipsToMap(map) {
    var _markers = [];
    Array.from(props.ships).forEach((ship) => {
      _markers.push({
        ship: ship,
        marker: new mapboxgl.Marker()
          .setLngLat([ship.longditude, ship.latitude])
          .addTo(map),
      });
    });
    setMarkers(_markers);
  }

  function getRaidCoordinates() {
    var coordinates = [];

    shipDic.forEach((marker) => {
      coordinates.push(marker.longditude, marker.latitude);
    });

    return coordinates;
  }

  const animateLine = (map) => {
    const speed = 0.01; // animation speed
    const step =
      speed /
      (shipDic[0].marker
        .getLngLat()
        .distanceTo(shipDic[shipDic.length - 1].getLngLat()) *
        1000); // step size

    let progress = 0;
    progress += step;

    if (progress > 1) {
      progress = 1;
    }

    const currentCoords = shipDic[0]
      .getLngLat()
      .interpolate(shipDic[shipDic.length - 1].marker.getLngLat(), progress);

    map.getSource("line").setData({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: currentCoords,
      },
    });

    if (progress < 1) {
      requestAnimationFrame(animateLine);
    }
  };

  var images = {
    Tug: "/pirate.png",
    Fishing: "/sailboat.png",
  };

  const addAllImagesToMap = (map) => {
    map.loadImage(images.Tug, (error, image) => {
      if (error) throw error;
      map.addImage("Tug", image);
    });

    map.loadImage(images.Fishing, (error, image) => {
      if (error) throw error;
      map.addImage("Fishing", image);
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
        "icon-image": ship.ship.type, // reference the image
        "icon-size": 0.2,
      },
    });
  };

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
      addAllImagesToMap(map);

      addShipsToMap(map);

      const ship1 = shipDic[0];
      const ship2 = shipDic[1];

      addImageToMarker(map, ship1);
      addImageToMarker(map, ship2);

      // Define the line geometry
      const lineGeometry = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            ship1.marker.getLngLat().toArray(),
            ship2.marker.getLngLat().toArray(),
          ],
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
          "line-width": 4,
        },
      });

      // Animate the line
      const speed = 0.01; // animation speed
      const step =
        speed /
        (ship1.marker.getLngLat().distanceTo(ship2.marker.getLngLat()) * 1000); // step size
      let progress = 0;

      const animateLine = () => {
        progress += step;

        if (progress > 1) {
          progress = 1;
        }

        const currentCoords = ship1.marker
          .getLngLat()
          .interpolate(ship2.marker.getLngLat(), progress);

        map.getSource("line").setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              ship1.marker.getLngLat().toArray(),
              currentCoords.toArray(),
            ],
          },
        });

        if (progress < 1) {
          requestAnimationFrame(animateLine);
        }
      };

      animateLine(map);
    });
  }, []);

  return <div ref={mapContainer} style={{ height: "500px", width: "100%" }} />;
}
