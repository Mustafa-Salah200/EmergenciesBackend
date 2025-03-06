const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const emergenciesRoutes = require("./routes/emergenciesRoutes.js");
const path = require("path");
const fs = require("fs");

const app = express();
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 9000;
const url = process.env.URL;

mongoose
  .connect(url)
  .then((result) =>
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));
// Note pad
// not bad
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.userId;
    const userDir = path.join(__dirname, "./uploads", userId);

    fs.readdir(userDir, (err, files) => {
      if (!files) {
        return fs.mkdirSync(userDir, { recursive: true });
        cb(null, userDir);
      }

      if (err) throw err;
      files.forEach((file) => {
        const filePath = path.join(userDir, file);
        fs.unlink(filePath, (err) => {
          if (err) throw err;
        });
      });
    });

    fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload/:userId", upload.single("file"), (req, res) => {
  try {
    if (req.file) {
      res.status(200).json({ message: "Image uploaded successfully" });
    } else {
      res.status(400).json({ error: "No image uploaded" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/emergencies", emergenciesRoutes);
