const router = require('express').Router();
const PirateMime = require('../models/pirateMimes');
const validate = require('../middleware/validateSession');

router.get('/test', (req, res) => res.send('Pirate Mime Controller Test'));

// CREATE NEW PIRATE
router.post('/create', (req, res) => {
  PirateMime.create({
    denim: req.body.denim,
    specialMoves: req.body.specialMoves,
    seaworthy: req.body.seaworthy,
    heaviestPianoLift: req.body.heaviestPianoLift
  })
    .then(piratemime => res.status(200).json({ message: 'Welcome aboard, matey!', deckhand: piratemime }))
    .catch(err => res.status(500).json({ message: 'PirateMime Creation Failed', error: err }))
})

// GET PIRATE CREW
router.get('/crew', (req, res) => {
  PirateMime.findAll()
    .then(crew => res.status(200).json({ message: `Found ${crew.length} crew on board!`, count: crew.length, crew }))
    .catch(err => res.status(500).json({ message: 'Mary Celeste: No Crew present', err }))
})

// UPDATE A PIRATE MIME
// localhost:8080/piratemime/mutiny/2
router.put('/mutiny/:id', validate, (req, res) => {
  //     req.body will hold the new information
  PirateMime.update(req.body, { where: { id: req.params.id } })
    .then(updated => res.status(200).json({ message: `Successfully updated crewmate ${req.params.id}`, updated}))
    .catch(err => res.status(500).json({ message: 'Update failed, yer walkin\' the plank!', err }))
})

// DELETE A PIRATE (walk the plank)
router.delete('/theplank/overboard/:id', validate, (req, res) => {
  PirateMime.destroy({ where: { id: req.params.id } })
    .then(planked => res.status(200).json({ message: `Deckhand #${req.params.id} has been fed to the fishes!`, planked}))
    .catch(err => res.status(500).json({ message: 'Ye can\'t even walk the plank right...', error: err }))
})

module.exports = router;