import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the fields
    const validatedFields = LoginSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields!" }, { status: 400 });
    }

    // Update the callbackUrl logic to explicitly handle admin redirection
    const { email, password, role } = validatedFields.data;
    let callbackUrl = body.callbackUrl;

    // If no callback URL is provided, use role-specific redirect
    if (!callbackUrl) {
      callbackUrl =
        role === "ADMIN"
          ? "/admin/dashboard"
          : DEFAULT_LOGIN_REDIRECT[role] || "/";
    }

    try {
      // Attempt to sign in
      await signIn("credentials", {
        email,
        password,
        role,
        redirect: false, // Important: don't redirect here, we'll handle it client-side
      });

      // If we get here, login was successful
      return NextResponse.json({
        success: "Logged in successfully!",
        redirectUrl: callbackUrl,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return NextResponse.json(
              { error: "Invalid credentials!" },
              { status: 401 }
            );
          default:
            return NextResponse.json(
              { error: "Something went wrong!" },
              { status: 500 }
            );
        }
      }

      throw error;
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
