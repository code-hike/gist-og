"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export function Redirect({ url }) {
  useEffect(() => {
    redirect(url);
  }, []);
  return null;
}
