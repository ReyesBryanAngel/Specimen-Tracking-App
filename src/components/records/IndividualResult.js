import React from 'react';
import { useData } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import {
    EuiText,
    EuiFlexGroup,
    EuiButton,
    EuiIcon
} from "@elastic/eui";

const IndividualResult = () => {
    const { data } = useData();
    const navigate = useNavigate()

    const goBackFunction = () => {
        navigate("/results");
    }

    return (
        <>
         <EuiIcon 
            type="arrowLeft" 
            size="l" 
            color="primary"
            style={{ marginBottom: "30px" }}
            onClick={goBackFunction}
         />
            <div className="main-content">
                <div className="individual-results-container">
                    <div style={{ paddingTop: "35px", paddingLeft:"15px" }}>
                        <EuiText  size="s" style={{ paddingBottom: "20px" }}>{data.name}</EuiText>
                        <EuiFlexGroup direction='row'>
                            <div>
                                <EuiText size='s'>Birthday</EuiText>
                                <EuiText size='s'>{data.birthday}</EuiText>
                            </div>
                            <div>
                                <EuiText size='s'>Result</EuiText>
                                <EuiText size='s'>{data.sex}</EuiText>
                            </div>
                            <div>
                                <EuiText size='s'>Result</EuiText>
                                <EuiText size='s'>{data.result}</EuiText>
                            </div>
                        </EuiFlexGroup>
                    </div>
                </div>
                {data.result === "inadequate" && (
                    <div
                        style={{
                        gap: "15px",
                        marginLeft:"1rem",
                        paddingTop: "20px",
                        borderTop: "2px solid rgba(0, 0, 0, 0.5)",
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    >
                    <EuiButton
                        style={{
                            borderRadius: "5px",
                            fontSize: "8px",
                            color: "#000000",
                            backgroundColor: "#69707D33",
                            border: "0px",
                           
                        }}
                        fullWidth
                        onClick={() => {
                            // call function
                        }}
                    >
                        <EuiText style={{fontSize: "14px"}}>Conntact NSC</EuiText>
                    </EuiButton>
                    <EuiButton
                        style={{
                            borderRadius: "5px",
                            fontSize: "8px",
                            color: "#FFFFFF",
                            backgroundColor: "#01B5AC",
                            border: "0px",
                        }}
                        fullWidth
                        onClick={() => {
                            //navigate to repeat samples
                        }}
                    >
                       <EuiText style={{fontSize: "14px"}}>Scan Barcode</EuiText>
                    </EuiButton>
                    </div>
                )}
            </div>
        </>
    )
}

export default IndividualResult;