const express = require("express");
const app = express();
const port = 3600;
app.use(express.json());

let pokemones = [
    {id:1, name:"Charizard", type: "Fire"},
    {id:2, name:"Blasstoise", type: "Water"},
    {id:3, name:"Pikachu", type: "Electric"}
]

//route root
app.get("/",(req, res) =>{
    return res.send("Hola mundo desde Mezontle");
});

//route pokemon
app.get("/pokemones", (req, res) => {
    return res.json(pokemones);
});

app.get("/pokemon/3", (req, res) => {
    return res.json([pokemones[2]])
});

app.post("/alta-pokemon", (req, res) => {
    let nuevoPokemon = {
        id:pokemones.length+1,
        name:req.body.name,
        type:req.body.type
    };

    pokemones.push(nuevoPokemon);
    return res.status(200).json(pokemones);
});

app.listen(port,() =>{
    console.log("Servidor ejecutándose en localhost:" + port);
});
