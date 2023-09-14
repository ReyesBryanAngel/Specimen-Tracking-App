import React from "react";
import { EuiPanel } from "@elastic/eui";

const Articles = () => {
  const { REACT_APP_ADS_URL } = process.env;
  const adsUrl = REACT_APP_ADS_URL;
  return (
    <div className="info-container">
      <div className="title">Articles</div>
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

export default Articles;
