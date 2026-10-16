import { createContext, useContext } from "react";

// context that stores all todos list and method to update, delete, edit list
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "task description",
      isCompleted: false,
    },
  ],
  addTodo: (todo) => {},          //function defination to add new task into the todo list
  editTodo: (id, todo) => {},     //function defination to edit existing task in the list
  deleteTodo: (id) => {},         //function defination to delete existing task in the todo list
  checkedTodo: (id) => {},        //function defination to checked list once completed
});

// custome hook to use the context directly in any component
export const useTodo = () => {
  return useContext(TodoContext);
};

// provider that provides the access of teh context
export const TodoProvider = TodoContext.Provider;
