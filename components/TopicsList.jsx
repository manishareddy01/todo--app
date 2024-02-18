import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';
const getTopics = async()=>{
    try {
        const res = await fetch("http://localhost:3000/api/topics",{
            cache: "no-store",
        });
        if(!res.ok){
            throw new Error("Failed to fetch topics");
        }
        return res.json();
    } catch (error) {
        console.log("Error")
        
    }
}
export default async function TopicsList(){
    try {
        const { topics } = await getTopics();
        
        if (!topics) {
            return <div>No topics available</div>;
        }

        return (
            <>
            {topics.map((t)=>(
            <div key={t._id} className='p-4 border-slate-300 my-3 flex justify-between gap-5 items-start'>
                <div>
                    <h2 className='font-bold text-2xl'>{t.title}</h2>
                    <div>{t.description}</div>
                </div>
                <div className='flex gap-2'>
                    <RemoveBtn id={t._id}/>
                    <Link href={`/editTopic/${t._id}`}>
                        <HiPencilAlt size={24}/>
                    </Link> 
                </div>
            </div>
            ))}
            </>
        )
    }
    catch (error) {
        console.error('Error fetching topics:', error);
        return <div>Error fetching topics</div>;
    }
}