const express=require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRoutes = express.Router();
const PORT = 4000;
let Todo = require("./todo.model");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todos", {useNewUrlParser:true});
const connection = mongoose.connection;
connection.once("open", function(){
    console.log("mongodb connected sucessfully");
});
todoRoutes.route("/").get(function(req, res){
    Todo.find(function(err, todos){
        if(err){
            console.log(err);
        }else{
            res.json(todos);
        }
    });

});
todoRoutes.route("/:id").get(function(req, res){
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        res.json(todo);
    });
});
todoRoutes.route("/add").post(function(req, res){
    let todo = new Todo(req.body);
    todo.save()
    .then(todo =>{
        res.status(200).json({"todo" : "todos submit succesfully"});
    })
    .catch(err=>{
        res.status(400).send("todos submit fail");
    });
});
todoRoutes.route("/update/:id").put(function(req, res){
    let id= req.params.id;
    Todo.findById(id, function(err, todo){
        if(!todo)
            res.send("data not update");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save()
            .then(todo=>{
                res.send("upadate completed");
            })
            .catch(err=>{
                res.status(408).send("update not completed");
            })
        
    });
});
app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRoutes);



app.listen(PORT, function(){
    console.log("server connected :" + PORT);
})