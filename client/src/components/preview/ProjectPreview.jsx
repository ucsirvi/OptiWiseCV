function ProjectPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Projects
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.project?.map((project, index) => (
        <div key={index} className="my-5">
          <h2 className="text-xs font-bold flex justify-between ">
            {project?.title}
            <span className="font-light ">{project?.year}</span>
          </h2>
          <div
            className="text-xs my-2  text-justify leading-tight"
            style={{
              wordBreak: "break-word",
              hyphens: "auto",
              lineHeight: "1.4",
              marginBottom: "0.5rem",
            }}
            dangerouslySetInnerHTML={{ __html: project?.description }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;
