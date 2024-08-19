import './todolist.css';
import React, { useState, useEffect, useRef } from 'react'; 
import Alert from './Alert';

function ToDoList() { 

const [taskList, setTaskList] = useState([]);
const [textValue, setTextValue]= useState('');
const [taskMessage, setTaskMessage] = useState('');

const maxWidth = 360; // Genişlik sınırı
const inputRef = useRef(null); 

const lineLimit = (text) => { 
  if (!inputRef.current) return text; 

  const canvas = document.createElement('canvas'); //metin denişliğini ölçmek için canvas elemanı oluşturur
  const context = canvas.getContext('2d'); //canvas elemanının 2d çizim bağlamını context değişkenine alır, bu bağlamla metni ölçmek için kullanacağız
  context.font = getComputedStyle(inputRef.current).font; // Kullanıcı fontunu alır ve cnavas üzerindeki contexte uygular
// bununla metnin doğru genişlikte ölçülmesi sağlanır çünkü input içindeki yazı stili kullanılır
  const textWidth = context.measureText(text).width; // metnin genişliği ölçülür, canvas üzerindeki gerçek genişlik belirlenir

  if (textWidth > maxWidth) { 
    let lineLimitText = text; 
    while (context.measureText(lineLimitText + '...').width > maxWidth) { 
      lineLimitText = lineLimitText.slice(0, -1);
    }

    return  lineLimitText + ''; 
  }
  return text; 
};

  const handleChange= (event) => { 
    const value=event.target.value;
    setTextValue(lineLimit(value));
  }

function addTask() { 
  if(textValue.trim()) 
    {
      setTaskList([...taskList, { text: textValue, completed: false }]); 
      setTextValue('');
    }
  };

function deleteTask(index) { 
  const ifClickDeleteButton = taskList.filter((_,i) => i !== index); 
  setTaskList(ifClickDeleteButton); 
}

function completeTask(index) { 
  const ifClickCompleteButton = taskList.map((task, i) =>i === index ? { ...task, completed: !task.completed } : task); 
  setTaskList(ifClickCompleteButton);
}

useEffect(() => {
    const totalTasks = taskList.length; 
    const completeTasks = taskList.filter(task => task.completed).length; 
    setTaskMessage(`${completeTasks} tasks done out of ${totalTasks}`); 
  }, [taskList]); // 


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
