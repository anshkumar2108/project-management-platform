import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const secretKey = process.env.SESSION_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)
export async function createsession(userId:string){
  const expiresAt=new Date(Date.now()+5*60*1000)
  const session=await encrypt({userId,expiresAt})
  const cookieStore =await cookies()
  cookieStore.set('session',session,{
    httpOnly:true,
    secure:true,
    expires:expiresAt,
    sameSite:'lax',
    path:'/',
  })
}
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt().setExpirationTime('5 minutes').sign(encodedKey);
}
export async function decrypt(session: string|undefined=''): Promise<any> {
  try {
    const { payload } = await jwtVerify(session, encodedKey,{
      algorithms:['HS256'],
    })
    return payload
  }catch(error){
    console.log('Failed to verify session.')
  }
}
export async function deleteSession(){
  const cookieStore=await cookies();
  cookieStore.delete('session');
}