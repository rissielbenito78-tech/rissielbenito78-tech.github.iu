/* =====================================================
   CARRITO
===================================================== */

let carrito = [];



/* =====================================================
   AGREGAR PRODUCTO
===================================================== */

function agregarCarrito(nombre, precio) {

    const productoExistente =
        carrito.find(
            producto => producto.nombre === nombre
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            nombre: nombre,

            precio: precio,

            cantidad: 1

        });

    }


    actualizarCarrito();

}



/* =====================================================
   ACTUALIZAR CARRITO
===================================================== */

function actualizarCarrito() {

    const contenedor =
        document.getElementById(
            "productosCarrito"
        );


    const contador =
        document.getElementById(
            "contador"
        );


    const totalElemento =
        document.getElementById(
            "total"
        );


    contenedor.innerHTML = "";


    let total = 0;

    let cantidadTotal = 0;


    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div style="
                text-align:center;
                padding:40px 0;
                color:#777;
            ">

                <div style="
                    font-size:45px;
                    margin-bottom:15px;
                ">
                    
                </div>

                <p>
                    Tu carrito está vacío.
                </p>

            </div>

        `;

    }


    carrito.forEach(
        (producto, indice) => {


            const subtotal =
                producto.precio *
                producto.cantidad;


            total += subtotal;

            cantidadTotal +=
                producto.cantidad;


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "item-carrito";


            elemento.innerHTML = `

                <div>

                    <h4>
                        ${producto.nombre}
                    </h4>

                    <p>
                        Bs. ${producto.precio}
                        ×
                        ${producto.cantidad}
                    </p>

                </div>


                <div>

                    <strong>
                        Bs. ${subtotal}
                    </strong>

                    <br>

                    <button
                        class="eliminar"
                        onclick="eliminarProducto(${indice})">

                        Eliminar

                    </button>

                </div>

            `;


            contenedor.appendChild(
                elemento
            );

        }
    );


    contador.textContent =
        cantidadTotal;


    totalElemento.textContent =
        `Bs. ${total}`;

}



/* =====================================================
   ELIMINAR PRODUCTO
===================================================== */

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}



/* =====================================================
   ABRIR CARRITO
===================================================== */

function abrirCarrito() {

    document
        .getElementById("carrito")
        .classList.add("activo");

}



/* =====================================================
   CERRAR CARRITO
===================================================== */

function cerrarCarrito() {

    document
        .getElementById("carrito")
        .classList.remove("activo");

}



/* =====================================================
   FILTRAR PRODUCTOS
===================================================== */

function filtrar(categoria) {

    const productos =
        document.querySelectorAll(
            ".producto"
        );


    productos.forEach(
        producto => {

            const categoriaProducto =
                producto.dataset.categoria;


            if (
                categoria === "todos" ||
                categoriaProducto === categoria
            ) {

                producto.style.display =
                    "block";

            } else {

                producto.style.display =
                    "none";

            }

        }
    );

}



/* =====================================================
   BUSCADOR
===================================================== */

function buscarProducto() {

    const texto =
        document
            .getElementById("buscador")
            .value
            .toLowerCase();


    const productos =
        document.querySelectorAll(
            ".producto"
        );


    productos.forEach(
        producto => {

            const nombre =
                producto
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();


            const descripcion =
                producto
                    .querySelector("p")
                    .textContent
                    .toLowerCase();


            if (
                nombre.includes(texto) ||
                descripcion.includes(texto)
            ) {

                producto.style.display =
                    "block";

            } else {

                producto.style.display =
                    "none";

            }

        }
    );

}



/* =====================================================
   WHATSAPP
===================================================== */

function enviarWhatsApp() {

    if (carrito.length === 0) {

        alert(
            "Agrega al menos un producto al carrito."
        );

        return;

    }


    let mensaje =
        "Hola, quiero realizar un pedido:%0A%0A";


    let total = 0;


    carrito.forEach(
        producto => {

            const subtotal =
                producto.precio *
                producto.cantidad;


            total += subtotal;


            mensaje +=
                "• " +
                producto.nombre +
                " x" +
                producto.cantidad +
                " = Bs. " +
                subtotal +
                "%0A";

        }
    );


    mensaje +=
        "%0A*Total: Bs. " +
        total +
        "*";


    const telefono =
        "59164534489";


    const url =
        "https://wa.me/" +
        telefono +
        "?text=" +
        mensaje;


    window.open(
        url,
        "_blank"
    );

}



/* =====================================================
   CERRAR CARRITO AL HACER CLIC AFUERA
===================================================== */

document
    .getElementById("carrito")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                cerrarCarrito();

            }

        }
    );



/* =====================================================
   INICIO
===================================================== */

actualizarCarrito();