const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Importante para recibir datos JSON

// CAMBIO: Usamos 'let' para poder modificar la lista (simulando base de datos)
let juegos = [
  {
    id: "the-witcher-3",
    title: "The Witcher 3: Wild Hunt",
    developer: "CD Projekt Red",
    releaseDate: "2015-05-19",
    genre: ["RPG", "Mundo Abierto"],
    platforms: ["PC", "PS4", "PS5", "Xbox One"],
    rating: 4.9,
    description: "RPG de mundo abierto basado en la saga de Geralt de Rivia...",
    images: {
      cover: "https://sm.ign.com/ign_es/screenshot/default/the-witcher-3-next-gen_3vjv.jpg"
    }
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    developer: "FromSoftware",
    releaseDate: "2022-02-25",
    genre: ["Action RPG", "Mundo Abierto"],
    platforms: ["PC", "PS4", "PS5", "Xbox Series X|S"],
    rating: 4.8,
    description: "La fórmula souls en un mundo abierto...",
    images: {
      cover: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/YMUoJUYNX0xWk6eTKuZLr5Iw.jpg"
    }
  },
  {
    id: "god-of-war-2018",
    title: "God of War (2018)",
    developer: "Santa Monica Studio",
    releaseDate: "2018-04-20",
    genre: ["Acción", "Aventura"],
    platforms: ["PS4", "PS5", "PC"],
    rating: 4.9,
    description: "Reinvención de la saga con enfoque en narrativa padre-hijo...",
    images: {
      cover: "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaVA5cwkpQ69707K1a5l7wQ.png"
    }
  },
];

// --- ENDPOINTS CRUD (Requisito del Examen) ---

// 1. GET (Read) - Obtener todos
app.get('/api/juegos', (req, res) => {
    res.json(juegos);
});

// 2. GET (Read) - Obtener uno por ID
app.get('/api/juegos/:id', (req, res) => {
    const juego = juegos.find(j => j.id === req.params.id);
    juego ? res.json(juego) : res.status(404).json({ message: "No encontrado" });
});

// 3. POST (Create) - Crear nuevo juego
app.post('/api/juegos', (req, res) => {
    const nuevoJuego = req.body;
    // Generamos un ID simple si no viene uno
    if (!nuevoJuego.id) {
        nuevoJuego.id = Date.now().toString(); 
    }
    juegos.push(nuevoJuego);
    res.status(201).json(nuevoJuego); // 201 = Creado
});

// 4. PUT (Update) - Editar juego existente
app.put('/api/juegos/:id', (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    
    const index = juegos.findIndex(j => j.id === id);
    if (index !== -1) {
        // Actualizamos fusionando los datos anteriores con los nuevos
        juegos[index] = { ...juegos[index], ...datosNuevos };
        res.json(juegos[index]);
    } else {
        res.status(404).json({ message: "Juego no encontrado para editar" });
    }
});

// 5. DELETE (Delete) - Eliminar juego
app.delete('/api/juegos/:id', (req, res) => {
    const id = req.params.id;
    const longitudInicial = juegos.length;
    juegos = juegos.filter(j => j.id !== id);
    
    if (juegos.length < longitudInicial) {
        res.json({ message: "Juego eliminado correctamente" });
    } else {
        res.status(404).json({ message: "Juego no encontrado para eliminar" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor CRUD corriendo en puerto ${PORT}`);
});