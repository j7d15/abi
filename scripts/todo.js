class TaskManager {
    constructor() {
        // Charger les tâches depuis le cookie dès que l'objet est créé
        this.tasks = this.getTasksFromCookie();
        this.renderTasks(); // Rendre la liste des tâches au démarrage

        // Lier le formulaire pour ajouter des tâches
        const taskForm = document.getElementById('task-form');
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });
    }

    // Récupérer les tâches depuis le cookie
    getTasksFromCookie() {
        const tasks = document.cookie.split('; ').find(row => row.startsWith('tasks='));
        if (tasks) {
            return JSON.parse(decodeURIComponent(tasks.split('=')[1]));
        }
        return [];
    }

    // Sauvegarder les tâches dans un cookie
    saveTasksToCookie() {
        const tasksString = encodeURIComponent(JSON.stringify(this.tasks));
        document.cookie = `tasks=${tasksString};path=/;max-age=31536000`;  // Le cookie expire dans un an
    }

    // Afficher les tâches
    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Effacer la liste existante

        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('d-flex', 'justify-content-between', 'align-items-center');
            task.priority == 1 ? taskItem.classList.add('list-group-item', 'list-group-item-danger') : taskItem.classList.add('list-group-item');

            const taskText = document.createElement('span');
            taskText.textContent = task.title;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.textContent = '-';
            deleteButton.addEventListener('click', () => {
                this.deleteTask(index);
            });

            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);
        });
    }

    // Ajouter une tâche
    addTask() {
        const title = document.getElementById('task-title').value;
        const priority = parseInt(document.getElementById('task-priority').value);

        if (title.trim() !== '') {
            this.tasks.push({ title, priority });
            this.saveTasksToCookie();
            this.renderTasks(); // Mettre à jour l'affichage
        }

        // Réinitialiser le formulaire
        document.getElementById('task-form').reset();
    }

    // Supprimer une tâche
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasksToCookie();
        this.renderTasks(); // Mettre à jour l'affichage
    }
}

// Initialisation de TaskManager
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager(); // Créer une nouvelle instance de TaskManager
});
