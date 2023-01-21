import React, { useState, useEffect } from "react";

const Home = () => {
  const [entry, setEntry] = useState("");
  const [arrayEntry, setArrayEntry] = useState([]);

  console.log(entry);
  console.log(arrayEntry);

  function crearUsuario() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/blancreyes83", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify([]), // body data type must match "Content-Type" header
    }) //busca la info en la url pasada como valor
      .then((response) => response.json()) //esta linea convierte la respuesta en un json
      .then((data) => console.log(data)) //esta linea guarda la info transformada en un objeto
      .catch((err) => console.log(err)); //el catch te comunica si algo salió mal
  }

  function getUsuario() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/blancreyes83", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }) //busca la info en la url pasada como valor
      .then((response) => response.json()) //esta linea convierte la respuesta en un json
      .then((data) => setArrayEntry(data)) //esta linea guarda la info transformada en un objeto
      .catch((err) => console.log(err)); //el catch te comunica si algo salió mal
  }

  // function updateToDos() {
  // 	fetch('https://assets.breatheco.de/apis/fake/todos/user/blancreyes83',{
  // 		method: 'PUT', // *GET, POST, PUT, DELETE, etc.
  // 		headers: {
  // 			'Content-Type': 'application/json'
  // 			// 'Content-Type': 'application/x-www-form-urlencoded',

  // 	},

  // 	BODY: JSON.stringify(
  // 		[
  // 			{ label: "Make the bed", done: false },
  // 			{ label: "Walk the dog", done: false },
  // 			{ label: "Do the replits", done: false }
  // 		]
  // 	)

  // 	})//busca la info en la url pasada como valor
  // 	.then((response)=>response.json())//esta linea convierte la respuesta en un json
  // 	.then((data)=>console.log(data))//esta linea guarda la info transformada en un objeto
  // 	.catch((err)=>console.log(err))//el catch te comunica si algo salió mal
  // }

  useEffect(() => {
    //forma 1
    getUsuario();
    //bloque de codigo que queremos
    console.log("Me estoy ejecutando porque ya cargó el componente");
  }, []); // cuando el array esta vacio

  const addToDoToList = () => {
    setArrayEntry([...arrayEntry, {label: entry, done: false }]);
    setEntry("");
  };

  const deleteTask = (deletedTask) => {
    const diminishedArray = arrayEntry.filter((task) => task !== deletedTask);
    setArrayEntry(diminishedArray);
  };

  return (
    <>
      <div class="container col-6">
        <div class="input-group mb-3 my-4">
          <input
            type="text"
            class="form-control"
            id="toDoInputs"
            placeholder="Enter Activity To Do"
            aria-label="To Do's"
            aria-describedby="basic-addon2"
            onChange={(e) => setEntry(e.target.value)}
            value={entry}
          />
          <button
            class="input-group-text"
            id="basic-addon2"
            onClick={addToDoToList}
          >
            Submit
          </button>
        </div>

        <div>
          <ul class="list-group list-group-numbered">
            {arrayEntry.map((task, index) => (
              <li key={index} class="list-group-item d-flex">
                <span style={{ width: "90%" }}>{task.label}</span>
                <button
                  class="text-align-right"
                  onClick={() => deleteTask(task)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
