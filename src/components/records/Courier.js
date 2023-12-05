import React, { useState } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiText,
    EuiButton,
    EuiPopover,
    EuiButtonEmpty,
    EuiListGroup,
    EuiImage
} from "@elastic/eui";
import courier from '../../config/courier';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ApiCall from '../../util/authentication/ApiCall';
import { useData } from '../../context/DataProvider';
import emptyCourier from '../../util/images/no_couriers.png';


const Courier = () => {
    const navigate = useNavigate();
    const { http } = ApiCall();
    const { specimenData, dispatch } = useData();
    const [pendingSpecimens, setPendingSpecimens] = useState([]);
    const [sentSpecimens, setSentSpecimens] = useState([]);
    const [resultSetter, setresultSetter] = useState([...courier]);
    const [courierTrackingNumber, setCourierTrackingNumber] = useState({courier: "", tracking_number: ""})
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [samplesHolder, setSamplesHolder] = useState([]);
    const [specimenLoad, setSpecimenLoad] = useState(false);

    const items = [
        {
            label: (
                <span onClick={() => sortByBirthday()}>
                    Date of Pickup
                </span>
                ),
        }
    ];

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const sortByBirthday = () => {
        const sortedResults = [...courier].sort((a, b) => {
            const dateA = new Date(a.date_of_pickup);
            const dateB = new Date(b.date_of_pickup);
            return dateA - dateB;
        });
        setresultSetter(sortedResults);
        closePopover();
    };

    const sortBySent= () => {
        const SentSorter = courier.filter((c) => c.status === "sent");

        setresultSetter(SentSorter);
        closePopover();
    };

    const sortByReceived = () => {
        const receivedSorter = courier.filter((r) => r.status === "received");

        setresultSetter(receivedSorter);
        closePopover();
    };

    const { data: allSamples, isLoading: allSampleLoading } = useQuery({
        queryKey: ["sample"],
        enabled: !specimenLoad,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        queryFn: () =>
            http
                .get(`v1/specimens/all-samples`)
                .then((res) => {
                    setSpecimenLoad(true);

                    const pendingSamples = res?.data?.filter((patient) => patient.specimen_status === "Pending");
                    const sentSamples = res?.data?.filter((patient) => patient.specimen_status === "In Transit");
                    setPendingSpecimens(pendingSamples);
                    setSentSpecimens(sentSamples);
                    return res?.data;
                })
    })

    const { data: couriers, isLoading: courierLoading } = useQuery({
        queryKey: ["courier"],
        enabled: !specimenLoad,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        queryFn: () =>
            http
                .get(`v1/specimens/show-couriers`)
                .then((res) => {
                    setSpecimenLoad(true);
                    return res?.data;
                })
    })

    const showCourierSample = async (trackingNumber) => {
        try {
            const res = await http.get(`/v1/specimens/courier-sample/${trackingNumber}`);
            if (res?.data?.status === 200) {
                navigate("/courier-sample");
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    const returnJsx  = !allSampleLoading && allSamples && !courierLoading && couriers
    const conditionalClassName = allSamples?.length > 0 ? "main-content" : "login-content"
    return (
        <div className={conditionalClassName}>
            {couriers?.length === 0 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems:"center", textAlign:"center" }}>
                    <div>
                        <EuiImage
                            size="l"
                            src={emptyCourier}
                        />
                    </div>
                    <div>
                        <EuiText size='m' style={{ fontSize:"20px", fontWeight:"500" }}>You have no Courier Batches</EuiText>
                        <EuiText size='s'>Fill up a Specimen Form to add Patients to send via Courier.</EuiText>
                    </div>     
                </div>
            )}
            {returnJsx ? (
                <div className="home-container">
                    <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                        {couriers?.length !== 0 && (
                             <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "20px", marginTop: "20px"}}>
                                <div>
                                    <h5
                                        style={{
                                        marginTop: "0",
                                        marginBottom: "0",
                                        fontSize: "20px"
                                        }}
                                    >
                                    Courier
                                    </h5>
                                </div>
                                <div style={{ marginTop: "50px"}}>
                                    <div style={{ display: "flex"}}>
                                        <EuiButtonEmpty
                                            size="s"
                                            iconSide="right"
                                            onClick={sortBySent}
                                            style={{ textDecoration:"none", color:"black",  backgroundColor: "transparent"}}
                                        >
                                            Sent
                                        </EuiButtonEmpty>
                                        <EuiButtonEmpty
                                            size="s"                                  
                                            iconSide="right"
                                            onClick={sortByReceived}
                                            style={{ textDecoration:"none", color:"black",  backgroundColor: "transparent"}}
                                        >
                                            Received
                                        </EuiButtonEmpty>
                                        <EuiPopover
                                            id="dropdownButtonExample"
                                            ownFocus
                                            button={
                                                <EuiButtonEmpty
                                                    size="s"
                                                    iconType="arrowDown"
                                                    iconSide="right"
                                                    onClick={togglePopover}
                                                    style={{ textDecoration:"none", color:"black",  backgroundColor: "transparent"}}
                                                >
                                                Sort by
                                                </EuiButtonEmpty>
                                            }
                                            isOpen={isPopoverOpen}
                                            closePopover={closePopover}
                                            panelPaddingSize="none"
                                        >
                                        <EuiListGroup
                                            listItems={items}
                                            maxWidth="none"
                                            color="black"
                                            gutterSize="s"
                                            className="custom-eui-pagination"
                                        />
                                        </EuiPopover>
                                    </div>
                                </div>
                             </div>
                        )}
                       
                        <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                            {couriers.map((c, index) => {
                                const { format } = require('date-fns');
                                const dateOfPickup = new Date(c.date_of_pickup);
                                const formattedDate = format(dateOfPickup, "MMMM dd, yyyy");                           
                                const track = `${c.courier}-${c.tracking_number}`;
                                const countMatchingSamples = (trackingNumber) => {
                                    return sentSpecimens?.filter(sample => sample.tracking_number === trackingNumber).length;
                                };
                                const matchingSampleCount = countMatchingSamples(c.tracking_number);
                                return (
                                    <EuiButton
                                        key={index}
                                        textAlign="left"
                                        onClick={() => {
                                            showCourierSample(c.tracking_number)
                                        }}
                                        style={{ 
                                            width: '90%',
                                            paddingBottom: "20px", 
                                            height: '100%', 
                                            backgroundColor: "#fff",
                                            textDecoration:"none",
                                            color: "black",
                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                            boxShadow: '0px 4px 8px -6px rgba(0, 0, 0, 0.8)',
                                        }}
                                        
                                    >
                                        <div className="flex-col">
                                            <div style={{ textAlign: "left" }}>
                                                <h4 style={{ alignSelf: "self-start" }}>{track}</h4>
                                            </div>
                                        
                                            <div className="flex-row">
                                                    <div className="flex-col">
                                                        <span style={{ fontSize: "14px"}}>Date of Pick up</span>
                                                        <EuiText style={{ fontSize: "16px" }}>{formattedDate}</EuiText>
                                                    </div>
                                                    <div className="flex-col">
                                                        <span style={{ fontSize: "14px"}}>Samples</span>
                                                        <EuiText style={{ fontSize: "16px" }}>{matchingSampleCount}</EuiText>
                                                    </div>
                                                    <div className="flex-col">
                                                        <span style={{ fontSize: "14px"}}>Results</span>
                                                        <EuiText style={{ fontSize: "16px" }}>{c.result}</EuiText>
                                                    </div>
                                            </div>
                                        </div>
                                    </EuiButton>
                                )
                            })}
                            
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    {pendingSpecimens.length > 0 && (
                        <div
                            className="courier-samples-button"
                        >
                            <div>
                                <h4 style={{ margin: "0 0 5px 0"}}>You have {pendingSpecimens?.length} unsent samples</h4>
                            </div>                          
                            <EuiButton
                                style={{
                                textDecoration: "none",
                                borderRadius: "2.813px",
                                width: "80%",
                                color: "#FFFFFF",
                                backgroundColor: "#01B5AC",
                                border: "0px",
                                }}
                                
                                onClick={() => {
                                    navigate("/review-samples");
                                }}
                            >
                                Send Samples
                            </EuiButton> 
                        </div>
                    )}
                </div>
                
            ) : couriers?.length !== 0 && <div>Loading...</div>}
        </div>
    )
}

export default Courier;