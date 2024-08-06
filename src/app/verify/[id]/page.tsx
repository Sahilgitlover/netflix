"use client";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import  axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import Image from "next/image";
import netflixImage from "../../../../public/netflixWhite-removebg-preview (1).png";
import '@/components/loader.css'

function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ id: string }>();  
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const changeToSignIn = () => {
    router.push("sign-in");
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    if (data.verifyCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Verification code must be 6 digits",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/verify-code`, {
        id: params.id,
        code: data.verifyCode,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });
      router.push(`/handlePayment?id=${params.id}`);
    } catch (error) {
      console.error("Error during verification:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;

      toast({
        title: "Verification failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden h-screen w-screen bg-white">
      <div className="mt-5">
        <div className="flex justify-around">
          <div>
            <Image
              src={netflixImage}
              alt="netflix"
              className="w-[90px] md:h-[45px] sm:h-[35px] sm:w-[100px] md:w-[150px]"
            />
          </div>
          <div>
            <button
              onClick={changeToSignIn}
              className="lg:px-3 lg:py-[5px] rounded-[4px] bg-red-800 text-white"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="my-10 w-full border-b-2"></div>
      <div className="mt-14 flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-black">Verify Account</h1>
              <p className="mt-2 text-gray-600 text-sm">
                Enter the verification code sent to your email
              </p>
            </div>
            <div className="flex flex-col mt-6">
              <label
                htmlFor="verifyCode"
                className="block text-sm font-medium text-gray-700"
              >
                Verification Code
              </label>
              <input
                id="verifyCode"
                type="text"
                {...register("verifyCode")}
                className={`mt-1 p-2 w-full border text-black border-gray-300 rounded-md focus:outline-none focus ${
                  errors.verifyCode ? "border-red-600" : ""
                }`}
              />
              {errors.verifyCode && (
                <p className="text-red-600">{errors.verifyCode.message}</p>
              )}
              {isLoading ? (
                <div className="flex justify-center items-center">
                <div className="loader"></div>
              </div>
              ) : (
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Verify
                </button>
              )}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Forgot your verification code?{" "}
                  <a
                    href="/forgot-password"
                    className="text-blue-500 hover:underline"
                  >
                    Click here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyAccount;
