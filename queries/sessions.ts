import { headers as nextHeaders } from "next/headers";
import { cache } from "react";
import { auth } from "@/lib/auth";

export const getSession = cache(async (headers?: Headers) => {
  const session = await auth.api.getSession({
    headers: headers ?? (await nextHeaders()),
  });

  return session;
});
