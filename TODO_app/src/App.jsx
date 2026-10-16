import { useState, useEffect } from "react";
import { TodoProvider } from "./context";

function App() {
  const [todos, setTodos] = useState([]);

  //function defination of the addTodo method declare in context to add todo list, where value "todo" came from the input field.
  const addTodo = (todo) => {
    setTodos((prev) => [{id: new Date.now(), ...todo}, ...[prev]])
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

  // these function calls all the todos when the application loads first time 
  useEffect(() => {

    const todos = JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length > 0){
      setTodos(todos);
    }
  }, []);

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
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
