const mongoose = require('mongoose');


const todoListSchema = new mongoose.Schema({
   Description: {
      type: String,
      required: true
   },
   dueDate: {
      type: String,
      required: true
   },
   category : {
      type: String,
      required: true
   }   
});

const TodoItem = mongoose.model('TodoItem', todoListSchema);

module.exports = TodoItem;