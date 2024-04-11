import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deleteTodo, updateTodo } from '../slice/todoSlice';

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id:any, info:any) => {
    setEditId(id);
    setEditText(info);
  };

  const handleUpdate = (id:any) => {
    dispatch(updateTodo({ id, info: editText }));
    setEditId(null);
    setEditText('');
  };

  return (
    <>
      <h1>Todos List</h1>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
          >
            {editId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div className="text-white">{todo.info}</div>
            )}
            <div>
              {editId === todo.id ? (
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md mr-2"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.info)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
