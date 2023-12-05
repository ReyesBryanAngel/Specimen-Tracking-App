import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiButton,
    EuiCallOut,
    EuiIcon
} from "@elastic/eui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from '../../context/DataProvider';
import ApiCall from '../../util/authentication/ApiCall';
import { useQuery } from "@tanstack/react-query";

const SpecimenReview = () => {
    const { specimenData, feedingValues, createSpecimen, setCreateSpecimen } = useData();
    const { http } = ApiCall();
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [specimenLoad, setSpecimenLoad] = useState(false);
    const { dispatch } = useData();
    const navigate = useNavigate();

    const { data: refreshSpecimen, isLoading: refreshSpecimenLoading } = useQuery({
        queryKey: ["sample"],
        enabled: !specimenLoad || !createSpecimen,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        queryFn: () =>
            http
                .get(`v1/specimens/refresh-specimen`)
                .then((res) => {
                    setSpecimenLoad(true);
                    return res?.data;
                })
    })

    const submitSepcimen = async() => {
        http.post('/v1/specimens', specimenData)
            .then((res) => {
                if (res?.data?.status === 200) {
                    http.post(`v1/specimens/feeding/${res?.data?.specimen_id}`, {feedings: feedingValues})
                    navigate("/add-specimen/specimen-submit")
                    setCreateSpecimen(false);
                }
         })
        .catch((e) => {
            setModal(true);
            setError(e.response?.data?.message)
        });    
    }

    const updateSpecimen = async() => {
        const updatedSpecimenData = {
            ...specimenData,
            type_of_sample: 'Repeat Sample',
            specimen_status: refreshSpecimen?.samples?.specimen_status
          };

        http.put(`v1/specimens/${refreshSpecimen?.samples?.id}`, updatedSpecimenData)
        .then((res) => {

            if (res?.data?.status === 200) {
                navigate("/dashboard");
                dispatch({ type: 'RESET' });
            }
     })
    }
    const clostModal  = () => {
        setModal(false);
    }
    return (
        <div className="main-content">
            <div className="specimen-form-container">
                <div className="specimen-form-content-container">
                    {modal && (
                        <div 
                            style={{ 
                                position: 'fixed',
                                top: '40%',
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
                    <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                        <EuiFlexItem className="specimen-form-title-container">
                            <h4
                                style={{
                                marginTop: "0",
                                marginBottom: "0",
                                fontSize: "20px",
                                }}
                            >
                                Specimen Form
                            </h4>
                        </EuiFlexItem>
                    { createSpecimen && (
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Type of Sample"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {specimenData?.type_of_sample}
                            </EuiFlexItem>
                        </EuiFormRow>
                    )}
                        
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Baby's Last Name"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {createSpecimen ? specimenData?.baby_last_name : refreshSpecimen?.samples?.baby_last_name}
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"For Multiple Births"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {createSpecimen ? specimenData?.for_multiple_births : refreshSpecimen?.samples?.for_multiple_births}
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Mother’s First Name"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {createSpecimen ? specimenData?.mothers_first_name : refreshSpecimen?.samples?.mothers_first_name}
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Date and Time of Birth"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {createSpecimen ? specimenData?.date_and_time_of_birth : refreshSpecimen?.samples?.date_and_time_of_birth}
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Sex"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {createSpecimen ? specimenData?.sex : refreshSpecimen?.samples?.sex}
                            </EuiFlexItem>
                        </EuiFormRow>
                        { createSpecimen && (
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Baby’s Weight (in Grams)"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {specimenData?.babys_weight_in_grams}
                            </EuiFlexItem>
                        </EuiFormRow>
                        )}
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Date and Time of Collection"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {createSpecimen ? specimenData?.date_and_time_of_collection : refreshSpecimen?.samples?.date_and_time_of_collection}
                            </EuiFlexItem>
                        </EuiFormRow>
                        { createSpecimen && (
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Age of Gestation (in Weeks)"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {specimenData?.age_of_gestation_in_weeks}
                            </EuiFlexItem>
                            </EuiFormRow>
                        )}
                        
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Specimen"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {createSpecimen ? specimenData?.specimens : refreshSpecimen?.samples?.specimens}
                            </EuiFlexItem>
                        </EuiFormRow>
                        {createSpecimen && (
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Feeding"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal",
                                }}
                            >
                                {feedingValues.join(', ')}
                            </EuiFlexItem>
                        </EuiFormRow>
                        )}
                        
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Hospital/Place of Collection"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                            {specimenData?.place_of_collection}
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Hospital/Place of Birth"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                            {createSpecimen ? specimenData?.place_of_birth : refreshSpecimen?.samples?.place_of_birth}
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Attending Practitioner (Last Name, First Name)"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                            {createSpecimen ? specimenData?.attending_practitioner : refreshSpecimen?.samples?.attending_practitioner}
                            </EuiFlexItem>
                        </EuiFormRow>
                        { (specimenData.practitioner_profession !== "other" || refreshSpecimen?.samples?.practitioner_profession !== "other")  && (
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"The Practitioner"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                {createSpecimen ? specimenData?.practitioner_profession : refreshSpecimen?.samples?.practitioner_profession}
                            </EuiFlexItem>
                        </EuiFormRow>  
                        )}
                        
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Practitioner’s Day Contact Number"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                            {createSpecimen ? specimenData?.practitioners_day_contact_number : refreshSpecimen?.samples?.practitioners_day_contact_number}
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Practitioner’s Mobile Number"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                            {createSpecimen ? specimenData?.practitioners_mobile_number : refreshSpecimen?.samples?.practitioners_mobile_number}
                            </EuiFlexItem>
                        </EuiFormRow>
                        {createSpecimen && (
                            <>
                            <EuiFormRow
                                fullWidth
                                style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                label={"Baby Status"}
                            >
                                <EuiFlexItem
                                    style={{
                                        marginTop: "5px",
                                        gap: "5px",
                                        fontWeight: "normal"
                                    }}
                                >
                                    {specimenData?.baby_status}
                                </EuiFlexItem>
                            </EuiFormRow><EuiFormRow
                                fullWidth
                                style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                label={"Name of Parent/Guardian"}
                            >
                                    <EuiFlexItem
                                        style={{
                                            marginTop: "5px",
                                            gap: "5px",
                                            fontWeight: "normal"
                                        }}
                                    >
                                        {specimenData?.name_of_parent}
                                    </EuiFlexItem>
                                </EuiFormRow><EuiFormRow
                                    fullWidth
                                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                    label={"Number and Street"}
                                >
                                    <EuiFlexItem
                                        style={{
                                            marginTop: "5px",
                                            gap: "5px",
                                            fontWeight: "normal"
                                        }}
                                    >
                                        {specimenData?.number_and_street}
                                    </EuiFlexItem>
                                </EuiFormRow><EuiFormRow
                                    fullWidth
                                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                    label={"Barangay/City"}
                                >
                                    <EuiFlexItem
                                        style={{
                                            marginTop: "5px",
                                            gap: "5px",
                                            fontWeight: "normal"
                                        }}
                                    >
                                        {specimenData?.barangay_or_city}
                                    </EuiFlexItem>
                                </EuiFormRow><EuiFormRow
                                    fullWidth
                                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                    label={"Province"}
                                >
                                    <EuiFlexItem
                                        style={{
                                            marginTop: "5px",
                                            gap: "5px",
                                            fontWeight: "normal"
                                        }}
                                    >
                                        {specimenData?.province}
                                    </EuiFlexItem>
                                </EuiFormRow><EuiFormRow
                                    fullWidth
                                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                    label={"Zip Code"}
                                >
                                    <EuiFlexItem
                                        style={{
                                            marginTop: "5px",
                                            gap: "5px",
                                            fontWeight: "normal"
                                        }}
                                    >
                                        {specimenData?.zip_code}
                                    </EuiFlexItem>
                                </EuiFormRow><EuiFormRow
                                    fullWidth
                                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                    label={"Contact Number of Parent/Guardian"}
                                >
                                    <EuiFlexItem
                                        style={{
                                            marginTop: "5px",
                                            gap: "5px",
                                            fontWeight: "normal"
                                        }}
                                    >
                                        {specimenData?.contact_number_of_parent}
                                    </EuiFlexItem>
                                </EuiFormRow><EuiFormRow
                                    fullWidth
                                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                    label={"Additional Contact Number of Parent/Guardian"}
                                >
                                    <EuiFlexItem
                                        style={{
                                            marginTop: "5px",
                                            gap: "5px",
                                            fontWeight: "normal"
                                        }}
                                    >
                                        {specimenData?.additional_contact_number}
                                    </EuiFlexItem>
                                </EuiFormRow>
                            </>
                        )}
                    
                    </EuiFlexGroup>
                    <div
                        style={{
                        display: "flex",
                        gap: "10px",
                        paddingTop: "20px",
                        borderTop: "1px solid #D3D3D3",
                        width: "100%",
                        }}
                    >
                        <EuiButton
                            style={{
                                borderRadius: "2.813px",
                                fontSize: "8px",
                                color: "#000000",
                                backgroundColor: "#69707D33",
                                border: "0px",
                            }}
                            fullWidth
                            onClick={() => {
                                createSpecimen ? 
                                navigate("/add-specimen/specimen-form") :
                                navigate("/add-specimen/repeat-form");
                            }}
                        >
                            <p
                                style={{
                                fontSize: "14px",
                                }}
                            >
                                Back
                            </p>
                        </EuiButton>
                        <EuiButton
                            style={{
                                borderRadius: "2.813px",
                                fontSize: "8px",
                                color: "#FFFFFF",
                                backgroundColor: "#01B5AC",
                                border: "0px",
                            }}
                            fullWidth
                            onClick={createSpecimen ? submitSepcimen : updateSpecimen}

                        >
                            <p
                                style={{
                                fontSize: "14px",
                                }}
                            >
                                Submit
                            </p>
                        </EuiButton>
                    </div>
                </div>
            </div>     
        </div>
    )
};

export default SpecimenReview;