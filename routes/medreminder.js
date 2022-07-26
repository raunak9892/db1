const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const {findByIdAndUpdate} = require("../models/Note");
const Reminder = require("../models/Reminder");

// Route 1: Get all the notes using: GET "/api/auth/fetchallnotes". Login required
router.get("/fetchallreminder", fetchuser, async (req, res) => {
  try {
    const notes = await Reminder.find({user: req.user.id});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addreminder",
  fetchuser,
  [
    body("name", "Enter a valid patientname").isLength({min: 3}),
    body("phoneno", "phone no must be atleast 10 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const {name, phoneno, medicines,time} = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
      const note = new Reminder({
        name, 
        phoneno, 
        medicines,
        time,
        
        
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
router.put("/updatemreminder/:id", fetchuser, async (req, res) => {
  const {name, phoneno, medicines,time} = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (name) {
      newNote.name = name;
    }
    if (phoneno) {
      newNote.phoneno = phoneno;
    }
    if (medicines) {
      newNote.medicines = medicines;
    }
    if (time) {
        newNote.time = time;
      }
    
     
    // Find the note to be updated and update it
    let note = await Reminder.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Reminder.findByIdAndUpdate(
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
router.delete("/deletereminder/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Reminder.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns the note

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Reminder.findByIdAndDelete(req.params.id);
    res.json({Success: "Note has been deleted", note: note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
