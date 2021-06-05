let saved = require("../db/db.json");
const fs = require("fs");
const { uuid } = require("uuidv4");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    return res.json(saved);
  });

  app.post("/api/notes", (req, res) => {
    let addNote = req.body;
    let idNumber = uuid();

    addNote.id = idNumber;

    saved.push(addNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(saved));
    res.json(addNote);
  });

  app.delete("/api/notes/:id", (req, res) => {
    let UniqId = req.params.id;

    saved = saved.filter((x) => x.id != UniqId);

    fs.writeFileSync("./db/db.json", JSON.stringify(saved));
    return res.json(saved);
  });
};
