import React from "react";
import { EuiFlexItem } from "@elastic/eui";
import add_icon from "../../assets/add_icon.svg";
import { useNavigate } from "react-router-dom";

export const AddSpecimenButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <EuiFlexItem>
        <div
          className="floating-add-button"
          onClick={() => {
            navigate("/add-specimen");
          }}
          id="rxButton"
          style={{
            backgroundColor: "#1595d3",
          }}
        >
          <img src={add_icon} alt="add_icon" />
        </div>
      </EuiFlexItem>
    </>
  );
};
