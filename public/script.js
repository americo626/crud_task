const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const registerForm = document.getElementById('registerForm');

let currentUserId = null; 

registerForm.onsubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post('http://localhost:3000/users/register', { username, password });
        console.log('Usuário registrado:', response.data);
        currentUserId = response.data.id; 
        registerForm.reset();
        alert('Usuário registrado com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Falha ao registrar usuário.');
    }
};

taskForm.onsubmit = async (event) => {
    event.preventDefault();
    const taskTitle = document.getElementById('taskTitle').value;
    if (currentUserId) {
        try {
            const response = await axios.post('http://localhost:3000/tasks', { title: taskTitle, userId: currentUserId });
            console.log('Tarefa adicionada:', response.data);
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    } else {
        alert('Você precisa estar logado para adicionar tarefas.');
    }
    taskForm.reset();
    fetchTasks();
};

async function fetchTasks() {
    const response = await axios.get('http://localhost:3000/tasks');
    const tasks = response.data;
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerText = task.title;
        li.appendChild(createDeleteButton(task.id));
        taskList.appendChild(li);
    });
}

function createDeleteButton(id) {
    const button = document.createElement('button');
    button.innerText = 'Deletar';
    button.onclick = async () => {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        fetchTasks();
    };
    return button;
}

fetchTasks();
