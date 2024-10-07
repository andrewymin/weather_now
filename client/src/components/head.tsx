// import { useState, useEffect } from "react";
import { useData } from "@/context/dataContext";
import { Button } from "@/components/ui/button";
import SearchLocal from "./searchLocal";
import Loading from "./loading";

function Head() {
  const { dataState, dispatch } = useData();

  const changeTempScale = () => {
    dispatch({ type: "CELSIUS" });
  };

  return (
    <nav className="flex justify-between items-center bg-gradient-to-b from-thirty from-65% p-6 top-0 left-0 w-full xs:p-4">
      <h1
        id="brand"
        className="text-3xl font-bold text-center xs:!text-[1.5rem] xs:leading-8"
      >
        Weather <br /> Now
      </h1>
      <div className="flex items-center gap-8 xs:flex-col">
        <SearchLocal />
        <h2 className="font-semibold xs:absolute xs:top-20">
          {!dataState.locationData ? (
            <Loading extraName="local-name" />
          ) : (
            <div className="text-center">
              {dataState.locationData.location.name}
              <br />
              {dataState.locationData.location.region}
            </div>
          )}
        </h2>
        <Button
          onClick={changeTempScale}
          className="bg-ten text-slate-950 hover:text-white hover:bg-darkerBlue xs:absolute xs:top-20 xs:right-[.6rem]"
        >
          ℃/℉
        </Button>
        {/* Save temp. scale type in localstorage, default is ℉ */}
      </div>
    </nav>
  );
}

export default Head;
