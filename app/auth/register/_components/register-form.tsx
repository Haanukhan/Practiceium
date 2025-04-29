"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useEffect, useState } from "react";
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
import { RegisterSchema } from "@/schemas";
import { Loader } from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  const role = form.watch("role");

  useEffect(() => {
    console.log("Selected role:", role);
  }, [role]);

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (data.success) {
        form.reset();
        setSuccess(data.success);
        setTimeout(() => {
          router.push("/auth/login");
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
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="relative z-10 w-full max-w-lg">
        <CardWrapper
          backButtonLabel="Already have an account?"
          backButtonHref="/auth/login"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-semibold text-black">
                    Create Your Account
                  </h2>
                </div>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm text-black">
                        Register as
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6 text-black"
                        >
                          {["USER", "ADMIN"].map((val) => (
                            <FormItem
                              key={val}
                              className="flex items-center gap-2 text-black"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={val}
                                  className="border-black shadow-md"
                                />
                              </FormControl>
                              <FormLabel className="font-medium capitalize text-black">
                                {val.toLowerCase()}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-black">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          disabled={isLoading}
                          placeholder="John Doe"
                          className="bg-black/10 border border-white/20 text-white placeholder-gray-400 rounded-xl"
                        />
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
                      <FormLabel className="text-sm text-black">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          disabled={isLoading}
                          placeholder="john@example.com"
                          className="bg-black/10 border border-white/20 text-white placeholder-gray-400 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-black">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            disabled={isLoading}
                            placeholder="******"
                            className="bg-black/10 border border-white/20 text-white placeholder-gray-400 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-black">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            disabled={isLoading}
                            placeholder="******"
                            className="bg-black/10 border border-white/20 text-white placeholder-gray-400 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full py-3 text-lg font-semibold bg-black text-white hover:bg-black/70 transition-all rounded-xl flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default RegisterForm;
