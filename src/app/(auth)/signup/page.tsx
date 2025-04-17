"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { singupSchema } from "@/schemas/signup.schema";
import axios, { AxiosError } from "axios";
import { IApiResponse } from "@/types/apiResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const page = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const debounced = useDebounceCallback(setUsername, 300);
  const { toast } = useToast();
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof singupSchema>>({
    resolver: zodResolver(singupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkusernameunique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<IApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkusernameunique();
  }, [username]);

  const onsubmit = async (data: z.infer<typeof singupSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<IApiResponse>("/api/signup", data);
      toast({
        title: response.data.success ? "Success" : "Failed",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error signing up user", error);
      const axiosError = error as AxiosError<IApiResponse>;
      let errormessage = axiosError.response?.data?.message;
      toast({
        title: "Signup failed",
        description: errormessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black/10 text-white ">
      <div className="w-full max-w-md p-8 bg-black/30 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl uppercase font-black tracking-tight lg:text-4xl mb-4 leading-loose">
            Join Kaiton Feedback
          </h1>
          <p className="text-sm">Signup to start your anonymous adventure.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your username."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && (
                    <Loader2 className="animate-spin w-4 h-4 " />
                  )}
                  <p
                    className={`text-sm ${
                      usernameMessage === "Username is valid and available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {usernameMessage}
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="enter your email."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="enter your password."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin duration-500 mr-2 h-4 w-4" />
                  signing up
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-3 flex gap-1">
          <p>Already a memeber? </p>
          <Link href={"/signin"} className="text-blue-600 hover:text-blue-800">
            Sign in{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
