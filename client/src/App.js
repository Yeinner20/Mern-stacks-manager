import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Nuevos estados para saber si estamos editando
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      // Si estamos editando, usamos PUT
      await axios.put(`/api/tasks/${id}`, { title, description });
      setEditing(false);
      setId('');
    } else {
      // Si no, creamos nueva tarea con POST
      await axios.post('/api/tasks', { title, description });
    }
    // Limpiar y recargar
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if(window.confirm('¿Eliminar tarea?')) {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
    }
  };

  // Función para cargar los datos en el formulario
  const editTask = (task) => {
    setEditing(true);
    setId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>MERN Task Manager</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', background: '#f4f4f4', padding: '20px', borderRadius: '5px' }}>
        <input 
          type="text" 
          placeholder="Título de la tarea"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea 
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
        ></textarea>
        <button type="submit" style={{ padding: '10px 20px', background: editing ? 'orange' : '#282c34', color: 'white', border: 'none', cursor: 'pointer' }}>
          {editing ? 'Actualizar Tarea' : 'Guardar Tarea'}
        </button>
      </form>

      <div>
        {tasks.map(task => (
          <div key={task._id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ margin: 0 }}>{task.title}</h3>
              <p style={{ margin: '5px 0 0 0' }}>{task.description}</p>
            </div>
            <div>
              {/* Botón Editar */}
              <button 
                onClick={() => editTask(task)}
                style={{ background: '#f0ad4e', color: 'white', border: 'none', padding: '5px 10px', marginRight: '5px', cursor: 'pointer' }}
              >
                Editar
              </button>
              {/* Botón Eliminar */}
              <button 
                onClick={() => deleteTask(task._id)} 
                style={{ background: '#d9534f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;