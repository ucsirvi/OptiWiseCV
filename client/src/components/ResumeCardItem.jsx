import { Loader2Icon, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/dropdownmenu.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../components/alertdialog.jsx";
import GlobalApi from "../../service/GlobalApi.js";
import { toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await GlobalApi.DeleteResumeById(resume.documentId);
      toast.success("Resume Deleted!");
      refreshData();
    } catch (error) {
      toast.error("Failed to delete resume. Please try again.");
    } finally {
      setLoading(false);
      setOpenAlert(false);
    }
  };

  const handleNavigation = (url) => {
    navigation(url);
  };

  return (
    <div className="relative">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4"
          style={{ borderColor: resume?.themeColor }}
        >
          <div className="flex items-center justify-center h-[180px]">
            <img src="/cv.png" width={80} height={80} alt="Resume Preview" />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{ background: resume?.themeColor }}
      >
        <h2 className="text-sm">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 bg-slate-700 rounded-md shadow-lg p-2">
            <DropdownMenuItem
              onClick={() =>
                handleNavigation(`/dashboard/resume/${resume.documentId}/edit`)
              }
              className="hover:bg-cyan-700 p-2 rounded"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleNavigation(`/my-resume/${resume.documentId}/view`)
              }
              className="hover:bg-cyan-700 p-2 rounded"
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleNavigation(`/my-resume/${resume.documentId}/download`)
              }
              className="hover:bg-cyan-700 p-2 rounded"
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenAlert(true)}
              className="hover:bg-cyan-700 p-2 rounded"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this resume?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
