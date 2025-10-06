import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param {Array<any>} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}