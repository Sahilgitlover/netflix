import {z} from 'zod'

export const profileNameValidation = z
    .string()
    .min(2,"Username must be atleast 2 character")
    .max(20,"Username must be atmost 20 character")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")
    
//The string must match the regular expression, which allows only letters (a-z, A-Z), numbers (0-9), and underscores (_). If the string contains any other characters, the specified error message will be returned.

//z.object({ ... }): This defines a schema for an object, specifying the properties and their corresponding validation schemas.

export const signUpSchema = z.object({
    email : z.string().email({message: 'Invalid email address'}),

    password:z.string().min(6,{message:'Password must be atleast 6 characters'})
})