import { Typography } from "@mui/material";
import React from "react";
import BlogSec1 from "./BlogSec1";
import BlogSec2 from "./BlogSec2";
import { useEffect } from "react";
import AutoLogin from "../../../../services/AutoLogin";

export function AUBlogs() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
    <AutoLogin/>
      <BlogSec1 />
      <BlogSec2 />
    </>
  );
}
