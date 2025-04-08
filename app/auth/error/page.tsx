"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";

// Create a separate component for the error content
function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    console.error("Authentication error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-600">
          Authentication Error
        </h1>

        <div className="p-4 bg-red-50 rounded-md">
          <p className="text-red-700">
            {error === "OAuthSignin" && "Error starting the sign-in process."}
            {error === "OAuthCallback" && "Error during the OAuth callback."}
            {error === "OAuthCreateAccount" &&
              "Could not create OAuth provider user in the database."}
            {error === "EmailCreateAccount" &&
              "Could not create email provider user in the database."}
            {error === "Callback" &&
              "Error in the OAuth callback handler route."}
            {error === "OAuthAccountNotLinked" &&
              "Email on the account already exists with different credentials."}
            {error === "EmailSignin" && "Check your email address."}
            {error === "CredentialsSignin" &&
              "Sign in failed. Check the details you provided are correct."}
            {error === "SessionRequired" &&
              "Please sign in to access this page."}
            {!error && "An unknown error occurred during authentication."}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <Button asChild>
            <Link href={ROUTES.signIn}>Return to Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={ROUTES.home}>Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Loading...</h2>
            <p className="text-gray-500">
              Please wait while we load the error details.
            </p>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
