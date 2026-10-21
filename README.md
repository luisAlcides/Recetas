# Menú de la casa

App para el celular que dice qué cocinar cada día. Muestra el desayuno y el almuerzo,
que también es la cena. El menú es para 3 personas: dos van al gym y la tercera es un
adulto mayor que come poco. Todos los ingredientes se consiguen en El Jícaro, Nueva
Segovia.

- **Hoy**: el menú del día con receta y la nota 💪 Gym. Puedes cambiar cualquier plato.
- **Semana**: las 4 semanas del ciclo, que se repiten.
- **Compras**: lista para hoy, 7 días, la próxima semana o la quincena, con casillas
  para marcar lo que ya compraste.

Funciona sin internet y se puede instalar en el teléfono con "Agregar a pantalla de
inicio".

## Subir a Netlify

1. En Netlify: **Add new site → Import an existing project** y elige este repo.
2. No hace falta comando de build. La carpeta para publicar es la raíz del repo
   (ya está configurada en `netlify.toml`).
3. Abre la URL en el celular y toca **Agregar a pantalla de inicio**.

También puedes arrastrar la carpeta del proyecto a <https://app.netlify.com/drop>.

**Cuando cambies algo**, sube el número de `VERSION` en `sw.js` (por ejemplo
`menu-v2`) para que los teléfonos reciban la versión nueva.

## Cambiar platos o cantidades

Todo el menú está en `data/menu.js`:

- `INGREDIENTS`: los ingredientes y cómo se compran (lb, unid, litro…).
- `DISHES`: cada plato, con las cantidades **para una porción normal**.
- `WEEKS`: qué toca cada día de las 4 semanas.

## Probar en la computadora

```bash
npm test                    # pruebas
python3 -m http.server      # luego abre http://localhost:8000
```
