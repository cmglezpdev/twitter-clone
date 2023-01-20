# Twitter Clone

1. Clonar el repositorio

```bash
git clone https://github.com/cmglezpdev/twitter-clone.git
```

2. Clonar el archivo `.env.template`, renombrarlo a `.env` y llenar las variables de entorno:

- __MONGO_URL:__ Dirección de la base de datos de MongoDB.
- __NEXTAUTH_SECRET:__ Frase secreta para crear los `JWT`.

3. Instalar las dependencias

```bash
yarn install
```

4. Levantar la base de datos con docker
```bash
docker compose up -d
```

5. Levantar la aplicación en modo de desarrollo.
```bash
yarn dev
```

O si se quiere en desarrollo entonces:
```bash
# generar build de la aplicación
yarn build

# ejecutar version de desarrollo
yarn start
```

## TODO:

- [ ] Al crear una cuenta con una red social, ir a otra pantalla para poner la contraseña
- [ ] Crear una pantalla solo con redes sociales para logearse
- [ ] Manejar errores de login y registro devueltas por la api
- [ ] Cambiar las partes del loading por un spinner
- [ ] Mostrar contador en los inputs con la cantidad de caracteres disponibles
- [ ] Agregar otro modal para preguntar si el usuario quiere aceptar alguna accion
- [ ] Eliminar de los endpoints la propiedad userId, ya que esta aparece en las cookies