"use client";

import { useContext } from "react";

import { GalleryContext } from "@/components/Gallery/gallery-context";

export const useOpenGallery = () => {
  const open = useContext(GalleryContext);
  if (!open) throw new Error("useOpenGallery must be used inside <GalleryProvider>");
  return open;
};
