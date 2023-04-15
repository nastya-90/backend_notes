const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    // const notes = require("./db.json");
    //const notes = Buffer.from(buffer).toString("utf-8");
    const notes = await getNotes();
    console.log(notes);

    const note = {
        title,
        id: Date.now().toString(),
    };
    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNotes(id) {
    const notes = await getNotes();
    const updateNotes = notes.filter((note) => note.id !== id);
    await fs.writeFile(notesPath, JSON.stringify(updateNotes));
}

module.exports = {
    addNote,
    getNotes,
    removeNotes,
};
