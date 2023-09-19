import { EuiButton, EuiFlexItem, EuiPanel, EuiText } from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

const ScanBarcode = () => {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <div
        className="barcode-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <EuiText>
          <h4
            style={{
              marginTop: "0",
              marginBottom: "0",
              fontSize: "20px",
            }}
          >
            Scan Barcode
          </h4>
          <p
            style={{
              marginTop: "0",
              fontSize: "16px",
            }}
          >
            Please scan the barcode of the physical specimen form.
          </p>
        </EuiText>
        <EuiFlexItem
          style={{
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "20px",
              borderTop: "1px solid #D3D3D3",
            }}
          >
            <EuiButton
              style={{
                borderRadius: "2.813px",
                fontSize: "8px",
                color: "#000000",
                backgroundColor: "#69707D33",
                border: "0px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                Go Home
              </p>
            </EuiButton>
            <EuiButton
              style={{
                borderRadius: "2.813px",
                fontSize: "8px",
                color: "#FFFFFF",
                backgroundColor: "#01B5AC",
                border: "0px",
              }}
              onClick={() => {
                navigate("/specimen-form");
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                Scan Barcode
              </p>
            </EuiButton>
          </div>
        </EuiFlexItem>
      </div>
    </div>
  );
};

export default ScanBarcode;
