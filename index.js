require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Importamos Mongoose

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- CONEXIÓN A BASE DE DATOS ---
// En Render usará la variable oculta. En local usará tu link directo.
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin123@cluster0.oxjknta.mongodb.net/wikigames?appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// --- MODELO DE DATOS ---
const juegoSchema = new mongoose.Schema({
  title: String,
  developer: String,
  releaseDate: String,
  genre: [String],
  platforms: [String],
  rating: Number,
  description: String,
  images: {
    cover: String
  }
});

const Juego = mongoose.model('Juego', juegoSchema);

// --- RUTAS (ENDPOINTS) ---

app.get('/api/juegos', async (req, res) => {
    try {
        const juegos = await Juego.find();
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/juegos/:id', async (req, res) => {
    try {
        const juego = await Juego.findById(req.params.id);
        if (!juego) return res.status(404).json({ message: "No encontrado" });
        res.json(juego);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar ID" });
    }
});

app.post('/api/juegos', async (req, res) => {
    try {
        const nuevoJuego = new Juego(req.body);
        await nuevoJuego.save();
        res.status(201).json(nuevoJuego);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/juegos/:id', async (req, res) => {
    try {
        const juegoActualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(juegoActualizado);
    } catch (error) {
        res.status(404).json({ message: "No se pudo editar" });
    }
});

app.delete('/api/juegos/:id', async (req, res) => {
    try {
        await Juego.findByIdAndDelete(req.params.id);
        res.json({ message: "Juego eliminado correctamente" });
    } catch (error) {
        res.status(404).json({ message: "No se pudo eliminar" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor DB corriendo en puerto ${PORT}`);
});