"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a className="text-lg font-black mb-4 md:mb-0" href="/">
          Kaido Feedback
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome {user?.username || user?.email}
            </span>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <div className="hidden md:inline-block">
            <Link href={"/signin"}>
              <Button className="" variant={"secondary"}>
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
