var express = require('express');
var router = express.Router();
var ManufacturerModel = require('../models/ManufacturerModel');
var ToyModel = require('../models/ToyModel');

router.get('/', async (req, res) => {
   var manufacturers = await ManufacturerModel.find({});
   res.render('manufacturer/index', { manufacturers });
})

router.get('/add', (req, res) => {
   res.render('manufacturer/add');
})

router.post('/add', async (req, res) => {
   var manufacturer = req.body;
   await ManufacturerModel.create(manufacturer);
   res.redirect('/manufacturer');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM toys WHERE manufacturer = "id"
   var toys = await ToyModel.find({ manufacturer : id }).populate('manufacturer');
   res.render('manufacturer/detail', { toys })
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   
   var manufacturer = await ManufacturerModel.findById(id);
   await ManufacturerModel.deleteOne(manufacturer);

   res.redirect('/manufacturer');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM manufacturers
   //     TRUNCATE TABLE manufacturers
   await ManufacturerModel.deleteMany();
   console.log('Delete all manufacturer succeed !');
   res.redirect('/manufacturer');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var manufacturer = await ManufacturerModel.findById(id);
   res.render('manufacturer/edit', { manufacturer });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var manufacturer = req.body;
   try {
      //SQL: UPDATE manufacturers SET A = B WHERE id = 'id'
      await ManufacturerModel.findByIdAndUpdate(id, manufacturer);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/manufacturer');
})

module.exports = router;