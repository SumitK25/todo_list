import React from "react";
import Todo from "./components/Todo";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
      <Todo />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
