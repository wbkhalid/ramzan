import { NextResponse } from "next/server";
import { Login } from "@/app/login/components/Form";
import { BackendLoginResponse, LoginClientResponse } from "@/app/login/types";
import { AUTH_API } from "@/app/APIs";

export async function POST(req: Request) {
  try {
    const body: Login = await req.json();

    if (!body.username || !body.password) {
      return NextResponse.json(
        { StatusCode: 400, Message: "userName and password required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      process.env.BACKEND_URL + AUTH_API + "/login",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = (await response.json()) as BackendLoginResponse;
    console.log("data", data);
    const res = NextResponse.json<LoginClientResponse>({
      StatusCode: data.responseCode,
      Message: data.responseMessage,
    });

    // ✅ Correct fields
    if (data.responseCode === 200 && data.data?.token) {
      res.cookies.set("token", data.data.token, {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(data.data.expiration),
      });

      res.cookies.set("fullName", data.data.userProfile.fullName, {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(data.data.expiration),
      });

      res.cookies.set("email", data.data.userProfile.email, {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(data.data.expiration),
      });

      res.cookies.set("userId", data.data.userProfile.userId, {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(data.data.expiration),
      });

      res.cookies.set(
        "divisionId",
        data.data.userProfile.divisionId.toString(),
        {
          httpOnly: false,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: new Date(data.data.expiration),
        },
      );

      res.cookies.set(
        "districtId",
        data.data.userProfile.districtId.toString(),
        {
          httpOnly: false,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: new Date(data.data.expiration),
        },
      );

      res.cookies.set("tehsilId", data.data.userProfile.tehsilId.toString(), {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(data.data.expiration),
      });

      res.cookies.set("role", data.data.roles[0], {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(data.data.expiration),
      });
    }

    return res;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { StatusCode: 500, Message: "Something went wrong" },
      { status: 500 },
    );
  }
}
