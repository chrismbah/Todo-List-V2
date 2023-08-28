import { FC,ChangeEvent } from "react"
import { useState } from "react"
import "./App.css"
import { ITask } from "./Interfaces"
import { v4 as uuid } from "uuid";
import { TodoTask } from "./components/TodoTask";


const App:FC = () => {
  
  const [task,setTask]=useState<string>("")
  const [deadline,setDeadline]=useState<number>(0)
  const [todoList,setTodoList]=useState<ITask[]>([])

  const handleChange=(e:ChangeEvent<HTMLInputElement>):void=>{
    if(e.target.name==="task"){
      setTask(e.target.value)
    }
    else{
      setDeadline(Number(e.target.value))
    }
  }

  const addTask =():void=>{

    const newTask={
      taskName:task,
      deadline:deadline,
      id:uuid()
    }
    setTodoList([...todoList,newTask])
    setTask("")
    setDeadline(0)
    console.log(todoList)
  }
  function completeTask(id:number):void{
    setTodoList(todoList.filter((task)=>task.id!==id))
  }
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
        <input type="text" placeholder="Enter task..." name="task" onChange={handleChange} value={task} />
        <input type="number" placeholder="Deadline in days" name="deadline" value={deadline} onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task:ITask,key:number)=>{
          return <TodoTask key={key} task={task} completeTask={completeTask}
          />
        })}
      </div>
    </div>
  )
}

export default App
