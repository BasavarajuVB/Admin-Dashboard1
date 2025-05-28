// import React, { useState, useEffect, useCallback } from 'react';
// import {  ref, push, set, update, onValue, remove } from 'firebase/database';
// import {database} from "../firebase";
// import '../styles/AdminTask.css'; // Assuming you have a CSS file for styling




// const AdminTask = () => {
//   const [taskForm, setTaskForm] = useState({
//     title: '',
//     description: '',
//     type: '',
//     score: '',
//     videoUrl: '',
//   });
//   const [tasks, setTasks] = useState([]);
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [message, setMessage] = useState({ text: '', color: '' });

//   useEffect(() => {
//     const tasksRef = ref(database, 'tasks');
//     const unsubscribe = onValue(tasksRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setTasks(Object.entries(data).map(([id, taskItem]) => ({ id, ...taskItem })));
//       } else {
//         setTasks([]);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const showMessage = useCallback((msg, color) => {
//     setMessage({ text: msg, color });
//     setTimeout(() => {
//       setMessage({ text: '', color: '' });
//     }, 3000);
//   }, []);

//   const resetForm = () => {
//     setTaskForm({ title: '', description: '', type: '', score: '', videoUrl: '' });
//     setEditingTaskId(null);
//   };

//   const handleChange = (e) => {
//     setTaskForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { title, description, type, score, videoUrl } = taskForm;
//     if (title && type && score) {
//       if (editingTaskId) {
//         updateTask(editingTaskId, title, description, type, parseInt(score, 10), videoUrl);
//       } else {
//         createTask(title, description, type, parseInt(score, 10), videoUrl);
//       }
//     }
//   };

//   const createTask = (title, description, type, score, videoUrl) => {
//     const tasksRef = ref(database, 'tasks');
//     const newTaskRef = push(tasksRef);
//     const taskData = {
//       title,
//       description,
//       type,
//       score,
//       videoUrl,
//       createdAt: new Date().toISOString(),
//     };

//     set(newTaskRef, taskData)
//       .then(() => {
//         showMessage(`Task "${title}" created successfully!`, 'green');
//         resetForm();
//       })
//       .catch((error) => {
//         showMessage(`Error creating task: ${error.message}`, 'red');
//       });
//   };

//   const updateTask = (taskId, title, description, type, score, videoUrl) => {
//     const taskRef = ref(database, 'tasks/' + taskId);

//     update(taskRef, {
//       title,
//       description,
//       type,
//       score,
//       videoUrl,
//       updatedAt: new Date().toISOString(),
//     })
//       .then(() => {
//         showMessage('Task updated successfully!', 'green');
//         resetForm();
//       })
//       .catch((error) => {
//         showMessage(`Error updating task: ${error.message}`, 'red');
//       });
//   };

//   const handleEdit = (taskId) => {
//     const task = tasks.find(task => task.id === taskId);
//     if (task) {
//       setTaskForm({
//         title: task.title,
//         description: task.description || '',
//         type: task.type,
//         score: task.score.toString(),
//         videoUrl: task.videoUrl || ''
//       });
//       setEditingTaskId(taskId);
//     }
//   };

//   const handleDelete = (taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       const taskRef = ref(database, 'tasks/' + taskId);
//       remove(taskRef)
//         .then(() => {
//           showMessage('Task deleted successfully!', 'green');
//         })
//         .catch((error) => {
//           showMessage(`Error deleting task: ${error.message}`, 'red');
//         });
//     }
//   };

//   return (
//     <div className="task-container">
//       <h1>Task Manager</h1>
//       <form id="taskForm" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Enter task title"
//           value={taskForm.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Enter task description (optional)"
//           value={taskForm.description}
//           onChange={handleChange}
//         />
//         <select
//           name="type"
//           value={taskForm.type}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select task type</option>
//           <option value="watch">Watch</option>
//           <option value="social">Social</option>
//           <option value="partnership">Partnership</option>
//           <option value="misc">Misc</option>
//         </select>
//         <input
//           type="number"
//           name="score"
//           placeholder="Enter task score"
//           value={taskForm.score}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="videoUrl"
//           placeholder="Enter video URL (optional, for watch tasks)"
//           value={taskForm.videoUrl}
//           onChange={handleChange}
//         />
//         <button type="submit">
//           {editingTaskId ? 'Update Task' : 'Add Task'}
//         </button>
//       </form>
//       {message.text && (
//         <div id="message" style={{ color: message.color }}>
//           {message.text}
//         </div>
//       )}
//       <div id="taskList">
//         <h2>Existing Tasks</h2>
//         <table id="tasksTable">
//           <thead>
//             <tr>
//               <th>TaskId</th>
//               <th>Title</th>
//               <th>Type</th>
//               <th>Score</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((taskItem,index) => (
//               <tr key={taskItem.id}>
//                 <td>{index+1}</td>
//                 <td>{taskItem.title}</td>
//                 <td>{taskItem.type}</td>
//                 <td>{taskItem.score}</td>
//                 <td>{taskItem.description}</td>
//                 <td>
//                   <button
//                     className="edit-btn"
//                     onClick={() => handleEdit(taskItem.id)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(taskItem.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {tasks.length === 0 && (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: 'center' }}>
//                   No tasks available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminTask;
// import React, { useState, useEffect, useCallback } from 'react';
// import { ref, push, set, update, onValue, remove } from 'firebase/database';
// import { database } from '../firebase';
// import '../styles/AdminTask.css';

// const AdminTask = () => {
//   const [taskForm, setTaskForm] = useState({
//     title: '',
//     type: '',
//     description: '',
//     points: '',
//     url: '',
//     iconBg: 'bg-indigo-500/30',
//     completed: 0
//   });

//   const [tasks, setTasks] = useState([]);
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [message, setMessage] = useState({ text: '', color: '' });

//   useEffect(() => {
//     const tasksRef = ref(database, 'tasks');
//     const unsubscribe = onValue(tasksRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setTasks(Object.entries(data).map(([id, taskItem]) => ({ id, ...taskItem })));
//       } else {
//         setTasks([]);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const showMessage = useCallback((msg, color) => {
//     setMessage({ text: msg, color });
//     setTimeout(() => {
//       setMessage({ text: '', color: '' });
//     }, 3000);
//   }, []);

//   const resetForm = () => {
//     setTaskForm({
//       title: '',
//       type: '',
//       description: '',
//       points: '',
//       url: '',
//       iconBg: 'bg-indigo-500/30',
//       completed: 0
//     });
//     setEditingTaskId(null);
//   };

//   const handleChange = (e) => {
//     setTaskForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { title, type, description, points, url } = taskForm;
//     if (title && type && points) {
//       if (editingTaskId) {
//         updateTask(editingTaskId, { ...taskForm, points: parseInt(points, 10) });
//       } else {
//         createTask({ ...taskForm, points: parseInt(points, 10) });
//       }
//     }
//   };

//   const createTask = (taskData) => {
//     const tasksRef = ref(database, 'tasks');
//     const newTaskRef = push(tasksRef);

//     set(newTaskRef, {
//       ...taskData,
//       createdAt: new Date().toISOString()
//     })
//       .then(() => {
//         showMessage(`Task "${taskData.title}" created successfully!`, 'green');
//         resetForm();
//       })
//       .catch((error) => {
//         showMessage(`Error creating task: ${error.message}`, 'red');
//       });
//   };

//   const updateTask = (taskId, updatedData) => {
//     const taskRef = ref(database, `tasks/${taskId}`);
//     update(taskRef, {
//       ...updatedData,
//       updatedAt: new Date().toISOString()
//     })
//       .then(() => {
//         showMessage('Task updated successfully!', 'green');
//         resetForm();
//       })
//       .catch((error) => {
//         showMessage(`Error updating task: ${error.message}`, 'red');
//       });
//   };

//   const handleEdit = (taskId) => {
//     const task = tasks.find(task => task.id === taskId);
//     if (task) {
//       setTaskForm({
//         title: task.title || '',
//         type: task.type || '',
//         description: task.description || '',
//         points: task.points?.toString() || '',
//         url: task.url || '',
//         iconBg: task.iconBg || 'bg-indigo-500/30',
//         completed: task.completed || 0
//       });
//       setEditingTaskId(taskId);
//     }
//   };

//   const handleDelete = (taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       const taskRef = ref(database, `tasks/${taskId}`);
//       remove(taskRef)
//         .then(() => {
//           showMessage('Task deleted successfully!', 'green');
//         })
//         .catch((error) => {
//           showMessage(`Error deleting task: ${error.message}`, 'red');
//         });
//     }
//   };

//   return (
//     <div className="task-container">
//       <h1>Task Manager</h1>
//       <form id="taskForm" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Enter title"
//           value={taskForm.title}
//           onChange={handleChange}
//           required
//         />
//         <select name="type" value={taskForm.type} onChange={handleChange} required>
//           <option value="">Select type</option>
//           <option value="watch">Watch</option>
//           <option value="social">Social</option>
//           <option value="partnership">Partnership</option>
//           <option value="misc">Misc</option>
//         </select>
//         <input
//           type="text"
//           name="description"
//           placeholder="Enter description"
//           value={taskForm.description}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="points"
//           placeholder="Enter points"
//           value={taskForm.points}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="url"
//           placeholder="Enter URL"
//           value={taskForm.url}
//           onChange={handleChange}
//         />
//         <input type="hidden" name="iconBg" value="bg-indigo-500/30" />
//         <input type="hidden" name="completed" value={0} />
//         <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
//       </form>

//       {message.text && (
//         <div id="message" style={{ color: message.color }}>
//           {message.text}
//         </div>
//       )}

//       <div id="taskList">
//         <h2>Existing Tasks</h2>
//         <table id="tasksTable">
//           <thead>
//             <tr>
//               <th>Task ID</th>
//               <th>Title</th>
//               <th>Type</th>
//               <th>Points</th>
//               <th>Description</th>
//               <th>URL</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, index) => (
//               <tr key={task.id}>
//                 <td>{index + 1}</td>
//                 <td>{task.title}</td>
//                 <td>{task.type}</td>
//                 <td>{task.points}</td>
//                 <td>{task.description}</td>
//                 <td>{task.url}</td>
//                 <td>
//                   <button className="edit-btn" onClick={() => handleEdit(task.id)}>Edit</button>
//                   <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {tasks.length === 0 && (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: 'center' }}>
//                   No tasks available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminTask;

import React, { useState, useEffect, useCallback } from 'react';
import { ref, push, set, update, onValue, remove } from 'firebase/database';
import { database } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminTask.css';

const AdminTask = () => {
  const [taskForm, setTaskForm] = useState({
    title: '',
    type: '',
    description: '',
    points: '',
    url: '',
    iconBg: 'bg-indigo-500/30',
    completed: 0
  });

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const tasksRef = ref(database, 'tasks');
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTasks(Object.entries(data).map(([id, taskItem]) => ({ id, ...taskItem })));
      } else {
        setTasks([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showToast = useCallback((msg, type) => {
    if (type === 'success') {
      toast.success(msg);
    } else if (type === 'error') {
      toast.error(msg);
    } else {
      toast.info(msg);
    }
  }, []);

  const resetForm = () => {
    setTaskForm({
      title: '',
      type: '',
      description: '',
      points: '',
      url: '',
      iconBg: 'bg-indigo-500/30',
      completed: 0
    });
    setEditingTaskId(null);
  };

  const handleChange = (e) => {
    setTaskForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, type, description, points, url } = taskForm;
    if (title && type && points) {
      if (editingTaskId) {
        updateTask(editingTaskId, { ...taskForm, points: parseInt(points, 10) });
      } else {
        createTask({ ...taskForm, points: parseInt(points, 10) });
      }
    }
  };

  const createTask = (taskData) => {
    const tasksRef = ref(database, 'tasks');
    const newTaskRef = push(tasksRef);

    set(newTaskRef, {
      ...taskData,
      createdAt: new Date().toISOString()
    })
      .then(() => {
        showToast(`Task "${taskData.title}" created successfully!`, 'success');
        resetForm();
        setIsModalOpen(false);
      })
      .catch((error) => {
        showToast(`Error creating task: ${error.message}`, 'error');
      });
  };

  const updateTask = (taskId, updatedData) => {
    const taskRef = ref(database, `tasks/${taskId}`);
    update(taskRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    })
      .then(() => {
        showToast('Task updated successfully!', 'success');
        resetForm();
        setIsModalOpen(false);
      })
      .catch((error) => {
        showToast(`Error updating task: ${error.message}`, 'error');
      });
  };

  const handleEdit = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      setTaskForm({
        title: task.title || '',
        type: task.type || '',
        description: task.description || '',
        points: task.points?.toString() || '',
        url: task.url || '',
        iconBg: task.iconBg || 'bg-indigo-500/30',
        completed: task.completed || 0
      });
      setEditingTaskId(taskId);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const taskRef = ref(database, `tasks/${taskId}`);
      remove(taskRef)
        .then(() => {
          showToast('Task deleted successfully!', 'success');
        })
        .catch((error) => {
          showToast(`Error deleting task: ${error.message}`, 'error');
        });
    }
  };

  return (
    <div className="news-manager">
      <header>
        <h1>Task Manager</h1>
        <button className="add-news-btn" onClick={() => { resetForm(); setIsModalOpen(true); }}>
          Add Task
        </button>
      </header>

      <div className="news-list-section">
        <table className="news-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Points</th>
              <th>Description</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.type}</td>
                <td>{task.points}</td>
                <td>{task.description}</td>
                <td>{task.url}</td>
                <td className="actions-cell">
                  <button className="edit-btn" onClick={() => handleEdit(task.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-state">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTaskId ? 'Edit Task' : 'Add Task'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={taskForm.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={taskForm.type} onChange={handleChange} required>
                    <option value="">Select type</option>
                    <option value="watch">Watch</option>
                    <option value="social">Social</option>
                    <option value="partnership">Partnership</option>
                    <option value="misc">Misc</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    value={taskForm.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Points</label>
                  <input
                    type="number"
                    name="points"
                    value={taskForm.points}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>URL</label>
                  <input
                    type="text"
                    name="url"
                    value={taskForm.url}
                    autoComplete='off'
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminTask;

