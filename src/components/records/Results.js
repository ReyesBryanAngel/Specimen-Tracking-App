import React from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText
} from "@elastic/eui";
import results from '../../config/results';


const Results = () => {
    return (
        <div className="main-content">
            <div className="specimen-form-container">
                <div className="specimen-form-content-container">
                    <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                        <h5
                            style={{
                            marginTop: "0",
                            marginBottom: "0",
                            fontSize: "20px"
                            }}
                        >
                        <>Results (by Mother's Name)</>
                        </h5>
                        <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                            {results.map((result, index) => (
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