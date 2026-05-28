document.addEventListener("DOMContentLoaded", function () {

    const btnGuardar = document.getElementById("btnGuardar");
    const btnIniciarSesion = document.getElementById("btnIniciarSesion");

    const irRegistro = document.getElementById("irRegistro");
    const irLogin = document.getElementById("irLogin");

    if (btnGuardar) {
        btnGuardar.addEventListener("click", guardar);
    }

    if (btnIniciarSesion) {
        btnIniciarSesion.addEventListener("click", iniciarSesion);
    }

    // IR A REGISTRO
    if (irRegistro) {

        irRegistro.addEventListener("click", function (e) {

            e.preventDefault();

            document.getElementById("seccionInicioSesion").style.display = "none";

            document.getElementById("seccionLogin").style.display = "flex";
        });
    }

    // IR A LOGIN
    if (irLogin) {

        irLogin.addEventListener("click", function (e) {

            e.preventDefault();

            document.getElementById("seccionLogin").style.display = "none";

            document.getElementById("seccionInicioSesion").style.display = "flex";
        });
    }

    verificarSesion();
    actualizarContador();
});


// =========================
// VERIFICAR SESIÓN
// =========================
function verificarSesion() {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo) {

        document.getElementById("menuNav").style.display = "flex";

        document.getElementById("seccionInicio").style.display = "block";

        document.getElementById("seccionInicioSesion").style.display = "none";

        document.getElementById("seccionLogin").style.display = "none";

    } else {

        document.getElementById("menuNav").style.display = "none";

        document.getElementById("seccionInicio").style.display = "none";

        document.getElementById("seccionInicioSesion").style.display = "flex";

        document.getElementById("seccionLogin").style.display = "none";
    }
}


// =========================
// REGISTRO
// =========================
function guardar() {

    const nombre = document.getElementById("Nombre").value.trim();

    const telefono = document.getElementById("Telefono").value.trim();

    const direccion = document.getElementById("Direccion").value.trim();

    const correo = document.getElementById("Correo").value.trim();

    const password = document.getElementById("Password").value.trim();

    if (!nombre || !telefono || !direccion || !correo || !password) {

        mostrarMensaje("Completa todos los campos", "error");

        return;
    }

    fetch("http://localhost:3000/registro", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nombre,
            telefono,
            direccion,
            correo,
            password
        })
    })

    .then(res => res.text())

    .then(data => {

        if (data === "registro_ok") {

            mostrarMensaje("Registro exitoso", "exito");

            document.getElementById("Nombre").value = "";
            document.getElementById("Telefono").value = "";
            document.getElementById("Direccion").value = "";
            document.getElementById("Correo").value = "";
            document.getElementById("Password").value = "";

            document.getElementById("seccionLogin").style.display = "none";

            document.getElementById("seccionInicioSesion").style.display = "flex";

        } else if (data === "correo_existe") {

            mostrarMensaje("Correo ya registrado", "error");

        } else {

            mostrarMensaje("Error al registrar", "error");
        }
    })

    .catch(error => {

        console.log(error);

        mostrarMensaje("Error del servidor", "error");
    });
}


// =========================
// LOGIN
// =========================
function iniciarSesion() {

    const correo = document.getElementById("CorreoLogin").value.trim();

    const password = document.getElementById("PasswordLogin").value.trim();

    if (!correo || !password) {

        mostrarMensaje("Completa todos los campos", "error");

        return;
    }

    fetch("http://localhost:3000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            correo,
            password
        })
    })

    .then(res => res.text())

    .then(data => {

        if (data === "error") {

            mostrarMensaje("Datos incorrectos", "error");

        } else {

            const usuario = JSON.parse(data);

            localStorage.setItem(
                "usuarioActivo",
                JSON.stringify(usuario)
            );

            mostrarMensaje(
                "Bienvenido " + usuario.nombre,
                "exito"
            );

            verificarSesion();
            actualizarContador();
        }
    })

    .catch(error => {

        console.log(error);

        mostrarMensaje("Error del servidor", "error");
    });
}


// =========================
// CERRAR SESIÓN
// =========================
function cerrarSesion() {

    localStorage.removeItem("usuarioActivo");

    location.reload();
}


// =========================
// REGISTRO
// =========================
const productos = {

    tacos: [

        {
            nombre: "Tacos Puma",

            descripcion: "Los mejores tacos de la zona",

            imagen: "Imagenes/Tacos_Puma.jpg",

            productos: [

                {
                    nombre: "Taco de Bistec",
                    precio: 25,
                    imagen: "Imagenes/TacoBistec.jpeg"
                },

                {
                    nombre: "Taco de Chorizo",
                    precio: 25,
                    imagen: "Imagenes/TacoChorizo.jpeg"
                }
            ]
        },

        {
            nombre: "Tacos El Tio Taco",

            descripcion: "Tacos tradicionales",

            imagen: "Imagenes/TioTaco.jpeg",

            productos: [

                {
                    nombre: "Taco Campechano",
                    precio: 35,
                    imagen: "Imagenes/tacos.jpg"
                },

                {
                    nombre: "Taco de Adobada",
                    precio: 28,
                    imagen: "Imagenes/TacoAdobada.jpeg"
                }
            ]
        }
    ],

    pizzas: [

        {
            nombre: "Pizzasos",

            descripcion: "Pizzas artesanales con ingredientes frescos",

            imagen: "Imagenes/Pizzasos.jpeg",

            productos: [

                {
                    nombre: "Pizza Pepperoni",
                    precio: 180,
                    imagen: "Imagenes/PizzaPeperoni.jpeg"
                },

                {
                    nombre: "Pizza Hawaiana",
                    precio: 140,
                    imagen: "Imagenes/PizzaHawaiana.jpeg"
                }
            ]
        },

        {
            nombre: "Pizzas Cristo Rey",

            descripcion: "Pizzas a la leña con sabor auténtico",

            imagen: "Imagenes/CristoRey.jpeg",

            productos: [
                {
                    nombre: "Pizza Italiana",
                    precio: 190,
                    imagen: "Imagenes/PizzaItaliana.jpeg"
                },
                {
                    nombre: "Pizza A La Mexicana",
                    precio: 150,
                    imagen: "Imagenes/PizzaMexicana.jpeg"
                }
            ]
        }
    ],

    hamburguesas: [

        {
            nombre: "R&R Burgers",
            descripcion: "Hamburguesas al estilo tradicional",
            imagen: "Imagenes/R&R.jpg",
            productos: [
                {
                    nombre: "Sencilla de Res",
                    precio: 70,
                    imagen: "Imagenes/Hamburguesas.jpeg"
                },
                {
                    nombre: "Doble de Res",
                    precio: 110,
                    imagen: "Imagenes/HamburguesaDoble.jpeg"
                }
            ]
        },

        {
            nombre: "Hamburguesas El Buen Sabor",
            descripcion: "Hamburguesas gourmet con ingredientes frescos",
            imagen: "Imagenes/ElBuenSabor.jpeg",
            productos: [
                {
                    nombre: "Hamburguesa de Res",
                    precio: 120,
                    imagen: "Imagenes/Hamburguesas.jpeg"
                }
                ,
                {
                    nombre: "Hamburguesa de Pollo",
                    precio: 100,
                    imagen: "Imagenes/HamburguesaPollo.jpeg"
                }
            ]
        }
    ],
    
    birria: [

        {
            nombre: "Birrieria Don Toño Jimenez",
            descripcion: "Birria tradicional con sabor auténtico",
            imagen: "Imagenes/BirriaDonToño.jpg",
            productos: [
                {
                    nombre: "Birria de Res",
                    precio: 150,
                    imagen: "Imagenes/BirriaAll.jpeg"
                },
                {
                    nombre: "Birria de Chivo",
                    precio: 170,
                    imagen: "Imagenes/BirriaChivo.jpeg"
                }
            ]
        },

        {
            nombre: "Birrieria San Miguel",
            descripcion: "Birria al estilo Jalisco con toque especial",
            imagen: "Imagenes/BirriaSanMiguel.jpeg",
            productos: [
                {
                    nombre: "Birria de Res",
                    precio: 170,
                    imagen: "Imagenes/BirriaAll.jpeg"
                }
                ,
                {
                    nombre: "Birria de Chivo",
                    precio: 200,
                    imagen: "Imagenes/BirriaChivo.jpeg"
                }
            ]
        }
    ],


    postres: [

        {
            nombre: "Reposteria Yoyis",    
            descripcion: "Postres caseros",
            imagen: "Imagenes/Reposteria.png",
            productos: [
                {
                    nombre: "Pastel de Chocolate",
                    precio: 150,
                    imagen: "Imagenes/PastelChocolate.jpeg"
                },
                {
                    nombre: "Flan con Caramelo",
                    precio: 170,
                    imagen: "Imagenes/FlanCaramelo.jpeg"
                }
            ]
        },

        {
            nombre: "Dulces Tentaciones",
            descripcion: "Postres tradicionales con toque moderno",
            imagen: "Imagenes/DulcesTentaciones.jpeg",  
            productos: [
                {
                    nombre: "Cheesecake de Fresa",
                    precio: 180,
                    imagen: "Imagenes/CheesecakeFresa.jpeg"
                },
                {
                    nombre: "Gelatina de Frutas",
                    precio: 120,
                    imagen: "Imagenes/GelatinaFrutas.jpeg"
                }
            ]
        }
    ],

    bebidas: [
        {
            nombre: "Licoreria La Esquina",
            descripcion: "Bebida refrescante para acompañar tu comida",
            imagen: "Imagenes/LaEsquina.jpeg",
            productos: [
                {
                    nombre: "Ceveza Corona",
                    precio: 35,
                    imagen: "Imagenes/Corona.jpeg"
                },
                {
                    nombre: "Coca Cola",    
                    precio: 20,
                    imagen: "Imagenes/CocaCola.jpeg"
                }
            ] 
        },
        {
            nombre: "Licoreria La Chata",
            descripcion: "Bebida de calidad para disfrutar con tus platillos",
            imagen: "Imagenes/LaChata.jpeg",
            productos: [
                {
                    nombre: "Cerveza Modelo",    
                    precio: 35,
                    imagen: "Imagenes/Modelo.jpeg"
                },
                {
                    nombre: "Agua Mineral Peñafiel",    
                    precio: 20,
                    imagen: "Imagenes/AguaMineral.jpeg"
                }
            ]
        }
    ]
};


let categoriaActual = "";
let vistaActual = "inicio";
let vistaAnterior = "";


// =========================
// MOSTRAR CATEGORÍA
// =========================
function mostrarCategoria(categoria) {

    categoriaActual = categoria;
    vistaActual = "lugares";

    document.querySelector(".contenedor-tarjetas").style.display = "none";

    document.getElementById("seccionProductos").style.display = "block";

    document.getElementById("tituloCategoria").textContent =
        categoria.toUpperCase();

    const contenedor = document.getElementById("contenedorProductos");

    contenedor.innerHTML = "";

    productos[categoria].forEach((establecimiento, index) => {

        contenedor.innerHTML += `
        
            <div class="producto">

                <img src="${establecimiento.imagen}">

                <h3>${establecimiento.nombre}</h3>

                <p>${establecimiento.descripcion}</p>

                <button onclick="mostrarProductos('${categoria}', ${index})">
                    Ver productos
                </button>

            </div>
        `;
    });
}


// =========================
// MOSTRAR PRODUCTOS
// =========================
function mostrarProductos(categoria, index, desdeTodos = false) {

    vistaActual = "productos";

    categoriaActual = categoria;

    if(desdeTodos){

        vistaAnterior = "todos";

    }else{

        vistaAnterior = "categoria";
    }

    const establecimiento = productos[categoria][index];

    document.getElementById("tituloCategoria").textContent =
        establecimiento.nombre;

    const contenedor = document.getElementById("contenedorProductos");

    contenedor.innerHTML = "";

    establecimiento.productos.forEach(producto => {

        contenedor.innerHTML += `
        
            <div class="producto">

                <img src="${producto.imagen}">

                <h3>${producto.nombre}</h3>

                <p>$${producto.precio}</p>

                <button onclick="agregarCarrito(
                    '${producto.nombre}',
                    ${producto.precio},
                    '${establecimiento.nombre}'
                )">
                    Agregar al carrito
                </button>

            </div>
        `;
    });
}


// =========================
// VOLVER
// =========================
function volverInicio() {

    document.querySelector(".contenedor-tarjetas").style.display = "grid";

    document.getElementById("seccionProductos").style.display = "none";
}

// =========================
// MOSTRAR TODOS LOS LUGARES
// =========================
function irALugares() {

    vistaActual = "lugares";

    vistaAnterior = "todos";

    document.querySelector(
        ".contenedor-tarjetas"
    ).style.display = "none";

    document.getElementById(
        "seccionProductos"
    ).style.display = "block";

    document.getElementById(
        "tituloCategoria"
    ).textContent = "LUGARES";

    const contenedor =
        document.getElementById("contenedorProductos");

    contenedor.innerHTML = "";

    for(let categoria in productos){

        productos[categoria].forEach((establecimiento, index) => {

            if(!establecimiento.productos) return;

            contenedor.innerHTML += `
            
                <div class="producto">

                    <img src="${establecimiento.imagen}">

                    <h3>${establecimiento.nombre}</h3>

                    <p>${establecimiento.descripcion}</p>

                    <button onclick="
                        mostrarProductos(
                            '${categoria}',
                            ${index},
                            true
                        )
                    ">
                        Ver productos
                    </button>

                </div>
            `;
        });
    }
}


// =========================
// MOSTRAR CARRITO
// =========================
function mostrarCarrito() {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    fetch(`http://localhost:3000/carrito/${usuario.id}`)

    .then(res => res.json())

    .then(carrito => {

        const contenedor =
            document.getElementById("contenedorCarrito");

        const total =
            document.getElementById("totalCarrito");

        contenedor.innerHTML = "";

        let suma = 0;

        if(carrito.length === 0){

            contenedor.innerHTML =
                "<p>Tu carrito está vacío</p>";

        }else{

            carrito.forEach(producto => {

                contenedor.innerHTML += `
                
                    <div class="item-carrito">

                        <div>

                            <p>
                                <strong>
                                    ${producto.nombre_producto}
                                </strong>
                            </p>

                            <small>
                                ${producto.restaurante}
                            </small>

                            <p>
                                $${producto.precio}
                            </p>

                        </div>

                        <button onclick="
                            eliminarDelCarrito(
                                ${producto.id}
                            )
                        ">
                            ❌
                        </button>

                    </div>
                `;

                suma += Number(producto.precio);
            });
        }

        total.textContent = "Total: $" + suma;

        document.getElementById(
            "modalCarrito"
        ).style.display = "flex";
    })

    .catch(error => {

        console.log(error);
    });
}


// =========================
// ELIMINAR PRODUCTO
// =========================
function eliminarDelCarrito(idcarrito) {

    fetch(`http://localhost:3000/carrito/${idcarrito}`, {

        method: "DELETE"
    })

    .then(res => res.text())

    .then(data => {

        mostrarCarrito();

        actualizarContador();
    })

    .catch(error => {

        console.log(error);
    });
}


// =========================
// CERRAR MODAL
// =========================
function cerrarCarrito() {

    document.getElementById("modalCarrito").style.display = "none";
}


// =========================
// CONTADOR
// =========================
function actualizarContador() {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    if(!usuario) return;

    fetch(`http://localhost:3000/carrito/${usuario.id}`)

    .then(res => res.json())

    .then(carrito => {

        document.getElementById(
            "contadorCarrito"
        ).textContent = carrito.length;
    });
}


// =========================
// MENSAJES
// =========================
function mostrarMensaje(texto, tipo) {

    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = texto;

    mensaje.style.display = "block";

    mensaje.className = "";

    if (tipo === "error") {

        mensaje.classList.add("mensaje-error");

    } else {

        mensaje.classList.add("mensaje-exito");
    }

    setTimeout(() => {

        mensaje.style.display = "none";

    }, 3000);
}

// =========================
// AGREGAR CARRITO
// =========================

function agregarCarrito(nombre, precio, restaurante) {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    if(!usuario){

        mostrarMensaje(
            "Debes iniciar sesión",
            "error"
        );

        return;
    }

    fetch("http://localhost:3000/carrito", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            usuario_id: usuario.id,
            nombre_producto: nombre,
            precio: precio,
            restaurante: restaurante
        })
    })

    .then(res => res.text())

    .then(data => {

        if(data === "producto_agregado"){

            mostrarMensaje(
                "Producto agregado",
                "exito"
            );

            actualizarContador();

        }else{

            mostrarMensaje(
                "Error al agregar",
                "error"
            );
        }
    })

    .catch(error => {

        console.log(error);

        mostrarMensaje(
            "Error del servidor",
            "error"
        );
    });
}

// =========================
// VOLVER A CATEGORÍAS
// =========================
function volverCategorias() {

    // REGRESAR DE PRODUCTOS
    if(vistaActual === "productos"){

        // SI VENÍA DE TODOS LOS LUGARES
        if(vistaAnterior === "todos"){

            irALugares();

            return;
        }

        // SI VENÍA DE UNA CATEGORÍA
        mostrarCategoria(categoriaActual);

        vistaActual = "lugares";

        return;
    }

    // REGRESAR AL INICIO
    if(vistaActual === "lugares"){

        document.getElementById(
            "seccionProductos"
        ).style.display = "none";

        document.querySelector(
            ".contenedor-tarjetas"
        ).style.display = "grid";

        vistaActual = "inicio";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}
