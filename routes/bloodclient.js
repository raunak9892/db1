const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const {findByIdAndUpdate} = require("../models/Note");
const Reciever = require("../models/Reciever");

// Route 1: Get all the notes using: GET "/api/auth/fetchallnotes". Login required
router.get("/fetchallbloodrec", fetchuser, async (req, res) => {
  try {
    const notes = await Reciever.find({user: req.user.id});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addbloodrec",
  fetchuser,
  [
    body("name", "Enter a valid patientname").isLength({min: 3}),
    body("address", "prescription must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const {name, address, bloodgroup,} = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
      const note = new Reciever({
        name, 
        address, 
        bloodgroup,
        
        
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatebloodrec/:id", fetchuser, async (req, res) => {
  const {name, address, bloodgroup} = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (name) {
      newNote.name = name;
    }
    if (address) {
      newNote.address = address;
    }
    if (bloodgroup) {
      newNote.bloodgroup = bloodgroup;
    }
    
     
    // Find the note to be updated and update it
    let note = await Reciever.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Reciever.findByIdAndUpdate(
      req.params.id,
      {$set: newNote},
      {new: true}
    );
    res.json({note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Deleting an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletebloodrec/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Reciever.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns the note

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Reciever.findByIdAndDelete(req.params.id);
    res.json({Success: "Note has been deleted", note: note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
