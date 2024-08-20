'use client'
import React from "react";
import DeleteIcon from "./Icons/DeleteIcon";
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
import { DeletePost } from "@/actions/DeletePost";

interface DeletePostDialogProps{
    _id:string
}

const DeletePostDialog = ({_id}:DeletePostDialogProps) => {
    const deletePost = async () => {
     await DeletePost(_id) 
    }
    
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <DeleteIcon />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this post from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:text-red-500 hover:bg-white" onClick={() => {
              deletePost()
            }
            }>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeletePostDialog;
