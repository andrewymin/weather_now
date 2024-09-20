import LocationComponent from "./components/location";
import Head from "./components/head";
import Hourly from "./components/hourly";
import Daily from "./components/daily";
import Foot from "./components/foot";

function App() {
  return (
    <div className="bg-thirty">
      <Head />
      {/* <Local formRef={handleFormRef} /> // don't need this once updated since will use users location or default location if denied*/}
      <LocationComponent />
      <Hourly />
      <Daily />
      <Foot />
    </div>
  );
}

export default App;
