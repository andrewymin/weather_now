import { useData } from "@/context/dataContext";
import Loading from "./loading";

const invoices = [
  {
    invoice: "10",
    paymentStatus: "Clear",
    paymentMethod: "70℉",
  },
  {
    invoice: "11",
    paymentStatus: "Pending",
    paymentMethod: "75℉",
  },
  {
    invoice: "12",
    paymentStatus: "Clear",
    paymentMethod: "65℉",
  },
];

function Daily() {
  const { dataState } = useData();

  return (
    <section id="days" className="flex justify-center">
      <div className="w-[70%] m-12 text-center">
        <div className="grid grid-cols-3 py-6 border-b-2 hover:bg-darkerBlue rounded-t-[7px]">
          <h1 className="font-bold">Day</h1>
          <h1 className="font-bold">Weather</h1>
          <h1 className="font-bold">Tempature</h1>
        </div>
        {!dataState.locationData ? (
          <>
            {invoices.map((day, i) => (
              <div
                key={i}
                className="grid grid-cols-3 py-6 border-b-2 hover:bg-darkerBlue last:rounded-b-[7px] last:border-none"
              >
                <div>
                  <Loading extraName="hourly-day m-auto" />
                </div>
                <div>
                  <Loading extraName="hourly-day m-auto" />
                </div>
                <div>
                  <Loading extraName="hourly-day m-auto" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {dataState.dailyData.map((d: any, i: number) => (
              <div
                key={i}
                className="grid grid-cols-3 py-6 border-b-2 hover:bg-darkerBlue last:rounded-b-[7px] last:border-none"
              >
                <div>{d.date.split("-")[2]}</div>
                <img
                  className="m-auto"
                  src={d.day.condition.icon}
                  alt={d.day.condition.text}
                  width={100}
                  height={100}
                />
                {dataState.celsius ? (
                  <div>{Math.round(d.day.maxtemp_c)}℃</div>
                ) : (
                  <div>{Math.round(d.day.maxtemp_f)}℉</div>
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
