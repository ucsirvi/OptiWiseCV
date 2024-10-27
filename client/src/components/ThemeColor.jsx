import { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/popover.jsx";
import { Button } from "../components/button.jsx";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "../context/ResumeInfoContext.jsx";
import GlobalApi from "../../service/GlobalApi.js";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(
    resumeInfo?.themeColor || ""
  );
  const { resumeId } = useParams();

  const onColorSelect = (color) => {
    if (!resumeInfo) {
      console.error("Resume info is not available.");
      return;
    }

    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });

    const data = {
      data: {
        themeColor: color,
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        console.log(resp);
        toast("Theme Color Updated");
      })
      .catch((err) => {
        console.error("Failed to update theme color:", err);
        toast.error("Failed to update theme color. Please try again.");
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(color)}
              className={`h-5 w-5 rounded-full cursor-pointer
               hover:border-black border
               ${selectedColor === color ? "border border-black" : ""}
              `}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
