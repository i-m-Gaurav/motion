"use client";
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import TipTap from "./TipTap";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

const WriteMotion = () => {
  const [formData, setFormData] = useState({
    motionText: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("/api/newMotion", formData)
      .then((response) => {
        console.log("Motion submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting motion:", error);
      });
  };

  return (
        <TipTap />
  );
};

export default WriteMotion;
