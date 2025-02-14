require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sua_senha",
  database: "seu_banco",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao MySQL!");

  // Criar tabela users e roles automaticamente
  db.query(
    `CREATE TABLE IF NOT EXISTS roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    )`,
    (err) => {
      if (err) throw err;
      console.log("Tabela roles criada!");
    },
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role_id INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    )`,
    (err) => {
      if (err) throw err;
      console.log("Tabela users criada!");
    },
  );
});

// Rota para registrar usuário
app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      `INSERT INTO users (fullName, email, password, role_id) VALUES (?, ?, ?, ?)`,
      [fullName, email, hashedPassword, 1],
      (err, result) => {
        if (err) return res.status(400).json({ error: err.sqlMessage });
        res.json({ message: "Usuário criado com sucesso!" });
      },
    );
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

// Rota de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (results.length === 0)
        return res.status(400).json({ error: "Usuário não encontrado" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Senha incorreta" });

      const token = jwt.sign({ id: user.id, role: user.role_id }, "secreto", {
        expiresIn: "1h",
      });
      res.json({
        token,
        user: { id: user.id, fullName: user.fullName, email: user.email },
      });
    },
  );
});

// Iniciar servidor
app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
