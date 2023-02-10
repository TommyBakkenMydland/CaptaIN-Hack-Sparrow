import React, { useCallback } from "react";
import Map from "./Map";

export function Home() {
  //getShips();

  function getShips() {
    fetch(
      "https://hacksparrowfunction.azurewebsites.net/api/latest_location?&clientId=acdc",
      {
        headers: {
          "x-functions-key":
            "pz07uwpEFqMHQi-bdjfmLNlGlKiJuE99YKTzupXxDrHcAzFuTD_nUw==",
        },
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  }

  const ships = [
    {
      name: "Queen Anne's Revenge",
      id: "o8er9e42",
      type: "Pirate",
      length: 10001,
      latitude: 57.06243133804449,
      longditude: 4.781440897571031,
    },
    {
      name: "FJORD FISH",
      id: "257961600",
      type: "Tug",
      length: 14,
      latitude: 60.171987,
      longditude: 5.296245,
    },
    {
      name: "TANGEN",
      id: "257254000",
      type: "Fishing",
      length: 26,
      latitude: 58.452933,
      longditude: 5.998192,
    },
    {
      name: "GABRIELE",
      id: "257074870",
      type: "HSC",
      length: 40,
      latitude: 62.445858,
      longditude: 6.197673,
    },
  ];
  return (
    <div>
      <h1>Argh, lets find a boat to raid!</h1>
      <Map ships={ships} />
    </div>
  );
}
