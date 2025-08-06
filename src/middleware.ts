import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // この関数は認証されたユーザーのリクエストに対してのみ実行されます
    console.log("認証されたユーザーがアクセス:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // tokenが存在する場合は認証済み
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

// 保護するルートを指定
export const config = {
  matcher: [
    // 保護対象のページを指定
    '/mypage/:path*',
    '/projects/:path*',
    '/researcher/:path*',
    '/register/:path*',
  ]
};