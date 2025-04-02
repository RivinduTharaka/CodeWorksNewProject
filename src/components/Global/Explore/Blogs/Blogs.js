import { Typography } from "@mui/material";
import React from "react";
import BlogSec1 from "./BlogSec1";
import BlogSec2 from "./BlogSec2";
import { useEffect } from "react";

export function Blogs() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      <BlogSec1 />
      <BlogSec2 />
    </>
  );
}
 