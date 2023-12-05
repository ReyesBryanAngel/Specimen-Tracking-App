import {
  EuiAvatar,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiIcon,
  EuiSideNav,
  EuiText
} from "@elastic/eui";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from '../../context/DataProvider';
import ApiCall from "../../util/authentication/ApiCall";
import settings from "../../util/images/settings.png"
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);
  const [specimenLoad, setSpecimenLoad] = useState(false);
  const [samples, setSamples] = useState([]);
  const {token, logout, http} = ApiCall();


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

  useEffect(() => {
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
        <><div
          className={`sidebar ${isSideNavOpenOnMobile ? "open" : ""}`}
          ref={sidebarRef}
        >
          <EuiSideNav
            toggleOpenOnMobile={() => toggleOpenOnMobile()}
            isOpenOnMobile={isSideNavOpenOnMobile}
            style={{ width: 248, height: "90vh", display: "flex", flexDirection: "column" }}
            items={sideNavItems} />
        </div><EuiHeader
          style={{
            position: "fixed",
            width: "100%",
            zIndex: "100",
          }}
        >
            <EuiHeaderSection>
              <EuiHeaderSectionItem border="right">
                <EuiHeaderLink
                  style={{
                    border: "none",
                  }}
                  onClick={toggleOpenOnMobile}
                >
                  <EuiIcon type="menu" size="l" />
                </EuiHeaderLink>

                <a
                  href="/"
                  style={{
                    textDecoration: "none",
                    fontSize: "24px",
                    color: "#000000",
                  }}
                >
                  NSF
                </a>
              </EuiHeaderSectionItem>
            </EuiHeaderSection>

            <EuiHeaderSection>
              <EuiHeaderLinks>
                <EuiHeaderLink href="#">
                  <EuiIcon type="email" size="m" />
                </EuiHeaderLink>
                <EuiHeaderLink href="#">
                  <EuiIcon type="bell" size="m" />
                </EuiHeaderLink>
                <EuiHeaderLink href="#">
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
