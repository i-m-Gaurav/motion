'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HomeIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignIn from "./sign-in";
import { useSession } from "next-auth/react";


const Sidemenu = () => {

  const { data : session} = useSession()

  return (
    <>
      <div className="w-64 flex flex-col justify-between fixed h-screen bg-[#202020] text-white p-2">
        <div className="flex flex-col gap-1">
          <Button className="w-full justify-start bg-neutral-800 hover:bg-neutral-700 text-white">
            <HomeIcon />
            <span>Home</span>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full justify-start bg-neutral-800 hover:bg-neutral-700 text-white">
                <SearchIcon />
                <span>Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full my-1 cursor-pointer rounded-md py-1 justify-start bg-neutral-800 hover:bg-neutral-700 text-white">
          {/* signup button at the bottom */}

          {/* <SignIn/> */}

          {session ? <span>{session?.user?.name}</span> :(<SignIn/>)}
         
        </div>
      </div>
    </>
  );
};

export default Sidemenu;
