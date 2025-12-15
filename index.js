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