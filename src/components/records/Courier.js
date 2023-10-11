import React, {useEffect, useState} from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiButton,
    EuiPopover,
    EuiButtonEmpty,
    EuiListGroup,
} from "@elastic/eui";
import courier from '../../config/courier';
import { useNavigate } from "react-router-dom";


const Courier = () => {
    const navigate = useNavigate();
    const [unsent, setUnsent] = useState([]);
    const [resultSetter, setresultSetter] = useState([...courier]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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

    useEffect (() => {
        const receivedStatuses = courier
        .map((data) => data.status)
        .filter((status) => status === 'received');

        setUnsent([...receivedStatuses]);
    }, [courier])


    return (
        <div className="main-content">
            <div className="home-container">
                <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
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
                    <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                        {resultSetter.map((couriers, index) => (
                            <EuiCard
                                style={{ width: '85%' }}
                                key={index}
                                textAlign="left"
                            >
                                <h4>{couriers.courier}</h4>
                                <div className="flex-row">
                                        <div className="flex-col">
                                            <span style={{ fontSize: "14px"}}>Date of Pick up</span>
                                            <EuiText style={{ fontSize: "16px" }}>{couriers.date_of_pickup}</EuiText>
                                        </div>
                                        <div className="flex-col">
                                            <span style={{ fontSize: "14px"}}>Samples</span>
                                            <EuiText style={{ fontSize: "16px" }}>{couriers.samples}</EuiText>
                                        </div>
                                        <div className="flex-col">
                                            <span style={{ fontSize: "14px"}}>Results</span>
                                            <EuiText style={{ fontSize: "16px" }}>{couriers.status}</EuiText>
                                        </div>
                                    </div>
                            </EuiCard>
                        ))}
                    </EuiFlexItem>
                </EuiFlexGroup>
                <div
                    className="bottom-bar"
                >
                    <div>
                        <h4>You have {unsent.length} unsent samples</h4>
                    </div>   
                    <EuiButton
                        style={{
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
            </div>
        </div>
    )
}

export default Courier;