'use server';
import { SignInFormState, SigninFormSchema, SignupFormSchema, SignupFormState } from "@/lib/definitions";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/data";
import { createsession } from "@/lib/session";
import { redirect } from "next/navigation";
import { errors } from "jose";
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
export async function login(state: SignInFormState, formData: FormData) {
    //1. Validate the data.
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })
    //If form fields invalid return early.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    //2. Insert into database.
    const { email, password } = validatedFields.data;
    const result = await pool.query('Select * from users where email = $1', [email]);
    if (result.rows.length === 0) {
        return console.log("Invalid email or password");
    }
    const user_db = result.rows[0];
    const stored_password = user_db.password;
    const match = await bcrypt.compare(password,stored_password);
    if(match){
        await createsession(user_db.id);
        redirect('/dashboard')
    }else{
        return{
            errors:{
                email:["Invalid Email or password."],
            }
        }
    }

    console.log(result.rows);
}
export async function handleSignup(formstate: SignupFormState, formData: FormData) {
    // 1. Validate form fields
    const valFields = SignupFormSchema.safeParse({
        fname: formData.get('fname'),
        lname: formData.get('lname'),
        email: formData.get('email'),
        password: formData.get('password')
    });

    // 2. Return early if validation fails
    if (!valFields.success) {
        return {
            errors: valFields.error.flatten().fieldErrors,
            message: "Missing or invalid fields.",
        };
    }

    const { fname, lname, email, password } = valFields.data;

    // 3. Wrap database operations in a try/catch
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const text = 'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, email';
        const values = [fname, lname, email, hashedPassword];

        const res = await pool.query(text, values);

        // 4. Always return a success state back to the client!
        return {
            success: true,
            message: "Account created successfully!",
            user: res.rows[0]
        };

    } catch (error) {
        console.error("Database Error:", error);

        // Return a safe error state back to the client
        return {
            message: "An error occurred while creating your account. The email might already be in use.",
        };
    }
}
export async function logout(){
    await deleteSession();
    revalidatePath('/','layout');//Clears the client side cache of paths.
    redirect('/login');
}