import React, { useState, useEffect, useMemo } from "react";
import './TimeTracker.css'

const TimeTracker = () => {
    
    // State variables to track projects, selected project, tasks, task name, time spent, and description
    
    const [state, setState] = useState(() => {
        
        // Retrieve saved data from localStorage or initialize with default values

        const savedData = localStorage.getItem("timetrackerData");
        return savedData
            ? JSON.parse(savedData)
            : {
                projects: [],
                selectedProject: "",
                tasks: [],
                taskName: "",
                spentdingTime: "",
                description: ""
            };
    });

    // Save state data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("timeProjectData", JSON.stringify(state));
    }, [state]);


    // Update state variables based on user input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Create a new project and update the projects array in state
    const CreateProject = () => {
        if (state.selectedProject.trim() !== "") {
            setState((prevState) => ({
                ...prevState,
                projects: [...prevState.projects, prevState.selectedProject],
                selectedProject: ""
            }));
        }
    };

    // Create a new task and update the tasks array in state
    const CreateTask = () => {
        if (
            state.taskName.trim() !== "" &&
            state.spentdingTime !== "" &&
            state.description.trim() !== ""
        ) {
            const task = {
                name: state.taskName,
                time: parseFloat(state.spentdingTime),
                description: state.description
            };
            setState((prevState) => ({
                ...prevState,
                tasks: [...prevState.tasks, task],
                taskName: "",
                spentdingTime: "",
                description: ""
            }));
        }
    };

    

    // Calculate the total hours spent on tasks using the tasks array in state
    // useMemo hook to memoize the calculated value
    const SpendedTotalHours = useMemo(() => {
        let total = 0;
        state.tasks.forEach((task) => {
            total += task.time;
        });
        return total;
    }, [state.tasks]);

    return (
        <>
            <div className="container">
                <div className="col-lg-6">
                    <h2>Create a Project</h2>
                    <div className="">
                        <input
                            className="form-control"
                            type="text"
                            name="selectedProject"
                            value={state.selectedProject}
                            onChange={handleInputChange}
                            placeholder="Project Name"
                        />
                        <button
                            onClick={CreateProject}
                            type="button"
                            className="btn btn-success mt-2"
                        >
                            Create Project
                        </button>
                    </div>

                    <h2>Create a Task</h2>
                    <input
                        className="form-control"
                        type="text"
                        name="taskName"
                        value={state.taskName}
                        onChange={handleInputChange}
                        placeholder="Task Name"
                    />
                    <input
                        className="form-control my-2"
                        type="number"
                        name="spentdingTime"
                        value={state.spentdingTime}
                        onChange={handleInputChange}
                        placeholder="Time Spent (hours)"
                    />
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={state.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                    <button
                        onClick={CreateTask}
                        type="button"
                        className="btn btn-success mt-2"
                    >
                        Create Task
                    </button>

                    <h2>Projects:</h2>
                    <ol>
                        {state.projects.map((project, index) => (
                            <li key={index}>{project}</li>
                        ))}
                    </ol>

                    <h2>Tasks</h2>
                    <ol>
                        {state.tasks.map((task, index) => (
                            <li key={index}>
                            <p> <b>TaskName :</b>  {task.name} </p> <p><b>TaskTime :</b>  {task.time} hours  </p> <p> <b>TaskDescription :</b>{task.description} </p>
                            </li>
                        ))}
                    </ol>

                    <h2>Total Hours for the Day</h2>
                    <p className="totalhour">{SpendedTotalHours} hours</p>
                </div>
            </div>
        </>
    );
};

export default TimeTracker;
