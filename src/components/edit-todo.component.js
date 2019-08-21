import React, { Component } from "react";
import axios from "axios";

export default class EditTodo extends Component{
    constructor(props){
        super(props);
        this.onChangeTodoDescription=this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible=this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority=this.onChangeTodoPriority.bind(this);
        this.onChangeTodocompleted=this.onChangeTodocompleted.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
            this.state={
            todo_description:'',
            todo_responsible:'',
            todo_priority:'',
            todo_completed: false
            }
        
    }
    componentDidMount(){
        axios.get("http://localhost:4000/todos/" + this.props.match.params.id)
        
        .then(res=>{
            this.setState({
                todo_description : res.data.todo_description,
                todo_responsible : res.data.todo_responsible,
                todo_priority : res.data.todo_priority,
                todo_completed : res.data.todo_completed

            })
        })
        
            .catch(err=>{
                console.log(err);
            })
        
    }
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        })
    }
    onChangeTodoResponsible(e){
        this.setState({
            todo_responsible:e.target.value
        })
    }
    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        })
    }
    onChangeTodocompleted(e){
        this.setState({
            todo_completed: !this.state.todo_completed
        })
    }
    onSubmit(e){
        e.preventDefault();
        const obj={
            todo_description:this.state.todo_description,
            todo_responsible:this.state.todo_responsible,
            todo_priority:this.state.todo_priority,
            todo_completed:this.state.todo_completed
        }
        axios.put("http://localhost:4000/todos/update/" + this.props.match.params.id, obj)
        
        .then(res=>console.log(res.data));
        this.props.history.push("/");
    }
    
    render(){
        return(
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Description</label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription}/>
                        <label>Responsible</label>
                        <input type="text" className="form-control" value={this.state.todo_responsible} onChange={this.onChangeTodoResponsible}/>
                    
                    <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="priorityLow" name="priorityOptions"
                            value="Low" checked={this.state.todo_priority==="Low"} onChange={this.onChangeTodoPriority}/>
                            <label>Low</label>
                            
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="priorityMedium" name="priorityOptions"
                            value="Medium" checked={this.state.todo_priority==="Medium"} onChange={this.onChangeTodoPriority}/>
                            <label>Medium</label>
                            
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="priorityHigh" name="priorityOptions"
                            value="High" checked={this.state.todo_priority==="High"} onChange={this.onChangeTodoPriority}/>
                            <label>High</label>
                            
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="completedcheckbox"
                            name="completedcheckbox" checked={this.state.todo_completed}
                            value={this.state.todo_completed} onChange={this.onChangeTodocompleted}/>
                            <label className="form-check-label" htmlFor="completedcheckbox">Completed</label>
                        </div>
                        <br/>
                        <input type="submit" value="update" className="btn btn-primary"/>
                        </div>
                </form>
            </div>
        )
    }
}