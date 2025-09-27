import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const data = await res.json();
    const user = data.results[0];

    const userToStore = {
      uuid: user.login.uuid,
      username: user.login.username,
      name: user.name,
      picture: user.picture,
    };

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set({
      name: "user",
      value: JSON.stringify(userToStore),
      path: "/",
      httpOnly: true, // Not accessible from JS
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
