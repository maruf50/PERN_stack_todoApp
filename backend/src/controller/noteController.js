const prisma = require("../config/prismaClient");

exports.getNotes = async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
};

exports.createNote = async (req, res) => {
    const { title, content } = req.body;

    const note = await prisma.note.create({
        data: { title, content }
    });

    res.json(note);
};

exports.deleteNote = async (req, res) => {
    try {
        const {id} = req.params;
 
        const deletedNote = await prisma.note.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: "Note deleted", deletedNote });
    } catch (error) {
        
        res.status(404).json({ error: "Record to delete not found." });
    }
};