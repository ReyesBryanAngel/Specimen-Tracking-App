import React, { useState } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiPopover,
    EuiButtonEmpty,
    EuiListGroup,

} from "@elastic/eui";
import results from '../../config/results';

const Results = () => {
    const [resultSetter, setresultSetter] = useState([...results]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const items = [
        {
            label: (
                <span onClick={() => sortByBirthday()}>
                    Birthday
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
                            <div style={{ alignSelf: "end", marginTop: "10px" }}>
                                <div style={{ display: "flex", flexWrap: "nowrap"}}>
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
                        <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                            {resultSetter.map((result, index) => (
                                    <EuiCard
                                        style={{ width: '95%' }}
                                        key={index}
                                        textAlign="left"
                                    >
                                        <h4>{result.name}</h4>
                                        <div className="flex-row">
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
                                    </EuiCard>
                                ))}
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </div>
            </div>
        </div>
    )
}

export default Results;