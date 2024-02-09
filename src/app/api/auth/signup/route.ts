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
            avatar: "https://ui-avatars.com/api/?name=John+Doe",
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            userType: "user",
        }
    })

  return NextResponse.json({ user: newUser})
}
