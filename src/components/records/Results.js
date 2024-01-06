import React, { useEffect, useState } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiButton,
    EuiText,
    EuiPopover,
    EuiButtonEmpty,
    EuiListGroup,
    EuiImage
} from "@elastic/eui";
import { useNavigate } from 'react-router-dom';
import emptyResult from '../../util/images/no_result.png';
import { useQuery } from "@tanstack/react-query";
import { AddSpecimenButton } from "../../components/add-specimen/AddSpecimenButton";
import ApiCall from '../../util/authentication/ApiCall';
import { useData } from '../../context/DataProvider';

const Results = () => {
    const navigate = useNavigate();
    const [specimenLoad, setSpecimenLoad] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [normalResult, setNormalResult] = useState([]);
    const [elevatedResult ,setElevatedResult] = useState([]);
    const [inadequateResult,setInadequateResult] = useState([]);
    const { http } = ApiCall();
    const { specimenFiltered, setSpecimenFiltered, goToClicked } = useData();

    const items = [
        {
            label: (
                <span onClick={() => sortByBirthday()}>
                    Birthday
                </span>
                ),
        },
        {
            label: (
                <span onClick={() => showAllFunction()}>
                    Show All
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
                    const specimenWithResults = res?.data?.filter(r => r.result !== null);
                    const filterNormal = res?.data?.filter(n => n.result === "Normal");
                    const filterElevated = res?.data?.filter(n => n.result === "Elevated");
                    const filterInadequate = res?.data?.filter(n => n.result === "Inadequate");
                    setNormalResult(filterNormal);
                    setElevatedResult(filterElevated);
                    setInadequateResult(filterInadequate);
                    if (!goToClicked) {
                        setSpecimenFiltered(specimenWithResults);
                    }

                    return res?.data;
                })
      })
      
    const sortByBirthday = () => {
        const sortedResults = [...data].sort((a, b) => {
            const dateA = new Date(a.date_and_time_of_birth);
            const dateB = new Date(b.date_and_time_of_birth);
            return dateA - dateB;
        });
        setSpecimenFiltered(sortedResults);
        closePopover();
    };

    const showAllFunction = () => {
        const specimenWithResults = data?.filter(r => r.result !== null);
        setSpecimenFiltered([...specimenWithResults]);
        closePopover();
    }

    const sortByNormal = () => {
        const normalResults = data?.filter(r => r.result === "Normal");
        setSpecimenFiltered(normalResults);

        closePopover();
    };

    const sortByElavated = () => {
        const elavatedResult = data.filter((r) => r.result === "Elevated");
        setSpecimenFiltered(elavatedResult);

        closePopover();
    };

    const sortByInAdequate = () => {
        const inadequateResults = data?.filter(r => r.result === "Inadequate");
        setSpecimenFiltered(inadequateResults);

        closePopover();
    };

    const filterIndividualRecord = async (e, index) => {        
        const pending = specimenFiltered.map((s) => ({
            id: s?.id,
            result: s?.result,
            specimen_status: s?.specimen_status,
        }));

        if (pending[index].result !== "Normal") {
            try {
                const res = await http.get(`/v1/specimens/${pending[index].id}`);
                if (res?.data?.status === 200) {
                    navigate("/individual-result");
                }
            } catch (e) {
                console.error(e.response?.data?.message);
            }
            
        }
    }

    useEffect(() => {
        console.log(goToClicked);
    })

    return (
        <div className={"main-content"}>
        <div className="specimen-form-container">
            <div className="specimen-form-content-container">
                {specimenFiltered?.length === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems:"center", textAlign:"center" }}>
                        <div>
                            <EuiImage
                                size="l"
                                src={emptyResult}
                            />
                        </div>
                        <div>
                            <EuiText size='m' style={{ fontSize:"20px", fontWeight:"500" }}>You have no Results</EuiText>
                            <EuiText size='s'>Wait for your NSC to submit patients' Results.</EuiText>
                        </div>     
                    </div>
                )}

                {!isLoading && specimenFiltered?.length !== 0 ? (
                    <>
                        <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                            <div className="flex-col" style={{ width: "100%" }}>
                                <div>
                                    <h5
                                        style={{
                                            marginTop: "0",
                                            marginBottom: "0",
                                            fontSize: "20px"
                                        }}
                                    >
                                        <>Results (by Mother's Name)</>
                                    </h5>
                                </div>
                                <div style={{ marginTop: "10px"}}>
                                    <div style={{ display: "flex"}}>
                                        <EuiButtonEmpty
                                            size="s"
                                            iconSide="right"
                                            onClick={sortByNormal}
                                            style={{ textDecoration:"none", color:"black", fontSize:"13px", backgroundColor: "transparent"}}
                                        >
                                            Normal
                                        </EuiButtonEmpty>
                                        <EuiButtonEmpty
                                            disabled={!elevatedResult?.length > 0}
                                            size="s"                                  
                                            iconSide="right"
                                            onClick={sortByElavated}
                                            style={{ textDecoration:"none", color:"black", fontSize:"13px", backgroundColor: "transparent"}}
                                        >
                                            Elavated
                                        </EuiButtonEmpty>
                                        <EuiButtonEmpty
                                            disabled={!inadequateResult?.length > 0}
                                            size="s"                                   
                                            iconSide="right"
                                            onClick={sortByInAdequate}
                                            style={{ textDecoration:"none", color:"black", fontSize:"13px", backgroundColor: "transparent"}}
                                        >
                                            Inadequate
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
                                                    style={{ textDecoration:"none", color:"black", fontSize:"13px", backgroundColor: "transparent"}}
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
                                            gutterSize="s"
                                            className="custom-eui-pagination"
                                        />
                                        </EuiPopover>
                                    </div>
                                </div>
                            </div>
                            <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
                                {specimenFiltered.map((patient, index) => {
                                    const { format } = require('date-fns');
                                    const dateOfBirth = new Date(patient.date_and_time_of_birth);
                                    const formattedDate = format(dateOfBirth, "MMMM dd, yyyy");
                                    const mother = `${patient.baby_last_name}, ${patient.mothers_first_name}`;
                                    return (
                                        <EuiButton
                                            onClick={(e) => filterIndividualRecord(e, index)}
                                            style={{ 
                                                width: '100%',
                                                paddingBottom: "20px", 
                                                height: '100%', 
                                                backgroundColor: "#fff",
                                                textDecoration:"none",
                                                color: "black",
                                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                                boxShadow: '0px 4px 8px -6px rgba(0, 0, 0, 0.8)',
                                            }}
                                            key={index}
                                            textAlign="left"
                                        >
                                            <div className="flex-col">
                                                <div style={{ textAlign: "left" }}>
                                                    <h4 style={{ alignSelf: "self-start" }}>{mother}</h4>
                                                </div>
                                                <div className="flex-row">
                                                    <div className="flex-col" style={{display:"flex", flexWrap: "wrap" }}>
                                                        <span style={{ fontSize: "14px" }}>Birthday</span>
                                                        <EuiText style={{ fontSize: "15px" }}>{formattedDate}</EuiText>
                                                    </div>
                                                    <div className="flex-col" style={{ paddingLeft: "20px" }}>
                                                        <span style={{ fontSize: "14px" }}>Sex</span>
                                                        <EuiText style={{ fontSize: "15px" }}>{patient.sex}</EuiText>
                                                    </div>
                                                    <div className="flex-col">
                                                        <span style={{ fontSize: "14px" }}>Result</span>
                                                        <EuiText style={{ fontSize: "15px" }}>{patient.result}</EuiText>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </EuiButton>
                                    );

                                })}
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </>
                ): specimenFiltered?.length !== 0 && <div>Loading...</div>}
                
            </div>
        </div>
        <AddSpecimenButton />
    </div>
    )
}

export default Results;