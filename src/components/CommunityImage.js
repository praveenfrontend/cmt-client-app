import React from "react";
import CardHeader from "./CardHeader";

function CommunityImage() {
  return (
    <div className="col-md-6 col-lg-8 d-none d-md-block d-lg-block">
      <div className="card h-100">
        <CardHeader cardHeaderValue="Test Community Matters" />
        <div className="card-body lead text-muted border-primary">
          <p className="card-text">A Platform for your local community to share, collaborate, learn, inspire and progress..</p>
          <p className="card-text">Promote your programs and connect with local community Participants in your area.</p>
          <p className="card-text">Share program progress with your community participants, share views to improve programs, activities, and take control of community building.</p>
        </div>
      </div>
    </div>
  );
}

export default CommunityImage;
