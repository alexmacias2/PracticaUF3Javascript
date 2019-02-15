function paginaCargada() {

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
        if (regexp.test(nombreFormulario.value)) {
            var div = document.createElement('div');
            var form = document.createElement('form');
            var btnBorrarFormulario = document.createElement('button');
            btnBorrarFormulario.setAttribute('class', 'btn btn-primary');
            var tituloFormulario = document.createElement('h5');
            var contenidoEditar = document.createTextNode('Editar Formulario');
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
            errorSpan.innerHTML = "El nombre del formulario debe empezar por 3 o más letras seguidas de uno o más números"; // plain javascript            
        }
        
          function llenarForm() {
            var inputCantidad = document.createElement('input');
            inputCantidad.setAttribute('placeholder', 'inserta cantidad de elementos');
            inputCantidad.setAttribute('type', 'number');
            inputCantidad.setAttribute('id', tituloFormulario.id + '-cantidad');
            inputCantidad.setAttribute('class', 'form-control');
            var btnCrearCampos = document.createElement('button');
            btnCrearCampos.appendChild(document.createTextNode("Crear Campos"));
            btnCrearCampos.setAttribute('type', 'button');
            btnCrearCampos.setAttribute('id', tituloFormulario.id + '-btnCrearCampo');

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
            alert(document.getElementById(idBoton[0] + '-' + 'cantidad').value);
            
        }

    }
    }