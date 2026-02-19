import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 },
  );

  // Clear ALL auth-related cookies
  res.cookies.set("token", "", { maxAge: 0, path: "/" });
  res.cookies.set("districtId", "", { maxAge: 0, path: "/" });
  res.cookies.set("divisionId", "", { maxAge: 0, path: "/" });
  res.cookies.set("email", "", { maxAge: 0, path: "/" });
  res.cookies.set("fullName", "", { maxAge: 0, path: "/" });
  res.cookies.set("userId", "", { maxAge: 0, path: "/" });

  return res;
}
