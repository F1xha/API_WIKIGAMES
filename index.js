const express = require('express');
const cors = require('cors');
const app = express();

// Usar el puerto que nos asigne la nube (o 3000 si estamos en local)
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- BASE DE DATOS  ---
const juegos = [
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
      cover: "data:image/jpeg;base64,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"
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

// --- RUTAS DE LA API ---

// 1. Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('<h1>Bienvenido a la API de WikiGames</h1><p>Visita /api/juegos para ver los datos</p>');
});

// 2. Obtener todos los juegos
app.get('/api/juegos', (req, res) => {
    res.json(juegos);
});

// 3. Buscar juegos por ID
app.get('/api/juegos/:id', (req, res) => {
    const id = req.params.id;
    const juego = juegos.find(j => j.id === id);
    if (juego) {
        res.json(juego);
    } else {
        res.status(404).json({ message: "Juego no encontrado" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});