const URL = "http://localhost:3001/todos";

const addTodo = (newTodo) => {
  // post
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const removeTodo = (id) => {
  return fetch(URL + `/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

const getTodos = () => {
  return fetch(URL).then((res) => res.json());
};

const editTodo = (id, title, completed) => {
  return fetch(URL + `/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          title,
          completed
      })
  }).then((res) => res.json());
}

export { addTodo, removeTodo, getTodos, editTodo };
