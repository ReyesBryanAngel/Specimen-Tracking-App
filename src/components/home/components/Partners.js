import React from "react";
import { EuiPanel } from "@elastic/eui";

const Partners = () => {
  const { REACT_APP_ADS_URL } = process.env;
  const adsUrl = REACT_APP_ADS_URL;
  return (
    <div className="info-container">
      <div className="title">Partners</div>
      <EuiPanel>
        <iframe
          id="iframe"
          src={adsUrl}
          style={{
            height: "234px",
            width: "100%",
          }}
          title="Advertisement"
        />
      </EuiPanel>
    </div>
  );
};

export default Partners;
