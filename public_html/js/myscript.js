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
            switch (document.getElementById(this.id).value) {
                case 'button':
                    alert('button');
                    break;
                case 'input':
                    alert('input');
                    break;
                case 'Selection':
                    alert('Selection');
                    break;
                case 'checkBox':
                    alert('checkBox');
                    break;
                case 'RadioButton':
                    alert('RadioButton');
                    break;
            }

        }

    }
}