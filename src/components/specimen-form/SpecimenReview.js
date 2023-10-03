import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiButton
} from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

const SpecimenReview = () => {
    const navigate = useNavigate();
    return (
        <div className="main-content">
            <div className="specimen-form-container">
                <div className="specimen-form-content-container">
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
                                Initial Sample
                            </EuiFlexItem>
                        </EuiFormRow>
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
                                Mercado
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
                                N/A
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
                                Ma. Elizabeth
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
                                28/02/2023 09:44 AM
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
                                Male
                            </EuiFlexItem>
                        </EuiFormRow>
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
                                45
                            </EuiFlexItem>
                        </EuiFormRow>
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
                                28/02/2023 11:32 AM
                            </EuiFlexItem>
                        </EuiFormRow>
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
                                39
                            </EuiFlexItem>
                        </EuiFormRow>
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
                                Heel
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Feeding"}
                        >
                            <EuiFlexItem
                                style={{
                                    marginTop: "5px",
                                    gap: "5px",
                                    fontWeight: "normal"
                                }}
                            >
                                Breast, Lactose Formula
                            </EuiFlexItem>
                        </EuiFormRow>
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
                                Ospital ng Makati
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
                               Ospital ng Makati
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
                               Dela Cruz, Juan
                            </EuiFlexItem>
                        </EuiFormRow>
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
                               Doctor
                            </EuiFlexItem>
                        </EuiFormRow>
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
                               09123456789
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
                               09987654321
                            </EuiFlexItem>
                        </EuiFormRow>
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
                               Normal
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
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
                               Ma. Elizabeth Mercado
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
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
                               21 Chico
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
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
                               Ugong, Pasig
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
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
                                NCR
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
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
                                1604
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
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
                                09112233445
                            </EuiFlexItem>
                        </EuiFormRow>
                        <EuiFormRow
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
                                09887766554
                            </EuiFlexItem>
                        </EuiFormRow>
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
                                navigate("/add-specimen");
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
                            onClick={() => {
                                navigate("/add-specimen/specimen-submit")
                            }}
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