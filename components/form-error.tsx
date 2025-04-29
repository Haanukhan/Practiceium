"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-600">{message}</AlertDescription>
    </Alert>
  );
};
