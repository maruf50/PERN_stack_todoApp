import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const getNotes = () => API.get("/notes");
export const createNotes = (data) => API.post("/notes", data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);