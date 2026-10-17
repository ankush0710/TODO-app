import { useState, useEffect } from "react";
import { TodoProvider } from "./context";
import {TodoForm, TodoItems} from "./components/index";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");

    if (!storedTodos || storedTodos === "undefined") {
      return [];
    }

    try {
      const parsedTodos = JSON.parse(storedTodos);
      if (Array.isArray(parsedTodos)) {
        return parsedTodos.flat(Infinity);
      }

      console.error("Saved todos in localStorage must be an array.");
    } catch (error) {
      console.error("Failed to parse saved todos from localStorage.", error);
    }

    return [];
  });

  //function defination of the addTodo method declare in context to add todo list, where value "todo" came from the input field.
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  //function defination of the editTodo method declare in context to edit todo list, where value "todo" and id came from the input field and button respectively.
  const editTodo = (id, todo) => {
    setTodos((prev) => (prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo)));
  }

  //function defination of the deleteTodo method declare in context to delet todo from the list, where id came from the button.
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  }

  //function defination of the checked todos when completed method declare in context to checked todo in the list, where id came from the checkbox.
  const checkedTodo = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, isCompleted: !prevTodo.isCompleted} : prevTodo));
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <TodoProvider
        value={{ todos, addTodo, editTodo, deleteTodo, checkedTodo }}
      >
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {
                todos.map((todo) => (
                  <div key={todo.id} className="w-full">
                    <TodoItems todo={todo}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
