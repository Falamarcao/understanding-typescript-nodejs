import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

const todos: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  todos.push(newTodo);

  res
    .status(201)
    .json({ message: 'Todo created successfully.', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: todos });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    throw new Error('Could not find todo.');
  }

  todos[todoIndex] = new Todo(todos[todoIndex].id, updatedText);

  res.json({
    message: 'Todo updated successfully.',
    updatedTodo: todos[todoIndex],
  });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    throw new Error('Could not find todo.');
  }

  todos.splice(todoIndex, 1);

  res.json({ message: 'Todo deleted successfully' });
};
