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
    <nav className="flex justify-between items-center bg-gradient-to-b from-thirty from-65% p-6 top-0 left-0 w-full">
      <h1 id="brand" className="text-3xl font-bold text-center">
        Weather <br /> Now
      </h1>
      <div className="flex items-center gap-8">
        <SearchLocal />
        <h2 className="font-semibold">
          {!dataState.locationData ? (
            <Loading extraName="local-name" />
          ) : (
            `${dataState.locationData.location.name}, ${dataState.locationData.location.region}`
          )}
        </h2>
        <Button
          onClick={changeTempScale}
          className="bg-ten text-slate-950 hover:text-white hover:bg-darkerBlue"
        >
          ℃/℉
        </Button>
        {/* Save temp. scale type in localstorage, default is ℉ */}
      </div>
    </nav>
  );
}

export default Head;
