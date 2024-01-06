import {
  EuiAvatar,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiIcon,
  EuiSideNav,
  EuiText,
  EuiPopover,
  EuiButtonIcon,
  EuiCard,
  EuiImage
} from "@elastic/eui";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiCall from "../../util/authentication/ApiCall";
import nsrcLogo from '../../util/images/nsrc_logo.png';

import settings from "../../util/images/settings.png"
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);
  const [specimenLoad, setSpecimenLoad] = useState(false);
  const [samples, setSamples] = useState([]);
  const {token, logout, http} = ApiCall();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [results, setResults] = useState([]);
  const [viewedLength, setViewedLength] = useState([]);
  const [view, setView] = useState(false);

  const togglePopover = async () => {
    await Promise.all(
      data?.map(async (item) => {
        if (item.result !== null && !item.viewed) {
          const updatedSpecimen = {
            ...item,
            viewed: 1,
          };
          setView(true);
          await http.put(`v1/specimens/${item.id}`, updatedSpecimen);
        }
      })
    );
    setPopoverOpen(!isPopoverOpen);   
  };

  const closePopover = () => {
    setPopoverOpen(false);
  };

  const logoutUser = () => {
    if(token !== undefined){
        logout();
        navigate("/login")
    }
  }

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const closeSidebar = () => {
    setisSideNavOpenOnMobile(false);
  };

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
              const pendingSample = res?.data?.filter(s => s.specimen_status === "Pending");
              setSamples(pendingSample);
              return res?.data;
        })
  })
 
  useEffect(() => {
    const specimenWithResult = data?.filter(r => r.result !== null && !r.viewed);
    const hasResultButNotViewed = data?.filter(r => r.result !== null && !r.viewed)
    setViewedLength(hasResultButNotViewed?.length);

    setResults(specimenWithResult);
    setNotificationCount(specimenWithResult?.length)
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };

    if (isSideNavOpenOnMobile) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSideNavOpenOnMobile]);


  const sideNavItems = [
    {
    
      items: [
        {
          name: (
            <EuiText size="xs">
              <strong>Newborn Screening Facility</strong>
            </EuiText>
          ),
          id: "newbornScreeningFacility",
         
        },
        {
          name: "Home",
          id: "home",
          icon: (
                <EuiIcon
                style={{
                  marginRight: "8px",
                }}
                type="home"
                size="m"
              />
            
          ),
          onClick: () => {
            navigate("/");
            setisSideNavOpenOnMobile(false);
          },
        },
        {
          name: "Dashboard",
          id: "dashboard",
          icon: (
            <EuiIcon
              style={{
                marginRight: "8px",
              }}
              type="grid"
              size="m"
            />
          ),
          onClick: () => {
            navigate("/dashboard");
            setisSideNavOpenOnMobile(false);
          },
        },
        {
          name: "Patients",
          id: "patients",
          icon: (
            <EuiIcon
              style={{
                marginRight: "8px",
              }}
              type="users"
              size="m"
            />
          ),
          onClick: () => {
            navigate("/patients");
            setisSideNavOpenOnMobile(false);
          },
        },
        {
          name: "Results",
          id: "results",
          icon: (
            <EuiIcon
              style={{
                marginRight: "8px",
              }}
              type="userAvatar"
              size="m"
            />
          ),
          onClick: () => {
            navigate("/results");
            setisSideNavOpenOnMobile(false);
          },
        },
        {
          name: "Specimen Form",
          id: "specimenForm",
          icon: (
            <EuiIcon
              style={{
                marginRight: "8px",
              }}
              type="documentEdit"
              size="m"
            />
          ),
          onClick: () => {
            navigate("/add-specimen");
            setisSideNavOpenOnMobile(false);
          },
        },   
        {
          id: "courier",
          icon: (
            <>
              <EuiIcon
                style={{
                  marginRight: "8px",
                }}
                type="push"
                size="m" 
              />
              
              <EuiText size="m" style={{ fontSize: "17px" }}>Courier</EuiText>
              {samples?.length > 0 ?
                <EuiText 
                style={{ 
                  fontSize: "16px", 
                  marginLeft: "10px", 
                  background:"#01b5ac", 
                  color: "#fff", 
                  padding: "4px",
                  borderRadius: "5px",
                  width: "17px",
                  height: "17px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                  }}
                >
                  {samples?.length}
                 </EuiText> : 
                null }
              
            </>
          ),
          onClick: () => {
            navigate("courier");
            setisSideNavOpenOnMobile(false);
          },
        }, 
        {
          id: "settingsAndLogout",
          className: "bottom",
          icon: (
            <div className="bottom">
              <div style={{ display: "flex", alignItems: "center"}} onClick={() => {
                setisSideNavOpenOnMobile(false);
              }}>
                <EuiIcon
                  style={{
                    marginRight: "8px",
                  }}
                  type={settings}
                  size="m"
                />
                <EuiText>Settings</EuiText>
              </div>
              <div style={{ display: "flex", alignItems: "center"}} onClick={() => {
                navigate("/login");
                logoutUser()
                setisSideNavOpenOnMobile(false);
              }}>
                <EuiIcon
                  style={{
                    marginRight: "8px",
                  }}
                  type="exit"
                  size="m"
                />
                <EuiText>Logout</EuiText>
              </div>
            </div>
          )
        },
      ],
    },
  ];


  return (
    <div>
      {!isLoading && data ? (
        <>
        <div
          className={`sidebar ${isSideNavOpenOnMobile ? "open" : ""}`}
          ref={sidebarRef}
        >
          <EuiSideNav
            toggleOpenOnMobile={() => toggleOpenOnMobile()}
            isOpenOnMobile={isSideNavOpenOnMobile}
            style={{ width: 248, height: "90vh", display: "flex", flexDirection: "column" }}
            items={sideNavItems} />
        </div>
        <EuiHeader
          style={{
            position: "fixed",
            width: "100%",
            zIndex: "100",
          }}
        >
          <EuiHeaderSection style={{ position: "relative"}}>
            <EuiHeaderSectionItem>
              <EuiHeaderLink
                style={{
                  border: "none",
                }}
                onClick={toggleOpenOnMobile}
              >
                <EuiIcon type="menu" size="l" />
              </EuiHeaderLink>
              <EuiImage
                style={{ height: "38px", position: "absolute", left: "50px", top: "5px"}}
                src={nsrcLogo}
              />
            </EuiHeaderSectionItem>
          </EuiHeaderSection>

            <EuiHeaderSection>
              <EuiHeaderLinks>
                <EuiHeaderLink href="#">
                  <EuiIcon type="email" size="m" />
                </EuiHeaderLink>
                <div style={{ position: 'relative' }}>
                  <EuiButtonIcon
                    iconType="bell"
                    onClick={togglePopover}
                    aria-label="Notifications"
                    className="notificationButton"
                  />
                
                  {notificationCount > 0 && viewedLength > 0 && !view &&  (
                    <div
                      style={{
                        position: 'absolute',
                        top: '15%',
                        left: '85%',
                        transform: 'translate(-50%, -60%)'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '3px',
                          height: '18px',
                          width: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: '5px'
                        }}
                      >
                        {notificationCount}
                      </div>
                    </div>
                  )}
                  
                  <EuiPopover
                    ownFocus
                    isOpen={isPopoverOpen}
                    closePopover={closePopover}
                    anchorPosition="downRight"
                    title="Notifications"
                    panelClassName="custom-popover-width"
                  >
                    <EuiText>
                      {results?.map((r, index) => {
                        const mother = `${r?.baby_last_name}, ${r?.mothers_first_name}`;
                        let bgColor;
                        switch (r?.result) {
                          case "Elevated":
                            bgColor = "#FF7E62";
                            break;
                          case "Inadequate":
                            bgColor = "#F1D86F";
                            break;
                          case "Normal":
                            bgColor = "#01B5AC";
                            break;
                          default:
                            bgColor = null;
                            break;
                        }
                        return (
                          <EuiCard 
                          key={index} 
                          style={{ 
                            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.2)", 
                            width: "90%",
                            borderRadius: "0",
                          }}
                          >
                            <div style={{ display: "flex", flexDirection: "column"}}>
                              <div style={{ display: "flex", justifyContent:"space-between" }}>
                                <span style={{ backgroundColor: bgColor, padding: "0 30px 0 30px", borderRadius:"3px" }}>
                                  {r.result}
                                </span>
                                <div>
                                  <span>1 min ago</span>
                                  {/* <span>Time Ago: {calculateTimeAgo(r.updated_at)}</span> */}
                                </div>
                              </div>
                             
                              <span style={{ color: "#01B5AC", alignSelf: "flex-start" }}>{r?.result.split(" ")[0]} Findings</span>
                              <span style={{ alignSelf: "flex-start" }}>{mother}</span>
                            </div>
                          </EuiCard>
                        )
                      })}
                    </EuiText>
                  </EuiPopover>
                </div>

                <EuiHeaderLink href="#" style={{ marginRight: "10px" }}>
                  <EuiAvatar name="John Doe" size="m" />
                </EuiHeaderLink>

              </EuiHeaderLinks>
            </EuiHeaderSection>
          </EuiHeader></>
        ) : null}
    </div>
  );
};

export default Header;
