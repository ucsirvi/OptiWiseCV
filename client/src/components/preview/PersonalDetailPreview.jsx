import React from "react";
import PropTypes from "prop-types";

function PersonalDetailPreview({ resumeInfo }) {
  if (!resumeInfo) {
    return (
      <div className="text-center text-red-500">
        No resume information available.
      </div>
    );
  }

  const {
    themeColor = "#000",
    firstName = "N/A",
    lastName = "N/A",
    jobTitle = "N/A",
    address = "N/A",
    phone = "N/A",
    email = "N/A",
  } = resumeInfo;

  return (
    <div>
      <h1
        className="font-bold text-xl text-center"
        style={{ color: themeColor }}
      >
        {firstName} {lastName}
      </h1>
      <h2 className="text-center text-sm font-medium">{jobTitle}</h2>
      <h3
        className="text-center font-normal text-xs"
        style={{ color: themeColor }}
      >
        {address}
      </h3>
      <div className="flex justify-between">
        <h4 className="font-normal text-xs" style={{ color: themeColor }}>
          {phone}
        </h4>
        <h4 className="font-normal text-xs" style={{ color: themeColor }}>
          {email}
        </h4>
      </div>
      <hr className="border-[1.5px] my-2" style={{ borderColor: themeColor }} />
    </div>
  );
}

PersonalDetailPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    themeColor: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    jobTitle: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default PersonalDetailPreview;
