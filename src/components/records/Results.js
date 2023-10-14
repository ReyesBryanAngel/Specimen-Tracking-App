import React, { useState } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiButton,
    EuiText,
    EuiPopover,
    EuiButtonEmpty,
    EuiListGroup,
} from "@elastic/eui";
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import results from '../../config/results'
import { AddSpecimenButton } from "../../components/add-specimen/AddSpecimenButton";



const Results = () => {
    const { setData } = useData();
    const navigate = useNavigate();
    const [resultSetter, setresultSetter] = useState([...results]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

    const sortByBirthday = () => {
        const sortedResults = [...results].sort((a, b) => {
            const dateA = new Date(a.birthday);
            const dateB = new Date(b.birthday);
            return dateA - dateB;
        });
        setresultSetter(sortedResults);
        closePopover();
    };

    const showAllFunction = () => {
        setresultSetter([...results])
    }

    const sortByNegative = () => {
        const negativeResults = results.filter((results) => results.result === "negative");

        setresultSetter(negativeResults);
        closePopover();
    };

    const sortByPositive = () => {
        const negativeResults = results.filter((results) => results.result === "positive");

        setresultSetter(negativeResults);
        closePopover();
    };

    const sortByInAdequate = () => {
        const negativeResults = results.filter((results) => results.result === "inadequate");

        setresultSetter(negativeResults);
        closePopover();
    };

    const filterInadequate = (e, index) => {        
        const inadequate = resultSetter.filter((i) => i.result); 
        if (inadequate[index].result !== "negative") {
            setData(inadequate[index]);
            navigate("/individual-inadequate");
        }
    }

    return (
        <div className="main-content">
            <div className="specimen-form-container">
                <div className="specimen-form-content-container">
                    <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                    <div className="flex-col" style={{ width: "100%"}}>
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
                                        onClick={sortByNegative}
                                        style={{ textDecoration:"none", color:"black", fontSize:"13px", backgroundColor: "transparent"}}
                                    >
                                        Negative
                                    </EuiButtonEmpty>
                                    <EuiButtonEmpty
                                        size="s"                                  
                                        iconSide="right"
                                        onClick={sortByPositive}
                                        style={{ textDecoration:"none", color:"black", fontSize:"13px", backgroundColor: "transparent"}}
                                    >
                                        Positive
                                    </EuiButtonEmpty>
                                    <EuiButtonEmpty
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
                                        color="black"
                                        gutterSize="s"
                                        className="custom-eui-pagination"
                                    />
                                    </EuiPopover>
                                </div>
                            </div>
                        </div>
                        <EuiFlexItem style={{ display: "flex", gap: "20px"}}>
                            {resultSetter.map((result, index) => (
                                    <EuiButton
                                        onClick={(e) => filterInadequate(e, index)}
                                        style={{ 
                                            width: '100%', 
                                            paddingTop: "20px", 
                                            height: "100%", 
                                            backgroundColor: "#fff",
                                            textDecoration:"none",
                                            color: "black",
                                            border: '1px solid transparent', // Remove border highlight
                                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)', // Add a shadow
                                        }}
                                        key={index}
                                    >
                                        <div className="flex-col">
                                            <div style={{ textAlign: "left" }}>
                                                <h4 style={{ alignSelf: "self-start" }}>{result.name}</h4>
                                            </div>
                                            <div className="flex-row" style={{ marginBottom: "20px" }}>
                                                <div className="flex-col">
                                                    <span style={{ fontSize: "14px"}}>Birthday</span>
                                                    <EuiText style={{ fontSize: "16px" }}>{result.birthday}</EuiText>
                                                </div>
                                                <div className="flex-col">
                                                    <span style={{ fontSize: "14px"}}>Sex</span>
                                                    <EuiText style={{ fontSize: "16px" }}>{result.sex}</EuiText>
                                                </div>
                                                <div className="flex-col">
                                                    <span style={{ fontSize: "14px"}}>Specimen Status</span>
                                                    <EuiText style={{ fontSize: "16px" }}>{result.result}</EuiText>
                                                </div>
                                            </div>
                                        </div>
                                    </EuiButton>
                                ))}
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </div>
            </div>
            <AddSpecimenButton />
        </div>
    )
}

export default Results;