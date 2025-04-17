import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen overflow-hidden flex lg:justify-center justify-start items-start lg:items-center py-20">
        <div className="w-full max-w-3xl h-full lg:p-10 rounded-lg">
          <h1 className="text-2xl lg:text-5xl font-bold tracking-wide text-center">
            Hello there. <br /> Welcome to Kaiton Feedback.
          </h1>
          <p className="text-sm font-light px-4 text-center">
            world where feedbacks are anoynomous. Be honest and straight about
            your opinion
          </p>
          <div className="flex md:hidden w-full h-fit justify-center items-center pt-5">
            <Button variant={"secondary"} className="w-2/3">
              <Link href={"/signin"}>Login now.</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
