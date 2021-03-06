import React from "react";
import { Link } from "react-router-dom";

function SideNavigation({ menuHandleValue }) {
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
            <Link to="/initial-registration-form" className="brand-small text-center">
              <strong className="text-primary">CMT</strong>
            </Link>
          </div>
        </div>
        {/* <!-- Sidebar Navigation Menus--> */}
        <div className="main-menu">
          <ul id="side-main-menu" className="side-menu list-unstyled">
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

            <li>
              <Link to="/feed">
                <i className="fa fa-feed"></i>Feed
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <i className="fa fa-user-o"></i>Profile
              </Link>
            </li>
            <li>
              <Link to="/schedule">
                <i className="fa fa-clock-o"></i>Schedule
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SideNavigation;
