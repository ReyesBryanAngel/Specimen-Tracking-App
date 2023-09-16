import React from "react";
import Announcement from "./components/Announcement";
import Articles from "./components/Articles";
import Partners from "./components/Partners";

const Home = () => {
  //return <div>Home</div>;
  return (
    <div className="main-content">
      <div className="home-container">
        <Announcement />
        <Articles />
        <Partners />
      </div>
    </div>
  );
};

export default Home;
