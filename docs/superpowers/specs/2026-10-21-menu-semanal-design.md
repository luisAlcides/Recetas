# Menú semanal — diseño

## Intención

Una app para el celular que le dice a una casa de 3 personas qué cocinar cada día:
**desayuno** y **almuerzo** (la cena es lo mismo que el almuerzo). Dos de las tres
personas van al gym y buscan **ganar músculo y bajar grasa** (recomposición), así que
la comida es alta en proteína, con carbohidrato moderado, verdura diaria y poco frito.
Todo se cocina con ingredientes que se consiguen en **El Jícaro, Nueva Segovia
(Nicaragua)**. Hacen las compras de forma **variable**: a veces el mismo día, a
veces para la semana y a veces para la quincena. Tienen **refrigerador** y en el
pueblo hay **carne fresca**, así que no hay restricción por días.

**Las 3 personas:** 2 adultos que van al gym y 1 **adulto mayor que come poco**.
Nadie tiene alergias.

El "por qué": quitar la pregunta diaria de "¿qué cocino hoy?" y que la comida de casa
ayude a los objetivos del gym sin comprar cosas que no hay en el pueblo.

## Metas

- Abrir la app y ver de inmediato **el menú de hoy** (pantalla "Hoy", boceto A elegido).
- **4 semanas distintas** que rotan en ciclo.
- **Lista de compras** para 3 personas, con rango elegible (hoy, una semana o una
  quincena) y casillas para marcar lo comprado.
- **Cambiar un plato** por otro alternativo; la lista de compras se ajusta sola.
- Pensada **solo para el móvil**: una columna, botones grandes y uso con el pulgar.

## No metas

- Contar calorías al detalle, registrar comidas o seguir el peso.
- Cuentas, inicio de sesión o sincronizar entre teléfonos.
- Planes de entrenamiento.
- Merienda o cena distinta del almuerzo.

## Anti-metas (sería un fracaso aunque funcione)

- Ingredientes que no se consiguen en El Jícaro (salmón, quinoa, pechuga empacada,
  proteína en polvo, espárragos, etc.).
- Comida "de dieta" ajena a la cocina nicaragüense: tiene que sentirse como comida de casa.
- Que sea incómoda en el celular (texto chico, tablas anchas, scroll horizontal).
- Que necesite internet para ver el menú.

## Pantallas (decidido con el usuario: boceto A)

Barra de pestañas fija abajo: **Hoy · Semana · Compras**.

1. **Hoy**: fecha, "Semana N de 4", nota "3 personas · 2 van al gym".
   - Tarjeta **☀️ Desayuno**: nombre del plato, acompañantes y una línea
     "💪 Gym" con el ajuste (p. ej. "+1 huevo, +cuajada").
   - Tarjeta **🍲 Almuerzo y cena**: igual que la anterior, con el ajuste para gym
     (p. ej. "pechuga extra, menos arroz en la cena").
   - Cada tarjeta se puede tocar para ver los ingredientes y la preparación breve, y
     tiene un botón **"Cambiar plato"**.
2. **Semana**: los 7 días de la semana actual con hoy resaltado. Se puede ver las
   otras semanas del ciclo. Al tocar un día se abre su detalle, igual que en "Hoy".
3. **Compras**: arriba, un selector de rango: **Hoy · Esta semana · Próxima
   semana · Quincena** (14 días desde hoy). Todos los rangos se cuentan desde hoy,
   salvo "Próxima semana", que va de lunes a domingo de la semana siguiente. La
   lista se agrupa por categoría (granos, proteínas, lácteos, verduras, frutas y
   otros) y suma las cantidades de todos los días del rango.
   - Se marca tocando y el estado se guarda por rango. Al cambiar de rango o de
     semana, la lista empieza sin marcar. Hay un botón para desmarcar todo.
     *(Decisión del diseñador.)*
   - Si un plato cambiado agrega un ingrediente nuevo, aparece sin marcar. Lo que
     ya estaba marcado queda marcado.
   - Unidades como se compra en el pueblo: libras (carne, frijoles, arroz, queso,
     cuajada), docena o unidades (huevos, plátanos, tortillas), unidades (verduras
     y frutas) y litros (leche). Se redondea hacia arriba a algo que se pueda pedir
     ("½ lb", "1 docena"). *(Decisión del diseñador.)*

## Contenido del menú

- **Catálogo** de platos de desayuno y de almuerzo. Cada plato tiene sus
  ingredientes con cantidad por porción normal, el extra para gym y una preparación
  breve de 3 a 6 pasos.
- **4 semanas × 7 días**. Dentro de una semana no se repite el plato principal de
  almuerzo. La proteína rota entre pollo, res, cerdo, huevo, frijoles, queso o
  cuajada y, si se quiere, sardina en lata (se consigue en pulpería). Cada almuerzo
  lleva verdura (chayote, ayote, repollo, zanahoria, pipián, tomate, pepino, etc.).
- Base de ingredientes locales: frijoles rojos, arroz, maíz o tortilla, avena,
  pinolillo, huevo, pollo, res, cerdo, queso seco, cuajada, leche, crema (poca),
  plátano verde y maduro, guineo, yuca, papa, quequisque, chayote, ayote, pipián,
  repollo, zanahoria, tomate, cebolla, chiltoma, ajo, culantro, limón, naranja,
  mango, papaya, banano, aguacate y café.
- Criterio nutricional (decisión del diseñador): proteína en cada comida; tortilla,
  arroz y plátano en porciones medidas; preferir cocido, asado o guisado antes que
  frito; el ajuste "Gym" sube la proteína y baja algo de carbohidrato en la cena.
- **Porciones** *(decisión del diseñador)*: cada plato define la porción
  **normal**. Al cálculo se le suman un **extra gym** (más proteína y un poco menos
  de carbohidrato en la cena) y una porción **ligera para el adulto mayor**
  (aprox. ¾ de la normal). El adulto mayor come lo mismo que los demás. Se prefieren
  carnes guisadas o desmenuzadas y verduras bien cocidas, que son fáciles de comer
  para él, sin hacer platos aparte.
- **La cena cuenta en las compras**: el almuerzo se cocina para 2 comidas
  (almuerzo + cena) × 3 personas. La nota "💪 Gym" de la cena puede decir "menos
  arroz", pero las compras se calculan con la cantidad completa para no quedarse
  cortos. *(Decisión del diseñador.)*
- **Cambiar plato**: muestra alternativas del mismo tipo (desayuno o almuerzo) del
  catálogo y pone primero las que usan una proteína parecida. El cambio queda
  **fijo en ese día de esa semana del ciclo**, así que vuelve a salir cada 4
  semanas. Se puede deshacer con "volver al original". Se guarda en el teléfono y
  la lista de compras lo toma en cuenta. *(Decisión del diseñador: si alguien
  cambia un plato, normalmente es porque no le gusta.)*

## Rotación

- La semana 1 empieza el lunes de la semana en que se abre la app por primera vez.
  Esa fecha se guarda. Después el ciclo avanza solo: semana 1→2→3→4→1…
- En ajustes (o en "Semana") se puede reiniciar el ciclo o elegir la semana actual a mano.

## Cómo se construye (decisión del diseñador)

- Web app estática: HTML, CSS y JavaScript sin framework ni paso de build. El
  catálogo y las 4 semanas van en un archivo de datos aparte (`data/menu.js` o
  `.json`), para poder editar platos sin tocar la lógica.
- **PWA**: manifest + service worker, para "Agregar a pantalla de inicio" y
  funcionar **sin internet** después de la primera carga.
- Estado guardado en `localStorage`: fecha de inicio, platos cambiados y casillas
  de compras. Si el almacenamiento falla, la app igual muestra el menú.
- Todo en español. Respeta el modo oscuro del teléfono.
- Hospedaje: **Netlify** (decidido por el usuario; el usuario lo sube). Sitio
  estático servido desde la raíz del repo, sin build. Incluye `netlify.toml` con
  `publish = "."` y cabeceras para que `sw.js` y el manifest no queden en caché
  (`Cache-Control: no-cache`), así las actualizaciones llegan al teléfono. Todas
  las rutas son relativas.

## Lo que queda a criterio del constructor

- Los platos exactos, las cantidades y las recetas, siempre dentro de los criterios
  de arriba.
- El estilo visual (colores cálidos y legibles; el boceto A sirve de guía).
- La estructura de archivos y las pruebas.
