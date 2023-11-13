import {
  EuiButton,
  EuiCheckbox,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiRadio,
  EuiSelect,
  EuiProvider,
  EuiDatePicker
} from "@elastic/eui";
import multipleBirths from "../../static/multiple_births";
import babyStatus from "../../static/baby_status";
import { useFormik } from 'formik';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from '../../context/DataProvider';
import { css } from '@emotion/react';
import moment from 'moment';
import * as yup from 'yup';

const SpecimenForm = () => {
  const navigate = useNavigate();
  const { specimenData, dispatch  } = useData();
  const [startDate, setStartDate] = useState(moment());
  const [isOther, setIsOther] = useState(false);

  const [checkboxes, setCheckboxes] = useState({
    breast: false,
    lactoseFormula: false,
    lactoseFree: false,
    nPo: false,
    tPn: false,
  });

  const formik = useFormik({
    initialValues: {
      type_of_sample: specimenData.type_of_sample,
      baby_last_name: specimenData.baby_last_name,
      baby_first_name: specimenData.baby_first_name,
      mothers_first_name: specimenData.mothers_first_name,
      for_multiple_births: specimenData.for_multiple_births,
      place_of_birth: specimenData.place_of_birth,
      date_and_time_of_birth: specimenData.date_and_time_of_birth,
      date_and_time_of_collection: specimenData.date_and_time_of_collection,
      babys_weight_in_grams: specimenData.babys_weight_in_grams,
      age_of_gestation_in_weeks: specimenData.age_of_gestation_in_weeks,
      sex: specimenData.sex,
      specimens: specimenData.specimens,
      specimen_status: specimenData.specimen_status,
      place_of_collection: specimenData.place_of_collection,
      attending_practitioner: specimenData.attending_practitioner,
      practitioners_day_contact_number: specimenData.practitioners_day_contact_number,
      practitioners_mobile_number: specimenData.practitioners_mobile_number,
      practitioner_profession: specimenData.practitioner_profession,
      practitioner_profession_other: specimenData.practitioner_profession_other,
      baby_status: specimenData.baby_status,
      baby_status_cont: specimenData.baby_status_cont,
      name_of_parent: specimenData.name_of_parent,
      number_and_street: specimenData.number_and_street,
      barangay_or_city: specimenData.barangay_or_city,
      province: specimenData.province,
      zip_code: specimenData.zip_code,
      contact_number_of_parent: specimenData.contact_number_of_parent,
      additional_contact_number: specimenData.additional_contact_number

    },
    validationSchema: yup.object({
      type_of_sample: yup.string().required('Type of Sample is required'),
      baby_last_name: yup.string().required('Babys Last Name is required'),
      baby_first_name: yup.string(),
      mothers_first_name: yup.string().required('Mothers First Name is required'),
      for_multiple_births: yup.string().required('For Multiple Births is required'),
      date_and_time_of_birth: yup.string().required('Date of Birth is required'),
      place_of_birth: yup.string().required('Place of Birth is required'),
      date_and_time_of_collection: yup.string().required('Date and Time of Collection is required'),
      babys_weight_in_grams: yup.number().required("Baby's Weight in Grams is required"),
      age_of_gestation_in_weeks: yup.number().required('Age of Gestation (in Weeks) is required'),
      sex: yup.string().required('Sex is required'),
      specimens: yup.string().required('Specimen is required'),
      place_of_collection: yup.string().required('Hospital/Place of Collection is required'),
      attending_practitioner: yup.string().required('Attending Practitioner is required'),
      practitioner_profession: yup.string().required('Practitioner is required'),
      practitioner_profession_other: yup
      .string()
      .when("practitioner_profession", {
        is: "other",
        then: () => yup.string().required("Other practitioner is required")
      }),
      practitioners_day_contact_number: yup.string().required('Practitioners Day Contact Number is required'),
      practitioners_mobile_number: yup.string().required('Practitioners Mobile Number is required'),
      baby_status: yup.string().required('Baby Status is required'),
      baby_status_cont: yup
      .string()
      .when("baby_status", {
        is: (value) => [
          'Date of Blood Transfusion', 
          'Combination of above, please state', 
          'Other Relevant Clinical Information'].includes(value),
        then: () => yup.string().required("Baby Status (Cont) is required")
      }),
      name_of_parent: yup.string().required('Name of Parent/Guardian is required'),
      number_and_street: yup.string().required('Number and Street is required'),
      barangay_or_city: yup.string().required('Barangay/City is required'),
      province: yup.string().required('Province is required'),
      zip_code: yup.string().required('Zip Code is required'),
      contact_number_of_parent: yup.string().required('Contact Number of Parent/Guardian is required'),
      additional_contact_number: yup.string().required('Additional Contact Number of Parent/Guardian is required'),
    }),
    onSubmit: (values) => {
      dispatch({ type: 'UPDATE', payload: values });
      formik.setFieldValue("specimen_status", "Pending");
      navigate("/add-specimen/specimen-review")
    },
  });

  const handleCheckboxOther = (column) => {
    const columnNames = ["doctor", "midwife", "nurse"].includes(column);

    if (columnNames) {
      formik.setFieldValue("practitioner_profession_other", "");  
    }

    formik.setFieldValue("practitioner_profession", column);
  }

  const onChange = (value) => {
    setCheckboxes({
      ...checkboxes,
      [value]: !checkboxes[value],
    });
  };

  const handleDateOfBirth = (date) => {
    setStartDate(date);
    const formatDateOfBirth = date.format("YYYY-MM-DD HH:mm:ss");
    formik.setFieldValue("date_and_time_of_birth", formatDateOfBirth);
  }

  const handleDateOfCollection = (date) => {
    setStartDate(date);
    const formatDateOfCollection = date.format("YYYY-MM-DD HH:mm:ss");
    formik.setFieldValue("date_and_time_of_collection", formatDateOfCollection);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="main-content">
        <div className="specimen-form-container">
          <div className="specimen-form-content-container">
            <EuiProvider>
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
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Type of Sample"}
                >
                  <EuiFlexItem
                    style={{
                      marginTop: "5px",
                      gap: "5px",
                    }}
                  >
                    <EuiRadio
                      label="Initial Sample"
                      id="Initial Sample"
                      name="type_of_sample"         
                      checked={formik.values.type_of_sample === "Initial Sample"}
                      onChange={() => formik.setFieldValue('type_of_sample', "Initial Sample")}
                      style={{
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Repeat Sample"
                      id="Repeat Sample"
                      name="type_of_sample"  
                      checked={formik.values.type_of_sample === "Repeat Sample"}
                      onChange={() => formik.setFieldValue('type_of_sample', "Repeat Sample")}
                      style={{                  
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                  </EuiFlexItem>
                </EuiFormRow>
                {formik.touched.type_of_sample && formik.errors.type_of_sample ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.type_of_sample}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "80%" }}
                  label={"Baby’s Last Name"}
                >
                  <EuiFieldText
                    id="baby_last_name"
                    name="baby_last_name"
                    placeholder="Input"
                    value={formik.values.baby_last_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.baby_last_name && formik.errors.baby_last_name ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.baby_last_name}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Baby’s First Name (Optional)"}
                >
                  <EuiFieldText
                    id="baby_first_name"
                    name="baby_first_name"
                    placeholder="Input"
                    value={formik.values.baby_first_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"For Multiple Births"}
                >
                    <EuiSelect
                      id="for_multiple_births"
                      name="for_multiple_births"
                      options={[
                        { text: 'Select an option', value: '' },
                        ...multipleBirths,
                      ]}
                      selectedOptions={formik.values.for_multiple_births}
                      onChange={(e) => {
                        formik.setFieldValue('for_multiple_births', e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                </EuiFormRow>
                {formik.touched.the_drop_down_column && formik.errors.the_drop_down_column ? (
                  <div>{formik.errors.the_drop_down_column}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Mother's First Name"}
                >
                  <EuiFieldText
                    id="mothers_first_name"
                    name="mothers_first_name"
                    placeholder="Input"
                    value={formik.values.mothers_first_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.mothers_first_name && formik.errors.mothers_first_name ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.mothers_first_name}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow label="Date of Birth">
                  <EuiDatePicker
                    showTimeSelect
                    shouldCloseOnSelect
                    selected={startDate}
                    onChange={handleDateOfBirth}
                    handleBlur={formik.handleBlur}
                  />
                </EuiFormRow>
                {formik.touched.date_and_time_of_birth && formik.errors.date_and_time_of_birth ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.date_and_time_of_birth}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Sex"}
                >
                  <EuiFlexItem
                    style={{
                      marginTop: "5px",
                      gap: "5px",
                    }}
                  >
                    <EuiRadio
                      label="Male"
                      id="Male"
                      name="sex"         
                      checked={formik.values.sex === "M"}
                      onChange={() => formik.setFieldValue('sex', "M")}
                      style={{
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Female"
                      id="Female"
                      name="sex"         
                      checked={formik.values.sex === "F"}
                      onChange={() => formik.setFieldValue('sex', "F")}
                      style={{
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Ambiguous"
                      id="Ambiguous"
                      name="sex"         
                      checked={formik.values.sex === "A"}
                      onChange={() => formik.setFieldValue('sex', "A")}
                      style={{
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                  </EuiFlexItem>
                </EuiFormRow>
                {formik.touched.sex && formik.errors.sex ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.sex}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Baby’s Weight (in Grams)"}
                >
                  <EuiFieldText
                    id="babys_weight_in_grams"
                    name="babys_weight_in_grams"
                    placeholder="Input"
                    value={formik.values.babys_weight_in_grams}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="number"
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.babys_weight_in_grams && formik.errors.babys_weight_in_grams ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.babys_weight_in_grams}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow label="Date and Time of Collection">
                  <EuiDatePicker
                    showTimeSelect
                    shouldCloseOnSelect
                    selected={startDate}
                    onChange={handleDateOfCollection}
                    handleBlur={formik.handleBlur}
                  />
                </EuiFormRow>
                {formik.touched.date_and_time_of_collection && formik.errors.date_and_time_of_collection ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.date_and_time_of_collection}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Age of Gestation (in Weeks)"}
                >
                  <EuiFieldText
                    id="age_of_gestation_in_weeks"
                    name="age_of_gestation_in_weeks"
                    placeholder="Input"
                    value={formik.values.age_of_gestation_in_weeks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="number"
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.age_of_gestation_in_weeks && formik.errors.age_of_gestation_in_weeks ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.age_of_gestation_in_weeks}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Specimen"}
                >
                  <EuiFlexItem
                    style={{
                      marginTop: "5px",
                      gap: "5px",
                    }}
                  >
                    <EuiRadio
                      label="Heel"
                      id="Heel"
                      name="specimens"         
                      checked={formik.values.specimens === "heel"}
                      onChange={() => formik.setFieldValue('specimens', "heel")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Cord"
                      id="Cord"
                      name="specimens"         
                      checked={formik.values.specimens === "cord"}
                      onChange={() => formik.setFieldValue('specimens', "cord")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Venous"
                      id="Venous"
                      name="specimens"         
                      checked={formik.values.specimens === "venous"}
                      onChange={() => formik.setFieldValue('specimens', "venous")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                  </EuiFlexItem>
                </EuiFormRow>
                {formik.touched.specimens && formik.errors.specimens ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.specimens}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                  label={"Feeding (Check all that apply)"}
                >
                  <EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiCheckbox
                      onChange={() => onChange('breast')}
                      checked={checkboxes.breast}
                      label="Breast"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiCheckbox
                      onChange={() => onChange('lactoseFormula')}
                      checked={checkboxes.lactoseFormula}
                      label="Lactose Formula"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiCheckbox
                      onChange={() => onChange('lactoseFree')}
                      checked={checkboxes.lactoseFree}
                      label="Soy/Lactose-Free"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiCheckbox 
                      onChange={() => onChange('nPo')} 
                      checked={checkboxes.nPo}
                      label="NPO" 
                      value="npo" 
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiCheckbox 
                      onChange={() => onChange('tPn')} 
                      checked={checkboxes.tPn}
                      label="TPN" 
                      value="tpn" 
                    />
                  </EuiFlexItem>
                  </EuiFlexItem>
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Hospital/Place of Collection"}
                >
                  <EuiFieldText
                     id="place_of_collection"
                     name="place_of_collection"
                     placeholder="Input"
                     value={formik.values.place_of_collection}
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.place_of_collection && formik.errors.place_of_collection ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.place_of_collection}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Hospital/Place of Birth"}
                >
                  <EuiFieldText
                    id="place_of_birth"
                    name="place_of_birth"
                    placeholder="Input"
                    value={formik.values.place_of_birth}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.place_of_birth && formik.errors.place_of_birth ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.place_of_birth}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Attending Practitioner (Last Name, First Name)"}
                >
                  <EuiFieldText
                     id="attending_practitioner"
                     name="attending_practitioner"
                     placeholder="Input"
                     value={formik.values.attending_practitioner}
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.attending_practitioner && formik.errors.attending_practitioner ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.attending_practitioner}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Practitioner"}
                >
                  <EuiFlexItem
                    style={{
                      marginTop: "5px",
                      gap: "5px",
                    }}
                  >
                    <EuiRadio
                      label="Doctor"
                      id="Doctor"
                      name="practitioner_profession"         
                      checked={formik.values.practitioner_profession === "doctor"}
                      onChange={() => handleCheckboxOther("doctor")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Nurse"
                      id="Nurse"
                      name="practitioner_profession"         
                      checked={formik.values.practitioner_profession === "nurse"}
                      onChange={() => handleCheckboxOther("nurse")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Midwife"
                      id="Midwife"
                      name="practitioner_profession"         
                      checked={formik.values.practitioner_profession === "midwife"}
                      onChange={() => handleCheckboxOther("midwife")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <div style={{ display: "flex" }}>
                      <EuiRadio
                      label="Other"
                      id="Other"
                      name="practitioner_profession"
                      checked={formik.values.practitioner_profession === "other"}
                      onChange={() => handleCheckboxOther("other")}
                        style={{
                          
                          display: "flex",
                          fontWeight: "normal",
                        }}
                      />
                      <EuiFieldText
                        id="practitioner_profession_other"
                        name="practitioner_profession_other"
                        disabled={formik.values.practitioner_profession !== "other"}
                        value={formik.values.practitioner_profession_other}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        style={{
                          border: 'none !important',
                          borderBottom: "1px solid",
                          height: "32px",
                        }}
                      />
                    </div>
                  </EuiFlexItem>
                </EuiFormRow>
                {formik.touched.practitioner_profession && formik.errors.practitioner_profession ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.practitioner_profession}</div>
                ) : null}
                {formik.touched.practitioner_profession_other && 
                formik.errors.practitioner_profession_other ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.practitioner_profession_other}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Practitioner’s Day Contact Number"}
                >
                  <EuiFieldText
                    id="practitioners_day_contact_number"
                    name="practitioners_day_contact_number"
                    placeholder="Input"
                    value={formik.values.practitioners_day_contact_number}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.practitioners_day_contact_number && formik.errors.practitioners_day_contact_number ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.practitioners_day_contact_number}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Practitioner’s Mobile Number"}
                >
                  <EuiFieldText
                    id="practitioners_mobile_number"
                    name="practitioners_mobile_number"
                    placeholder="Input"
                    value={formik.values.practitioners_mobile_number}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.practitioners_mobile_number && formik.errors.practitioners_mobile_number ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.practitioners_mobile_number}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Baby Status"}
                >
                  <EuiSelect
                      id="baby_status"
                      name="baby_status"
                      options={[
                        { text: 'Select an option', value: '' },
                        ...babyStatus,
                      ]}
                      selectedOptions={formik.values.baby_status}
                      onChange={(e) => {
                        formik.setFieldValue('baby_status', e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              {[
                  "Date of Blood Transfusion",
                  "Combination of above, please state", 
                  "Other Relevant Clinical Information"
                ].includes(formik.values.baby_status) && (
                <EuiFlexItem>
                  <EuiFormRow
                    fullWidth
                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                    label={"Baby’s Status (Cont.)"}
                  >
                    <EuiFieldText
                      id="baby_status_cont"
                      name="baby_status_cont"
                      placeholder="Input"
                      value={formik.values.baby_status_cont}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      style={{
                        
                        border: "1px solid #D3D3D3",
                        borderRadius: "4px",
                        height: "32px",
                      }}
                    />
                  </EuiFormRow>
                  {formik.touched.baby_status_cont && formik.errors.baby_status_cont ? (
                    <div style={{ color:"#BD271E" }}>{formik.errors.baby_status_cont}</div>
                  ) : null}
                </EuiFlexItem>
               )}
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Name of Parent/Guardian"}
                >
                  <EuiFieldText
                     id="name_of_parent"
                     name="name_of_parent"
                     placeholder="Input"
                     value={formik.values.name_of_parent}
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.name_of_parent && formik.errors.name_of_parent ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.name_of_parent}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Number and Street"}
                >
                  <EuiFieldText
                    id="number_and_street"
                    name="number_and_street"
                    placeholder="Input"
                    value={formik.values.number_and_street}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.number_and_street && formik.errors.number_and_street ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.number_and_street}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Barangay/City"}
                >
                  <EuiFieldText
                    id="barangay_or_city"
                    name="barangay_or_city"
                    placeholder="Input"
                    value={formik.values.barangay_or_city}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.barangay_or_city && formik.errors.barangay_or_city ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.barangay_or_city}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Province"}
                >
                  <EuiFieldText
                    id="province"
                    name="province"
                    placeholder="Input"
                    value={formik.values.province}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.province && formik.errors.province ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.province}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"ZIP Code"}
                >
                  <EuiFieldText
                    id="zip_code"
                    name="zip_code"
                    placeholder="Input"
                    value={formik.values.zip_code}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.zip_code && formik.errors.zip_code ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.zip_code}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Contact Number of Parent/Guardian"}
                >
                  <EuiFieldText
                    id="contact_number_of_parent"
                    name="contact_number_of_parent"
                    placeholder="Input"
                    value={formik.values.contact_number_of_parent}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.contact_number_of_parent && formik.errors.contact_number_of_parent ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.contact_number_of_parent}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Additional Contact Number of Parent/Guardian"}
                >
                  <EuiFieldText
                   id="additional_contact_number"
                   name="additional_contact_number"
                   placeholder="Input"
                   value={formik.values.additional_contact_number}
                   onBlur={formik.handleBlur}
                   onChange={formik.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {formik.touched.additional_contact_number && formik.errors.additional_contact_number ? (
                  <div style={{ color:"#BD271E" }}>{formik.errors.additional_contact_number}</div>
                ) : null}
              </EuiFlexItem>
            </EuiFlexGroup>
            </EuiProvider>
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
                  Review
                </p>
              </EuiButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SpecimenForm;
