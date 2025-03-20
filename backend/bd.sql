CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    pregunta_seguridad VARCHAR(120) NOT NULL,
    respuesta_seguridad VARCHAR(120) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    cedula VARCHAR(100) NOT NULL,
    sanciones INT DEFAULT 0,
    bloqueado BOOLEAN DEFAULT FALSE
);

CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE generos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE libros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor_id INT REFERENCES autores(id) ON DELETE CASCADE,
    descripcion VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    imagen_url TEXT -- Guardará la ruta de la imagen
);

CREATE TABLE libro_genero (
    libro_id INT REFERENCES libros(id) ON DELETE CASCADE,
    genero_id INT REFERENCES generos(id) ON DELETE CASCADE,
    PRIMARY KEY (libro_id, genero_id) -- Clave compuesta para evitar duplicados
);

CREATE TABLE prestamos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    libro_id INT REFERENCES libros(id) ON DELETE CASCADE UNIQUE,
    fecha_prestamo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion TIMESTAMP NOT NULL,
    devuelto BOOLEAN DEFAULT FALSE
);

CREATE TABLE lecturas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    libro_id INT REFERENCES libros(id) ON DELETE CASCADE,
    fecha_lectura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, libro_id) -- Evita registros duplicados
);

CREATE TABLE sanciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT NOT NULL
);
