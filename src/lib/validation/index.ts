import {  z } from "zod";

export const SignupValidarion = z.object({
    name: z.string().min(2, { message: 'Too Short'}),
    username: z.string().min(2, { message: 'Too Short'}),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Passowrd must be atleast 8 charactors.'})
  })

export const SigninValidarion = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Passowrd must be atleast 8 charactors.'}),
  })
export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(0).max(100),
    tags: z.string(),
    imageUrl: z.string().optional(),  
  })