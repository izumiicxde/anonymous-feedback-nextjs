"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/message.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
const page = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post(`/api/send-message`, {
        username: username,
        content: data.content,
      });
      toast({
        title: response.data.message,
      });
      if (response.data.success) {
        setContent("");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: "User is not accepting messages at the moment.",
      });
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex justify-center pt-10 px-5 lg:px-0">
      <div className="w-full h-full max-w-3xl ">
        <h1 className="text-5xl font-bold uppercase w-full text-center">
          Public Feedback page.
        </h1>
        <div className="w-full h-full pt-10">
          <p className="text-xl ">Send anoynomous message to @{username}</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pt-5"
            >
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Textarea
                      {...field}
                      // value={content}
                      // onChange={(e) => setContent(e.target.value)}
                      placeholder="enter your anoynomous message here."
                      className="text-white bg-black/5 border-white/30 placeholder:text-white/60 "
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full lg:w-52 bg-white/80 hover:bg-white/70 text-black"
              >
                Send
              </Button>
            </form>
          </Form>
        </div>

        <div className="w-full h-full pb-5 pt-10 text-center ">
          <h2 className="text-md font-light tracking-wide space-x-2">
            Want your own feedback setup?
            <Button className=" text-white" variant={"link"}>
              <Link href={"/signup"}>Create your account</Link>
            </Button>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default page;
