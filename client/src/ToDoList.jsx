import './todolist.css';
import React, { useState, useEffect, useRef } from 'react'; //hooksları tanımladım
// hookslar class yazmadan react özelliklerini kullanmamızı sağlar
// veriyi saklayıp daha sonra kullanabilmek için useState
// sayfa yüklendiğinde ya da bir state değiştiğinde belli olayların olmasını istediğimiz için useEffect
// değişkeni component ömrü boyunca tutmamızı için useRef, html içinde öğe oluşturup değer,n, js'de almak yerine kullanırız
import Alert from './Alert';

function ToDoList() { 

const [taskList, setTaskList] = useState([]);
const [textValue, setTextValue]= useState('');
const [taskMessage, setTaskMessage] = useState('');

const maxWidth = 360; // Genişlik sınırı
const inputRef = useRef(null); // useRef ile input elemanına referans atadık

const lineLimit = (text) => { // bu fonk ile metnin uzunluğun ölçtük ve sınırı aşarsa kısaltmasını istedik
  if (!inputRef.current) return text; // eğer inputta bir şey yazmıyorsa text değişkenini geri döndürür

  const canvas = document.createElement('canvas'); //metin denişliğini ölçmek için canvas elemanı oluşturur
  const context = canvas.getContext('2d'); //canvas elemanının 2d çizim bağlamını context değişkenine alır, bu bağlamla metni ölçmek için kullanacağız
  context.font = getComputedStyle(inputRef.current).font; // Kullanıcı fontunu alır ve cnavas üzerindeki contexte uygular
// bununla metnin doğru genişlikte ölçülmesi sağlanır çünkü input içindeki yazı stili kullanılır
  const textWidth = context.measureText(text).width; // metnin genişliği ölçülür, canvas üzerindeki gerçek genişlik belirlenir

  if (textWidth > maxWidth) { //metnin boyutu maxwith den büyükse
    let lineLimitText = text; //text değeri, lineLimitText'te atanır
    while (context.measureText(lineLimitText + '...').width > maxWidth) { //lineLimitText değişkenine ... ekleyerek metnin genişliğini kontrol eder ve genişlik belirtilen maxWidth değerini aşarsa, metni bir karakter kısaltır.
      lineLimitText = lineLimitText.slice(0, -1);
    }

    return  lineLimitText + ''; //kısaltılmış metni geri döndürür, sonuna boş string ekleyerek metni string olarak döndürmüş olur
  }
  return text; //texti geri döndürür
};

  const handleChange= (event) => { //inputta değişiklik yapılırsa yapılan değişikliği alıp lineLimit fonksiyonuna atar
    const value=event.target.value;
    setTextValue(lineLimit(value));
  }

function addTask() { //taskList'e task eklemek için yazdığımız fonksiyon
  if(textValue.trim()) //metnin önü arkasındaki boşluklar temizlendi
    {
      setTaskList([...taskList, { text: textValue, completed: false }]); //görev listesini günceller
      //...taskList ile yeni görev eklenir
      // text: textValue, kullanıcının girdiği metni görev metni olarak ayarlar ve completed: false ile görevin tamamlanmadığını belirtir
      setTextValue('');
    }
  };

function deleteTask(index) { //delete butonuna basınca task silinir
  const ifClickDeleteButton = taskList.filter((_,i) => i !== index); //taskList.filter(...): filter metodu, taskList dizisindeki her bir öğeyi inceleyip belirli bir koşulu sağlayan öğeleri içeren yeni bir dizi döndürür.
  //(_, i) => i !== index: Bu, filter metodunun bir callback fonksiyonudur. filter metodunun iki argümanı vardır: öğe (_) ve öğenin dizideki indeksi (i). Burada öğeye (_) ihtiyaç olmadığından, sadece indeks (i) kullanılır.
  //i !== index: Bu koşul, i (şu anki öğenin dizideki indeksi) index (silinmek istenen öğenin indeksi) ile eşit değilse true döndürür. Yani, index konumundaki öğe hariç diğer tüm öğeleri içeren yeni bir dizi oluşturulur.
  //Özetle, bu satır, taskList dizisindeki belirtilen indeksteki öğeyi kaldırarak yeni bir dizi oluşturur.
  setTaskList(ifClickDeleteButton); //taskListi günceller
}

function completeTask(index) { //complete butonuna basınca taskin üstü  çizilir

  //map ile dizi yazdırabiliriz
  const ifClickCompleteButton = taskList.map((task, i) =>i === index ? { ...task, completed: !task.completed } : task); // taskList dizisini dönüştürür ve belirli bir görev (task) üzerinde güncelleme yapar. Özellikle, verilen index konumundaki görev (task) tamamlanmış mı tamamlanmamış mı olduğunu değiştirir.
  setTaskList(ifClickCompleteButton); //taskListi günceller
}

useEffect(() => {
    const totalTasks = taskList.length; //taskList sayısını alır ve totalTask değişkenine atar
    const completeTasks = taskList.filter(task => task.completed).length; //task'lerin completed olanlarını filtreler ve sayısını alıp completeTasks değişkenine atar
    setTaskMessage(`${completeTasks} tasks done out of ${totalTasks}`); //taskMessage değişkenine yeni değer atadın
  }, [taskList]); // taskList değişirse useEffect güncellenecek


  return ( // burada geri döndürülecek olan ve html kodlaırmız var
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
      
        {taskList.map((task, index) => (  // taskListi içindeki her böir öğe (task)için map çalışır ve task nesnelerini jsx öğesine dönüştürür her task nesnesi ve indeksi 'index' ile işleme alınır
        //  map metoduyla oluşturulan her bir JSX öğesi bir liste öğesi (<li>) olarak render edilir. key={index} prop'u, React'in her bir liste öğesini tanıyabilmesi ve performansı artırabilmesi için her öğeye benzersiz bir anahtar (key) atar. Burada index kullanılır, ancak genellikle daha benzersiz bir değer kullanmak tercih edilir.
        // görev metnini (task.text) bir span öğesi içinde gösterir. className prop'u, taskItem sınıfını ve eğer görev tamamlanmışsa (task.completed true ise) completed sınıfını ekler. Bu, tamamlanmış görevlerin stilini değiştirmek için kullanılır. Örneğin, tamamlanmış görevlerin üzeri çizilebilir veya farklı bir renk kullanılabilir.
        // taskList içinde delete ve complete butonları tanımlanır
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
