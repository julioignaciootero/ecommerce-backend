const btn = document.getElementById("btnCargar");
const nombre = document.getElementById("title");
const precio = document.getElementById("price");
const url = document.getElementById("thumbnail");
const table = document.getElementById("tablita");
const emailInput = document.getElementById("email");
const msgInput = document.getElementById("message");
const mensajitos = document.getElementById("mensajitos");
const btnEnviar = document.getElementById("btnEnviar");

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const socket = io();

socket.emit("allProducts");

socket.on("mensajenuevo", (msg) => {
  const mensaje = document.createElement("p");
  mensaje.innerText = msg.email + ": " + msg.message;
  mensajitos.appendChild(mensaje);
});

socket.on("producto", (prod) => {
  console.log(prod);
  const fila = document.createElement("tr");
  fila.innerHTML = `<td>${prod.id}</td><td>${prod.title}</td> <td>${prod.price}</td> 
    <td> <img src="${prod.thumbnail}" width="100px"</td>`;

  table.appendChild(fila);
});

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const prod = {
      title: nombre.value,
      price: precio.value,
      thumbnail: url.value,
    };
    console.log(prod);
    res = await postData("http://localhost:8080/productos", prod);

    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

btnEnviar.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    let mensaje = {
      email: emailInput.value,
      message: msgInput.value,
    };
    console.log("emit enviarmensaje");
    socket.emit("enviarmensaje", mensaje);
  } catch (error) {}
});
