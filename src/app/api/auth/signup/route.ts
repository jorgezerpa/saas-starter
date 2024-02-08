import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
import bcrypt from "bcrypt"

export async function POST (req: Request, res: Response) {
  const data = await req.json()

    const userFound = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(userFound) {
        return NextResponse.json({message:"user already exists"})
    }
  
    data.password = await bcrypt.hash(data.password, 10)

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            password: data.password,
            username: data.name
        }
    })

    const { password, ...user } = newUser

  return NextResponse.json({ user})
}
