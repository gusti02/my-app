{
  /* This middleware will validate when user not logged 
  in will be redirected to the login page */
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = true;
  if (!isLogin) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/product", "/about"],
};
