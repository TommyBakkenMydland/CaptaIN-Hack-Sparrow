import React, { useCallback, useState } from "react";
import Map from "./Map";

export function Home() {
  // const [ships, setShips] = useState();
  /*
  function getNearShips() {
    fetch("https://hacksparrowfunction.azurewebsites.net/api/nearest_ships", {
      headers: {
        "x-functions-key": "passord",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setShips(ships);
      })
      .catch(console.log);
  }

  function getShips() {
    fetch("https://hacksparrowfunction.azurewebsites.net/api/latest_location", {
      headers: {
        "x-functions-key": "passord",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setShips(ships);
      })
      .catch(console.log);
  }
*/
  const ships = [
    {
      name: "FJORD FISH",
      id: "257961600",
      type: "Tug",
      length: 14,
      value: 400,
      latitude: 60.171987,
      longditude: 3.296245,
    },
    {
      name: "GABRIELE",
      id: "257074sdd870",
      type: "HSC",
      length: 40,
      latitude: 65.445858,
      longditude: 2.297673,
    },
    {
      name: "TANGEN",
      id: "257254000",
      type: "Fishing",
      length: 26,
      value: 200,
      latitude: 58.452933,
      longditude: 5.998192,
    },
    {
      name: "GABRIELE",
      id: "257074870",
      type: "HSC",
      length: 40,
      value: 300,
      latitude: 62.445858,
      longditude: 4.297673,
    },
    {
      name: "Big ship",
      id: "25707432870",
      type: "HSC",
      length: 60,
      value: 200,
      latitude: 62.445858,
      longditude: -0.297673,
    },
  ];

  return (
    <div>
      <h1>The Raid planner ⚓</h1>
      <Map ships={ships} />
    </div>
  );
}
