var mongoose = require('mongoose');
var ManufacturerSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: [3, 'brand name must be at least 3 characters'],
         maxlength: 20
      },
      country: String
   });
ManufacturerModel = mongoose.model('manufacturers', ManufacturerSchema);
module.exports = ManufacturerModel;