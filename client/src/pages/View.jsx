import React, { useEffect, useState } from "react";
import { getTasksRequest, deleteTaskRequest, deleteAllTasks } from '../api/upload.api';

function View() {
    const [tasks, setTasks] = useState([]);
    const [tablesToShow, setTablesToShow] = useState(10);

    useEffect(() => {
        async function loadTasks() {
            try {
                const response = await getTasksRequest();
                if (response && response.data) {
                    setTasks(response.data.slice(0, tablesToShow));
                } else {
                    console.error('No data found in the response:', response);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        loadTasks();
    }, [tablesToShow]);

    const handleTablesToShowChange = (event) => {
        const newTablesToShow = parseInt(event.target.value, 10);
        
        if (!isNaN(newTablesToShow)) {
            setTablesToShow(newTablesToShow);
        }
    };

    const handeDelete = async (id) => {
        try {
            const response = await deleteTaskRequest(id);
            setTasks(tasks => tasks.filter(task => task.subject_id !== id));
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };

    const handleDeleteAllTasks = async () => {
        try {
            const response = await deleteAllTasks();
            setTasks([]);
        } catch (error) {
            console.error('Error al eliminar todas las tareas:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <div>
                <label htmlFor="tablesToShow" className="mr-2">Tables to Show:</label>
                <input
                    type="number"
                    id="tablesToShow"
                    value={tablesToShow}
                    onChange={handleTablesToShowChange}
                    className="border border-gray-300 p-1"
                />
            </div>
            <div className="mt-4">
                <button
                    className="bg-red-500 text-white py-1 px-2 mr-2"
                    onClick={handleDeleteAllTasks}
                >
                    Delete All Records
                </button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full table-auto bg-white border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-2 py-1 border-b">ID</th>
                            <th className="px-2 py-1 border-b">Target</th>
                            <th className="px-2 py-1 border-b">Gender</th>
                            <th className="px-2 py-1 border-b">Age</th>
                            <th className="px-2 py-1 border-b">Smoking</th>
                            <th className="px-2 py-1 border-b">Yellow Fingers</th>
                            <th className="px-2 py-1 border-b">Anxiety</th>
                            <th className="px-2 py-1 border-b">Peer Pressure</th>
                            <th className="px-2 py-1 border-b">Chronic Disease</th>
                            <th className="px-2 py-1 border-b">Fatigue</th>
                            <th className="px-2 py-1 border-b">Allergy</th>
                            <th className="px-2 py-1 border-b">Wheezing</th>
                            <th className="px-2 py-1 border-b">Alcohol Consuming</th>
                            <th className="px-2 py-1 border-b">Coughing</th>
                            <th className="px-2 py-1 border-b">Breath Shortness</th>
                            <th className="px-2 py-1 border-b">Swallowing Difficulty</th>
                            <th className="px-2 py-1 border-b">Chest Pain</th>
                            <th className="px-2 py-1 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.subject_id + '_' + index} className="bg-gray-100">
                                <td className="px-2 py-1 border-b">{task.subject_id}</td>
                                <td className="px-2 py-1 border-b">{task.target}</td>
                                <td className="px-2 py-1 border-b">{task.gender}</td>
                                <td className="px-2 py-1 border-b">{task.age}</td>
                                <td className="px-2 py-1 border-b">{task.smoking}</td>
                                <td className="px-2 py-1 border-b">{task.yellow_fingers}</td>
                                <td className="px-2 py-1 border-b">{task.anxiety}</td>
                                <td className="px-2 py-1 border-b">{task.peer_pressure}</td>
                                <td className="px-2 py-1 border-b">{task.chronic_disease}</td>
                                <td className="px-2 py-1 border-b">{task.fatigue_}</td>
                                <td className="px-2 py-1 border-b">{task.allergy_}</td>
                                <td className="px-2 py-1 border-b">{task.wheezing}</td>
                                <td className="px-2 py-1 border-b">{task.alcohol_consuming}</td>
                                <td className="px-2 py-1 border-b">{task.coughing}</td>
                                <td className="px-2 py-1 border-b">{task.breath_shortness}</td>
                                <td className="px-2 py-1 border-b">{task.swallowing_difficulty}</td>
                                <td className="px-2 py-1 border-b">{task.chest_pain}</td>
                                <td className="px-2 py-1 border-b">
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 mr-2"
                                        onClick={() => handeDelete(task.subject_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default View;
