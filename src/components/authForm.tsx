
'use client'
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import './bg.css';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from '@/schemas/signUpSchema';
import { signInSchema } from '@/schemas/signInSchema';
import axios, { AxiosError } from "axios";
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from "@/components/ui/use-toast"
import * as z from "zod"

type stateOfProp = {
  isSignUp: boolean;
}
type FormData = z.infer<typeof signUpSchema> & z.infer<typeof signInSchema>;

const AuthForm:React.FC<stateOfProp> = ({ isSignUp }) => {
  const router = useRouter();
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);
  const schema = isSignUp ? signUpSchema : signInSchema;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const submitHandler = async (data: FormData) => {
    setLoading(true); 
    try {
      const endpoint = isSignUp ? '/api/sign-up' : '/api/sign-in';
      const response = await axios.post<ApiResponse>(endpoint, data);
      
      toast({
        title: 'Success',
        description: response.data.message,
      })
      router.replace(isSignUp ? `/verify/${response.data.id}` : `/browse`);
    } catch (error) {
      console.error("Error during authentication:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message || 'An error occurred';
      toast({
        title: isSignUp ? 'Signup failed' : 'Signin failed',
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div id="forBg">
      <div className="content">
        <Navbar signUp={isSignUp} />
      </div>
      <div>
        <div className="mt-9 flex justify-center items-center">
          <div id="forBox" className="relative w-[390px] h-[700px]">
            <div className="relative z-[2] m-12">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="text-3xl font-semibold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</div>
                
                <div className="input-container">
                  <input
                    type="text"
                    {...register('email')}
                    placeholder=" "
                    className={errors.email ? 'border-red-600' : ''}
                  />
                  <label>Email or mobile number</label>
                  {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                </div>

                <div className="input-container">
                  <input
                    type="password"
                    {...register('password')}
                    placeholder=" "
                    className={errors.password ? 'border-red-600' : ''}
                  />
                  <label>Password</label>
                  {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                </div>

                <div className="flex justify-center items-center mt-6">
                  {loading ? (
                    <div className="loader"></div> 
                  ) : (
                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full">
                      {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                  )}
                </div>

                {!isSignUp && (
                  <div className="text-center mt-4">
                    <div className="text-slate-400 hover:text-slate-500">OR</div>
                  </div>
                )}

                {!isSignUp && (
                  <div className="text-center mt-4">
                    <a href="#" className="text-white hover:text-slate-300 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;