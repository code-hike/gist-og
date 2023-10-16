"use client";

import { redirect } from "next/navigation";

export function Redirect({ url }) {
  useEffect(() => {
    redirect(url);
  }, []);
  return null;
}
