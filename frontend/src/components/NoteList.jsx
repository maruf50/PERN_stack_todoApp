import { useEffect,useState } from "react";
import { getNotes, deleteNote, createNotes } from "../services/api";

function NoteList(){
    const [notes,setNotes] = useState([]);
    const [error, setError] = useState("");
    const [post, setPost]  = useState({title: "",content: ""});


    async function fetchNotes(){
        try {
            const res = await getNotes();
            setNotes(res.data);
        } catch (err) {
            setError("Failed to load notes");
        }
    }

    async function handleDelete(id) {
        try{
            await deleteNote(id);
            setNotes((prev)=> prev.filter((n) => n.id !== id));
        }
        catch(err){
            setError("Failed to delete");
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    }

    async function handleAdd(e){
        e.preventDefault();

        if (!post.title.trim() || !post.content.trim()) {
            setError("Title and content are required");
            return;
        }

        try{
            const res = await createNotes(post);
            setNotes((prev) => [...prev, res.data]);
            setPost({ title: "", content: "" }); // reseting the post
            setError("");
        }
        catch(err){
            setError("Failed to add");
        }
        
    }

    useEffect( ()=> {
        fetchNotes();
    }, [] );
    
    return(
        <div className="noteContainer">

            <form onSubmit={handleAdd}>
                <input 
                    type="text" 
                    name="title"
                    placeholder="Title"
                    value={post.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="content"
                    placeholder="content"
                    value={post.content}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create
                </button>
                
                

            </form>

            <h2>Notes</h2>
            {error && <p>{error}</p>}
            {
                notes.map((n)=>(
                    <div className="note" key={n.id}>
                        <h2>{n.title}</h2>
                        <p>Note content: {n.content}</p>
                        <button onClick={() => handleDelete(n.id)}>Delete</button>
                        <button>Edit</button>
                    </div> 
                ))
            }
        </div>
    );
}

export default NoteList;