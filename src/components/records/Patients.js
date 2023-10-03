import React, { useState } from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiPagination,
    EuiTablePagination
} from "@elastic/eui";
import patients from '../../config/patients';


const Patients = () => {
  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(3); // Initialize with your desired number of patients per page

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setActivePage(0); // Reset to the first page when changing page size
  };

  const startIndex = activePage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, patients.length);

  const pageCount = Math.ceil(patients.length / pageSize);

    return (
        <div className="main-content">
            <div className="specimen-form-container">
                <div className="specimen-form-content-container">
                    <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                        <h5
                            style={{
                            marginTop: "0",
                            marginBottom: "0",
                            fontSize: "20px"
                            }}
                        >
                        <>Patients (by Mother's Name)</>
                        </h5>
                        <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                            {patients.slice(startIndex, endIndex).map((patient, index) => (
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
                            itemsPerPageOptions={[2, 5, 10, 20]} // Define available page size options
                            pageCount={pageCount}
                            onChangeItemsPerPage={handlePageSizeChange} // Handle page size change
                            onChangePage={handlePageChange} // Handle page change
                            className="custom-eui-pagination"
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patients;