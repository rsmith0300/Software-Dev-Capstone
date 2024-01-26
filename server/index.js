const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const port = 4000

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../client")));
app.get("/", (req, res) => {
    console.log("test")
    res.send ("hello")
});

const photos = ['DSC_0622.jpg', 'DSC_0618.jpg', 'DSC_0660.jpg']

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/uploads/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name as the stored file name
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

app.get("/login", (req, res) => {
    res.sendFile('login.html', { root: path.join(__dirname, "../client") }, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(err.status).end();
        } else {
            console.log("File sent successfully");
        }
    });
});

app.post("/login", (req, res) => {
    console.log("Received data:", req.body)
    // Check username and password (you can replace this with your authentication logic)
    const username = req.body.Username;
    const password = req.body.Password;
  
    // For simplicity, assume login is successful for any input
    if (username && password) {
      res.redirect("/photoFeed"); // Redirect to the photoFeed page upon successful login
    } else {
      // Redirect to login page if login fails
      res.redirect("/login");
    }
  });

app.get("/photoFeed", (req, res) => {
    res.sendFile('photoFeed.html', { root: path.join(__dirname, "../client") }, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(err.status).end();
        } else {
            console.log("File sent successfully");
        }
    });
});

app.post("/photoFeed", upload.single("photo"), (req, res) => {
    // Handle the uploaded photo
    // const photoBuffer = req.file.buffer;

    console.log(req.file)
    photos.push(req.file.filename)
    //res.status(200).json({ message: "Photo uploaded successfully" });
    res.redirect("/photoFeed");
});

app.get('/photoDump', (req, res) => {
    res.json(photos)
});

console.log("Static files served from:", path.join(__dirname, "../client"));
app.listen(`${port}`, () => console.log(`server running on port ${port}`));
