"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verify.schema";
import { IApiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const page = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      toast({
        title: response.data.success ? "Success" : "Failed",
        description: response.data.message,
      });
      router.replace("/signin");
    } catch (error) {
      const axiosError = error as AxiosError<IApiResponse>;
      const errorMessage = axiosError.response?.data?.message;
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/40">
      <div className="w-full max-w-md p-8 space-y-8 bg-black/90 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-wide lg:text-5xl mb-6">
            Verify your account.
          </h1>
          <p className="mb-4">
            Enter the verification code sent to your email.
          </p>
        </div>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-white"
          >
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="enter code" {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"outline"}
              className="w-full text-black"
            >
              Submit
            </Button>
          </form>
        </Form>
        <div className="text-sm underline text-indigo-700">
          <Link href={"/signup"}>Back to signup</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
