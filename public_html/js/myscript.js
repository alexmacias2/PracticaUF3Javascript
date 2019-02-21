function paginaCargada() {
    var nombresFormularios = new Array();
    var errorSpan = document.getElementById("formError");
    var nombreFormulario = document.getElementById("inGeneradorFormulario");
    var btnGeneraFormulario = document.getElementById("btnGeneradorFormulario");
    var divContenedor = document.getElementById("contenedor");
    var regexp = /[A-Za-z_çàéèíïóòúüÇÀÉÈÍÏÓÒÚÜ]{3,}\d+/;

    btnGeneraFormulario.addEventListener('click', generarFormulario);
    nombreFormulario.addEventListener('input', cambiarBorde);

    function cambiarBorde() {
        if (regexp.test(nombreFormulario.value)) {
            nombreFormulario.style.borderColor = 'green';
            errorSpan.innerHTML = "";
        } else {
            nombreFormulario.style.borderColor = 'red';
        }
    }

    function generarFormulario() {
        if (regexp.test(nombreFormulario.value) && compruebaNombre(nombreFormulario.value) == false) {
            var div = document.createElement('div');
            var form = document.createElement('form');
            var btnBorrarFormulario = document.createElement('button');
            btnBorrarFormulario.setAttribute('class', 'btn btn-primary');
            var tituloFormulario = document.createElement('h5');
            var contenidoBorrar = document.createTextNode('Borrar Formulario');
            var contenidoTitulo = document.createTextNode(nombreFormulario.value);


            btnBorrarFormulario.setAttribute('id', nombreFormulario.value + '-borrarFormulario');
            btnBorrarFormulario.appendChild(contenidoBorrar);
            tituloFormulario.appendChild(contenidoTitulo);


            form.setAttribute('id', nombreFormulario.value + '-form');
            div.setAttribute('id', nombreFormulario.value + '-container');
            div.setAttribute('class', 'col-xs-3');
            div.appendChild(tituloFormulario);
            div.appendChild(btnBorrarFormulario);
            div.appendChild(form);
            divContenedor.appendChild(div);
            llenarForm();

            btnBorrarFormulario.addEventListener('click', borraFormulario);
        } else {
            errorSpan.innerHTML = "El nombre del formulario debe empezar por 3 o más letras seguidas de uno o más números y no debe estar repetido"; // plain javascript            
        }

        function llenarForm() {
            var inputCantidad = document.createElement('input');
            inputCantidad.setAttribute('placeholder', 'inserta cantidad de elementos');
            inputCantidad.setAttribute('type', 'number');
            inputCantidad.setAttribute('id', tituloFormulario.innerHTML + '-cantidad');
            inputCantidad.setAttribute('class', 'form-control');
            var btnCrearCampos = document.createElement('button');
            btnCrearCampos.appendChild(document.createTextNode("Crear Campos"));
            btnCrearCampos.setAttribute('type', 'button');
            btnCrearCampos.setAttribute('id', tituloFormulario.innerHTML + '-btnCrearCampo');

            form.appendChild(inputCantidad);
            form.appendChild(btnCrearCampos);

            btnCrearCampos.addEventListener('click', creaCampos);
        }

        function borraFormulario() {
            var idForm = this.id.split('-', 2);
            document.getElementById('contenedor').removeChild(document.getElementById(idForm[0] + '-container'));
        }

        function creaCampos() {
            var idBoton = this.id.split('-', 2);
            var cantidad = document.getElementById(idBoton[0] + '-' + 'cantidad').value;
            document.getElementById(idBoton[0] + '-' + 'cantidad').style.display = 'none';
            document.getElementById(this.id).style.display = 'none';

            opcionesElementos(cantidad, idBoton);

        }

        function opcionesElementos(cantidad, idBoton) {
            for (var i = 0; i < cantidad; i++) {
                var select = document.createElement('select');
                select.setAttribute('id', idBoton[0] + '-select' + i);
                select.addEventListener('change', diseñaCampo);
                var selecciona = document.createElement('option');
                var contenidoSelecciona = document.createTextNode('Selecciona una...');
                selecciona.appendChild(contenidoSelecciona);
                var input = document.createElement('option');
                var contenidoInput = document.createTextNode('input');
                input.appendChild(contenidoInput);
                var button = document.createElement('option');
                var contenidoButton = document.createTextNode('button');
                button.appendChild(contenidoButton);
                var selection = document.createElement('option');
                var contenidoSelection = document.createTextNode('Selection');
                selection.appendChild(contenidoSelection);
                var check = document.createElement('option');
                var contenidoCheck = document.createTextNode('checkBox');
                check.appendChild(contenidoCheck);
                var radiobutton = document.createElement('option');
                var contenidoRadio = document.createTextNode('RadioButton');
                radiobutton.appendChild(contenidoRadio);
                select.appendChild(selecciona);
                select.appendChild(input);
                select.appendChild(button);
                select.appendChild(selection);
                select.appendChild(check);
                select.appendChild(radiobutton);
                form.appendChild(select);
            }
        }
        function diseñaCampo() {
            var saltoLinea = document.createElement("br");

            switch (document.getElementById(this.id).value) {
                case 'button':
                    form.removeChild(document.getElementById(this.id));
                    crearBoton();

                    var btnBorrarElemento = document.createElement('button');
                    btnBorrarElemento.setAttribute('type', 'button');
                    btnBorrarElemento.appendChild(document.createTextNode('Borrar'));

                    var btnModificarElemento = document.createElement('button');
                    btnModificarElemento.setAttribute('type', 'button');
                    btnModificarElemento.appendChild(document.createTextNode('Modificar'));

                    btnBorrarElemento.addEventListener('click', function () {
                        form.removeChild(boton);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(saltoLinea);
                    });
                    btnModificarElemento.addEventListener('click', function () {
                        form.removeChild(boton);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(saltoLinea);
                        opcionesElementos(1, this.id.split('-', 2));
                    });

                    form.appendChild(saltoLinea);
                    form.appendChild(btnBorrarElemento);
                    form.appendChild(btnModificarElemento);

                    break;
                case 'input':
                    form.removeChild(document.getElementById(this.id));
                    crearInput();

                    var btnBorrarElemento = document.createElement('button');
                    btnBorrarElemento.setAttribute('type', 'button');
                    btnBorrarElemento.appendChild(document.createTextNode('Borrar'));

                    var btnModificarElemento = document.createElement('button');
                    btnModificarElemento.setAttribute('type', 'button');
                    btnModificarElemento.appendChild(document.createTextNode('Modificar'));

                    btnBorrarElemento.addEventListener('click', function () {
                        form.removeChild(input);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(saltoLinea);
                    });
                    btnModificarElemento.addEventListener('click', function () {
                        form.removeChild(input);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(saltoLinea);
                        opcionesElementos(1, this.id.split('-', 2));
                    });

                    form.appendChild(saltoLinea);
                    form.appendChild(btnBorrarElemento);
                    form.appendChild(btnModificarElemento);
                    break;
                case 'Selection':
                    form.removeChild(document.getElementById(this.id));
                    crearSelection();
                    var btnBorrarElemento = document.createElement('button');
                    btnBorrarElemento.setAttribute('type', 'button');
                    btnBorrarElemento.appendChild(document.createTextNode('Borrar'));

                    var btnModificarElemento = document.createElement('button');
                    btnModificarElemento.setAttribute('type', 'button');
                    btnModificarElemento.appendChild(document.createTextNode('Modificar'));

                    btnBorrarElemento.addEventListener('click', function () {
                        form.removeChild(select);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(saltoLinea);
                    });
                    btnModificarElemento.addEventListener('click', function () {
                        form.removeChild(select);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(saltoLinea);
                        opcionesElementos(1, this.id.split('-', 2));
                    });
                    form.appendChild(saltoLinea);
                    form.appendChild(btnBorrarElemento);
                    form.appendChild(btnModificarElemento);
                    break;
                case 'checkBox':
                    form.removeChild(document.getElementById(this.id));
                    crearChecks();
                    var btnBorrarElemento = document.createElement('button');
                    btnBorrarElemento.setAttribute('type', 'button');
                    btnBorrarElemento.appendChild(document.createTextNode('Borrar'));

                    var btnModificarElemento = document.createElement('button');
                    btnModificarElemento.setAttribute('type', 'button');
                    btnModificarElemento.appendChild(document.createTextNode('Modificar'));

                    btnBorrarElemento.addEventListener('click', function () {
                        form.removeChild(divCheck);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(saltoLinea);
                    });
                    btnModificarElemento.addEventListener('click', function () {
                        form.removeChild(divCheck);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(saltoLinea);
                        opcionesElementos(1, this.id.split('-', 2));
                    });
                    form.appendChild(saltoLinea);
                    form.appendChild(btnBorrarElemento);
                    form.appendChild(btnModificarElemento);
                    break;
                case 'RadioButton':
                    form.removeChild(document.getElementById(this.id));
                    crearRadios();
                    var btnBorrarElemento = document.createElement('button');
                    btnBorrarElemento.setAttribute('type', 'button');
                    btnBorrarElemento.appendChild(document.createTextNode('Borrar'));

                    var btnModificarElemento = document.createElement('button');
                    btnModificarElemento.setAttribute('type', 'button');
                    btnModificarElemento.appendChild(document.createTextNode('Modificar'));

                    btnBorrarElemento.addEventListener('click', function () {
                        form.removeChild(divRadio);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(saltoLinea);
                    });
                    btnModificarElemento.addEventListener('click', function () {
                        form.removeChild(divRadio);
                        form.removeChild(btnBorrarElemento);
                        form.removeChild(btnModificarElemento);
                        form.removeChild(saltoLinea);
                        opcionesElementos(1, this.id.split('-', 2));
                    });
                    form.appendChild(saltoLinea);
                    form.appendChild(btnBorrarElemento);
                    form.appendChild(btnModificarElemento);
                    break;
            }

            function crearBoton() {
                var textoBtn = prompt("Inserta texto del botón", "");
                boton = document.createElement('button');
                boton.setAttribute("id", tituloFormulario.innerHTML + "-btn1");
                boton.setAttribute("type", "button");
                boton.appendChild(document.createTextNode(textoBtn));
                form.appendChild(boton);
            }
            function crearInput() {
                input = document.createElement("input");
                input.setAttribute("id", tituloFormulario.innerHTML + "-input");
                input.setAttribute("placeholder", "texto por defecto");
                
                form.appendChild(input);
            }

            function crearSelection() {
                var opciones = prompt('Cuantas opciones necesitas?', '');
                select = document.createElement('select');
                for (var i = 0; i < parseInt(opciones); i++) {
                    var textoOpcion = prompt('Introduce opcion:', '');

                    var opcion = document.createElement('option');
                    opcion.appendChild(document.createTextNode(textoOpcion));
                    select.appendChild(opcion);
                }
                form.appendChild(select);
            }

            function crearChecks() {
                var cantidad = prompt("Inserta cantidad de checks");
                divCheck = document.createElement("div");
                divCheck.setAttribute("id", tituloFormulario.innerHTML + "-" + "divCheck");
                for (var i = 0; i < parseInt(cantidad); i++) {
                    var check = document.createElement("input");
                    check.setAttribute("type", "checkbox");
                    divCheck.appendChild(check);
                    var textoCheck = prompt("inserta texto " + (i + 1), "");
                    var span = document.createElement("span");
                    span.appendChild(document.createTextNode(textoCheck));
                    divCheck.appendChild(span);
                    var saltoLinea = document.createElement("br");
                    divCheck.appendChild(saltoLinea);
                }
                form.appendChild(divCheck);
            }

            function crearRadios() {
                var cantidad = prompt("Inserta cantidad de radio button");
                divRadio = document.createElement("div");
                divRadio.setAttribute("id", tituloFormulario.innerHTML + "-" + "divRadio");
                for (var i = 0; i < parseInt(cantidad); i++) {
                    var radio = document.createElement("input");
                    radio.setAttribute("type", "radio");
                    radio.setAttribute("name", "prueba");
                    divRadio.appendChild(radio);
                    var textoRadio = prompt("inserta texto " + (i + 1), "");
                    var span = document.createElement("span");
                    span.appendChild(document.createTextNode(textoRadio));
                    divRadio.appendChild(span);
                    var saltoLinea = document.createElement("br");
                    divRadio.appendChild(saltoLinea);
                }

                form.appendChild(divRadio);
            }


        }

        function compruebaNombre(nombreFormulario) {
            var nombreFormulario = nombreFormulario;
            var existe = false;

            for (var i = 0; i < nombresFormularios.length; i++) {
                if (nombresFormularios[i] == nombreFormulario) {
                    existe = true;
                }
            }

            if (!existe) {
                nombresFormularios.push(nombreFormulario);
            }

            return existe;
        }

    }




}