const express = require('express');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 4000;

const connectDB = require('./config/db');
const TodoItem = require('./models/todoItem');

connectDB();//connecting to database

const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


const todoList = [
      {
            Description:"Why not add a task?",
            dueDate: "MAY 2, 2019",
            category:"Work"

      },
      {
            Description:"Lets Make a Todo App",
            dueDate: "MARCH 2, 2019",
            category:"School"
      },
      {
            Description:"Lets Make a Web App",
            dueDate: "MARCH 2, 2023",
            category:"School"
      }
]


app.get('/', function(req, res){
      // res.render('home', {
      //       title: "Todo App",
      //       todo_list_item: todoList
      // });

      TodoItem.find({})//it is querying to db and find all the contact list & render it to the browser
      .then((todoList) => {
            return res.render('home',{
                  title:"Todo App",
                  todo_list_item:todoList
            });
      }).catch((err) => {
            console.log(err);
            return;
      })

});



app.post('/create-description', function(req, res){
      
      // todoList.push(req.body);
      
      // console.log(req.body);
      // return res.redirect('back');

      TodoItem.create({
            Description: req.body.Description,
            dueDate: req.body.dueDate,
            category: req.body.category
      }).then( (newTodoItem) => {
            console.log("*******", newTodoItem);
            return   res.redirect('back');
      }).catch((err) => {
            console.error(err);
      });

});


app.get('/delete', async (req, res) => {
      try {
        // Get the item IDs to delete from the query parameters.
        const itemIds = req.query.items.split(',');
        console.log(itemIds);

        for(const itemId of itemIds) {
            const deletedItem = await TodoItem.findByIdAndRemove(itemId);
            if(!deletedItem){
                  // handle the case where the item with the given ID is not found.
                  console.error(`Item with ID ${itemId} not found`);
                  return res.status(404).send(`Item with ID ${itemId} not found.`);
            }
        }
        // all items have been successfully deleted.
        return res.redirect('/'); //redirecting to updated todolist
      } catch (err) {
        console.error('Error deleting item:', err);
        return res.status(500).send('Error deleting item');
      }
});
    


app.listen(port,function(err){
      if(err){
            console.log(`Error in running the server : ${err}`);
      }
      console.log(`Yup! server is running on port: ${port}`);
});