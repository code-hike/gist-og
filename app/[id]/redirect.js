"use client";

import { useEffect } from "react";

export function Redirect({ url }) {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace(url);
    }, 300);
  }, []);
  return null;
}
