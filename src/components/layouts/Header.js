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
} from "@elastic/eui";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const sideNavItems = [
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
        setIsSidebarOpen(false);
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
        setIsSidebarOpen(false);
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
        setIsSidebarOpen(false);
      },
    },
    {
      name: "Courier",
      id: "courier",
      icon: (
        <EuiIcon
          style={{
            marginRight: "8px",
          }}
          type="push"
          size="m"
        />
      ),
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <EuiSideNav
          style={{
            border: "none",
          }}
          items={sideNavItems}
          className="custom-side-nav"
        />
      </div>

      {/* Main header */}
      {/* make header fixed but also take the space of the container */}
      <EuiHeader
        style={{
          position: "fixed",
          width: "100%",
          zIndex: "100",
        }}
      >
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem border="right">
            {/* Hamburger Icon */}
            <EuiHeaderLink
              style={{
                border: "none",
              }}
              onClick={toggleSidebar}
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
            {/* Mail Icon */}
            <EuiHeaderLink href="#">
              <EuiIcon type="email" size="m" />
            </EuiHeaderLink>

            {/* Bell Icon */}
            <EuiHeaderLink href="#">
              <EuiIcon type="bell" size="m" />
            </EuiHeaderLink>
            <EuiHeaderLink href="#">
              {/* User Avatar */}
              <EuiAvatar name="John Doe" size="m" />
            </EuiHeaderLink>
          </EuiHeaderLinks>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  );
};

export default Header;
