import { useData } from "@/context/dataContext";
import { useEffect, useRef } from "react";
import Loading from "./loading";
import { HourlyType } from "@/context/dataContext";

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

function Hourly() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { dataState } = useData();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      // Check if the container exists
      if (scrollContainer) {
        // Prevent default vertical scrolling behavior
        e.preventDefault();

        // Scroll horizontally to the right by adding deltaY (vertical wheel scroll value) to scrollLeft
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    // Add the event listener to the container
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // const currentWeatherDate = dataState.locationData.location.localtime;
  // const date = new Date(currentWeatherDate);

  return (
    <div className="flex justify-center items-center w-full border-t-2 ">
      <div
        ref={scrollContainerRef}
        className="whitespace-nowrap flex flex-nowrap w-full p-2 scrollable overflow-x-scroll custom-scrollbar"
      >
        {dataState.hourlyData.map((hour: HourlyType, index: number) => (
          <div key={index} className="m-2 shrink-0 text-center">
            <h1 className="text-[1.8rem]">
              {!dataState.hourlyData ? (
                <Loading extraName="hourly-time m-auto" />
              ) : (
                hour.time
                // "10pm"
              )}
            </h1>
            <div className="overflow-hidden rounded-md flex justify-center ">
              <img
                src={hour.condition_png}
                alt={`${hour.condition}`}
                className="aspect-[3/4] object-cover"
                width={150}
                height={170}
              />
            </div>
            <span className="font-semibold text-[1.8rem]">
              {!dataState.hourlyData ? (
                <Loading extraName="hourly-temp m-auto" />
              ) : dataState.celsius ? (
                <>{Math.round(hour.temp_c)}℃</>
              ) : (
                <>{Math.round(hour.temp_f)}℉</>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hourly;
