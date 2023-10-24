import TodoListItem from "./TodoListItem";

  export default function TodoList({ todoList }) {

return (
  <ul style={{ listStyle: "none" }}>
    {todoList.map((todo) => (
      <TodoListItem key={todo.id} todo={todo}/>
    ))}
  </ul>
);
}

