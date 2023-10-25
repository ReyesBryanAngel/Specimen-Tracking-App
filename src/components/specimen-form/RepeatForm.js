import React, {useState} from 'react'
import {
    EuiButton,
    EuiCheckbox,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiRadio,
    EuiText,
  } from "@elastic/eui";
  import { useData } from '../../context/DataProvider';

const RepeatForm = () => {
    const [type, setType] = useState(null);
    const { data } = useData();

    const nameArray = data.name.split(" ");
    const firstName = nameArray.slice(0, nameArray.length - 1).join(" ");
    const lastName = nameArray.pop();

    const onChange = (optionId) => {
      setType(optionId);
    };
    return (
        <div className="main-content">
            <div className="specimen-form-container">
                <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                    <EuiFlexItem className="specimen-form-title-container">
                    <h4
                        style={{
                        marginTop: "0",
                        marginBottom: "0",
                        fontSize: "20px",
                        }}
                    >
                        <>Specimen Form (Repeat)</>
                    </h4>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow
                            fullWidth
                            style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                            label={"Baby’s Last Name"}
                        >
                            <EuiText size="s">{lastName}</EuiText>
                        </EuiFormRow>
                    </EuiFlexItem>
                   
                    <EuiFlexItem>
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Baby’s First Name (Optional)"}
                    >
                        <EuiText size="s">{firstName}</EuiText>
                    </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"For Multiple Births"}
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
                        <option value="option_one">Option one</option>
                        <option value="option_two">Option two</option>
                        </select>
                    </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Mother's First Name"}
                    >
                        <EuiFieldText
                        id="motherFirstName"
                        name="motherFirstName"
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
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Date of Birth"}
                    >
                        <input
                        type="datetime-local"
                        id="dateOfBirth"
                        name="dateOfBirth"
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
                            onChange={onChange}
                            name="radio group"
                            label="Male"
                            value="male"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        <EuiRadio
                            onChange={onChange}
                            name="radio group"
                            label="Female"
                            value="female"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        <EuiRadio
                            onChange={onChange}
                            name="radio group"
                            label="Ambiguous"
                            value="ambiguous"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        </EuiFlexItem>
                    </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Baby’s Weight (in Grams)"}
                    >
                        <EuiFieldText
                        id="weight"
                        name="weight"
                        placeholder="Input"
                        type="number"
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
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Date and Time of Collection"}
                    >
                        <input
                        type="datetime-local"
                        id="dateOfCollection"
                        name="dateOfCollection"
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
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Age of Gestation (in Weeks)"}
                    >
                        <EuiFieldText
                        id="ageOfGestation"
                        name="ageOfGestation"
                        placeholder="Input"
                        type="number"
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
                            onChange={onChange}
                            name="radio group"
                            label="Heel"
                            value="heel"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        <EuiRadio
                            onChange={onChange}
                            name="radio group"
                            label="Cord"
                            value="cord"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        <EuiRadio
                            onChange={onChange}
                            name="radio group"
                            label="Venous"
                            value="venous"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        </EuiFlexItem>
                    </EuiFormRow>
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
                            onChange={onChange}
                            label="Breast"
                            value="breast"
                            />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiCheckbox
                            onChange={onChange}
                            label="Lactose Formula"
                            value="lactoseFormula"
                            />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiCheckbox
                            onChange={onChange}
                            label="Soy/Lactose-Free"
                            value="lactoseFree"
                            />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiCheckbox onChange={onChange} label="NPO" value="npo" />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiCheckbox onChange={onChange} label="TPN" value="tpn" />
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
                        id="placeOfCollection"
                        name="placeOfCollection"
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
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Hospital/Place of Birth"}
                    >
                        <EuiFieldText
                        id="placeOfBirth"
                        name="placeOfBirth"
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
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Attending Practitioner (Last Name, First Name)"}
                    >
                        <EuiFieldText
                        id="attendPractitioner"
                        name="attendPractitioner"
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
                            onChange={onChange}
                            name="radio group"
                            label="Doctor"
                            value="doctor"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        <EuiRadio
                            onChange={onChange}
                            name="radio group"
                            label="Nurse"
                            value="nurse"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        <EuiRadio
                            onChange={onChange}
                            name="radio group"
                            label="Midwife"
                            value="midwife"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        <EuiRadio
                            onChange={onChange}
                            name="radio group"
                            label="Other_____"
                            value="other"
                            style={{
                            width: "95%",
                            display: "flex",
                            fontWeight: "normal",
                            }}
                        />
                        </EuiFlexItem>
                    </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Practitioner’s Day Contact Number"}
                    >
                        <EuiFieldText
                        id="practitionerDayContactNumber"
                        name="practitionerDayContactNumber"
                        placeholder="Input"
                        type="number"
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
                    <EuiFormRow
                        fullWidth
                        style={{ fontSize: "12px", fontWeight: "bold", width: "100%" }}
                        label={"Practitioner’s Mobile Number"}
                    >
                        <EuiFieldText
                        id="practitionerMobileNumber"
                        name="practitionerMobileNumber"
                        placeholder="Input"
                        type="number"
                        style={{
                            width: "95%",
                            border: "1px solid #D3D3D3",
                            borderRadius: "4px",
                            height: "32px",
                        }}
                        />
                    </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        </div>
    )
}

export default RepeatForm;