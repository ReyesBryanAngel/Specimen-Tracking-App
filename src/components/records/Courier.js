import React from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiButton
} from "@elastic/eui";
import courier from '../../config/courier';


const Courier = () => {
    return (
        <div className="main-content">
            <div className="specimen-form-container">
                <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                    <h5
                        style={{
                        marginTop: "0",
                        marginBottom: "0",
                        fontSize: "20px"
                        }}
                    >
                        Courier
                    </h5>
                    <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                        {courier.map((couriers, index) => (
                            <EuiCard
                                style={{ width: '95%' }}
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
                    <h4>You have {courier.length} unsent samples</h4>
                    <EuiButton
                        style={{
                        borderRadius: "2.813px",
                        width: "80%",
                        color: "#FFFFFF",
                        backgroundColor: "#01B5AC",
                        border: "0px",
                        }}
                        
                        onClick={() => {
                        // Handle button click
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