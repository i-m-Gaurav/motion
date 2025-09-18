'use client';
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from 'axios';
import TipTap from "./TipTap";
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'


const WriteMotion = () => {

    const [formData, setFormData] = useState({
        motionText:"",
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.post('/api/newMotion',formData)
            .then(response => {
                console.log("Motion submitted successfully:", response.data);
            })
            .catch(error => {
                console.error("Error submitting motion:", error);
            });
    }


  return (
    <div className="flex w-full min-h-screen flex-col items-center ">
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
        <div className="flex justify-center items-center w-6xl  ">
          <TipTap/>
        </div>
      </div>
    </div>
  );
};

export default WriteMotion;
