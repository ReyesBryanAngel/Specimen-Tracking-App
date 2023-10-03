import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiButton,
    EuiText
} from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

const SpecimenSubmit = () => {
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
              fontWeight: "bold"
            }}
          >
            Thank You!
          </h4>
          <p
            style={{
              marginTop: "0",
              fontSize: "16px",
            }}
          >
             You have submitted the Specimen Form of <span style={{ fontWeight: "bold" }}>Mercado, Ma. Elizabeth</span>'s child.
            Go to Home Fill Up New Form
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
                Go to Home
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
                navigate("/add-specimen/specimen-form");
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                Fill Up New Form
              </p>
            </EuiButton>
          </div>
        </EuiFlexItem>
      </div>
    </div>
    )
}

export default SpecimenSubmit;