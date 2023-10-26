import React, { createContext, useContext, useState, useReducer } from 'react';
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
 
  const initialSpecimenState = {
    type_of_sample: '',
    baby_last_name: '',
    baby_first_name: '',
    for_multiple_births: '',
    mothers_first_name: '',
    date_and_time_of_birth: '',
    sex: '',
    babys_weight_in_grams: '',
    date_and_time_of_collection: '',
    age_of_gestation_in_weeks: '',
    specimens: '',
    place_of_collection: '',
    place_of_birth: '', 
    attending_practitioner: '',
    practitioner_profession: '',
    practitioner_profession_other: '',
    practitioners_day_contact_number: '',
    practitioners_mobile_number: '',
    baby_status: '',
    baby_status_cont: '',
    name_of_parent: '',
    number_and_street: '',
    barangay_or_city: '',
    province: '',
    zip_code: '',
    contact_number_of_parent: '',
    additional_contact_number: '',
  }

  const specimenReducer = (state, action) => {
    switch (action.type) {
      case 'RESET':
        return initialSpecimenState;
      case 'UPDATE':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const [specimenData, dispatch] = useReducer(specimenReducer, initialSpecimenState);
 
  return (
    <DataContext.Provider 
      value={{ 
        data, 
        setData, 
        specimenData,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
