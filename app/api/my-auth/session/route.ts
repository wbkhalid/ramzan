import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface SessionResponse {
  authenticated: boolean;
  user?: {
    token?: string;
    fullName?: string;
    email?: string;
    userId?: string;
    districtId?: string;
    tehsilId?: string;
  };
}

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const fullName = cookieStore.get("fullName")?.value;
  const userId = cookieStore.get("userId")?.value;
  const role = cookieStore.get("role")?.value;
  const districtId = cookieStore.get("districtId")?.value;
  const tehsilId = cookieStore.get("tehsilId")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      fullName,
      userId,
      districtId,
      tehsilId,
      role,
    },
  });
}
