"use client";

import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <Alert variant="default">
      <CheckCircle className="h-4 w-4 text-green-700" />
      <AlertDescription className="text-green-700">{message}</AlertDescription>
    </Alert>
  );
};
