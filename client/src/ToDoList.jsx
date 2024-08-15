import './todolist.css';
import React, { useState, useEffect, useRef } from 'react';
import Alert from './Alert';

function ToDoList() { //bütün ToDoList kodları burada, return olarak bu fonksiyonu döndürdük 

const [taskList, setTaskList] = useState([]);
const [textValue, setTextValue]= useState('');
const [taskMessage, setTaskMessage] = useState('');

const maxWidth = 360; // Genişlik sınırı
const inputRef = useRef(null);

const truncateText = (text) => {
  if (!inputRef.current) return text;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = getComputedStyle(inputRef.current).font; // Kullanıcı fontunu al
  const textWidth = context.measureText(text).width;

  if (textWidth > maxWidth) {
    let truncatedText = text;
    while (context.measureText(truncatedText + '...').width > maxWidth) {
      truncatedText = truncatedText.slice(0, -1);
    }

    return  truncatedText + '';
  }
  return text;
};

  const handleChange= (event) => {
    const value=event.target.value;
    setTextValue(truncateText(value));
  }

function addTask() { //taskList'e task eklemek için yazdığımız fonksiyon
  if(textValue.trim())
    {
      setTaskList([...taskList, { text: textValue, completed: false }]);
      setTextValue('');
    }
  };

function deleteTask(index) { //delete butonuna basınca task silinir
  const ifClickDeleteButton = taskList.filter((_,i) => i !== index);
  setTaskList(ifClickDeleteButton);
}

function completeTask(index) { //complete butonuna basınca taskin üstü  çizilir
  const ifClickCompleteButton = taskList.map((task, i) =>i === index ? { ...task, completed: !task.completed } : task);
  setTaskList(ifClickCompleteButton);
}

useEffect(() => {
    const totalTasks = taskList.length;
    const completeTasks = taskList.filter(task => task.completed).length;
    setTaskMessage(`${completeTasks} tasks done out of ${totalTasks}`);
  }, [taskList]);


  return (
  <div className="useResponsive">
    <Alert/>

    <div className="card">
        
      <h1>TO DO LİST</h1>
    <div className="inputCard">
    <input ref={inputRef} className="text" type="text"
      value={textValue}
      onChange={handleChange}
      placeholder='add a new task...'
    />

    <button onClick={addTask} className="addButton"> + </button>
    </div>
    
    <ul className="taskList">
      
        {taskList.map((task, index) => ( 
          <li key={index}>
            
          <span className={`taskItem ${task.completed ? 'completed' : ''}`}>{task.text}</span>
          <div className='buttons'>
          <button onClick={() => completeTask(index)} className="complete"> ✓ </button>
          <button onClick={() => deleteTask(index)} className="delete"> X </button>
          </div>
          </li>
        )
      )}
      </ul>

      <div className="taskMessage">{taskMessage}</div>
    </div>
   </div>
  );

}

export default ToDoList;
