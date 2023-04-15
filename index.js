const yargs = require("yargs");
const { addNote, getNotes, removeNotes } = require("./notes.controller");

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        const notes = await getNotes();
        notes.map((note) => console.log(note.id, note.title));
    },
});

yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        id: {
            type: "string",
            describe: "Title id",
            demandOption: true,
        },
    },
    handler({ id }) {
        removeNotes(id);
    },
});

yargs.parse();
