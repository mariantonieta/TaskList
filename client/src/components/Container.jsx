import React, { useEffect, useState } from 'react';
const url = 'http://localhost:5000';
const Container = () => {
const [tasks, setTasks] = useState([])
const [active, setActive] = useState(false)
const [newTodo, setNewTodo] = useState("")
useEffect(() =>{
  getTask();
},[])
const getTask = () => {
  fetch(url + '/tasks' )
    .then(res => res.json())
  .then(data => setTasks(data))
  .catch(err => console.log("Error: ", err))

}
const addTodo = async () => {
  const data = await fetch(url + "/task/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      text: newTodo
    })
  }).then(res => res.json());

  setTasks([...tasks, data]);

  setActive(false);
  setNewTodo("");
}
const completeTask = async id => {
  const data = await fetch(url + '/task/complete' + id).then(res => res.json());

  setTasks(todos => todos.map(todo => {
    if (todo._id === data._id) {
      todo.complete = data.complete;
    }

    return todo;
  }));
  


}
const deleteTask = async id => {
  const data = await fetch(url + '/task/delete/' + id, { method: "DELETE" }).then(res => res.json());

  setTasks(todos => todos.filter(todo => todo._id !== data.result._id));
}


return (
  <>
  <h1>Welcome, Mariantonieta</h1>
			<h4>Your tasks</h4>    <div className='tasks'>
      <div className="addPopup" onClick={() => setActive(true)}>+</div>

{active ? (
  <div className="popup">
    <div className="closePopup" onClick={() => setActive(false)}>X</div>
    <div className="content">
      <h3>Add Task</h3>
      <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
      <div className="button" onClick={addTodo}>Create Task</div>
    </div>
  </div>
) : ''}
</div>
   { tasks.length > 0 ?
        tasks.map(task =>(
<div className={'task' + (task.complete ? "is-complete" : "" )} key={task._id}
onClick={()=>completeTask(task._id)}
>
            <div className='box'></div>
            <div className='text'>{task.text}</div>
            <div className='delete' onClick={() => deleteTask(task._id)}>x</div>
 
        </div>
        )) : (
					<p>You currently have no tasks</p>
				)
      }
        
        
        
</>
     )
}

export default Container
