const inputImagen = document.getElementById('imagen');
    const imagenLabel = document.getElementById('imagen-label');

    inputImagen.addEventListener('change', function(e) {
        const fileName = e.target.files[0].name;
        imagenLabel.textContent = fileName;
    });

    imagenLabel.addEventListener('dragover', function(e) {
        e.preventDefault();
        imagenLabel.classList.remove('bg-white');
        imagenLabel.classList.add('bg-gray-200');
        imagenLabel.textContent = 'Suelta la imagen';
    });

    imagenLabel.addEventListener('dragleave', function(e) {
        e.preventDefault();
        imagenLabel.classList.remove('bg-gray-200');
        imagenLabel.classList.add('bg-white');
        imagenLabel.textContent = 'Arrastra aquí o selecciona un archivo';
    });

    imagenLabel.addEventListener('drop', function(e) {
        e.preventDefault();
        imagenLabel.classList.remove('bg-gray-200');
        imagenLabel.classList.add('bg-white');
        const fileName = e.dataTransfer.files[0].name;
        inputImagen.files = e.dataTransfer.files;
        imagenLabel.textContent = fileName;
    });