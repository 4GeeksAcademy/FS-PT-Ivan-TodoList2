import React, {useEffect, useState} from "react";



//create your first component
const Home = () => {
	
	const [userData, setUserData] = useState({});
	const [todo, setTodo] = useState('');

	

	useEffect(() =>{

		createUser()

		getUserData()
	},[])

	const createUser = () =>{
		fetch('https://playground.4geeks.com/todo/users/IvanTodoListYeah', {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			}
		})
		.then(respuesta =>{
			console.log('respuesta', respuesta)
			if(!respuesta.ok) throw new Error('error pidiendo usuarios');
			return respuesta.json()
		})
		.then(datos => console.log('datos',datos))
		.catch(error => console.log('error', error))
	}

	const getUserData = () =>{
		fetch('https://playground.4geeks.com/todo/users/IvanTodoListYeah')
		.then(respuesta =>{
			console.log('respuesta', respuesta)
			if(!respuesta.ok) throw new Error('error pidiendo usuarios');
			return respuesta.json()
		})
		.then(datos => {
			console.log('datos',datos)
			setUserData(datos)
		})
		.catch(error => console.log('error', error))
	}



	const crearTarea = () =>{
		if(todo.trim().length==0) return alert('La tarea no puede estar vacia asignala')
		fetch('https://playground.4geeks.com/todo/todos/IvanTodoListYeah', {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({label:todo, done: false})
		})
		.then(respuesta =>{
			console.log('respuesta', respuesta)
			if(!respuesta.ok) throw new Error('error pidiendo usuarios');
			return respuesta.json()
		})
		.then(datos => {
			console.log('crear tarea en datos',datos)
			getUserData(datos)
			setTodo('')
		})
		.catch(error => console.log('error', error))

	
	}

	//handleSubmit event
	const handleSubmit = e =>{
		e.preventDefault();
		crearTarea();
	}

	const handleDelete = (id) => {
		const isConfirmed = confirm('¿Seguro que quieres eliminar esta tarea?');
		if (!isConfirmed) return;
		fetch('https://playground.4geeks.com/todo/todos/'+ id, {
			method: 'DELETE',
			headers: {
				'Content-Type':'application/json'
			}
		})
		.then(respuesta =>{
			console.log('respuesta', respuesta)
			if(!respuesta.ok) throw new Error('error pidiendo usuarios');
			setUserData(prevData =>({
				...prevData,
				todos: prevData.todos.filter(tarea => tarea.id !== id)
			}))
			
		})
		.catch(error => console.log('error', error))
	}

	//crear usuario por input
	return (
		<div className="text-center">
			<form onSubmit={handleSubmit}>
				<input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
			</form>
			
			<ul>
				{userData.todos?.length > 0 ? userData.todos?.map(tarea=> <li key={tarea.id}>{tarea.label} <span onClick={() => handleDelete(tarea.id)}><i class="fa-solid fa-recycle"></i></span></li>) : 'No hay tareas'}
			</ul>


		</div>
	);
};

export default Home;
