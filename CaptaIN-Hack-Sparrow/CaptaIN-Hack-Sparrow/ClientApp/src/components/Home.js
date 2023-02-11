import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const [logdata, setLogData] = useState([]);
  const [logSection, setLogSection] = useState(null);
  useEffect(() => {
    getShipLog(["BALDVIN", "JOAN", "HERCULES"]);
  }, [getShipLog]);

  const getShipLog = (names) => {
    names.forEach((name) => {
      fetch(
        "https://prod-148.westeurope.logic.azure.com:443/workflows/97ce1fee12a1447283a02276ca70cd09/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7pPji_uGo9M15wtvqEng-FXSKnZiv9xsenfoteLyoCA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            numberOfLogs: 4,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          var _logdata = logdata;
          _logdata.push(data);
          setLogData(_logdata);
          setLogSection(logdata.map((shipLog) => GetShipLogItem(shipLog)));
        });
    });
  };

  const GetShipLogItem = (log) => {
    return (
      <div className="logsection">
        <h4>{log[0]["name"]}</h4>
        <div class="shiplog header">
          <span class>Logged date</span>
          <span class>Speed</span>
          <span class>Heading</span>
          <span>Coordinates</span>
        </div>
        {log.map((log) => {
          return (
            <div class="shiplog">
              <span class>{log["msgtime"].slice(0, 10)}</span>
              <span class>{log["speedOverGround"]}</span>
              <span class>{log["trueHeading"]}</span>
              <span>
                {log["latitude"]} ; {log["longitude"]}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <iframe title="Map" id="map" src="./map.html" />
      <h2>Ships logs</h2>
      {logSection}
      {logdata.length === 0 && <FontAwesomeIcon size="lg" icon={faSpinner} />}
    </div>
  );
};
