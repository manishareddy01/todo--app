'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({id,title,description}){
    const[newTitle,setNewTitle]=useState(title);
    const[newDescription,setNewDescription]=useState(description);
    const router = useRouter()
    const hS = async (e) =>{
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
                method: 'PUT',
                headers:{ 'Content-type':'applicaton/json'},
                body: JSON.stringify({newTitle,newDescription}) 
            
        })
        if(!res.ok){
            throw new Error("failed");
        }
       
        router.push('/');
        router.refresh();

        } catch (error) {
            console.log("failed")
        }
    }
    return(
        <form onSubmit={hS} className="flex flex-col gap-3">
        <input 
        onChange={(e)=>setNewTitle(e.target.value)}
        value={newTitle}
        className="borrder border-slate-500 px-8 py-2" type="text" placeholder="Topic-Title"></input>
         <input 
         onChange={(e)=>setNewDescription(e.target.value)}
         value={newDescription}
        className="borrder border-slate-500 px-8 py-2" type="text" placeholder="Topic-Description"></input>
        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit ">
            Update Topic
        </button>
    </form>

    )
}