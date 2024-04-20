import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// set only admin
const onlyAdmin = ["/admin"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      console.log(token);
      // if no token, redirect to login
      if (!token) {
        const url = new URL("/auth/login", req.url);
        // set the callback url, kode ini berguna ketika pertama kali membuka page tetapi
        // user belum melakukan login, maka akan login terlebih dahulu, lalu redirect
        // ke halaman yang dibuka sebelumnya
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      // jika tidak punya role admin dan saat ini pathnya admin atau berada di halaman admin
      // maka push
      if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return middleware(req, next);
  };
}
