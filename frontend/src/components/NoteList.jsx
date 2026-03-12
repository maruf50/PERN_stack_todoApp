import { useEffect, useState } from "react";
import { getNotes, deleteNote, createNotes } from "../services/api";

function NoteList() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [post, setPost] = useState({ title: "", content: "" });


    async function fetchNotes() {
        try {
            const res = await getNotes();
            setNotes(res.data);
        } catch (err) {
            setError("Failed to load notes");
        }
    }

    async function handleDelete(id) {
        try {
            await deleteNote(id);
            setNotes((prev) => prev.filter((n) => n.id !== id));
        }
        catch (err) {
            setError("Failed to delete");
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    }

    async function handleAdd(e) {
        e.preventDefault();

        if (!post.title.trim() || !post.content.trim()) {
            setError("Title and content are required");
            return;
        }

        try {
            const res = await createNotes(post);
            setNotes((prev) => [...prev, res.data]);
            setPost({ title: "", content: "" }); // reseting the post
            setError("");
        }
        catch (err) {
            setError("Failed to add");
        }
        
    }

    useEffect(() => {
        fetchNotes();
    }, [] );
    
    return (
        <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">

            <form onSubmit={handleAdd} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row">
                <input 
                    type="text" 
                    name="title"
                    placeholder="Title"
                    value={post.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-slate-300 placeholder:text-slate-400 focus:ring-2"
                />
                <input
                    type="text"
                    name="content"
                    placeholder="content"
                    value={post.content}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-slate-300 placeholder:text-slate-400 focus:ring-2"
                />
                </div>

                <button type="submit" className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                    Create
                </button>
                
                

            </form>

            <h2 className="text-xl font-semibold text-slate-900">Notes</h2>
            {error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            {
                notes.map((n) => (
                    <article className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" key={n.id}>
                        <h3 className="text-lg font-semibold text-slate-900">{n.title}</h3>
                        <p className="mt-2 text-sm text-slate-700">Note content: {n.content}</p>
                        <div className="mt-4 flex items-center gap-2">
                            <button className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100" onClick={() => handleDelete(n.id)}>Delete</button>
                            <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">Edit</button>
                        </div>
                    </article>
                ))
            }
        </section>
    );
}

export default NoteList;