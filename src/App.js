import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import useSemiPersistentState from "./useSemiPersistentState"; // Importing the custom hook

function App() {
  //const [todoList, setTodoList] = useState([initialTodoList]); // Adding a state variable todoList
  // const [todoList, setTodoList] = useState(initialTodoList);
  
  // Using the custom hook to get and set the todoList state
  const [todoList, setTodoList] = useSemiPersistentState();
  
  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]); // Adding a new todo to the todoList
  };


  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} todoList={todoList} />
        <TodoList todoList={todoList} />
      </div>
    </>
  );
}

export default App;