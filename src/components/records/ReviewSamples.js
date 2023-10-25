import React, { useState } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiCheckbox,
    EuiButton
} from "@elastic/eui";
import patients from '../../config/patients';
import { useNavigate } from 'react-router-dom';


const ReviewSamples = () => {
    const navigate = useNavigate();
    const [isCheckedList, setIsCheckedList] = useState(patients.map(() => true));

    const onCheckboxChange = (index) => {
      const newIsCheckedList = [...isCheckedList];
      newIsCheckedList[index] = !newIsCheckedList[index];
      setIsCheckedList(newIsCheckedList);
    }

    return (
        <div className="main-content">
            <div className="home-container">
                <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                    <div style={{ lineHeight: "10px", marginLeft: "15px", marginTop:"10px" }}>
                        <h2>Review Samples</h2>
                        <span>You are about to send blank samples</span>
                    </div>  
                <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop:"20px", paddingBottom: "35px"}}>
                    {patients.map((patient, index) => (
                            <EuiCard
                                style={{ width: '85%' }}
                                key={index}
                                textAlign="left"
                            >
                                <div style={{ display: "flex", flexWrap: "nowrap",  alignItems: "center" }}>
                                    <EuiCheckbox
                                        id={`checkbox-${index}`}
                                        checked={isCheckedList[index]}
                                        onChange={() => onCheckboxChange(index)}
                                        style={{ background: 'red', border: '2px solid green' }}
                                    />
                                    <div>
                                        <h4>{patient.name}</h4>
                                    </div>
                                    
                                </div>
                                <div className="flex-row">
                                        <div className="flex-col">
                                            <span style={{ fontSize: "14px"}}>Birthday</span>
                                            <EuiText style={{ fontSize: "16px" }}>{patient.birthday}</EuiText>
                                        </div>
                                        <div className="flex-col">
                                            <span style={{ fontSize: "14px"}}>Sex</span>
                                            <EuiText style={{ fontSize: "16px" }}>{patient.sex}</EuiText>
                                        </div>
                                        <div className="flex-col">
                                            <span style={{ fontSize: "14px"}}>Specimen Status</span>
                                            <EuiText style={{ fontSize: "16px" }}>{patient.specimen_status}</EuiText>
                                        </div>
                                    </div>
                            </EuiCard>
                        ))}
                       <div
                            className="bottom-bar"
                            style={{ gap: "10px"  }}
                        >
                            <EuiButton
                                style={{
                                borderRadius: "2.813px",
                                width: "80%",
                                color: "#FFFFFF",
                                backgroundColor: "#01B5AC",
                                border: "0px",
                                textDecoration: "none"
                                }}
                                
                                onClick={() => {
                                    navigate("/courier-information")
                                }}
                            >
                                Input Manual Courier Information
                            </EuiButton>
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
                                    //
                                }}
                            >
                                Book Courier
                            </EuiButton>
                        </div>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        </div>
    )
}

export default ReviewSamples;