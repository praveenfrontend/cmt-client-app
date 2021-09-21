import React from "react";
import { Link } from "react-router-dom";

function SideNavigation({ menuHandleValue, roleType }) {

  return (
    <nav className={`side-navbar ${menuHandleValue}`}>
      <div className="side-navbar-wrapper">
        {/* <!-- Sidebar Header    --> */}
        <div className="sidenav-header d-flex align-items-center justify-content-center">
          {/* <!-- Brand Info--> */}
          <div className="sidenav-header-inner text-center">
            <img src="https://dummyimage.com/600x600/ffffff/007bff.jpg&text=CMT" alt="logo" className="img-fluid rounded-circle" />
            <h2 className="h5">Community Matters</h2>
          </div>
          {/* <!-- Small Brand information, appears on minimized sidebar--> */}
          <div className="sidenav-header-logo">
            <Link to="/profile" className="brand-small text-center">
              <strong className="text-primary">CMT</strong>
            </Link>
          </div>
        </div>
        {/* <!-- Sidebar Navigation Menus--> */}
        <div className="main-menu">
          <ul id="side-main-menu" className="side-menu list-unstyled">
          <li>
              <Link to="/profile">
                <i className="fa fa-user text-success"></i>Profile
              </Link>
            </li>
           {(roleType === "admin" || roleType === "agent") &&
            (
              <>
              <li>
              <Link to="/initial-registration-form">
                <i className="fa fa-wpforms text-success"></i>IRF
              </Link>
            </li>
            <li>
              <Link to="/search">
                <i className="fa fa-search text-success"></i>Search
              </Link>
            </li>
            <li>
              <a href="#exampledropdownDropdown" aria-expanded="false" data-toggle="collapse">
                {" "}
                <i class="fa fa-file-text-o text-success"></i>Reports{" "}
              </a>
              <ul id="exampledropdownDropdown" class="collapse list-unstyled">
                <li>
                  <Link to="/programReport">
                    <i className="fa fa-file-text-o text-success"></i>Program Reports
                  </Link>
                </li>
                <li>
                  <Link to="/goalsReport">
                    <i className="fa fa-file-text-o text-success"></i>Goals Reports
                  </Link>
                </li>
                <li>
                  <Link to="/notesReport">
                    <i className="fa fa-file-text-o text-success"></i>Notes Reports
                  </Link>
                </li>
              </ul>
            </li>
            </>
             )}
             
            <li>
              <Link to="/schedule">
                <i className="fa fa-calendar text-success"></i>Schedule
              </Link>
            </li>
            
            <li>
              <Link to="/programDetailsNew">
                <i className="fa fa-list-alt text-success"></i>Programs
              </Link>
            </li>
            {
              (roleType === "admin") &&             
            <li>
              <a href="#exampledropdownDropdownAdmin" aria-expanded="false" data-toggle="collapse">
                {" "}
                <i class="fa fa-user-circle-o text-success"></i>Admin{" "}
              </a>
              <ul id="exampledropdownDropdownAdmin" class="collapse list-unstyled">
                <li>
                  <Link to="/adminAddProgram">
                    <i className="fa fa-file-text-o text-success"></i>Add/Delete Program
                  </Link>
                </li>
                <li>
                  <Link to="/adminDeleteUsers">
                    <i className="fa fa-user-circle-o text-success"></i>Delete User
                  </Link>
                </li>
              </ul>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SideNavigation;
