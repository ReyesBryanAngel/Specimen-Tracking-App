import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EuiButton,
    EuiCheckbox,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiRadio,
    EuiDatePicker,
    EuiComboBox
  } from "@elastic/eui";

const CourierInformation = () => {
const navigate = useNavigate();
      
return (
    <div className="main-content">
        <div className="specimen-form-container">
            <div>
                <h3
                    style={{
                    marginTop:"10px",
                    fontSize: "20px",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.5)",
                    paddingBottom: "10px",
                    width: "100%"
                    }}
                >
                    Courier information
                </h3>
                <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                <EuiFlexItem>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Courier"}
                        >
                            <select
                            id="multipleBirths"
                            name="multipleBirths"
                            style={{
                                width: "97%",
                                border: "1px solid #D3D3D3",
                                borderRadius: "4px",
                                height: "35px",
                            }}
                            >
                                <option value="option_two">Grab</option>
                                <option value="option_one">2GO</option>
                                <option value="option_two">Ninja Van</option>
                            </select>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Tracking Number"}
                        >
                            <EuiFieldText
                                id="tracking_number"
                                name="tracking_number"
                                placeholder="Input"
                                style={{
                                    width: "95%",
                                    border: "1px solid #D3D3D3",
                                    borderRadius: "4px",
                                    height: "32px",
                                }}
                            />
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                    {/* <EuiFormRow label="Date of Pickup">
                        <EuiDatePicker selected={startDate} onChange={handleChange} />
                    </EuiFormRow> */}
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Date of Pickup"}
                        >
                            <input
                            type="datetime-local"
                            id="dateOfPickup"
                            name="dateOfPickup"
                            style={{
                                width: "95%",
                                border: "1px solid #D3D3D3",
                                borderRadius: "4px",
                                height: "32px",
                            }}
                            />
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <label for="notes" style={{ fontSize: "12px", fontWeight: "bold"}}>Notes</label>
                        <textarea rows="6" cols="50" placeholder="Input" />
                    </EuiFlexItem>
                    {/* <DisplayToggles
                    canDisabled={false}
                    canReadOnly={false}
                    canLoading={false}
                    canIsDisabled
                    canAppend
                    canPrepend
                    > */}
                        {/* <EuiComboBox
                            aria-label="Accessible screen reader label"
                            placeholder="Select a single option"
                            singleSelection={{ asPlainText: true }}
                            options={options}
                            selectedOptions={selectedOptions}
                            onChange={onChange}
                            isDisabled

                        /> */}
                    {/* </DisplayToggles> */}
                    
                </EuiFlexGroup>
                <div
                        style={{
                        display: "flex",
                        gap: "10px",
                        paddingTop: "20px",
                        borderTop: "2px solid rgba(0, 0, 0, 0.5)",
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
                                navigate("/review-samples")
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
                                
                            }}
                        >
                            <p
                                style={{
                                fontSize: "14px",
                                }}
                            >
                                Save
                            </p>
                        </EuiButton>
                    </div>

            </div>
        </div>
    </div>
)
}

export default CourierInformation;