import express from "express";
import authroute from "./src/routes/authroute.js";
import { connectDB } from "./src/lib/db.js";
import { NODE_ENV, PORT } from "./src/config.js";
import cookieParser from "cookie-parser";
import messageroute from "./src/routes/messageroute.js";
import cors from 'cors';
import { app, server } from "./src/lib/socket.js";
import path from 'path';

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/api/auth', authroute);
app.use('/api/messages', messageroute);

if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
    connectDB()
})
