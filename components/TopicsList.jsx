import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';
export async function getServerSideProps() {
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
            cache: "no-store",
        });
        
        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        const topics = await res.json();
        
        return {
            props: { topics },
        };
    } catch (error) {
        console.error("Error fetching topics:", error);
        return {
            props: { topics: [] }, // Return an empty array of topics in case of error
        };
    }
}
export default function TopicsList(topics){

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