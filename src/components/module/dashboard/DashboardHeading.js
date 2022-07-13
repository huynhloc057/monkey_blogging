import React from "react";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="mb-10 flex items-start justify-between p-3">
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
