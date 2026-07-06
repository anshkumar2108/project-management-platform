
import * as z from 'zod';
export const SigninFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z.string().min(8, { error: 'Password should be atleast 8 characters long.' })
        .regex(/[a-zA-Z]/, { error: 'Contain atleast one letter.' })
        .regex(/[0-9]/, { error: 'Contain atleast one digit.' })
        .regex(/[^a-zA-Z0-9]/, { error: 'Contain atleast one special character.' }).trim(),
})
export const SignupFormSchema = z.object({
    fname: z.string().min(2, { error: 'First name should be atleast 2 characters long.' }),
    lname: z.string().min(2, { error: 'Last name should be atleast 2 characters long.' }).trim(),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z.string().min(8, { error: 'Password should be atleast 8 characters long.' })
        .regex(/[a-zA-Z]/, { error: 'Contain atleast one letter.' })
        .regex(/[0-9]/, { error: 'Contain atleast one digit.' })
        .regex(/[^a-zA-Z0-9]/, { error: 'Contain atleast one special character.' }).trim()
})
export type SignupFormState = | {
    errors?: {
        fname?: string[],
        lname?: string[],
        email?: string[],
        password?: string[]
    }
    message?: string
} | undefined
export type SignInFormState = | {
    errors?: {
        email?: string[],
        password?: string[]
    }
    message?: string
} | undefined