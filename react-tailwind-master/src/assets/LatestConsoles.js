import { useEffect } from "react";
import { ConsoleItem } from "./Hottopics";
import axios from "axios";
import Header from "./Header";
import { useState } from "react";
import Footer from "./Footer";
import React from "react";

export default function LatestConsoles() {
  var [consoles, setConsoles] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/showLatest",
    };

    axios(config).then((res) => {
      setConsoles(res.data);
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <div className="mx-4  grid lg:grid-cols-3 gap-2 grid-cols-2">
          {consoles.map((con) => (
            <ConsoleItem con={con} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
