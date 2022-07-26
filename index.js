const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/authdoc", require("./routes/authdoc"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/blood", require("./routes/blood"));
app.use("/api/bloodclient", require("./routes/bloodclient"));
app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/medicine", require("./routes/medicine"));
app.use("/api/medicineclient", require("./routes/medicineclient"));
app.use("/api/medreminder", require("./routes/medreminder"));
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
