var express = require('express');
const projects = require('../models').Project;

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  projects.findAll()
    .then(projects => {
      res.status(200).send(projects);
    })
    .catch(err => res.status(500).send({"error":"Internal server error"}));
});

router.post('/create', (req, res) => {
  let { title, person, due, status, description } = req.body;

  let errors = [];

  if (title.length < 2 || title.length > 55){
    errors.push({msg:'The title must contain 2-55 characters'});
  }
  if (person.length < 2 || person.length > 55){
    errors.push({msg:'The person name must contain 2-55 characters'});
  }
  if (!['ongoing','completed','overdue'].includes(status)){
    errors.push({msg:'Status is invalid'});
  }
  if (description.length < 2 || description.length < 150){
    errors.push({msg:'The title must contain 2-150 characters'});
  }

  if (errors.legth > 0){
    res.status(400).send(errors);
  } else {
    projects.create(req.body)
      .then(project => {
        res.status(201).send(project);
      })
      .catch(err => res.status(500).send({error:'Cannot create project'}));
  }
});

router.get('/:person', (req, res) => {
  let person = req.params.person;

  projects.findAll({
    where: {
      person: person
    }
  })
    .then(projects => {
      res.status(200).send(projects);
    })
    .catch(err => res.status(404).send({error:'Person does not exist'}));
});

router.delete('/delete/:id', (req, res) => {
  let id = req.params.id;

  projects.destroy({
    where: {
      id: id
    }
  })
    .then(() => {
      res.status(204).send({msg:'Project deleted successfully'})
    })
    .catch(() => res.status(404).send({error:'Project does not exist'}));
})

module.exports = router;
