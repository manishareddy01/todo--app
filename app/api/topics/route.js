import { connect } from "http2";
import connectMongoDB from "../../../libs/mongoDB";
import Topic from "../../../models/topic";
import {NextResponse} from "next/server";

export async function POST(request){
    const{title,description}= await request.json();
    await connectMongoDB();
    await Topic.create({title,description});
    return NextResponse.json({message:"Topics Created"},{status:201})
}
export async function GET(){
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics})
}
export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message:"Deleted"},{status:200})
}