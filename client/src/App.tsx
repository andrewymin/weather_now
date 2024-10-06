import LocationComponent from "./components/location";
import Head from "./components/head";
import Hourly from "./components/hourly";
import Daily from "./components/daily";
import Foot from "./components/foot";
import { DataProvider } from "./context/dataContext";
// import { Suspense } from "react";
// import Loading from "./components/loading";

function App() {
  return (
    <div className="bg-thirty">
      <DataProvider>
        <Head />
        {/* <Local formRef={handleFormRef} /> // don't need this once updated since will use users location or default location if denied*/}
        <LocationComponent />
        <Hourly />
        <Daily />
        <Foot />
      </DataProvider>
    </div>
  );
}

export default App;
