import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import ProgramReport from "./ProgramReport";

function Reports(props) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <section className="forms">
        <div className="container-fluid"></div>
      </section>
    </LoadingOverlay>
  );
}

export default Reports;
