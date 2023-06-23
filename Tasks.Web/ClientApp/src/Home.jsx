import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from "./Context"
import { HubConnectionBuilder } from '@microsoft/signalr';
import Task from './Task';


const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const { user } = useAuth();
    const connectionRef = useRef(null);

    const onAdd = async () => {
        await axios.post(`/api/tasks/add`, { title: taskTitle });
        setTaskTitle('')
    }
    const onDone = async (taskId) => {
        await axios.post('/api/tasks/done', { taskId })
    }

    const onDoing = async (taskId) => {
        await axios.post('/api/tasks/settasktouser', { taskId })
    }
    const getTasks = async () => {
        const { data } = await axios.get('/api/tasks/gettasks')
        setTasks(data)
    }

    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/api/test").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('setTaskToPerson', tasks => {
                setTasks(tasks)
            })

            connection.on('newTask', tasks => {
                setTasks(tasks);
            });

            connection.on('done', tasks => {
                setTasks(tasks)
            })

        }
        connectToHub();
        getTasks()
    }, [])
    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div style={{ marginTop: 70 }}>
                <div className="row">
                    <div className="col-md-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Task Title"
                            defaultValue=""
                            value={taskTitle}
                            onChange={e => setTaskTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <button onClick={onAdd} className="btn btn-primary w-100" >
                            Add Task
                        </button>
                    </div>
                </div>
                <table className="table table-hover table-striped table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(t => <Task
                        key={t.id}
                        task={t}
                        onDoingClick={() => onDoing(t.id)}
                        onDoneClick={() => onDone(t.id)}
                        />
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Home;