import React, {useEffect, useState} from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard,
    EuiText,
    EuiButton,
    EuiPopover,
    EuiButtonEmpty,
    EuiListGroup,
    EuiIcon
} from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ApiCall from '../../util/authentication/ApiCall';
import { useData } from '../../context/DataProvider';
import courier from '../../config/courier';

const CourierSample = () => {
    const navigate = useNavigate();
    const { http } = ApiCall();
    const [specimenLoad, setSpecimenLoad] = useState(false);
    const [filteredCourier, setFilteredCourier] = useState([]);
    const [dateOfPickup, setDateofPickup] = useState(null);
    const [courierData, setCourierData] = useState([]);
    const { format } = require('date-fns');

    const goBackFunction = () => {
        navigate("/courier");
    }

    const { data: refreshSamples, isLoading: refreshSampleLoading } = useQuery({
        queryKey: ["sample"],
        enabled: !specimenLoad,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        queryFn: () =>
            http
                .get(`v1/specimens/refresh-samples`)
                .then((res) => {
                    
                    setSpecimenLoad(true);
                   
                    return res?.data;
                })
    })

    const { data: couriers, isLoading: courierLoading } = useQuery({
        queryKey: ["courier"],
        enabled: !specimenLoad,
        retryDelay: 500,
        refetchOnWindowFocus: false,
        queryFn: () =>
            http
                .get(`v1/specimens/show-couriers`)
                .then((res) => {
                    setSpecimenLoad(true);

                    // console.log(res?.data);
                    setCourierData(res?.data);
                    return res?.data;
                })
    })

    useEffect(() => {
        if (!refreshSampleLoading && !courierLoading && couriers && refreshSamples) {
            const trackingNumber = refreshSamples?.samples?.map(t => t.tracking_number)[0];
            if (trackingNumber) {
                const countMatchingSamples = (trackingNumber) => {
                    return couriers.filter(courier => courier.tracking_number === trackingNumber);
                };
                const matchingTrackingNumber = countMatchingSamples(trackingNumber);
                const dop = matchingTrackingNumber[0]?.date_of_pickup;
                const convert = new Date(dop);
                const formattedDate = format(convert, "MMMM dd, yyyy");
                setDateofPickup(formattedDate);
                setFilteredCourier(matchingTrackingNumber);
            }
        }
    },[refreshSampleLoading, courierLoading, couriers, refreshSamples, format])

    const returnJsx  = !refreshSampleLoading && refreshSamples && !courierLoading && couriers

    return (
        <>
         <EuiIcon 
            type="arrowLeft" 
            size="l" 
            color="primary"
            style={{ marginBottom: "30px" }}
            onClick={goBackFunction}
         />
            <div className="main-content">
                {returnJsx ? (
                    <div className="home-container">
                        <EuiFlexGroup style={{ gap: "20px", marginBottom: "20px" }}>
                            <EuiFlexItem>

                                <div className="flex-row" style={{ display:"flex", gap:"30px" }}>
                                    {filteredCourier.map((c, index) => {
                                         const courierTrackingNumber = `${c.courier}-${c.tracking_number}`;
                                        return (
                                            <div className='flex-col'>                                            
                                                <div style={{ textAlign: "left" }}>
                                                    <h4 style={{ alignSelf: "self-start" }}>{courierTrackingNumber}</h4>
                                                </div>
                                                <div className='flex-row'>
                                                    <div className="flex-col" style={{ display: "flex", flexWrap: "wrap" }}>
                                                        <span style={{ fontSize: "14px" }}>Date of Pickup</span>
                                                        <EuiText style={{ fontSize: "15px" }}>{dateOfPickup}</EuiText>
                                                    </div>
                                                    <div className="flex-col" style={{ paddingLeft: "20px" }}>
                                                        <span style={{ fontSize: "14px" }}>Samples</span>
                                                        <EuiText style={{ fontSize: "15px" }}>{refreshSamples?.samples.length}</EuiText>
                                                    </div>
                                                    <div className="flex-col">
                                                        <span style={{ fontSize: "14px" }}>Status</span>
                                                        <EuiText style={{ fontSize: "15px" }}>{c.result}</EuiText>
                                                    </div>
                                                </div>                                              
                                            </div>
                                        )
                                    })}
                                </div>
                            </EuiFlexItem>
                            <EuiFlexItem style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                                {refreshSamples?.samples?.map((sample, index) => {
                                     const dateOfBirth = new Date(sample.date_and_time_of_birth);
                                     const formattedDate = format(dateOfBirth, "MMMM dd, yyyy");
                                    const mother = `${sample.baby_last_name}, ${sample.mothers_first_name}`;
                                    return (
                                        <EuiCard
                                            style={{ width: '85%' }}
                                            key={index}
                                            textAlign="left"
                                        >
                                            <h4>{mother}</h4>
                                            <div className="flex-row" style={{ display:"flex", gap:"30px" }}>
                                                <div className="flex-col" style={{display:"flex", flexWrap: "wrap" }}>
                                                    <span style={{ fontSize: "14px" }}>Birthday</span>
                                                    <EuiText style={{ fontSize: "15px" }}>{formattedDate}</EuiText>
                                                </div>
                                                <div className="flex-col" style={{ paddingLeft: "20px" }}>
                                                    <span style={{ fontSize: "14px" }}>Sex</span>
                                                    <EuiText style={{ fontSize: "15px" }}>{sample.sex}</EuiText>
                                                </div>
                                                <div className="flex-col">
                                                    <span style={{ fontSize: "14px" }}>Specimen Status</span>
                                                    <EuiText style={{ fontSize: "15px" }}>{sample.specimen_status}</EuiText>
                                                </div>
                                            </div>
                                        </EuiCard>
                                    )
                                })}
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </div>
                ): <div>Loading...</div>}
                
            </div>
        </>
    )
}

export default CourierSample;