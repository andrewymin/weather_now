const d = new Date();
let year = d.getFullYear();

function Foot() {
  return (
    <footer className="bg-ten text-black">
      <section className="flex justify-around p-8 text-center xs:p-[1.5rem]">
        <h1 id="brand" className="text-5xl flex-1 m-auto xs:!text-[1.5rem]">
          Weather
          <br />
          Now
        </h1>
        <div className="flex-1 text-center">
          <h1 className="border-b-2 border-darkerBlue w-fit m-auto weather-font tracking-[1px]">
            MENU
          </h1>
          <h2 className="my-4">Location</h2>
          <h2>About Us</h2>
        </div>
        <div className="flex-1">
          <h1 className="border-b-2 border-darkerBlue w-fit m-auto weather-font tracking-[1px]">
            CONNECT
          </h1>
          <a href="https://www.yoongimin.com" className="block mt-4">
            Contact Us
          </a>
        </div>
      </section>
      <div className="grid grid-cols-3 text-center pt-12 pb-4 text-xs">
        <div> </div>
        <h5>©{year}. Weather Now</h5>
        <div className="xs:!text-[0.6rem]">DESIGNED BY ANDREW</div>
      </div>
    </footer>
  );
}

export default Foot;
