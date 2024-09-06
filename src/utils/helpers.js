import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import {
  persianNumbers,
  arabicNumbers,
  iPhoneNumbers,
} from "@/constants/const";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertPersianNumberToEnglish(number) {
  Array.from(Array(10).keys()).forEach((_, i) => {
    const numbers = [persianNumbers[i], arabicNumbers[i], iPhoneNumbers[i]];
    const regexp = new RegExp(numbers.join("|"), "g");
    number = number.replace(regexp, i);
  });
  return number;
}

export function convertEnglishNumberToPersian(number) {
  return String(number).replace(
    /\d/g,
    (digit) => persianNumbers[parseInt(digit)],
  );
}

export function getDayOfWeek(day) {
  return day === 0 ? 6 : day - 1;
}

export function isMobileOrTablet(userAgent) {
  const ua = userAgent.toLowerCase();
  const isMobile =
    /mobile|iphone|ipod|android.*mobile|blackberry|windows phone|opera mini/.test(
      ua,
    );
  const isTablet = /ipad|android(?!.*mobile)|tablet/.test(ua);
  return {
    isMobile,
    isTablet,
  };
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function normalizeQuery(string) {
  return escapeRegex(string).toLowerCase();
}

