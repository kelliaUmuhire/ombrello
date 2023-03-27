import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cloud from "./assets/cloud.png";
import Person from "./assets/person.png";
import Form from "./components/Form";

function App() {
  useEffect(() => {
    for (let i = 0; i < 150; i++) {
      let drop = document.createElement("div");
      drop.classList.add("raindrop");
      let doc = document.getElementById("rainContainer");
      if (doc) {
        doc.appendChild(drop);
        drop.style.left = Math.random() * doc.offsetWidth + "px";
        drop.style.animationDelay = Math.random() * 4 + "s";
      }
    }
  }, []);
  return (
    <div className="text-white font-karla">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between w-full py-8 h-full md:pr-4">
        <div className="md:w-1/2 w-full flex flex-col items-center relative justify-between">
          <img src={Cloud} className="w-3/5 z-10" />
          <div
            id="rainContainer"
            className="absolute w-1/2 h-full overflow-hidden"
          ></div>
          <img src={Person} className="w-3/5" />
        </div>
        <div className="md:w-1/2 w-full md:mt-0 mt-16 flex flex-col items-center">
          <div className="text-xl mb-5">Raining hard?</div>
          <div className="font-old text-5xl mb-7 text-center">
            Get Yourself An Umbrella!
          </div>
          <Form />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
