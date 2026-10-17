import {useState} from "react";
import {useTodo} from "../context"

function TodoForm() {
  // state to store individual todo item, not a list 
  const [todo, setTodo] = useState("");

  // we can directly call the add function from the context by using useContext hook
  const {addTodo} = useTodo();

  const handleAddTodo = (e) => {
    e.preventDefault();

    if(!todo) return 

    addTodo({todo, isCompleted: false});
    setTodo("");      //for cleanup after add one task

  }
  
  return (
    <form onSubmit={handleAddTodo} className="flex">
      <input
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
