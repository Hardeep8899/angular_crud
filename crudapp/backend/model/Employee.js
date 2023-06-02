const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Employee = new Schema({
    firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
}, {
  collection: 'Employee'
})
module.exports = mongoose.model('Employee', Employee)