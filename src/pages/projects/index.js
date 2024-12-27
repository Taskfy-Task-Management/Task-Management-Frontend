import { useState, useEffect } from 'react';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getTasksByProject,
  createTask,
  deleteTask,
} from '../../services/projects'; // Backend services
import { addToWatchlist } from '../../services/watchlist';
import { getUserIdFromToken } from '../../utils/auth'; // Helper to get user ID
import styles from '../../styles/Projects.module.css';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false); 
  const [tasks, setTasks] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [editProject, setEditProject] = useState({ id: null, name: '', description: '' });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'Incomplete',
    priority: 'Medium',
    deadline: '',
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    /**
     * Sets the document title and initializes the user ID from the token.
     * Redirects to login if the user is not authenticated.
    */
    document.title = 'Task Management';
    const id = getUserIdFromToken();
    if (!id) {
      alert('You are not logged in!');
      window.location.href = '/auth/login';
    } else {
      setUserId(id);
      fetchProjects(id);
    }
  }, []);

  /**
   * Fetches all projects associated with the current user.
   * @param {number} id - User ID.
  */
  const fetchProjects = async (id) => {
    try {
      const response = await getAllProjects(id);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  /**
   * Fetches details of a specific project, including associated tasks.
   * @param {number} projectId - ID of the project to fetch.
  */
  const fetchProjectDetails = async (projectId) => {
    try {
      const projectResponse = await getProjectById(projectId);
      const tasksResponse = await getTasksByProject(projectId);
      setSelectedProject(projectResponse.data);
      setTasks(tasksResponse.data);

      setEditProject({
      id: projectResponse.data.id,
      name: projectResponse.data.name,
      description: projectResponse.data.description,
      });

      setShowDetails(true); 

    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  /**
   * Creates a new project.
   * Resets the input fields upon successful submission.
   * @param {Object} e - Event object.
  */
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await createProject({ ...newProject, userId });
      setNewProject({ name: '', description: '' });
      fetchProjects(userId);
      alert('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project.');
    }
  };

  
  /**
   * Updates an existing project.
   * Resets the edit project form upon successful submission.
   * @param {Object} e - Event object.
  */
  const handleUpdateProject = async (e) => {
    e.preventDefault();

    if (!editProject.id) {
        alert('No project selected for update.');
        return;
    }
    try {
        await updateProject(editProject.id, {
            name: editProject.name,
            description: editProject.description,
        });
      setEditProject({ id: null, name: '', description: '' });
      fetchProjects(userId);
      alert('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project.');
    }
  };

  /**
   * Deletes a project.
   * @param {number} projectId - ID of the project to delete.
  */
  const handleDeleteProject = async (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        setSelectedProject(null);
        fetchProjects(userId);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project.');
      }
    }
  };

  /**
   * Creates a new task associated with the selected project.
   * Resets the input fields upon successful submission.
   * @param {Object} e - Event object.
  */
  const handleCreateTask = async (e) => {
  e.preventDefault();

  try {
    // Validate and format the deadline
    const formattedDeadline = new Date(newTask.deadline);
    if (isNaN(formattedDeadline.getTime())) {
      alert('Invalid deadline format. Please select a valid date.');
      return;
    }

    // Ensure the deadline is in ISO-8601 format
    const isoDeadline = formattedDeadline.toISOString();

    // Create the task with the formatted deadline
    await createTask({
      ...newTask,
      deadline: isoDeadline, // Use the formatted ISO deadline
      userId,
      projectId: selectedProject.id,
    });

    // Reset the task form
    setNewTask({ title: '', description: '', status: 'Incomplete', priority: 'Medium', deadline: '' });
    fetchProjectDetails(selectedProject.id);
    alert('Task created successfully!');
  } catch (error) {
    console.error('Error creating task:', error);
    alert('Error creating task.');
  }
};


  /**
   * Deletes a task by ID.
   * @param {number} taskId - ID of the task to delete.
  */
  const handleDeleteTask = async (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchProjectDetails(selectedProject.id);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task.');
      }
    }
  };

  /**
   * Adds a task to the user's watchlist.
   * @param {number} taskId - ID of the task to add to the watchlist.
  */
  const handleAddToWatchlist = async (taskId) => {
    try {
        await addToWatchlist(userId, taskId);
        alert('Task added to watchlist!');
    } catch (error) {
        if (error.response?.status === 409) {
        alert('This task is already in your watchlist.');
        } else {
        console.error('Error adding task to watchlist:', error);
        alert('Failed to add task to watchlist.');
        }
    }
    };

    /**
        * Signs the user out by removing the token and redirecting to the login page.
        */
    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        window.location.href = '/auth/login'; // Redirect to login page
    };

  return (
    <div className={styles.projectsPage}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <h1 className={styles.navTitle}>Task Management System</h1>
        <div className={styles.navActions}>
          <Link href="/watchlist">
            <button className={styles.navButton}>Go to Watchlist</button>
          </Link>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Projects List */}
      <div className={styles.projectSection}>
        <h2>Your Projects</h2>
        <ul className={styles.projectList}>
          {projects.map((project) => (
            <li key={project.id}>
              <span onClick={() => fetchProjectDetails(project.id)}>{project.name}</span>
              <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* Create Project Form */}
        <form onSubmit={handleCreateProject} className={styles.projectForm}>
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            required
          />
          <button type="submit">Create Project</button>
        </form>
      </div>

      {/* Selected Project Details */}
      {showDetails && selectedProject && (
        <div className={styles.projectDetails}>
          <h2>Project Details: {selectedProject.name}</h2>
          <p>{selectedProject.description}</p>

          <form onSubmit={handleUpdateProject} className={styles.projectForm}>
            <input
              type="text"
              placeholder="New Project Name"
              value={editProject.name}
              onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="New Description"
              value={editProject.description}
              onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
              required
            />
            <button type="submit">Update Project</button>
          </form>
        </div>
      )}

      {/* Tasks Section */}
      {showDetails && selectedProject && (
        <div className={styles.tasksSection}>
          <h2>Tasks for {selectedProject.name}</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span>{task.title}</span>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleAddToWatchlist(task.id)}>Add to Watchlist</button>
              </li>
            ))}
          </ul>

          {/* Create Task Form */}
          <form onSubmit={handleCreateTask} className={styles.taskForm}>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              required
            />
            <button type="submit">Create Task</button>
            
          </form>
          <button
            className={styles.cancelButton}
            onClick={() => setShowDetails(false)} 
            >Cancel
            </button>
        </div>
      )}
    </div>
  );
}
