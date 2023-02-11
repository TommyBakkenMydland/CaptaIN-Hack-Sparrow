import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";

export function PirateAlert() {
  const [alertStatus, setAlertStatus] = useState({
    plunder: false,
    danger: false,
  });

  useEffect(() => {
    GetAlertStatus();
    const interval = setInterval(() => {
      GetAlertStatus();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function GetAlertStatus() {
    fetch(
      "https://hacksparrowfunction.azurewebsites.net/api/pirate_alert?userID=123",
      {
        headers: {
          "x-functions-key": "passord",
        },
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAlertStatus(data);
      });
  }

  const isSomeFormOfAlert = () =>
    alertStatus.danger || alertStatus.plunder || 0;

  const alertBanner = (position) => {
    if (isSomeFormOfAlert()) {
      return (
        <div className={"alertBanner " + position}>
          <div className="alertBackground"></div>
          <div className="icons">
            <FontAwesomeIcon icon={faSkullCrossbones} />
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <FontAwesomeIcon icon={faSkullCrossbones} />
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <FontAwesomeIcon icon={faSkullCrossbones} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      id="pirateStatus"
      className={
        alertStatus.danger ? "isDanger" : alertStatus.plunder ? "isPlunder" : ""
      }
    >
      {alertBanner("top")}
      {isSomeFormOfAlert() === 1 && (
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/2EU67V-Bt8g?start=5&autoplay=true"
          frameBorder="0"
          title="YouTube video player"
          allow="autoplay"
        ></iframe>
      )}
      {isSomeFormOfAlert() === 0 && (
        <h1>On the lookout for danger, Captain!</h1>
      )}
      {alertStatus.danger === 1 && <h1>Fuck, we be in danger me maties!!!</h1>}
      {alertStatus.danger === 0 && alertStatus.plunder === 1 && (
        <h1>There be booty on the waves, lads!!</h1>
      )}
      {alertBanner("bottom")}
    </div>
  );
}
