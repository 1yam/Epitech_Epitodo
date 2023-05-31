const { Router } = require('express');
const auth = require('../../middleware/auth');

const {
    createTodo,
    getAllTodos,
    getTodosById,
    updateTodo,
    deleteTodo
} = require('./todos.query');

const todosRouter = Router();

todosRouter.get('/', auth, async function (req, res) {
    try {
      const todos = await getAllTodos();
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
});  

todosRouter.get('/:id', auth, async function (req, res) {
    try {
      const todoId = req.params.id;
      const todo = await getTodosById(todoId);
  
      if (!todo) {
        throw new Error('Todo not found');
      }
  
      return res.status(200).json(todo);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
});
  

todosRouter.post('/', auth, async function (req, res) {
    const { title, description, due_time, status, user_id } = req.body;

    try {
      await createTodo(title, description, due_time, status, user_id);
      const Newtodo = await getAllTodos()
      return res.status(201).json(Newtodo);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
});

todosRouter.put('/:id', auth, async function (req, res) {
    const { title, description, due_time, status } = req.body;
    const todoId = req.params.id;
  
    try {
      await updateTodo(todoId, title, description, due_time, status);

      const updatedTodo = await getTodosById(todoId);
      return res.status(200).json(updatedTodo);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  todosRouter.delete('/:id', auth, async function (req, res) {
    const todoId = req.params.id;
  
    try {
      await deleteTodo(todoId);
      return res.status(200).json({ message: `Successfully deleted record number: ${todoId}` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  

module.exports = todosRouter;
