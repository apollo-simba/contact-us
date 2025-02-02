import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

interface ContactRequestBody {
    fullname: string;
    email: string;
    message: string;
}

interface ValidationError {
    [key: string]: { message: string };
}



import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const client: MongoClient = await connectDB();
//     const db = client.db();

//     // Validate collection name
//     const collectionName = req.query.collection;
//     if (!collectionName || typeof collectionName !== "string") {
//       return res.status(400).json({ error: "Collection name is required and must be a string" });
//     }

//     const allData = await db.collection(collectionName).find({}).toArray();

//     return res.status(200).json(allData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

export async function GET(req: Request) {
    try {
        await connectDB();
        const data = await Contact.find({});

        console.log(data)
        // return NextResponse.json({
        //     msg: ["Message sent successfully"],
        //     success: true,
        // });
    } 
    catch (error: unknown) {       
        // if (error instanceof mongoose.Error.ValidationError) {
        //     const errorList: string[] = Object.values(error.errors).map(
        //         (err) => err.message
        //     );
        //     console.error(errorList);
        //     return NextResponse.json({ msg: errorList });
        // } else {
        //     return NextResponse.json({
        //         msg: ["Unable to send message."],
        //     });
        // }
    }
}

export async function POST(req: Request): Promise<Response> {
    const { fullname, email, message }: ContactRequestBody = await req.json();
    try {
        await connectDB();
        await Contact.create({ fullname, email, message });

        return NextResponse.json({
            msg: ["Message sent successfully"],
            success: true,
        });
    } 
    catch (error: unknown) {       
        if (error instanceof mongoose.Error.ValidationError) {
            const errorList: string[] = Object.values(error.errors).map(
                (err) => err.message
            );
            console.error(errorList);
            return NextResponse.json({ msg: errorList });
        } else {
            return NextResponse.json({
                msg: ["Unable to send message."],
            });
        }
    }
}