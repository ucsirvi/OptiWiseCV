import { Button } from "../button.jsx";
import { Input } from "../input.jsx";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor.jsx";
import { ResumeInfoContext } from "../../context/ResumeInfoContext.jsx";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../service/GlobalApi.js";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  year: "",
  description: "",
};

function Project() {
  const [projectList, setProjectList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo && setProjectList(resumeInfo?.project);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setProjectList(newEntries);
  };

  const AddNewProject = () => {
    setProjectList([
      ...projectList,
      {
        title: "",
        year: "",
        description: "",
      },
    ]);
  };

  const RemoveProject = () => {
    setProjectList((projectList) => projectList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = projectList.slice();
    newEntries[index][name] = e.target.value;

    setProjectList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      project: projectList,
    });
  }, [projectList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        project: projectList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(projectList);

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Projects</h2>
        <p>Add Your Project</p>
        <div>
          {projectList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs"> Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>

                <div>
                  <label className="text-xs">Year</label>
                  <Input
                    type="year"
                    name="year"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.year}
                  />
                </div>

                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.description}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "description", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewProject}
              className="text-primary"
            >
              {" "}
              + Add More Projects
            </Button>
            <Button
              variant="outline"
              onClick={RemoveProject}
              className="text-primary"
            >
              {" "}
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Project;
