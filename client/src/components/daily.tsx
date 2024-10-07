import { useData } from "@/context/dataContext";
import Loading from "./loading";

// const test = [
//   {
//     invoice: "10",
//     paymentStatus: "Clear",
//     paymentMethod: "70℉",
//   },
//   {
//     invoice: "11",
//     paymentStatus: "Pending",
//     paymentMethod: "75℉",
//   },
//   {
//     invoice: "12",
//     paymentStatus: "Clear",
//     paymentMethod: "65℉",
//   },
// ];

const d = new Date();
const currentDay: number = d.getDate();

function Daily() {
  const { dataState } = useData();

  return (
    <section id="days" className="flex justify-center">
      <div className="w-[70%] m-12 text-center">
        <div className="grid grid-cols-3 py-6 border-b-2 hover:bg-darkerBlue rounded-t-[7px]">
          <h1 className="font-bold xs:!text-[.85]">Day</h1>
          <h1 className="font-bold xs:!text-[.85]">
            Weather
            <br />
            Condition
          </h1>
          <h1 className="font-bold xs:!text-[.85]">Max Temp.</h1>
        </div>
        {!dataState.locationData ? (
          <>
            <Loading extraName="hourly-day m-auto" />
          </>
        ) : (
          <>
            {dataState.dailyData.map((d: any, i: number) => (
              <div
                key={i}
                className="grid grid-cols-3 py-6 border-b-2 hover:bg-darkerBlue last:rounded-b-[7px] last:border-none"
              >
                <div className="m-auto text-5xl xs:!text-[2.1rem]">
                  {parseInt(d.date.split("-")[2]) == currentDay
                    ? "Today"
                    : d.date.split("-")[2]}
                </div>
                <img
                  className="m-auto"
                  src={d.day.condition.icon}
                  alt={d.day.condition.text}
                  width={100}
                  height={100}
                />
                {dataState.celsius ? (
                  <div className="m-auto text-5xl xs:!text-[2.1rem]">
                    {Math.round(d.day.maxtemp_c)}℃
                  </div>
                ) : (
                  <div className="m-auto text-5xl xs:!text-[2.1rem]">
                    {Math.round(d.day.maxtemp_f)}℉
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Daily;
