function paginaCargada() {//cuando se cargue el html se empezará a ejecutar el código
    var nombresFormularios = new Array();//guarda los nombres de los formularios para que no se repitan
    var errorSpan = document.getElementById("formError");//mensaje que saldrá cuando un nombre esté mal formado
    var nombreFormulario = document.getElementById("inGeneradorFormulario");
    var btnGeneraFormulario = document.getElementById("btnGeneradorFormulario");
    var divContenedor = document.getElementById("contenedor");
    var regexp = /[A-Za-z_çàéèíïóòúüÇÀÉÈÍÏÓÒÚÜ]{3,}\d+/;//expresión que comprobará los nombres de formulario

    btnGeneraFormulario.addEventListener('click', generarFormulario);
    nombreFormulario.addEventListener('input', cambiarBorde);

    function cambiarBorde() {
        if (regexp.test(nombreFormulario.value)) {//si el nombre del formulario está bien el borde del inpit es verde
            nombreFormulario.style.borderColor = 'green';
            errorSpan.innerHTML = "";//no aparecerá mensaje de error
        } else {
            nombreFormulario.style.borderColor = 'red';//si está mal el borde es rojo
        }
    }

    function generarFormulario() {
        if (regexp.test(nombreFormulario.value) && compruebaNombre(nombreFormulario.value) == false) {
            var div = document.createElement('div');//div que contenerá el formulario
            var form = document.createElement('form');
            var btnBorrarFormulario = document.createElement('button');
            btnBorrarFormulario.setAttribute('class', 'btn btn-primary');
            var tituloFormulario = document.createElement('h5');
            var contenidoBorrar = document.createTextNode('Borrar Formulario');
            var contenidoTitulo = document.createTextNode(nombreFormulario.value);


            btnBorrarFormulario.setAttribute('id', nombreFormulario.value + '-borrarFormulario');//formamos el id de los distintos elementos a partir del nombre del formulario
            btnBorrarFormulario.appendChild(contenidoBorrar);
            tituloFormulario.appendChild(contenidoTitulo);


            form.setAttribute('id', nombreFormulario.value + '-form');
            div.setAttribute('id', nombreFormulario.value + '-container');
            div.setAttribute('class', 'col-xs-3');//le damos una clase para aplicarle css
            div.appendChild(tituloFormulario);
            div.appendChild(btnBorrarFormulario);
            div.appendChild(form);
            divContenedor.appendChild(div);
            llenarForm();//llamamos al método que nos dará la información de los elementos que queremos en el form

            btnBorrarFormulario.addEventListener('click', borraFormulario);
        } else {
            errorSpan.innerHTML = "El nombre del formulario debe empezar por 3 o más letras seguidas de uno o más números y no debe estar repetido"; //Error si el nombre está mal            
        }

        function llenarForm() {
            var inputCantidad = document.createElement('input');//inputa para introducir la cantidad de elementos
            inputCantidad.setAttribute('placeholder', 'inserta cantidad de elementos');
            inputCantidad.setAttribute('type', 'number');
            inputCantidad.setAttribute('id', tituloFormulario.innerHTML + '-cantidad');
            inputCantidad.setAttribute('class', 'form-control');
            inputCantidad.setAttribute('min', '1');
            inputCantidad.setAttribute('max', '4');
            var btnCrearCampos = document.createElement('button');
            btnCrearCampos.appendChild(document.createTextNode("Crear Campos"));
            btnCrearCampos.setAttribute('type', 'button');
            btnCrearCampos.setAttribute('id', tituloFormulario.innerHTML + '-btnCrearCampo');

            form.appendChild(inputCantidad);
            form.appendChild(btnCrearCampos);

            btnCrearCampos.addEventListener('click', creaCampos);//evento que llamará al método que creará los campos
        }

        function borraFormulario() {
            var idForm = this.id.split('-', 2);
            document.getElementById('contenedor').removeChild(document.getElementById(idForm[0] + '-container'));
        }

        function creaCampos() {
            var idBoton = this.id.split('-', 2);//como el botón tiene el id del form lo podemos identificar separando el id
            var cantidad = document.getElementById(idBoton[0] + '-' + 'cantidad').value;//cogemos la cantidad de elementos introducida
            document.getElementById(idBoton[0] + '-' + 'cantidad').style.display = 'none';
            document.getElementById(this.id).style.display = 'none';

            opcionesElementos(cantidad, idBoton);//llamamos al método que nos generará el número de campos que queremos pasándole la cantidad introducida

        }

        function opcionesElementos(cantidad, idBoton) {
            for (var i = 0; i < cantidad; i++) {//iteramos tantas veces como cantidad de campos en el form queramos que hayan
                var select = document.createElement('select');//crearemos un select para cada campo en el que se desplegarán los diferentes tipos de campos a crear
                select.setAttribute('id', idBoton[0] + '-select' + i);
                select.addEventListener('change', diseñaCampo);//al seleccionar una opción del select nos llamará al método que diseña los campos
                var selecciona = document.createElement('option');
                var contenidoSelecciona = document.createTextNode('Selecciona una...');
                selecciona.appendChild(contenidoSelecciona);
                var input = document.createElement('option');
                var contenidoInput = document.createTextNode('input');//podrá ser un input
                input.appendChild(contenidoInput);
                var button = document.createElement('option');
                var contenidoButton = document.createTextNode('button');//un button
                button.appendChild(contenidoButton);
                var selection = document.createElement('option');
                var contenidoSelection = document.createTextNode('Selection');//un selection
                selection.appendChild(contenidoSelection);
                var check = document.createElement('option');
                var contenidoCheck = document.createTextNode('checkBox');//un checkbox
                check.appendChild(contenidoCheck);
                var radiobutton = document.createElement('option');
                var contenidoRadio = document.createTextNode('RadioButton');//o un radio
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
        function diseñaCampo() {//depende de la opción que hayan seleccionado en el select llamaremos al método creador del campo correspondiente
            var saltoLinea = document.createElement("br");

            switch (document.getElementById(this.id).value) {//comprobamos el valor seleccionado en el select
                case 'button':
                    form.removeChild(document.getElementById(this.id));
                    crearBoton();
                    break;
                case 'input':
                    form.removeChild(document.getElementById(this.id));
                    crearInput();
                    break;
                case 'Selection':
                    form.removeChild(document.getElementById(this.id));
                    crearSelection();
                    break;
                case 'checkBox':
                    form.removeChild(document.getElementById(this.id));
                    crearChecks();
                    break;
                case 'RadioButton':
                    form.removeChild(document.getElementById(this.id));
                    crearRadios();
                    break;
            }

            function crearBoton() {//método que creará un botón
                var textoBtn = prompt("Inserta texto del botón", "");
                var boton = document.createElement('button');
                boton.setAttribute("id", tituloFormulario.innerHTML + "-btn1");
                boton.setAttribute("type", "button");
                boton.appendChild(document.createTextNode(textoBtn));
                form.appendChild(saltoLinea);
                form.appendChild(boton);
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
                form.appendChild(btnBorrarElemento);//añadimos botón para borrar campo
                form.appendChild(btnModificarElemento);//añadimos botón para editar campo
            }
            function crearInput() {//método que creará un input
                var input = document.createElement("input");
                input.setAttribute("id", tituloFormulario.innerHTML + "-input");
                input.setAttribute("placeholder", "texto por defecto");
                form.appendChild(saltoLinea);
                form.appendChild(input);

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

                form.appendChild(btnBorrarElemento);
                form.appendChild(btnModificarElemento);
            }

            function crearSelection() {//método que creará un selection
                do {
                    var opciones = prompt('Cuantas opciones necesitas?(DEBE INTRODUCIR UN NÚMERO)', '');
                } while (isNaN(opciones))
                var select = document.createElement('select');
                for (var i = 0; i < parseInt(opciones); i++) {
                    var textoOpcion = prompt('Introduce opcion:', '');
                    var opcion = document.createElement('option');
                    opcion.appendChild(document.createTextNode(textoOpcion));
                    select.appendChild(opcion);
                }
                form.appendChild(saltoLinea);
                form.appendChild(select);

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
                form.appendChild(btnBorrarElemento);
                form.appendChild(btnModificarElemento);
            }

            function crearChecks() {//método que creará los check box
                do {
                    var cantidad = prompt("Inserta cantidad de checks (DEBE INTRODUCIR UN NÚMERO)", "");
                } while (isNaN(cantidad));
                var divCheck = document.createElement("div");
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
                form.appendChild(saltoLinea);
                form.appendChild(divCheck);

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
                form.appendChild(btnBorrarElemento);
                form.appendChild(btnModificarElemento);
            }

            function crearRadios() {//método que creará los radiobutton
                do {
                    var cantidad = prompt("Inserta cantidad de Opciones(DEBE INTRODUCIR UN NÚMERO)", "");
                } while (isNaN(cantidad));
                var divRadio = document.createElement("div");
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
                form.appendChild(saltoLinea);
                form.appendChild(divRadio);
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
                form.appendChild(btnBorrarElemento);
                form.appendChild(btnModificarElemento);
            }



        }

        function compruebaNombre(nombreFormulario) {//método que comprueba que no se repitan los nombres de los formularios
            var nombreFormulario = nombreFormulario;
            var existe = false;

            for (var i = 0; i < nombresFormularios.length; i++) {
                if (nombresFormularios[i] == nombreFormulario) {
                    existe = true;
                }
            }

            if (!existe) {
                nombresFormularios.push(nombreFormulario);//si el nombre no existía lo añadimos al array de nombres
            }

            return existe;//retornamos si existe o no para posteriormente generar con ese nombre o arrojar mensaje de error
        }

    }




}