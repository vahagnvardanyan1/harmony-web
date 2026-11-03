"use client";

import { createContext } from "react";

export type GalleryContent = { label: string; photos: readonly string[] };

export const GalleryContext = createContext<((content: GalleryContent) => void) | null>(null);
