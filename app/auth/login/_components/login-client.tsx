"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import type * as z from "zod";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader } from "@/components/ui/loader";

const LoginClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
    },
  });

  const role = form.watch("role");

  useEffect(() => {
    console.log("Selected role:", role);
  }, [role]);

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          callbackUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        form.reset();
        return;
      }

      setSuccess(data.success);
      form.reset();

      if (data.redirectUrl) {
        setTimeout(() => {
          router.push(data.redirectUrl);
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/login-bg.jpg')" }} // Update this path
    >
      <CardWrapper
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-8">
          LOGIN TO YOUR ACCOUNT
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-black">Login as</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1 text-black"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="USER" />
                          </FormControl>
                          <FormLabel className="font-semibold text-black">
                            User
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ADMIN" />
                          </FormControl>
                          <FormLabel className="font-semibold text-black">
                            Admin
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="john.doe@example.com"
                        type="email"
                        className="text-black bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-black-500 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="******"
                        type="password"
                        className="text-black bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-black-500 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-black-500 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginClient;
