import React, { useEffect, useState } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiPopover,
    EuiButtonEmpty,
    EuiListGroup,
    EuiTablePagination,
    EuiImage
} from "@elastic/eui";
import patients from '../../config/patients';
import emptyPatient from '../../util/images/no_patients.png';
import  { AddSpecimenButton } from "../../components/add-specimen/AddSpecimenButton";
import { useQuery } from "@tanstack/react-query";
import ApiCall from '../../util/authentication/ApiCall';

const Patients = () => {
  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [specimenLoad, setSpecimenLoad] = useState(false);
  const [patientSetter, setPatientSetter] = useState([...patients])
  const { http } = ApiCall();

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setActivePage(0);
  };

  const startIndex = activePage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, patients.length);

  const pageCount = Math.ceil(patients.length / pageSize);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["specimen"],
    enabled: !specimenLoad,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    queryFn: () =>
        http
            .get(`v1/specimens/all-samples`)
            .then((res) => {
                setSpecimenLoad(true);
                return res?.data;
            })
  })

  const sortByBirthday = () => {
   
    const sortedPatients = [...data].sort((a, b) => {
        const dateA = new Date(a.date_and_time_of_birth);
        const dateB = new Date(b.date_and_time_of_birth);
        return dateA - dateB;
      });
      setPatientSetter(sortedPatients);
    closePopover();
  };


  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const items = [
    {
      label: 'Birthday',
      onClick: () => {
        sortByBirthday();
      },
    }
  ];

  const conditionalClassName = data?.length > 0 ? "main-content" : "login-content"

    return (
        <div className={conditionalClassName}>
            <div className="specimen-form-container">
                <div className="specimen-form-content-container">
                {data?.length === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems:"center", textAlign:"center" }}>
                        <div>
                            <EuiImage
                                size="l"
                                src={emptyPatient}
                            />
                        </div>
                        <div>
                            <EuiText size='m' style={{ fontSize:"20px", fontWeight:"500" }}>You have no Patients</EuiText>
                            <EuiText size='s'>Fill up a Specimen Form to add Patients to this page.</EuiText>
                        </div>     
                    </div>          
                )}
                {!isLoading && data?.length !== 0 ? (
                        <>
                            <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                                <div className="flex-col" style={{ width: "100%" }}>
                                    <div>
                                        <h5
                                            style={{
                                                marginTop: "0",
                                                marginBottom: "0",
                                                fontSize: "20px"
                                            }}
                                        >
                                            <>Patients (by Mother's Name)</>
                                        </h5>
                                    </div>
                                    <div style={{ alignSelf: "end", marginTop: "10px" }}>
                                        <EuiPopover
                                            id="dropdownButtonExample"
                                            ownFocus
                                            button={<EuiButtonEmpty
                                                size="s"
                                                iconType="arrowDown"
                                                iconSide="right"
                                                onClick={togglePopover}
                                                style={{ textDecoration: "none", color: "black" }}
                                            >
                                                Sort by
                                            </EuiButtonEmpty>}
                                            isOpen={isPopoverOpen}
                                            closePopover={closePopover}
                                            panelPaddingSize="none"
                                        >
                                            <EuiListGroup
                                                listItems={items}
                                                maxWidth="none"
                                                color="black"
                                                gutterSize="s"
                                                className="custom-eui-pagination" />
                                        </EuiPopover>
                                    </div>
                                </div>
                                <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                                    {data.slice(startIndex, endIndex).map((patient, index) => {
                                        const { format } = require('date-fns');
                                        const dateOfBirth = new Date(patient.date_and_time_of_birth);
                                        const formattedDate = format(dateOfBirth, "MMMM dd, yyyy");
                                        const mother = `${patient.baby_last_name}, ${patient.mothers_first_name}`;
                                        return (
                                            <EuiCard
                                                key={index}
                                                style={{ 
                                                    width: '95%',
                                                    height: '95px',
                                                    backgroundColor: "#fff",
                                                    border: '1px solid rgba(0, 0, 0, 0.1)',
                                                    boxShadow: '0px 4px 8px -6px rgba(0, 0, 0, 0.6)',
                                                }}
                                            >
                                                <div style={{ textAlign: "left", marginTop: "-17px" }}>
                                                    <h4 style={{ alignSelf: "self-start" }}>{mother}</h4>
                                                </div>
                                                <div className="flex-row" style={{ display:"flex", gap:"10px" }}>
                                                    <div className="flex-col" style={{display:"flex",  whiteSpace: "nowrap" }}>
                                                        <span style={{ fontSize: "14px", alignSelf: "self-start" }}>Birthday</span>
                                                        <EuiText style={{ fontSize: "15px" }}>{formattedDate}</EuiText>
                                                    </div>
                                                    <div className="flex-col" style={{ paddingLeft: "20px" }}>
                                                        <span style={{ fontSize: "14px" }}>Sex</span>
                                                        <EuiText style={{ fontSize: "15px" }}>{patient.sex}</EuiText>
                                                    </div>
                                                    <div className="flex-col">
                                                        <span style={{ fontSize: "14px",  whiteSpace: "nowrap" }}>Specimen Status</span>
                                                        <EuiText style={{ fontSize: "15px", alignSelf: "self-start" }}>{patient.specimen_status}</EuiText>
                                                    </div>
                                                </div>
                                            </EuiCard>
                                        );

                                    })}
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <div className="custom-eui-pagination">
                                <EuiTablePagination
                                    activePage={activePage}
                                    itemsPerPage={pageSize}
                                    itemsPerPageOptions={[2, 5, 10, 20]}
                                    pageCount={pageCount}
                                    onChangeItemsPerPage={handlePageSizeChange}
                                    onChangePage={handlePageChange}
                                    
                                />
                            </div>
                        </>
                    ): data?.length !== 0 && <div>Loading...</div>}
                </div>
            </div>
            <AddSpecimenButton />
        </div>
    )
}

export default Patients;