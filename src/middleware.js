import { NextResponse } from "next/server";

export function middleware(request) {
  const origin = request.headers.get("origin");

  // Define allowed origins
  const allowedOrigins = [
    "https://kodeinkgpnew.netlify.app",
    "https://kodeinkgp.in",
    "http://localhost:3000", // for development
    "http://localhost:3001", // for development
  ];

  const isAllowedOrigin = !origin || allowedOrigins.includes(origin);

  // Handle preflight OPTIONS requests - only allow from permitted origins
  if (request.method === "OPTIONS") {
    if (isAllowedOrigin) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    } else {
      return new NextResponse(null, { status: 403 });
    }
  }

  // Helper function to add CORS headers only for allowed origins
  function addCorsHeaders(response) {
    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin || "*");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
    }
    return response;
  }

  const protectedPaths = [
    "/dekodeX/api/submit",
    "/dekodeX/api/certificate/apply",
    "/dekodeX/api/certificate/check",
  ];

  const publicPaths = [
    "/dekodeX/api/question",
    "/dekodeX/api/questionTitles",
    "/dekodeX/api/leaderboard",
    "/dekodeX/api/verifyTurnstile",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // For public paths, just add CORS and continue (no auth required)
  if (isPublicPath) {
    // Still check domain restriction for security
    if (origin && !isAllowedOrigin) {
      return addCorsHeaders(
        NextResponse.json(
          { message: "Forbidden. Domain not allowed." },
          { status: 403 }
        )
      );
    }
    return addCorsHeaders(NextResponse.next());
  }

  // For non-API paths, just continue
  if (!isProtectedPath) {
    return addCorsHeaders(NextResponse.next());
  }

  // Check if origin is allowed for protected paths
  if (origin && !isAllowedOrigin) {
    return addCorsHeaders(
      NextResponse.json(
        { message: "Forbidden. Domain not allowed." },
        { status: 403 }
      )
    );
  }

  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn(
      `Unauthorized access attempt to ${request.nextUrl.pathname}: Missing or malformed Authorization header.`
    );
    return addCorsHeaders(
      NextResponse.json(
        { message: "Unauthorized. Missing or invalid Authorization header." },
        { status: 401 }
      )
    );
  }
  return addCorsHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/dekodeX/api/question/:path*",
    "/dekodeX/api/questionTitles/:path*",
    "/dekodeX/api/submit/:path*",
    "/dekodeX/api/leaderboard/:path*",
    "/dekodeX/api/verifyTurnstile/:path*",
    "/dekodeX/api/certificate/apply/:path*",
    "/dekodeX/api/certificate/check/:path*",
  ],
};
