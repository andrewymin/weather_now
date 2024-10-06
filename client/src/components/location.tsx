// import { useEffect, useState } from "react";
// import { customAxios, isAxiosError } from "@/api/axiosInstance";
import { useData } from "@/context/dataContext";
import Loading from "./loading";

const LocationComponent = () => {
  const { dataState } = useData();
  //   const [location, setLocation] = useState<{
  //     latitude: number;
  //     longitude: number;
  //   }>({
  //     latitude: 40.7128,
  //     longitude: -74.006,
  //   });
  //   const [temp, setTemp] = useState<number | null>(null);
  //   const [error, setError] = useState<string | null>(null);

  //   const getLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           // Sending coords to getTemp to be sent to backend
  //           getTemp(position.coords.latitude, position.coords.longitude);
  //         },
  //         (err) => {
  //           setError(err.message);
  //           // Send default coords if error getting exact location
  //           getTemp(location.latitude, location.longitude);
  //         }
  //       );
  //     } else {
  //     }
  //   };

  //   const getTemp = async (lat: number, lng: number) => {
  //     // getLocation();

  //     try {
  //       await customAxios
  //         .get("weather-now", {
  //           params: {
  //             lat: lat,
  //             long: lng,
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //           //   setTemp(Math.round(res.data.main.temp));
  //           setTemp(Math.round(res.data.current.temp_f));
  //         });
  //     } catch (error) {
  //       if (isAxiosError(error)) {
  //         // `error` is an AxiosError
  //         console.error("Error message: ", error.message);
  //         console.error("Error message: ", error.code);
  //         if (error.response) {
  //           console.log(error.response);
  //         } else if (error.request) {
  //           // Request was made but no response was received
  //           console.error("Request data:", error.request);
  //         } else {
  //           // Something happened in setting up the request
  //           console.error("Error:", error.message);
  //         }
  //       } else {
  //         // Handle non-Axios errors
  //         console.error("Unexpected error:", error);
  //       }
  //     }
  //   };

  // Fetch the location when the component mounts
  //   useEffect(() => {
  //     getLocation();
  //   }, []);

  return (
    <div className="flex h-[77vh]">
      <div className="flex items-center justify-center w-6/12 text-[40vw]">
        {!dataState.locationData ? (
          <Loading extraName="loading-degree" />
        ) : (
          <img
            src={dataState.locationData.current.condition.icon}
            alt={`${dataState.locationData.current.condition.text}`}
            className="aspect-[3/4] object-contain w-[40vw]"
          />
        )}
      </div>

      <div id="temp" className="w-6/12 text-[16vw]">
        {!dataState.locationData ? (
          <Loading extraName="loading-degree" />
        ) : dataState.celsius ? (
          <>{Math.round(dataState.locationData.current.temp_c)}℃</>
        ) : (
          <>{Math.round(dataState.locationData.current.temp_f)}℉</>
        )}
      </div>
    </div>
  );
};

export default LocationComponent;
