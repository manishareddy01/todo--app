import { title } from "process";
import EditTopicForm from "../../../components/EditTopicForm";
const getTopicById = async(id)=>{
    try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
            cache: 'no-store',
        })
        if(!res.ok){
            throw new Error('Failed')
        }
        return res.json();
    } catch (error) {
        console.log("failed")
    }
}
export default async function EditTopic({params}){
    const {id} = params;
    const {topic} = await getTopicById(id);
    const {title,description}= topic;
    return(
        <EditTopicForm id={id} title={title} description={description}/>
    )
}