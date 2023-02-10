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
    const interval = setInterval(() => {
      GetFakeStatus();
    }, 3000);
    return () => clearInterval(interval);
  }, [alertStatus]);

  async function GetAlertStatus() {
    const result = await fetch(
      "https://hacksparrowfunction.azurewebsites.net/api/pirate_alert?code=wzZIDzs9SpWu7oz3_KVxEu3-nnNqHxY6A-lYIbAP6ec-AzFuiENnQg==&userID=23423"
    );
    console.log(result);
    setAlertStatus(result.body);
  }

  async function GetFakeStatus() {
    const something = Math.random() > 0.7;
    const elses = Math.random() < 0.3;

    setAlertStatus({
      danger: something,
      plunder: elses,
    });
  }

  const isSomeFormOfAlert = () => alertStatus.danger || alertStatus.plunder;

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
      return <></>;
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
      {isSomeFormOfAlert() && (
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/2EU67V-Bt8g?start=5&autoplay=1"
          frameborder="0"
          title="YouTube video player"
          allow="autoplay"
          allowfullscreen
        ></iframe>
      )}
      {alertStatus.danger && <h1>Fuck, we be in danger me maties!!!</h1>}
      {!alertStatus.danger && alertStatus.plunder && (
        <h1>There be booty on the waves, lads!!</h1>
      )}
      {alertBanner("bottom")}
    </div>
  );
}
