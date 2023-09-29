//#1
import React from "react";

function App() {
  const todoList = [
    { id: 1, title: "Complete assignment 1" },
    { id: 2, title: "Go for a run" },
    { id: 3, title: "Read React book" },
  ];

  // the style
  const listItemStyle = {
    listStyle: "none", // Removing list bullet points
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id} style={listItemStyle}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

//#2
// import React from "react";

//   const todoList = [
//     { id: 1, title: "Complete assignment 1" },
//     { id: 2, title: "Go for a run" },
//     { id: 3, title: "Read React book" },
//   ];

//   // the styles
//   const listItemStyle = {
//     listStyle: "none",
//   };

//function App() {
//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>Todo List</h1>
//       <ul>
//         {todoList.map(function (todo) {
//           return <li key={todo.id} style={listItemStyle}>
//             {todo.title}
//           </li>;
//         })}
//       </ul>
//     </div>
//   );
// }

// export default App;

//#3
// import React from "react";

//   const todoList = [
//     { id: 1, title: "Complete assignment 1" },
//     { id: 2, title: "Go for a run" },
//     { id: 3, title: "Read React book" },
//   ];

//   function listTodo(todo) {
//     return <li>{todo.title} </li>;
//   }

//   // the styles
//   const listItemStyle = {
//     listStyle: "none",
//   };
// function App() {
//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>Todo List</h1>
//       <ul key={todoList.id} style={listItemStyle}>
//         {todoList.map(listTodo)}
//       </ul>
//     </div>
//   );
// }

// export default App;
