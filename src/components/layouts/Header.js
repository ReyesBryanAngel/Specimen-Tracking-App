import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiAvatar,
  EuiIcon,
  EuiSideNav,
  EuiText,
} from "@elastic/eui";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

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

  const sideNav = [
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
      icon: <EuiIcon type="home" size="m" />,
    },
    {
      name: "Dashboard",
      id: "dashboard",
      icon: <EuiIcon type="grid" size="m" />,
    },
    {
      name: "Patients",
      id: "patients",
      icon: <EuiIcon type="users" size="m" />,
    },
    {
      name: "Results",
      id: "results",
      icon: <EuiIcon type="userAvatar" size="m" />,
    },
    {
      name: "Specimen Form",
      id: "specimenForm",
      icon: <EuiIcon type="documentEdit" size="m" />,
    },
    {
      name: "Courier",
      id: "courier",
      icon: <EuiIcon type="push" size="m" />,
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <EuiSideNav items={sideNav} className="custom-side-nav" />
      </div>

      {/* Main header */}
      <EuiHeader>
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

            <EuiHeaderLogo href="#">NSF</EuiHeaderLogo>
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
