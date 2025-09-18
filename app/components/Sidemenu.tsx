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

const Sidemenu = () => {
  return (
    <>
      <div className="w-64 fixed h-screen bg-zinc-900 text-white p-2">
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
      </div>
    </>
  );
};

export default Sidemenu;
