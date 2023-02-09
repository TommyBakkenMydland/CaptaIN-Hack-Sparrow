import React, { Component, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaGFja3NwYXJyb3ciLCJhIjoiY2xkeDNtNzdtMGRraTNzcGtxMWVnNXk3MSJ9.rGpkDDZxPyJCHrf6cl4lGA";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 2
    });
    

      
    map.on('load', () => {
     
     
      // Load an image from an external URL.
      map.loadImage(
        'https://localhost:44492/ship-2.png',
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage('cat', image);

          // Add a data source containing one point feature.
          map.addSource('point', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [-77.4144, 25.0759]
                  }
                }
              ]
            }
          });

          // Add a layer to use the image to represent the data.
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point', // reference the data source
            'layout': {
              'icon-image': 'cat', // reference the image
              'icon-size': 0.25
            }
          });
        }
      );
      const marker1 = new mapboxgl.Marker()
      .setLngLat([8.722938, 63.645802])
      .addTo(map);
      const marker2 = new mapboxgl.Marker()
      .setLngLat([6.722938, 62.645802])
      .addTo(map);

        // Define the line geometry
  const lineGeometry = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        marker1.getLngLat().toArray(),
        marker2.getLngLat().toArray()
      ]
    }
  };
  
  // Add the line to the map
  map.addSource('line', {
    type: 'geojson',
    data: lineGeometry
  });
  
  map.addLayer({
    id: 'line',
    type: 'line',
    source: 'line',
    paint: {
      'line-color': '#ff0000',
      'line-width': 4
    }
  });
  
  // Animate the line
  const speed = 0.01; // animation speed
  const step = speed / (marker1.getLngLat().distanceTo(marker2.getLngLat()) * 1000); // step size
  let progress = 0;
  
  const animateLine = () => {
    progress += step;
    
    if (progress > 1) {
      progress = 1;
    }
    
    const currentCoords = marker1.getLngLat().interpolate(marker2.getLngLat(), progress);
    
    map.getSource('line').setData({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          marker1.getLngLat().toArray(),
          currentCoords.toArray()
        ]
      }
    });
    
    if (progress < 1) {
      requestAnimationFrame(animateLine);
    }
  };
  
  animateLine();
      /*
      
      // Use Mapbox Directions API to get a route between the two markers
      const route = fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/8.722938,63.645802;8.722935,63.645805?access_token=pk.eyJ1IjoiaGFja3NwYXJyb3ciLCJhIjoiY2xkeDNtNzdtMGRraTNzcGtxMWVnNXk3MSJ9.rGpkDDZxPyJCHrf6cl4lGA`)
        .then(response => response.json())
        .then(json => {
          return json.routes[0].geometry;
        });

      // Add the route to the map
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': route
        }
      });

      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
      
      */
    });
  }, []);

  return <div ref={mapContainer} style={{ height: "500px", width: "100%" }} />;
};

export default Map;

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello, fellow Pirate!</h1>

        <Map />
      </div>
    );
  }
}
