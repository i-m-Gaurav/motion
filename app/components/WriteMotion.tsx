import { File } from "lucide-react";
import { Button } from "@/components/ui/button";

const WriteMotion = () => {
  return (
    <div className="flex w-full min-h-screen flex-col items-center bg-zinc-800">
      <div className="w-full max-w-md px-4 py-10 flex flex-col items-center gap-6">
        <h1 className="text-white text-3xl font-bold text-center">
          Write New Motion
        </h1>

        {/* Create new */}
        <Button
          size="lg"
          className="border-1 border-gray-500 justify-center bg-zinc-800 text-white"
        >
          <File />
          <span>Create New</span>
        </Button>
      </div>
    </div>
  );
};

export default WriteMotion;
