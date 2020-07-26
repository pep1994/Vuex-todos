import axios from 'axios';

const state = {
    todos: []
};

const getters = {
    allTodos: state => state.todos
};

const mutations = {
    setTodos: (state, todos) => {
        state.todos = todos;
    },
    newTodo: (state, todo) => {
        state.todos.unshift(todo);
    },
    removeTodo: (state, id) => {
        state.todos = state.todos.filter(todo => {
            return todo.id !== id;
        })
    },
    updTodo: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updTodo);
        }
    }
};

const actions = {
    async fetchTodos(context) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        context.commit('setTodos', response.data);
    },
    async addTodo(context, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
        });
        context.commit('newTodo', response.data);
    },
    async deleteTodo(context, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        context.commit('removeTodo', id);
    },
    async filterTodos(context, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        context.commit('setTodos', response.data);
    },
    async updateTodo(context, updTodo) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);
        context.commit('updTodo', response.data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};