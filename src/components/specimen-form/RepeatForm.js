import React, {useState} from 'react'
import {
    EuiButton,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiRadio,
    EuiProvider,
    EuiDatePicker
  } from "@elastic/eui";
  import { useNavigate } from "react-router-dom";
  import { useQuery } from "@tanstack/react-query";
  import { useData } from '../../context/DataProvider';
  import ApiCall from '../../util/authentication/ApiCall';
  import  { SpecimenFormik } from "../../components/formikData";
  import moment from 'moment';

const RepeatForm = () => {
    const navigate = useNavigate();
    const { specimenData, dispatch, createSpecimen } = useData();
   
    const [startDate, setStartDate] = useState(moment());
    const [specimenLoad, setSpecimenLoad] = useState(false);
    const { http } = ApiCall();

    
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
                    return res?.data;
                })
    })

    const specimenForm = SpecimenFormik(specimenData, dispatch, navigate, createSpecimen, refreshSpecimen, refreshSpecimen);

    const handleCheckboxOther = (column) => {
        const columnNames = ["doctor", "midwife", "nurse"].includes(column);
    
        if (columnNames) {
          specimenForm.setFieldValue("practitioner_profession_other", "");  
        }
    
        specimenForm.setFieldValue("practitioner_profession", column);
      }

    const handleDateOfCollection = (date) => {
        setStartDate(date);
        const formatDateOfCollection = date.format("YYYY-MM-DD HH:mm:ss");
        specimenForm.setFieldValue("date_and_time_of_collection", formatDateOfCollection);
    }

    const saveData = (values) => {
        if (!createSpecimen) {
            dispatch({ type: 'UPDATE', payload: values });
            navigate("/add-specimen/specimen-review");
        }
    }

    return (
        <form>
          <div className="main-content">
            {!refreshSpecimenLoading && refreshSpecimen ? (
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
                      Specimen Form Repeat
                    </h4>
                  </EuiFlexItem>
                  
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
                        {refreshSpecimen?.samples?.baby_last_name}
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
                        {refreshSpecimen?.samples?.for_multiple_births}
                    </EuiFlexItem>
                  </EuiFormRow>
                  <EuiFormRow
                    fullWidth
                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                    label={"Mother's First Name"}
                   >
                    <EuiFlexItem
                        style={{
                            marginTop: "5px",
                            gap: "5px",
                            fontWeight: "normal"
                        }}
                    >
                        {refreshSpecimen?.samples?.mothers_first_name}
                    </EuiFlexItem>
                  </EuiFormRow>
                  <EuiFormRow
                    fullWidth
                    style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                    label={"Date of Birth"}
                   >
                    <EuiFlexItem
                        style={{
                            marginTop: "5px",
                            gap: "5px",
                            fontWeight: "normal"
                        }}
                    >
                        {refreshSpecimen?.samples?.date_and_time_of_birth}
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
                        {refreshSpecimen?.samples?.sex}
                    </EuiFlexItem>
                  </EuiFormRow>
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
                    onClick={() => {
                        saveData(specimenForm?.values)
                    }}
                    // type="submit"
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
            ) : <div>Loading...</div>}
          </div>
        </form>
      );
}

export default RepeatForm;