import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import ProfileForm from "./ProfileForm";

const menuItems = [{ link: `/`, value: "Edit Profile" }];

const EditProfileAlert = () => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-green-600 text-white w-fit text-sm hover:text-green-600 hover:bg-white hover:font-bold">
            Edit Profile
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-fit ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl font-extrabold">Profile Information</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
             Change your profile details
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ProfileForm/>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditProfileAlert;
