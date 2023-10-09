import React, { useState } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiButton,
    EuiPopover,
    EuiPopoverTitle,
    EuiButtonEmpty,
    EuiListGroup,
    EuiTablePagination
} from "@elastic/eui";
import patients from '../../config/patients';


const Patients = () => {
  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [patientSetter, setPatientSetter] = useState([...patients])

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

  const sortByBirthday = () => {
    const sortedPatients = [...patients].sort((a, b) => {
        const dateA = new Date(a.birthday);
        const dateB = new Date(b.birthday);
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

    return (
        <div className="main-content">
            <div className="specimen-form-container">
                <div className="specimen-form-content-container">
                    <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                        <div className="flex-col" style={{ width: "100%"}}>
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
                            <div style={{ alignSelf:"end", marginTop: "10px" }}>
                                <EuiPopover
                                    id="dropdownButtonExample"
                                    ownFocus
                                    button={
                                        <EuiButtonEmpty
                                        size="s"
                                        iconType="arrowDown"
                                        iconSide="right"
                                        onClick={togglePopover}
                                        style={{ textDecoration:"none", color:"black"}}
                                        >
                                        Sort by
                                        </EuiButtonEmpty>
                                    }
                                    isOpen={isPopoverOpen}
                                    closePopover={closePopover}
                                    panelPaddingSize="none"
                                >
                                <EuiListGroup
                                    listItems={items}
                                    maxWidth="none"
                                    color="black"
                                    gutterSize="s"
                                    className="custom-eui-pagination"
                                />
                                </EuiPopover>
                            </div>
                        </div>
                        <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                            {patientSetter.slice(startIndex, endIndex).map((patient, index) => (
                                    <EuiCard
                                        style={{ width: '95%' }}
                                        key={index}
                                        textAlign="left"
                                    >
                                        <h4>{patient.name}</h4>
                                        <div className="flex-row">
                                                <div className="flex-col">
                                                    <span style={{ fontSize: "14px"}}>Birthday</span>
                                                    <EuiText style={{ fontSize: "16px" }}>{patient.birthday}</EuiText>
                                                </div>
                                                <div className="flex-col">
                                                    <span style={{ fontSize: "14px"}}>Sex</span>
                                                    <EuiText style={{ fontSize: "16px" }}>{patient.sex}</EuiText>
                                                </div>
                                                <div className="flex-col">
                                                    <span style={{ fontSize: "14px"}}>Specimen Status</span>
                                                    <EuiText style={{ fontSize: "16px" }}>{patient.specimen_status}</EuiText>
                                                </div>
                                            </div>
                                    </EuiCard>
                                ))}
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <div className="custom-eui-pagination">                    
                        <EuiTablePagination
                            style={{ width: '100%' }}
                            activePage={activePage}
                            itemsPerPage={pageSize}
                            itemsPerPageOptions={[2, 5, 10, 20]}
                            pageCount={pageCount}
                            onChangeItemsPerPage={handlePageSizeChange}
                            onChangePage={handlePageChange}
                            className="custom-eui-pagination"  
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patients;