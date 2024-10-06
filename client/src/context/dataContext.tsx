import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import { customAxios, isAxiosError } from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// Reducer State TYPE for each state
interface State {
  // React.SetStateAction<undefined> TYPE is used to define a value/function to
  //   pass a new state value or a new state value after updating
  //   locationData: null | SetStateAction<undefined>;
  defaultLocal: { lat: number; long: number };
  locationData: any;
  loading: boolean;
  celsius: boolean | SetStateAction<undefined>;
  hourlyData: any;
  dailyData: any;
  searchLocation: string;
}

export interface HourlyType {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: string;
  condition_png: string;
  condition_code: number;
}

interface AxiosCallFunction {
  (): Promise<void>;
}

// Reducer Action TYPE for each state action
type Action =
  | {
      type: "DEFAULTLOCAL";
    }
  | {
      type: "LOCATIONDATA";
      payload?: SetStateAction<undefined>;
    }
  | {
      type: "HOURLYDATA";
      payload?: HourlyType[];
    }
  | {
      type: "DAILYDATA";
      payload?: any;
    }
  | {
      type: "CELSIUS";
      payload?: SetStateAction<undefined>;
    }
  | { type: "LOADING" }
  | { type: "DONE_LOADING" }
  | { type: "SEARCH_LOCATION"; payload: string };

// Initial value for each state value
const initialState = {
  defaultLocal: { lat: 40.7128, long: -74.006 },
  locationData: null,
  loading: false,
  celsius: false,
  hourlyData: [],
  dailyData: [],
  searchLocation: "",
};

// Type for function that uses Axios inside of it
// interface AxiosCallFunction {
//   (): Promise<void>;
// }

// Type for getTempData with argruments
interface tempDataFunction {
  (lat: number, lng: number): Promise<void>;
}

interface DataContextType {
  dataState: State;
  dispatch: Dispatch<Action>;
  getTempData: tempDataFunction;
  // This is a function type for when there is no arguments and no return value
  getHourlyData: () => void;
  getLocationWeather: AxiosCallFunction;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// this fucntion makes sure that that the context exists in the Provider
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within an DataProvider");
  }
  return context;
};

// Reducer function with types for that state and action
const reducer = (dataState: State, action: Action): State => {
  switch (action.type) {
    case "LOCATIONDATA":
      return { ...dataState, locationData: action.payload };
    case "HOURLYDATA":
      return { ...dataState, hourlyData: action.payload };
    case "DAILYDATA":
      return { ...dataState, dailyData: action.payload };
    case "CELSIUS":
      return { ...dataState, celsius: !dataState.celsius };
    case "LOADING":
      return { ...dataState, loading: true };
    case "DONE_LOADING":
      return { ...dataState, loading: false };
    case "SEARCH_LOCATION":
      return { ...dataState, searchLocation: action.payload };
    default:
      return dataState;
  }
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dataState, dispatch] = useReducer(reducer, initialState);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Sending coords to getTemp to be sent to backend
          getTempData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.log(err);
          // Send default coords if error getting exact location
          getTempData(dataState.defaultLocal.lat, dataState.defaultLocal.long);
        }
      );
    }
  };

  const getHourlyData = () => {
    // Data for the next 3 days including the current day
    const dailyData = dataState.locationData?.forecast.forecastday;
    // Get all hourly data from the current day in an array in 24hr time, (0-23 is the hours and index)
    const currentDayHoursArray: any[] = dailyData[0].hour;
    // Get all hourly data from the current day in an array in 24hr time, (0-23 is the hours and index)
    const nextDayHoursArray: any[] = dailyData[1].hour;

    const hourlyArray: HourlyType[] = [];

    // Getting current hour of when user asked for weather in 24hr time
    const currentHour = parseInt(
      dataState.locationData?.location.localtime.split(" ")[1].split(":")[0]
    );

    // For a 24hr period must access next day, thus loop through current starting
    //   at current hour and loop through next day ending at current hour
    const setHourlyData = (
      dayArray: any[],
      start = 0,
      end: number = dayArray.length - 1
    ) => {
      dayArray.slice(start, end).forEach((hour: any) => {
        let thatHour = hour.time.split(" ")[1].split(":")[0];
        if (thatHour > 12) thatHour = thatHour - 12 + "pm";
        if (thatHour < 12 && thatHour != 0)
          thatHour = parseInt(thatHour) + "am";
        if (thatHour == 12) thatHour = thatHour + "pm";
        if (thatHour == 0o0) thatHour = 12 + "am";
        // console.log(typeof thatHour);
        hourlyArray.push({
          time: thatHour,
          temp_c: hour.temp_c,
          temp_f: hour.temp_f,
          condition: hour.condition.text,
          condition_png: hour.condition.icon,
          condition_code: hour.condition.code,
        });
      });
    };

    setHourlyData(currentDayHoursArray, currentHour);
    setHourlyData(nextDayHoursArray, 0, currentHour);
    // currentDayHoursArray.slice(currentHour).forEach((hour) => {
    //   let thatHour = hour.time.split(" ")[1].split(":")[0];
    //   if (thatHour > 12) thatHour = thatHour - 12 + "pm";
    //   if (thatHour < 12 && thatHour != 0) thatHour = parseInt(thatHour) + "am";
    //   if (thatHour == 12) thatHour = thatHour + "pm";
    //   if (thatHour == 0o0) thatHour = 12 + "am";
    //   // console.log(typeof thatHour);
    //   hourlyArray.push({
    //     time: thatHour,
    //     temp_c: hour.temp_c,
    //     temp_f: hour.temp_f,
    //     condition: hour.condition.text,
    //     condition_png: hour.condition.icon,
    //     condition_code: hour.condition.code,
    //   });
    // });

    // nextDayHoursArray.slice(0, currentHour).forEach((hour) => {
    //   let thatHour = hour.time.split(" ")[1].split(":")[0];
    //   if (thatHour > 12) thatHour = thatHour - 12 + "pm";
    //   if (thatHour < 12 && thatHour != 0) thatHour = parseInt(thatHour) + "am";
    //   if (thatHour == 12) thatHour = thatHour + "pm";
    //   if (thatHour == 0o0) thatHour = 12 + "am";
    //   hourlyArray.push({
    //     time: thatHour,
    //     temp_c: hour.temp_c,
    //     temp_f: hour.temp_f,
    //     condition: hour.condition.text,
    //     condition_png: hour.condition.icon,
    //     condition_code: hour.condition.code,
    //   });
    // });

    dispatch({ type: "HOURLYDATA", payload: hourlyArray });
  };

  // function to get state data from axios call
  const getTempData = async (lat: number, lng: number) => {
    dispatch({ type: "LOADING" });
    try {
      await customAxios
        .get("weather-now", {
          params: {
            lat: lat,
            long: lng,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          //   setTemp(Math.round(res.data.main.temp));
          dispatch({ type: "LOCATIONDATA", payload: res.data });
          dispatch({
            type: "DAILYDATA",
            payload: res.data.forecast.forecastday,
          });
          dispatch({ type: "DONE_LOADING" });
        }); // TODO add another then for after the states have been updated
    } catch (error) {
      dispatch({ type: "DONE_LOADING" });
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error:", error.message);
        }
      } else {
        // Handle non-Axios errors
        console.error("Unexpected error:", error);
      }
    }
  };

  const getLocationWeather = async () => {
    // console.log(dataState.searchLocation);
    // dispatch({ type: "LOADING" });

    try {
      await customAxios
        .get("weather-now/search-weather-location", {
          params: {
            searchLocation: dataState.searchLocation,
          },
        })
        .then((res) => {
          // console.log(res);
          dispatch({ type: "LOCATIONDATA", payload: res.data });
          dispatch({
            type: "DAILYDATA",
            payload: res.data.forecast.forecastday,
          });
          dispatch({ type: "DONE_LOADING" });
        });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          // Server responded with a status other than 2xx
          // toastify will only work with toastContainer! don't forget
          console.log(error.response.data.errorMsg);
          // showError(error.response.data.errorMsg);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error:", error.message);
        }
      } else {
        // Handle non-Axios errors
        console.error("Unexpected error:", error);
      }
    }
  };

  ////////// UNcomment when done testing
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    // this allows for data to actually work since it's re-rendering
    dataState.locationData && getHourlyData();
  }, [dataState.locationData]);

  return (
    // <DataContext.Provider value={{ dataState, dispatch, intervalId }}>
    <DataContext.Provider
      value={{
        dataState,
        dispatch,
        getTempData,
        getHourlyData,
        getLocationWeather,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
