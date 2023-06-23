import React from 'react';
import { useAuth } from "./Context"

const Task = ({ task, onDoingClick, onDoneClick }) => {
    const { title, userId } = task;
    const { user } = useAuth()
    return (
    <tr>
        <td >{title}</td>
        <td>
            {!userId ? <button className="btn btn-dark" onClick={onDoingClick}>
                I'm doing this one!
            </button> : userId === user.id ?
                <button className="btn btn-success" onClick={onDoneClick}>I'm done!</button> :
                <button className="btn btn-warning" disabled={true}>{task.user.firstName} {task.user.lastName} is doing this</button>
            }
        </td>
    </tr>

    )
}

export default Task