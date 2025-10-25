import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { appName } from "@/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateTitle = (title: string, isAbsolute = false) => {
  return isAbsolute ? title : `${appName} - ${title}`;
};
