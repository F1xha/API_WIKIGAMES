require('dotenv').config(); // Para variables de entorno (opcional en local)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 1. Importamos Mongoose

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- 2. CONEXIÓN A BASE DE DATOS (MONGODB) ---
// Si no hay variable de entorno, usa una local por defecto
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://invitado:invitado123@cluster0.dummy.mongodb.net/wikigames?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// --- 3. DEFINIR EL ESQUEMA (La forma de los datos) ---
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

// El modelo es el que nos deja guardar/leer
const Juego = mongoose.model('Juego', juegoSchema);

// --- 4. ENDPOINTS MODIFICADOS PARA USAR LA DB ---

// GET: Obtener todos
app.get('/api/juegos', async (req, res) => {
    try {
        const juegos = await Juego.find(); // Busca en la base de datos real
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Obtener uno por ID
app.get('/api/juegos/:id', async (req, res) => {
    try {
        const juego = await Juego.findById(req.params.id);
        juego ? res.json(juego) : res.status(404).json({ message: "No encontrado" });
    } catch (error) {
        res.status(500).json({ message: "Error al buscar ID" });
    }
});

// POST: Crear nuevo juego
app.post('/api/juegos', async (req, res) => {
    try {
        const nuevoJuego = new Juego(req.body); // Crea el objeto
        await nuevoJuego.save(); // ¡LO GUARDA EN LA NUBE!
        res.status(201).json(nuevoJuego);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Actualizar
app.put('/api/juegos/:id', async (req, res) => {
    try {
        const juegoActualizado = await Juego.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Devuelve el dato nuevo, no el viejo
        );
        res.json(juegoActualizado);
    } catch (error) {
        res.status(404).json({ message: "No se pudo editar" });
    }
});

// DELETE: Borrar
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