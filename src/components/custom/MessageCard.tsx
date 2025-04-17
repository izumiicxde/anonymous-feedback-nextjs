"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { X, XIcon } from "lucide-react";
import { IMessage } from "@/models/user.model";
import { useToast } from "@/hooks/use-toast";
import { IApiResponse } from "@/types/apiResponse";
import axios from "axios";
import { formatDate } from "@/helpers/dashboardfn";
import React from "react";

type MessageCardProp = {
  message: IMessage;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProp) => {
  const { toast } = useToast();
  const handleDeleteConfirm = async () => {
    const response = await axios.delete<IApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({
      title: response.data.message,
    });
    onMessageDelete(message._id as string);
  };
  return (
    <Card className="bg-black/20 text-white *:text-white border-none shadow-lg">
      <CardTitle className="w-full h-fit flex justify-end items-end ">
        <Button
          variant={"ghost"}
          className="hover:bg-white/5 text-black/40 hover:text-black m-2"
        >
          <AlertBox handleDeleteConfirm={handleDeleteConfirm}>
            <X className="text-white" />
          </AlertBox>
        </Button>
      </CardTitle>
      <CardContent className="w-full h-full p-5">
        <div className="w-full text-white pb-10 flex  items-center">
          <p className="text-xs">{formatDate(message.createdAt)}</p>
          <p className="text-xs font-light w-full text-end">@anoynomous</p>
        </div>
        <p className="text-lg font-medium min-h-40">{message.content}</p>
      </CardContent>
    </Card>
  );
};

const AlertBox = ({
  handleDeleteConfirm,
  children,
}: {
  handleDeleteConfirm: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-black/40 backdrop-blur-lg border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            deleted message cannot be restored
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MessageCard;
