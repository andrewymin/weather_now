import React, { useEffect, useState } from "react";

const LocationComponent = () => {
  const [location, setLocation] = useState({
    latitude: 40.7128,
    longitude: -74.006,
  });
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: Math.round(position.coords.latitude * 100) / 100, // get lat in tens place
            longitude: Math.round(position.coords.longitude * 100) / 100, // get long in tens place
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="flex h-[77vh]">
      <div className="flex items-center w-6/12 text-[40vw]">☀</div>

      <div id="temp" className="w-6/12 text-[23vw]">
        75℉
      </div>

      {/* <button onClick={getLocation}>Get Location</button>
      {location.latitude && location.longitude && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {error && <p>Error: {error}</p>} */}
    </div>
  );
};

export default LocationComponent;
