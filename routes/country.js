var express = require('express');
var router = express.Router();
var CountryModel = require('../models/CountryModel');
var ToyModel = require('../models/ToyModel');
router.get('/', async (req, res) => {
   var countrys = await CountryModel.find({});
   res.render('country/index', { countrys });
})

router.get('/add', (req, res) => {
   res.render('country/add');
})

router.post('/add', async (req, res) => {
   var country = req.body;
   await CountryModel.create(country);
   res.redirect('/country');
})


router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var country = await CountryModel.findById(id);
   res.render('country/edit', { country });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var country = req.body;
   try {
      //SQL: UPDATE countrys SET A = B WHERE id = 'id'
      await CountryModel.findByIdAndUpdate(id, country);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/country');
})
router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   
   var country = await CountryModel.findById(id);
   await CountryModel.deleteOne(country);

   res.redirect('/country');
})
router.get('/deleteall', async (req, res) => {
   await CountryModel.deleteMany();
   console.log('Delete all country succeed !');
   res.redirect('/country');
})
module.exports = router;