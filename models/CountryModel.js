var mongoose = require('mongoose');
var CountrySchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: [3, 'brand name must be at least 3 characters'],
         maxlength: 20
      },
   });
CountryModel = mongoose.model('countrys', CountrySchema);
module.exports = CountryModel;