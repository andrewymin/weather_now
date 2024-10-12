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
    <nav className="flex justify-between items-center p-6 top-0 left-0 w-full xs:p-4">
      <h1
        id="brand"
        className="text-3xl font-bold text-center xs:!text-[1.5rem] xs:leading-8 xs:mb-auto xs:mt-[.9rem] xs:mr-2"
      >
        Weather <br /> Now
      </h1>
      <div className="flex items-center gap-8 xs:flex-col xs:grid xs:gap-0 xs:mt-4">
        <SearchLocal />
        <h2 className="font-semibold xs:col-start-1 xs:row-start-2 xs:ml-auto">
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
          className="bg-ten text-slate-950 hover:text-white hover:bg-darkerBlue xs:col-start-2 xs:row-start-2 xs:ml-auto xs:p-[10px]"
        >
          ℃/℉
        </Button>
        {/* Save temp. scale type in localstorage, default is ℉ */}
      </div>
    </nav>
  );
}

export default Head;
