import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
    EuiButton,
    EuiCheckbox,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiRadio,
    EuiDatePicker,
    EuiComboBox,
    EuiSelect,
    EuiProvider
  } from "@elastic/eui";
  import couriers from "../../static/courier";
  import moment from 'moment';
  import ApiCall from '../../util/authentication/ApiCall';
  
const CourierInformation = () => {
    const navigate = useNavigate();
    const { specimenData, dispatch } = useData();
    const { http } = ApiCall();
    const [startDate, setStartDate] = useState(moment());

    const formik = useFormik({
        initialValues: {
            courier: "",
            tracking_number: "",
            date_of_pickup: "",
            notes: "",
            result: "Sent"
        },
        validationSchema: yup.object({
            courier: yup.string().required('Courier is required'),
            tracking_number: yup.string().required('Tracking Number is required'),
            date_of_pickup: yup.string().required('Date of Pickup is required'),
        }),
        onSubmit: (values)=>{
            saveCourierInformation(values);
        }
    })
        
    const saveCourierInformation = (values) => {
        http.post('/v1/specimens/courier-information', values)
        .then((res) => {
            if (res?.data?.status === 200) {
                const trackingNumber = res.data.tracking_number;
                navigate('/courier')
                sendSamples(trackingNumber);
            }
        })
        .catch((e) => {
            console.error(e.response?.data?.message)
        });
    }

    const sendSamples = (trackingNumber) => {
        http.post('/v1/specimens/send-samples', { tracking_number: trackingNumber })
        .catch((e) => {
            console.error(e.response?.data?.message)
        });
    }
    
    const handleDateOfPickup = (date) => {
        setStartDate(date);
        const formatDateOfBirth = date.format("YYYY-MM-DD HH:mm:ss");
        formik.setFieldValue("date_of_pickup", formatDateOfBirth);
    }
    return (
        <form onSubmit={formik.handleSubmit}>
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
                        <EuiProvider>
                        <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                        <EuiFlexItem>
                            <EuiFormRow
                                fullWidth
                                style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                                label={"Courier"}
                            >
                                <EuiSelect
                                    id="courier"
                                    name="courier"
                                    options={[
                                        { text: 'Select an option', value: '' },
                                        ...couriers,
                                    ]}
                                    selectedOptions={formik.values.courier}
                                    onChange={(e) => {
                                        formik.setFieldValue('courier', e.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                            </EuiFormRow>
                            {formik.touched.courier && formik.errors.courier ? (
                                <div style={{ color:"#BD271E" }}>{formik.errors.courier}</div>
                            ) : null}
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
                                value={formik.values.tracking_number}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                style={{
                                border: "1px solid #D3D3D3",
                                borderRadius: "4px",
                                }}
                            />
                            </EuiFormRow>
                            {formik.touched.tracking_number && formik.errors.tracking_number ? (
                                <div style={{ color:"#BD271E" }}>{formik.errors.tracking_number}</div>
                            ) : null}
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFormRow label="Date of Pickup">
                            <EuiDatePicker
                                showTimeSelect
                                shouldCloseOnSelect
                                selected={startDate}
                                onChange={handleDateOfPickup}
                                handleBlur={formik.handleBlur}
                                style={{
                                    width: "92%",
                                    height: "16px",
                                    }}
                            />
                            </EuiFormRow>
                            {formik.touched.date_of_pickup && formik.errors.date_of_pickup ? (
                                <div style={{ color:"#BD271E" }}>{formik.errors.date_of_pickup}</div>
                            ) : null}
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <label for="notes" style={{ fontSize: "12px", fontWeight: "bold" }}>Notes</label>
                            <textarea
                                rows="6"
                                cols="50"
                                placeholder="Input"
                                value={formik.values.notes}
                                onChange={(e) => formik.setFieldValue('notes', e.target.value)}
                            />
                        </EuiFlexItem>
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
                                    type="submit"
                                    style={{
                                        borderRadius: "2.813px",
                                        fontSize: "8px",
                                        color: "#FFFFFF",
                                        backgroundColor: "#01B5AC",
                                        border: "0px",
                                    }}
                                    fullWidth
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
                        </EuiProvider>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CourierInformation;