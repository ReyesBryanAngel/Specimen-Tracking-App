import React, { useEffect, useState } from "react";
import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiButton,
  EuiFlexGroup,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import ApiCall from "../../util/authentication/ApiCall";
import { useQuery } from "@tanstack/react-query";
import { AddSpecimenButton } from "../../components/add-specimen/AddSpecimenButton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [specimenLoad, setSpecimenLoad] = useState(false);
  const { http } = ApiCall();
  const [samples, setSamples] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["specimen"],
    enabled: !specimenLoad,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    queryFn: () =>
        http
          .get(`v1/specimens/all-samples`)
          .then((res) => {
              setSpecimenLoad(true);
              const pendingSample = res?.data?.filter(s => s.specimen_status === "Pending");
              setSamples(pendingSample);
              return res?.data;
        })
  })

  useEffect(() => {
    const pendingSample = data?.filter(s => s.specimen_status === "Pending");
    setSamples(pendingSample);
  }, [data])

  return (
    <div className="main-content">
      {!isLoading && data ? (
          <>
            <div className="dashboard-title-container">
              <div style={{ padding: "10px" }}>
              <EuiText className="title">Hello, The Medical City!</EuiText>
              </div>
            </div>
            <EuiFlexGrid
              responsive={false}
              gutterSize="m"
              columns={1}
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
                    <EuiFlexGroup gutterSize="l">
                      <EuiFlexItem grow={false}>
                        <EuiText>
                          <h4 style={{ marginTop: "0", fontSize: "20px" }}>
                            <strong>{samples?.length}</strong>
                          </h4>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiText size="l">
                          <p style={{ marginTop: "0", fontSize: "16px" }}>Unsent Samples</p>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiButton
                          onClick={() => {
                            navigate("/courier")
                          }}
                          size="m"
                          style={{
                            borderRadius: "2.813px",
                            fontSize: "16px",
                            color: "#01B5AC",
                            backgroundColor: "#B2E8E6",
                            border: "0px",
                          }}
                        >
                          Go to Courier
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
                    <EuiFlexGroup gutterSize="l">
                      <EuiFlexItem grow={false}>
                        <EuiText>
                          <h4 style={{ marginTop: "0" }}>
                            <strong>23</strong>
                          </h4>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiText size="xs">
                          <p style={{ marginTop: "0", fontSize: "16px" }}>
                            New Results
                          </p>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiButton
                           onClick={() => {
                            navigate("/results")
                          }}
                          size="m"
                          style={{
                            borderRadius: "2.813px",
                            fontSize: "16px",
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
                    <EuiFlexGroup gutterSize="l">
                      <EuiFlexItem grow={false}>
                        <EuiText>
                          <h4 style={{ marginTop: "0" }}>
                            <strong>5</strong>
                          </h4>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiText size="xs">
                          <p style={{ marginTop: "0", fontSize: "16px" }}>
                            New Elavated Results
                          </p>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiButton
                          size="m"
                          style={{
                            borderRadius: "2.813px",
                            fontSize: "16px",
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
                    <EuiFlexGroup gutterSize="l">
                      <EuiFlexItem grow={false}>
                        <EuiText>
                          <h4 style={{ marginTop: "0" }}>
                            <strong>5</strong>
                          </h4>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiText size="xs">
                          <p style={{ marginTop: "0", fontSize: "16px" }}>
                            New Inadequate Results
                          </p>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiButton
                          size="m"
                          style={{
                            borderRadius: "2.813px",
                            fontSize: "16px",
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
            <AddSpecimenButton />
            </>
          ) : <div>Loading...</div>}
    </div>
  );
};

export default Dashboard;
