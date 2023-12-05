import React, { useState } from 'react';
import { useData } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import ApiCall from '../../util/authentication/ApiCall';
import {
    EuiText,
    EuiFlexGroup,
    EuiButton,
    EuiIcon
} from "@elastic/eui";

const IndividualResult = () => {
    const { setCreateSpecimen } = useData();
    const [specimenLoad, setSpecimenLoad] = useState(false);
    const [motherName, setMotherName] = useState(null);
    const navigate = useNavigate()
    const { http } = ApiCall();

    const goBackFunction = () => {
        navigate("/results");
    }

    const { data: refreshSpecimen, isLoading: refreshSpecimenLoading } = useQuery({
        queryKey: ["sample"],
        enabled: !specimenLoad,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        queryFn: () =>
            http
                .get(`v1/specimens/refresh-specimen`)
                .then((res) => {
                    setSpecimenLoad(true);
                    const mother = `${res?.data?.samples?.baby_last_name}, ${res?.data?.samples?.mothers_first_name}`;
                    setMotherName(mother);
                    return res?.data;
                })
    })

    return (
        <>
         <EuiIcon 
            type="arrowLeft" 
            size="l" 
            color="primary"
            style={{ marginBottom: "30px" }}
            onClick={goBackFunction}
         />
         {!refreshSpecimenLoading && refreshSpecimen ?(
            <div className="main-content">
                <div className="individual-results-container">
                    <div style={{ paddingTop: "35px", paddingLeft:"15px" }}>
                        <EuiText  size="s" style={{ paddingBottom: "20px" }}>{motherName}</EuiText>
                        <EuiFlexGroup direction='row'>
                            <div>
                                <EuiText size='s'>Birthday</EuiText>
                                <EuiText size='s'>{refreshSpecimen?.samples?.date_and_time_of_birth}</EuiText>
                            </div>
                            <div>
                                <EuiText size='s'>Result</EuiText>
                                <EuiText size='s'>{refreshSpecimen?.samples?.sex}</EuiText>
                            </div>
                            <div>
                                <EuiText size='s'>Result</EuiText>
                                <EuiText size='s'>{refreshSpecimen?.samples?.result}</EuiText>
                            </div>
                        </EuiFlexGroup>
                    </div>
                </div>
                {refreshSpecimen?.samples?.result === "Inadequate" && (
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
                            setCreateSpecimen(false);
                            navigate("/add-specimen/repeat-form");
                        }}
                    >
                    <EuiText style={{fontSize: "14px"}}>Scan Barcode</EuiText>
                    </EuiButton>
                    </div>
                )}
            </div> ) : <div>Loading...</div>}
        </>
    )
}

export default IndividualResult;