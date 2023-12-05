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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from '../../context/DataProvider';
import moment from 'moment';
import feedings from "../../static/feedings";
import  { SpecimenFormik } from "../../components/formikData";


const SpecimenForm = () => {
  const navigate = useNavigate();
  const { specimenData, dispatch, setFeedingValues, createSpecimen, setCreateSpecimen } = useData();
  const [startDate, setStartDate] = useState(moment());
  const [selectedFeedings, setSelectedFeedings] = useState([]);
  const specimenForm = SpecimenFormik(specimenData, dispatch, navigate, createSpecimen);
  const handleCheckboxOther = (column) => {
    const columnNames = ["doctor", "midwife", "nurse"].includes(column);

    if (columnNames) {
      specimenForm.setFieldValue("practitioner_profession_other", "");  
    }

    specimenForm.setFieldValue("practitioner_profession", column);
  }

  const onCheckboxChange = (index) => {
    const selectedFeeding = feedings[index].value;
    if (selectedFeedings.includes(selectedFeeding)) {
      setSelectedFeedings(selectedFeedings.filter((feeding) => feeding !== selectedFeeding));
    } else {
      setSelectedFeedings([...selectedFeedings, selectedFeeding]);
    }

    setFeedingValues([...selectedFeedings, selectedFeeding]);
  };


  const handleDateOfBirth = (date) => {
    setStartDate(date);
    const formatDateOfBirth = date.format("YYYY-MM-DD HH:mm:ss");
    specimenForm.setFieldValue("date_and_time_of_birth", formatDateOfBirth);
  }

  const handleDateOfCollection = (date) => {
    setStartDate(date);
    const formatDateOfCollection = date.format("YYYY-MM-DD HH:mm:ss");
    specimenForm.setFieldValue("date_and_time_of_collection", formatDateOfCollection);
  }


  return (
    <form onSubmit={specimenForm.handleSubmit}>
      <div className="main-content">
        <div className="specimen-form-container">
            <EuiProvider>
            <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
              <EuiFlexItem>
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
                      checked={specimenForm.values.type_of_sample === "Initial Sample"}
                      onChange={() => specimenForm.setFieldValue('type_of_sample', "Initial Sample")}
                      style={{
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Repeat Sample"
                      id="Repeat Sample"
                      name="type_of_sample"  
                      checked={specimenForm.values.type_of_sample === "Repeat Sample"}
                      onChange={() => specimenForm.setFieldValue('type_of_sample', "Repeat Sample")}
                      style={{                  
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                  </EuiFlexItem>
                </EuiFormRow>
                {specimenForm.touched.type_of_sample && specimenForm.errors.type_of_sample ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.type_of_sample}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow
                  fullWidth
                  style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                  label={"Baby’s Last Name"}
                >
                  <EuiFieldText
                    id="baby_last_name"
                    name="baby_last_name"
                    placeholder="Input"
                    value={specimenForm.values.baby_last_name}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.baby_last_name && specimenForm.errors.baby_last_name ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.baby_last_name}</div>
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
                    value={specimenForm.values.baby_first_name}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
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
                      selectedOptions={specimenForm.values.for_multiple_births}
                      onChange={(e) => {
                        specimenForm.setFieldValue('for_multiple_births', e.target.value);
                      }}
                      onBlur={specimenForm.handleBlur}
                    />
                </EuiFormRow>
                {specimenForm.touched.the_drop_down_column && specimenForm.errors.the_drop_down_column ? (
                  <div>{specimenForm.errors.the_drop_down_column}</div>
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
                    value={specimenForm.values.mothers_first_name}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.mothers_first_name && specimenForm.errors.mothers_first_name ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.mothers_first_name}</div>
                  ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow label="Date of Birth">
                  <EuiDatePicker
                    placeholder="YYYY-MM-DD HH:mm:ss"
                    showTimeSelect
                    shouldCloseOnSelect
                    selected={startDate}
                    onChange={handleDateOfBirth}
                    handleBlur={specimenForm.handleBlur}
                  />
                </EuiFormRow>
                {specimenForm.touched.date_and_time_of_birth && specimenForm.errors.date_and_time_of_birth ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.date_and_time_of_birth}</div>
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
                      checked={specimenForm.values.sex === "M"}
                      onChange={() => specimenForm.setFieldValue('sex', "M")}
                      style={{
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Female"
                      id="Female"
                      name="sex"         
                      checked={specimenForm.values.sex === "F"}
                      onChange={() => specimenForm.setFieldValue('sex', "F")}
                      style={{
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Ambiguous"
                      id="Ambiguous"
                      name="sex"         
                      checked={specimenForm.values.sex === "A"}
                      onChange={() => specimenForm.setFieldValue('sex', "A")}
                      style={{
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                  </EuiFlexItem>
                </EuiFormRow>
                {specimenForm.touched.sex && specimenForm.errors.sex ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.sex}</div>
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
                    value={specimenForm.values.babys_weight_in_grams}
                    onChange={specimenForm.handleChange}
                    onBlur={specimenForm.handleBlur}
                    type="number"
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.babys_weight_in_grams && specimenForm.errors.babys_weight_in_grams ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.babys_weight_in_grams}</div>
                ) : null}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow label="Date and Time of Collection">
                  <EuiDatePicker
                    placeholder="YYYY-MM-DD HH:mm:ss"
                    showTimeSelect
                    shouldCloseOnSelect
                    selected={startDate}
                    onChange={handleDateOfCollection}
                    handleBlur={specimenForm.handleBlur}
                  />
                </EuiFormRow>
                {specimenForm.touched.date_and_time_of_collection && specimenForm.errors.date_and_time_of_collection ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.date_and_time_of_collection}</div>
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
                    value={specimenForm.values.age_of_gestation_in_weeks}
                    onChange={specimenForm.handleChange}
                    onBlur={specimenForm.handleBlur}
                    type="number"
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.age_of_gestation_in_weeks && specimenForm.errors.age_of_gestation_in_weeks ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.age_of_gestation_in_weeks}</div>
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
                      checked={specimenForm.values.specimens === "heel"}
                      onChange={() => specimenForm.setFieldValue('specimens', "heel")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Cord"
                      id="Cord"
                      name="specimens"         
                      checked={specimenForm.values.specimens === "cord"}
                      onChange={() => specimenForm.setFieldValue('specimens', "cord")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                    <EuiRadio
                      label="Venous"
                      id="Venous"
                      name="specimens"         
                      checked={specimenForm.values.specimens === "venous"}
                      onChange={() => specimenForm.setFieldValue('specimens', "venous")}
                      style={{
                        
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    />
                  </EuiFlexItem>
                </EuiFormRow>
                {specimenForm.touched.specimens && specimenForm.errors.specimens ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.specimens}</div>
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
                  <EuiFlexItem>
                    {feedings.map((feeding, index) => (
                        <EuiCheckbox
                          id={`checkbox-${index}`}
                          label={feeding.label}
                          checked={selectedFeedings.includes(feeding.value)}
                          onChange={() => onCheckboxChange(index)}
                      />
                    ))}
                  </EuiFlexItem>
                  </EuiFlexItem>
                </EuiFormRow>
                {specimenForm.touched.type_of_sample && specimenForm.errors.feedings ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.feedings}</div>
                  ) : null}
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
                     value={specimenForm.values.place_of_collection}
                     onBlur={specimenForm.handleBlur}
                     onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.place_of_collection && specimenForm.errors.place_of_collection ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.place_of_collection}</div>
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
                    value={specimenForm.values.place_of_birth}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.place_of_birth && specimenForm.errors.place_of_birth ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.place_of_birth}</div>
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
                     value={specimenForm.values.attending_practitioner}
                     onBlur={specimenForm.handleBlur}
                     onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.attending_practitioner && specimenForm.errors.attending_practitioner ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.attending_practitioner}</div>
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
                      checked={specimenForm.values.practitioner_profession === "doctor"}
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
                      checked={specimenForm.values.practitioner_profession === "nurse"}
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
                      checked={specimenForm.values.practitioner_profession === "midwife"}
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
                      checked={specimenForm.values.practitioner_profession === "other"}
                      onChange={() => handleCheckboxOther("other")}
                        style={{
                          
                          display: "flex",
                          fontWeight: "normal",
                        }}
                      />
                      <EuiFieldText
                        id="practitioner_profession_other"
                        name="practitioner_profession_other"
                        disabled={specimenForm.values.practitioner_profession !== "other"}
                        value={specimenForm.values.practitioner_profession_other}
                        onBlur={specimenForm.handleBlur}
                        onChange={specimenForm.handleChange}
                        style={{
                          border: 'none !important',
                          borderBottom: "1px solid",
                          height: "32px",
                        }}
                      />
                    </div>
                  </EuiFlexItem>
                </EuiFormRow>
                {specimenForm.touched.practitioner_profession && specimenForm.errors.practitioner_profession ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.practitioner_profession}</div>
                ) : null}
                {specimenForm.touched.practitioner_profession_other && 
                specimenForm.errors.practitioner_profession_other ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.practitioner_profession_other}</div>
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
                    value={specimenForm.values.practitioners_day_contact_number}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    helperText
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.practitioners_day_contact_number && specimenForm.errors.practitioners_day_contact_number ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.practitioners_day_contact_number}</div>
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
                    value={specimenForm.values.practitioners_mobile_number}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.practitioners_mobile_number && specimenForm.errors.practitioners_mobile_number ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.practitioners_mobile_number}</div>
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
                      selectedOptions={specimenForm.values.baby_status}
                      onChange={(e) => {
                        specimenForm.setFieldValue('baby_status', e.target.value);
                      }}
                      onBlur={specimenForm.handleBlur}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              {[
                  "Date of Blood Transfusion",
                  "Combination of above, please state", 
                  "Other Relevant Clinical Information"
                ].includes(specimenForm.values.baby_status) && (
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
                      value={specimenForm.values.baby_status_cont}
                      onBlur={specimenForm.handleBlur}
                      onChange={specimenForm.handleChange}
                      style={{
                        
                        border: "1px solid #D3D3D3",
                        borderRadius: "4px",
                        height: "32px",
                      }}
                    />
                  </EuiFormRow>
                  {specimenForm.touched.baby_status_cont && specimenForm.errors.baby_status_cont ? (
                    <div style={{ color:"#BD271E" }}>{specimenForm.errors.baby_status_cont}</div>
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
                     value={specimenForm.values.name_of_parent}
                     onBlur={specimenForm.handleBlur}
                     onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.name_of_parent && specimenForm.errors.name_of_parent ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.name_of_parent}</div>
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
                    value={specimenForm.values.number_and_street}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.number_and_street && specimenForm.errors.number_and_street ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.number_and_street}</div>
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
                    value={specimenForm.values.barangay_or_city}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.barangay_or_city && specimenForm.errors.barangay_or_city ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.barangay_or_city}</div>
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
                    value={specimenForm.values.province}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.province && specimenForm.errors.province ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.province}</div>
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
                    value={specimenForm.values.zip_code}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.zip_code && specimenForm.errors.zip_code ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.zip_code}</div>
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
                    value={specimenForm.values.contact_number_of_parent}
                    onBlur={specimenForm.handleBlur}
                    onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.contact_number_of_parent && specimenForm.errors.contact_number_of_parent ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.contact_number_of_parent}</div>
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
                   value={specimenForm.values.additional_contact_number}
                   onBlur={specimenForm.handleBlur}
                   onChange={specimenForm.handleChange}
                    style={{
                      
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "32px",
                    }}
                  />
                </EuiFormRow>
                {specimenForm.touched.additional_contact_number && specimenForm.errors.additional_contact_number ? (
                  <div style={{ color:"#BD271E" }}>{specimenForm.errors.additional_contact_number}</div>
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
                onClick={setCreateSpecimen(true)}
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
    </form>
  );
};

export default SpecimenForm;
