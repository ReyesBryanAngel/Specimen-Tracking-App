import React, { useState, useEffect } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiCheckbox,
    EuiButton,
    EuiCallOut,
    EuiIcon
} from "@elastic/eui";
import patients from '../../config/patients';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import ApiCall from '../../util/authentication/ApiCall';
import { useData } from '../../context/DataProvider';


const ReviewSamples = () => {
    const navigate = useNavigate();
    const { specimenData, dispatch } = useData();
    const { http } = ApiCall();
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [specimenLoad, setSpecimenLoad] = useState(false);
    const [pendingSamples, setPendingSamples] = useState([]);

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
                    return res?.data;
                })
    })

    const [isCheckedList, setIsCheckedList] = useState([]);

    const clostModal  = () => {
        setModal(false);
    }

    const onCheckboxChange = (index) => {
      const newIsCheckedList = [...isCheckedList];
      newIsCheckedList[index] = !newIsCheckedList[index];
      setIsCheckedList(newIsCheckedList);
    }

    const logCourierInformation  = () => {
        const filteredData = pendingSamples.map((patient, index) => ({
            ...patient,
            checked: isCheckedList[index],
          }));
        http.post('/v1/specimens/update-checked', filteredData)
        .then((res) => {
            if (res?.data?.status === 200) {
            navigate("/courier-information")
            dispatch({ type: 'CATCH', payload: filteredData });
            }
        })
        .catch((e) => {
            setModal(true);
            setError(e.response?.data?.message);            
        });
    }

    useEffect(() => {
        if (!isLoading && data) {
            const filteredSamples = data.filter(patient => patient.specimen_status === "Pending");
            setPendingSamples(filteredSamples);
            const initialCheckedList = filteredSamples.map((patient) => patient.checked);
            setIsCheckedList(initialCheckedList);
        }
      }, [data, isLoading]);

    return (
        <div className="main-content">
             {modal && (
                <div 
                    style={{ 
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -290%)',
                        height: '90px',
                        width: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent:"center",
                        textAlign:"center"
                    }}
                >
                    <EuiCallOut color="danger" style={{ position:"relative" }}>
                        <EuiIcon type="error" size="m" style={{ position:"absolute", top: 6, right: 7 }} onClick={clostModal} />
                        {<p style={{ paddingBottom:"20px", color: "#BD271E" }}>{error}</p>}
                    </EuiCallOut>
                </div>
            )}
            <div className="home-container">
                
                {!isLoading && data ? (
                    <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                    <div style={{ lineHeight: "10px", marginLeft: "15px", marginTop:"10px" }}>
                        <h2>Review Samples</h2>
                        <span>You are about to send blank samples</span>
                    </div>  
                    <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop:"20px", paddingBottom: "35px"}}>
                            {pendingSamples.map((patient, index) => {
                                const { format } = require('date-fns');
                                const dateOfBirth = new Date(patient.date_and_time_of_birth);
                                const formattedDate = format(dateOfBirth, "MMMM dd, yyyy");
                                const mother = `${patient.baby_last_name}, ${patient.mothers_first_name}`;
                                return (
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
                                            <h4>{mother}</h4>
                                        </div>
                                        
                                    </div>
                                    <div className="flex-row">
                                            <div className="flex-col">
                                                <span style={{ fontSize: "14px"}}>Birthday</span>
                                                <EuiText style={{ fontSize: "16px" }}>{formattedDate}</EuiText>
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
                                )
                            })}
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
                                    
                                    onClick={logCourierInformation}
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
                ) : <div>Loading...</div>}
            </div>
        </div>
    )
}

export default ReviewSamples;