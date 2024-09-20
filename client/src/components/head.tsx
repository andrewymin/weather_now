import { Button } from "@/components/ui/button";

const getLocation = () => {
  alert("change current location");
};

const switchTempScale = () => {
  alert("change temp scale");
};

function Head() {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-b from-thirty from-65% p-6 top-0 left-0 w-full">
      <h1 id="brand" className="text-3xl font-bold text-center">
        Weather <br /> Now
      </h1>
      <div className="flex items-center gap-8">
        <Button
          onClick={getLocation}
          className="bg-ten text-slate-950 hover:text-white hover:bg-darkerBlue"
        >
          Location
        </Button>
        <h2 className="font-semibold">Aurora, CO</h2>
        <Button
          onClick={switchTempScale}
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
