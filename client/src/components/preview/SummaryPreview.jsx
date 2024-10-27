import PropTypes from "prop-types";

function SummaryPreview({ resumeInfo }) {
  return (
    <p
      className="text-xs my-2  text-justify leading-tight"
      style={{
        wordBreak: "break-word",
        hyphens: "auto",
        lineHeight: "1.4",
        marginBottom: "0.5rem",
      }}
    >
      {resumeInfo?.summary || "No summary available."}
    </p>
  );
}

SummaryPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    summary: PropTypes.string,
  }),
};

export default SummaryPreview;
