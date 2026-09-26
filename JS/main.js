// Traigo lo que estaba guardado. Si no hay nada, arranco con un array vacio.
let turnos = JSON.parse(localStorage.getItem("petshop_turnos")) || [];

const guardarEnStorage = () => {
    localStorage.setItem("petshop_turnos", JSON.stringify(turnos));
};



const formulario = document.getElementById("formulario-turno");

if (formulario) {

    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputTelefono = document.getElementById("telefono");
    const inputFecha = document.getElementById("fecha");
    const selectServicio = document.getElementById("servicio");
    const selectHorario = document.getElementById("horario");
    const radiosMascota = document.querySelectorAll("input[name='mascota']");

    const btnEnviar = document.getElementById("btn-enviar");
    const btnCancelar = document.getElementById("btn-cancelar");
    const avisoGeneral = document.getElementById("aviso-general");

    const listaTurnos = document.getElementById("listado-turnos");
    const listaVacia = document.getElementById("listado-vacio");

    // Si vale null estoy creando un turno nuevo.
    // Si tiene un numero, es la posicion del turno que estoy editando.
    let indiceEditando = null;


    // ----Validaciones----
    // Devuelven "" si esta bien, o el texto del error si esta mal.

    const validarNombre = () => {
        const texto = inputNombre.value.trim();

        if (texto === "") {
            return "El nombre es obligatorio.";
        }
        if (texto.length < 3) {
            return "Tiene que tener al menos 3 letras.";
        }
        return "";
    };

    const validarEmail = () => {
        const texto = inputEmail.value.trim();

        if (texto === "") {
            return "El email es obligatorio.";
        }
        if (!texto.includes("@") || !texto.includes(".")) {
            return "Escribi un email valido. Ejemplo: juan@mail.com";
        }
        return "";
    };

    const validarTelefono = () => {
        const texto = inputTelefono.value.trim();

        if (texto === "") {
            return "El telefono es obligatorio.";
        }
        if (texto.length < 8) {
            return "Tiene que tener al menos 8 numeros.";
        }
        return "";
    };

    const validarFecha = () => {
        if (inputFecha.value === "") {
            return "Elegi una fecha.";
        }

        // Le agrego la hora para que no me reste un dia por la zona horaria.
        const elegida = new Date(inputFecha.value + "T00:00:00");
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (elegida < hoy) {
            return "La fecha no puede ser anterior a hoy.";
        }
        if (elegida.getDay() === 0) {
            return "Los domingos el local esta cerrado.";
        }
        return "";
    };

    const validarServicio = () => {
        if (selectServicio.value === "") {
            return "Elegi un servicio.";
        }
        return "";
    };

    const validarHorario = () => {
        if (selectHorario.value === "") {
            return "Elegi una franja horaria.";
        }
        return "";
    };

    const obtenerMascota = () => {
        let elegida = "";

        radiosMascota.forEach((radio) => {
            if (radio.checked) {
                elegida = radio.value;
            }
        });

        return elegida;
    };

    const validarMascota = () => {
        if (obtenerMascota() === "") {
            return "Indica el tipo de mascota.";
        }
        return "";
    };


    
    
    const mostrarEstado = (elemento, error) => {
        const campo = elemento.closest(".campo");
        const mensaje = campo.querySelector(".campo__mensaje");

        if (error === "") {
            campo.classList.remove("campo--error");
            campo.classList.add("campo--ok");
            mensaje.textContent = "Correcto";
        } else {
            campo.classList.remove("campo--ok");
            campo.classList.add("campo--error");
            mensaje.textContent = error;
        }
    };

    const limpiarEstados = () => {
        document.querySelectorAll(".campo").forEach((campo) => {
            campo.classList.remove("campo--error");
            campo.classList.remove("campo--ok");
            campo.querySelector(".campo__mensaje").textContent = "";
        });

        avisoGeneral.textContent = "";
        avisoGeneral.className = "formulario__aviso";
    };

    const mostrarAviso = (texto, esError) => {
        avisoGeneral.textContent = texto;

        if (esError) {
            avisoGeneral.className = "formulario__aviso formulario__aviso--error";
        } else {
            avisoGeneral.className = "formulario__aviso formulario__aviso--ok";
        }
    };


    // --- Validacion en tiempo real ---

    inputNombre.addEventListener("input", () => {
        mostrarEstado(inputNombre, validarNombre());
    });

    inputEmail.addEventListener("input", () => {
        mostrarEstado(inputEmail, validarEmail());
    });

    inputTelefono.addEventListener("input", () => {
        mostrarEstado(inputTelefono, validarTelefono());
    });

    inputFecha.addEventListener("change", () => {
        mostrarEstado(inputFecha, validarFecha());
    });

    selectServicio.addEventListener("change", () => {
        mostrarEstado(selectServicio, validarServicio());
    });

    selectHorario.addEventListener("change", () => {
        mostrarEstado(selectHorario, validarHorario());
    });

    radiosMascota.forEach((radio) => {
        radio.addEventListener("change", () => {
            mostrarEstado(radio, validarMascota());
        });
    });


    // ----Validacion cruzada----
   

    const hayTurnoRepetido = () => {
        let repetido = false;

        turnos.forEach((turno, indice) => {
            if (indice !== indiceEditando &&
                turno.fecha === inputFecha.value &&
                turno.horario === selectHorario.value &&
                turno.servicio === selectServicio.value) {
                repetido = true;
            }
        });

        return repetido;
    };



    const renderizarTurnos = () => {
        listaTurnos.innerHTML = "";

        if (turnos.length === 0) {
            listaVacia.style.display = "block";
            return;
        }

        listaVacia.style.display = "none";

        turnos.forEach((turno, indice) => {
            const article = document.createElement("article");
            article.classList.add("turno");

            // Guardo la posicion en un data-indice para despues saber a cual le hicieron clic.
            article.innerHTML = `
                <h3 class="turno__nombre">${turno.nombre}</h3>
                <p class="turno__dato">Servicio: ${turno.servicio}</p>
                <p class="turno__dato">Fecha: ${turno.fecha}</p>
                <p class="turno__dato">Horario: ${turno.horario}</p>
                <p class="turno__dato">Mascota: ${turno.mascota}</p>
                <p class="turno__dato">Email: ${turno.email}</p>
                <p class="turno__dato">Telefono: ${turno.telefono}</p>

                <div class="turno__acciones">
                    <button class="turno__boton turno__boton--editar" type="button" data-indice="${indice}">Editar</button>
                    <button class="turno__boton turno__boton--borrar" type="button" data-indice="${indice}">Eliminar</button>
                </div>
            `;

            listaTurnos.appendChild(article);
        });
    };


    // ----CREATE y UPDATE----

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const errorNombre = validarNombre();
        const errorEmail = validarEmail();
        const errorTelefono = validarTelefono();
        const errorFecha = validarFecha();
        const errorServicio = validarServicio();
        const errorHorario = validarHorario();
        const errorMascota = validarMascota();

        mostrarEstado(inputNombre, errorNombre);
        mostrarEstado(inputEmail, errorEmail);
        mostrarEstado(inputTelefono, errorTelefono);
        mostrarEstado(inputFecha, errorFecha);
        mostrarEstado(selectServicio, errorServicio);
        mostrarEstado(selectHorario, errorHorario);
        mostrarEstado(radiosMascota[0], errorMascota);

        if (errorNombre !== "" || errorEmail !== "" || errorTelefono !== "" ||
            errorFecha !== "" || errorServicio !== "" || errorHorario !== "" ||
            errorMascota !== "") {
            mostrarAviso("Revisa los campos marcados en rojo.", true);
            return;
        }

        if (hayTurnoRepetido()) {
            mostrarAviso("Ya existe un turno para ese servicio en esa fecha y franja.", true);
            return;
        }

        const turno = {
            nombre: inputNombre.value.trim(),
            email: inputEmail.value.trim(),
            telefono: inputTelefono.value.trim(),
            fecha: inputFecha.value,
            servicio: selectServicio.value,
            horario: selectHorario.value,
            mascota: obtenerMascota()
        };

        let mensaje = "";

        if (indiceEditando === null) {
            turnos.push(turno);
            mensaje = "Turno guardado.";
        } else {
            turnos[indiceEditando] = turno;
            mensaje = "Turno actualizado.";
            indiceEditando = null;
            btnEnviar.textContent = "Guardar turno";
        }

        guardarEnStorage();
        renderizarTurnos();

        formulario.reset();
        limpiarEstados();
        mostrarAviso(mensaje, false);
    });


//  ----Boton limpiar----

    btnCancelar.addEventListener("click", () => {
        limpiarEstados();
        indiceEditando = null;
        btnEnviar.textContent = "Guardar turno";
    });



    listaTurnos.addEventListener("click", (e) => {

        if (e.target.matches(".turno__boton--borrar")) {
            const indice = Number(e.target.dataset.indice);

            turnos.splice(indice, 1);
            guardarEnStorage();
            renderizarTurnos();

            
            indiceEditando = null;
            btnEnviar.textContent = "Guardar turno";
            limpiarEstados();
        }

        if (e.target.matches(".turno__boton--editar")) {
            const indice = Number(e.target.dataset.indice);
            const turno = turnos[indice];

            inputNombre.value = turno.nombre;
            inputEmail.value = turno.email;
            inputTelefono.value = turno.telefono;
            inputFecha.value = turno.fecha;
            selectServicio.value = turno.servicio;
            selectHorario.value = turno.horario;

            radiosMascota.forEach((radio) => {
                radio.checked = (radio.value === turno.mascota);
            });

            indiceEditando = indice;
            btnEnviar.textContent = "Actualizar turno";
            limpiarEstados();
        }
    });

    renderizarTurnos();
}