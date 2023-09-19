import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiButton,
  EuiFlexGroup,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import React from "react";

const Dashboard = () => {
  return (
    <div className="main-content">
      <div className="dashboard-container">
        <div className="dashboard-title-container">
          <p className="title">Hello, The Medical City!</p>
          <p>
            You have <strong>23</strong> New Results
          </p>
        </div>
        <EuiFlexGrid
          responsive={false}
          gutterSize="s"
          columns={2}
          className="cards-container"
        >
          <EuiFlexItem grow={false}>
            <EuiPanel
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                padding: "7.5px",
              }}
            >
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiText>
                    <h4 style={{ marginTop: "0" }}>
                      <strong>45</strong>
                    </h4>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiText size="xs">
                    <p style={{ marginTop: "0", fontSize: "10px" }}>Patients</p>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    size="xs"
                    style={{
                      borderRadius: "2.813px",
                      fontSize: "8px",
                      color: "#01B5AC",
                      backgroundColor: "#B2E8E6",
                      border: "0px",
                    }}
                  >
                    Go to Patients
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiPanel
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                padding: "7.5px",
              }}
            >
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiText>
                    <h4 style={{ marginTop: "0" }}>
                      <strong>23</strong>
                    </h4>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiText size="xs">
                    <p style={{ marginTop: "0", fontSize: "10px" }}>
                      New Results
                    </p>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    size="xs"
                    style={{
                      borderRadius: "2.813px",
                      fontSize: "8px",
                      color: "#00726B",
                      backgroundColor: "#00BFB333",
                      border: "0px",
                    }}
                  >
                    Go to Results
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiPanel
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                padding: "7.5px",
              }}
            >
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiText>
                    <h4 style={{ marginTop: "0" }}>
                      <strong>5</strong>
                    </h4>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiText size="xs">
                    <p style={{ marginTop: "0", fontSize: "10px" }}>
                      New Positive Results
                    </p>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    size="xs"
                    style={{
                      borderRadius: "2.813px",
                      fontSize: "8px",
                      color: "#B4251D",
                      backgroundColor: "#BD271E33",
                      border: "0px",
                    }}
                  >
                    Go to Positive Results
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiPanel
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                padding: "7.5px",
              }}
            >
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiText>
                    <h4 style={{ marginTop: "0" }}>
                      <strong>5</strong>
                    </h4>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiText size="xs">
                    <p style={{ marginTop: "0", fontSize: "10px" }}>
                      New Inadequate Results
                    </p>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    size="xs"
                    style={{
                      borderRadius: "2.813px",
                      fontSize: "8px",
                      color: "#8C5F00",
                      backgroundColor: "#F5A70033",
                      border: "0px",
                    }}
                  >
                    Go to Inadequate Results
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGrid>
      </div>
    </div>
  );
};

export default Dashboard;
