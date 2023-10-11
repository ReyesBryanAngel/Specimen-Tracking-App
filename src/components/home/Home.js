import React from "react";
import Announcement from "./components/Announcement";
import Articles from "./components/Articles";
import Partners from "./components/Partners";
import { AddSpecimenButton } from "../../components/add-specimen/AddSpecimenButton";

const Home = () => {
  //return <div>Home</div>;
  return (
    <div className="main-content">
      <div className="home-container">
        <Announcement />
        <Articles />
        <Partners />
        <AddSpecimenButton />
      </div>
    </div>
  );
};

export default Home;
