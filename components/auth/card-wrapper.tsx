"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-full ">
      <CardContent>{children}</CardContent>
      <CardFooter className="pt-0">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
