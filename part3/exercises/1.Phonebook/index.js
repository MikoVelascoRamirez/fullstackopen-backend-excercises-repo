const express = require("express");
const app = express();

const PORT = 3001;

app.use(express.json());

// Source data
let dataSrc = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Endpoints

app.post("/api/persons", (req, res) => {
  let body = req.body;
  while(true){
    let idGenerated = Math.round(
      Math.random() * (1000 - dataSrc.length) + dataSrc.length
    );
    const findIfIdContactExists = dataSrc.some(
      contact => contact.id === idGenerated
    );
    if(!findIfIdContactExists){
      body = {...body, id: idGenerated}
      break;
    }
  }

  dataSrc = [...dataSrc, body]
  
  res.status(201).send({"message" : "contact created"});
});

app.get("/api/persons", (req, res) => {
  res.json(dataSrc);
});

app.get("/info", (req, res) => {
  const template = `<p>Phonebook has info for ${dataSrc.length} people</p><p>${new Date().toString()}</p>`;
  res.send(template).end();
});

app.get("/api/persons/:id", (req, res) => {
  const param = Number(req.params.id);
  const contactFound = dataSrc.find(contact => contact.id === param);

  if(!contactFound) 
    return res.status(404).send("The contact has not been found").end();

  res.json(contactFound).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const param = Number(req.params.id);
  const phonebookUpdated = dataSrc.filter(contact => contact.id !== param);

  if(phonebookUpdated.length === dataSrc.length)
    return res.status(404).send("The contact doesn't exist");
  
  dataSrc = phonebookUpdated;

  res.status(204);
});

app.listen(PORT, () => console.log(`server running at PORT ${PORT}`));
