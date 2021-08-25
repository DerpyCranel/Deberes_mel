const  db=  firebase.firestore();


const taskForm = document.getElementById('task-form');
const taskConteiner= document.getElementById('tasks-container');

const savetask = (title, description)=>
db.collection("tasks").doc().set({
    title,
    description
});


const getTasks = () => db.collection('tasks').get();
const onGetTask = (callback)=>db.collection ("tasks").onSnapshot(callback);
const deleteTask= id=> db.collection('tasks').doc(id).delete();

window.addEventListener('DOMContentLoaded', async (e) =>{


 onGetTask((querySnapshot)=>{

taskConteiner.innerHTML= '';

    querySnapshot.forEach(doc => {

        console.log(doc.data())
   
        const task = doc.data();
        task.id= doc.id;
   
        taskConteiner.innerHTML += `<div class="card card-body mt-2 border-primary"> 
       <h5> ${task.title} </h5>
       <p>  ${task.description} </p>
   
       <div>
       <button class="btn btn-info btn-edit">Editar</button>
       <button class="btn btn-warning  btn-delete" data-id="${task.id}">Eliminar</button>
       </div>
   
        </div>`;


const btnsDelete= document.querySelectorAll('.btn-delete');
        btnsDelete.forEach(btn =>{
            btn.addEventListener('click',async(e)=>{
                 await deleteTask(e.target.dataset.id)
                
            })
        })
    })
 })


 

})

taskForm.addEventListener('submit',async (e) =>{
    e.preventDefault();

  const title=  taskForm['task-title'];
   const description= taskForm['task-description'];

await savetask(title.value,description.value);
  taskForm.reset();
title.focus();


} )