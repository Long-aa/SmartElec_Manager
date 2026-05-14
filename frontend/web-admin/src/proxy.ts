import { withAuth } from "next-auth/middleware";

// In Next.js 16+, the exported function must be named 'proxy'
export const proxy = withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};