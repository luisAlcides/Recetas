// Catálogo y calendario del menú. Todo se consigue en El Jícaro, Nueva Segovia.
// Las cantidades de cada plato son por UNA porción normal, en la unidad del ingrediente.

export const CATEGORIES = {
  proteinas: '🍗 Carnes y huevos',
  lacteos: '🧀 Lácteos',
  granos: '🌽 Granos y tortillas',
  verduras: '🥬 Verduras y raíces',
  frutas: '🍌 Frutas',
  otros: '🧂 Otros',
};

// unit: unidad en que se compra · step: lo mínimo que se pide
export const INGREDIENTS = {
  pollo: { name: 'Pollo (pechuga o muslo)', cat: 'proteinas', unit: 'lb', step: 0.5 },
  res: { name: 'Carne de res (posta)', cat: 'proteinas', unit: 'lb', step: 0.5 },
  res_molida: { name: 'Carne de res molida', cat: 'proteinas', unit: 'lb', step: 0.5 },
  res_hueso: { name: 'Carne de res para sopa (con hueso)', cat: 'proteinas', unit: 'lb', step: 0.5 },
  cerdo: { name: 'Carne de cerdo (lomo o posta)', cat: 'proteinas', unit: 'lb', step: 0.5 },
  huevo: { name: 'Huevos', cat: 'proteinas', unit: 'unid', step: 1 },
  sardina: { name: 'Sardina en salsa de tomate', cat: 'proteinas', unit: 'lata', step: 1 },

  queso: { name: 'Queso seco', cat: 'lacteos', unit: 'lb', step: 0.25 },
  cuajada: { name: 'Cuajada', cat: 'lacteos', unit: 'lb', step: 0.25 },
  leche: { name: 'Leche', cat: 'lacteos', unit: 'litro', step: 0.5 },

  frijoles: { name: 'Frijoles rojos', cat: 'granos', unit: 'lb', step: 0.5 },
  arroz: { name: 'Arroz', cat: 'granos', unit: 'lb', step: 0.5 },
  tortilla: { name: 'Tortillas', cat: 'granos', unit: 'unid', step: 1 },
  avena: { name: 'Avena en hojuelas', cat: 'granos', unit: 'lb', step: 0.5 },
  pinolillo: { name: 'Pinolillo', cat: 'granos', unit: 'lb', step: 0.25 },
  espagueti: { name: 'Espagueti', cat: 'granos', unit: 'lb', step: 0.5 },

  chayote: { name: 'Chayote', cat: 'verduras', unit: 'unid', step: 1 },
  zanahoria: { name: 'Zanahoria', cat: 'verduras', unit: 'unid', step: 1 },
  tomate: { name: 'Tomate', cat: 'verduras', unit: 'unid', step: 1 },
  cebolla: { name: 'Cebolla', cat: 'verduras', unit: 'unid', step: 1 },
  chiltoma: { name: 'Chiltoma', cat: 'verduras', unit: 'unid', step: 1 },
  repollo: { name: 'Repollo', cat: 'verduras', unit: 'unid', step: 1 },
  pepino: { name: 'Pepino', cat: 'verduras', unit: 'unid', step: 1 },
  ayote: { name: 'Ayote tierno', cat: 'verduras', unit: 'unid', step: 1 },
  pipian: { name: 'Pipián', cat: 'verduras', unit: 'unid', step: 1 },
  yuca: { name: 'Yuca', cat: 'verduras', unit: 'lb', step: 0.5 },
  papa: { name: 'Papa', cat: 'verduras', unit: 'lb', step: 0.5 },
  quequisque: { name: 'Quequisque', cat: 'verduras', unit: 'lb', step: 0.5 },
  platano_verde: { name: 'Plátano verde', cat: 'verduras', unit: 'unid', step: 1 },
  maduro: { name: 'Plátano maduro', cat: 'verduras', unit: 'unid', step: 1 },
  guineo: { name: 'Guineo cuadrado (verde)', cat: 'verduras', unit: 'unid', step: 1 },
  culantro: { name: 'Culantro', cat: 'verduras', unit: 'manojo', step: 1 },
  ajo: { name: 'Ajo', cat: 'verduras', unit: 'cabeza', step: 1 },

  banano: { name: 'Banano', cat: 'frutas', unit: 'unid', step: 1 },
  papaya: { name: 'Papaya', cat: 'frutas', unit: 'unid', step: 1 },
  aguacate: { name: 'Aguacate', cat: 'frutas', unit: 'unid', step: 1 },
  naranja: { name: 'Naranja', cat: 'frutas', unit: 'unid', step: 1 },
  limon: { name: 'Limón', cat: 'frutas', unit: 'unid', step: 1 },

  aceite: { name: 'Aceite', cat: 'otros', unit: 'litro', step: 0.5 },
};

const items = (spec) => Object.entries(spec).map(([ing, qty]) => ({ ing, qty }));

// Sofrito base que llevan casi todos los guisos (por porción).
const SOFRITO = { cebolla: 0.25, chiltoma: 0.25, tomate: 0.5, ajo: 0.05, aceite: 0.01 };

export const DISHES = {
  // ───────── Desayunos ─────────
  huevos_chiltoma: {
    type: 'desayuno', protein: 'huevo',
    name: 'Huevos revueltos con tomate y chiltoma',
    sides: 'Frijoles cocidos · 1 tortilla · cuajada',
    gym: '+1 huevo y una tajada más de cuajada',
    items: items({ huevo: 2, tomate: 0.5, chiltoma: 0.25, cebolla: 0.15, frijoles: 0.06, tortilla: 1, cuajada: 0.06, aceite: 0.005 }),
    steps: ['Picá tomate, chiltoma y cebolla y sofreílos 2 minutos con poquito aceite.', 'Agregá los huevos batidos con sal y revolvé a fuego bajo hasta que cuajen.', 'Serví con frijoles cocidos (no fritos), tortilla y cuajada.'],
  },
  gallo_pinto_huevo: {
    type: 'desayuno', protein: 'huevo',
    name: 'Gallo pinto con huevo cocido',
    sides: 'Cuajada · rodajas de tomate',
    gym: '+1 huevo cocido; el pinto sin repetir',
    items: items({ arroz: 0.06, frijoles: 0.06, cebolla: 0.15, chiltoma: 0.15, huevo: 2, cuajada: 0.06, tomate: 0.5, aceite: 0.005 }),
    steps: ['Poné a cocer los huevos 10 minutos.', 'Sofreí cebolla y chiltoma con poquito aceite; agregá arroz y frijoles cocidos y un chorrito del caldo de frijol.', 'Revolvé hasta que se seque. Serví con los huevos, cuajada y tomate.'],
  },
  avena_banano: {
    type: 'desayuno', protein: 'huevo',
    name: 'Avena con leche y banano',
    sides: '2 huevos cocidos',
    gym: '+1 huevo cocido',
    items: items({ avena: 0.1, leche: 0.25, banano: 1, huevo: 2 }),
    steps: ['Cociná la avena en la leche con una raja de canela, 5 minutos, moviendo.', 'Endulzá poco; agregá el banano en rodajas.', 'Acompañá con los huevos cocidos.'],
  },
  tortilla_cuajada: {
    type: 'desayuno', protein: 'cuajada',
    name: 'Tortilla con cuajada y frijoles',
    sides: 'Huevo cocido · aguacate',
    gym: '+1 huevo y más cuajada',
    items: items({ tortilla: 2, cuajada: 0.1, frijoles: 0.06, huevo: 1, aguacate: 0.25 }),
    steps: ['Calentá las tortillas en el comal.', 'Calentá los frijoles cocidos (o molidos sin manteca).', 'Serví con la cuajada, el huevo cocido y aguacate.'],
  },
  maduro_cuajada: {
    type: 'desayuno', protein: 'huevo',
    name: 'Maduro cocido con huevos revueltos',
    sides: 'Cuajada · frijoles',
    gym: '+1 huevo; medio maduro nada más',
    items: items({ maduro: 0.5, huevo: 2, cuajada: 0.06, frijoles: 0.05, aceite: 0.005 }),
    steps: ['Cociná el maduro con cáscara en agua 15 minutos (o asalo en el comal).', 'Revolvé los huevos con sal y poquito aceite.', 'Serví con cuajada y frijoles.'],
  },
  pinolillo_tortilla_huevo: {
    type: 'desayuno', protein: 'huevo',
    name: 'Pinolillo con leche y tortilla con huevo',
    sides: 'Frijoles',
    gym: '+1 huevo',
    items: items({ pinolillo: 0.08, leche: 0.25, tortilla: 1, huevo: 2, frijoles: 0.05, aceite: 0.005 }),
    steps: ['Batí el pinolillo en la leche fría (o tibia) con poca azúcar.', 'Hacé los huevos estrellados en sartén con apenas aceite.', 'Serví con tortilla caliente y frijoles.'],
  },
  guineo_queso: {
    type: 'desayuno', protein: 'queso',
    name: 'Guineo cocido con queso y huevo',
    sides: 'Ensalada de tomate',
    gym: '+1 huevo; 1 guineo nada más',
    items: items({ guineo: 1, queso: 0.06, huevo: 2, tomate: 0.5, limon: 0.25 }),
    steps: ['Pelá los guineos y cocinalos en agua con sal 15–20 minutos.', 'Cociná los huevos 10 minutos.', 'Serví con queso seco rallado y tomate con limón.'],
  },
  huevos_rancheros: {
    type: 'desayuno', protein: 'huevo',
    name: 'Huevos rancheros',
    sides: 'Frijoles · 1 tortilla',
    gym: '+1 huevo',
    items: items({ huevo: 2, tomate: 1, cebolla: 0.2, chiltoma: 0.25, frijoles: 0.06, tortilla: 1, aceite: 0.005 }),
    steps: ['Licuá o picá tomate, cebolla y chiltoma; cocinalo 5 minutos con sal como salsa.', 'Abrí los huevos encima de la salsa, tapá y dejá 4 minutos a fuego bajo.', 'Serví con frijoles y tortilla.'],
  },
  torta_huevo_verduras: {
    type: 'desayuno', protein: 'huevo',
    name: 'Torta de huevo con verduras',
    sides: 'Tortilla · queso seco',
    gym: '+1 huevo',
    items: items({ huevo: 2, chiltoma: 0.25, cebolla: 0.15, tomate: 0.5, zanahoria: 0.25, tortilla: 1, queso: 0.04, aceite: 0.005 }),
    steps: ['Rallá la zanahoria y picá las demás verduras.', 'Batí los huevos con las verduras y sal; cociná tapado a fuego bajo, volteá a la mitad.', 'Serví con tortilla y queso.'],
  },
  frijoles_aguacate: {
    type: 'desayuno', protein: 'huevo',
    name: 'Frijoles molidos con aguacate y huevo',
    sides: '1 tortilla · cuajada',
    gym: '+1 huevo',
    items: items({ frijoles: 0.08, aguacate: 0.25, huevo: 2, tortilla: 1, cuajada: 0.05, cebolla: 0.1 }),
    steps: ['Licuá los frijoles cocidos con un poco de su caldo y cebolla; calentalos sin manteca.', 'Cociná los huevos a tu gusto.', 'Serví con aguacate, tortilla y cuajada.'],
  },
  yuca_cuajada: {
    type: 'desayuno', protein: 'cuajada',
    name: 'Yuca cocida con cuajada y huevo',
    sides: 'Ensalada de repollo',
    gym: '+1 huevo; menos yuca',
    items: items({ yuca: 0.3, cuajada: 0.08, huevo: 2, repollo: 0.08, limon: 0.25 }),
    steps: ['Pelá la yuca y cocinala en agua con sal hasta que esté suave.', 'Cociná los huevos.', 'Serví con cuajada y repollo picado con limón.'],
  },
  papas_huevo: {
    type: 'desayuno', protein: 'huevo',
    name: 'Papas guisadas con huevo',
    sides: '1 tortilla',
    gym: '+1 huevo',
    items: items({ papa: 0.25, huevo: 2, tomate: 0.5, cebolla: 0.15, chiltoma: 0.2, tortilla: 1, aceite: 0.005 }),
    steps: ['Cortá la papa en cubitos y cocinala en agua 8 minutos.', 'Sofreí cebolla, chiltoma y tomate; agregá la papa.', 'Echá los huevos batidos y revolvé hasta que cuajen.'],
  },
  avena_papaya: {
    type: 'desayuno', protein: 'huevo',
    name: 'Avena con leche y papaya',
    sides: 'Huevos revueltos',
    gym: '+1 huevo',
    items: items({ avena: 0.1, leche: 0.25, papaya: 0.15, huevo: 2, aceite: 0.005 }),
    steps: ['Cociná la avena en la leche 5 minutos.', 'Picá la papaya para servir aparte o encima.', 'Revolvé los huevos con poquito aceite.'],
  },
  pinto_revuelto: {
    type: 'desayuno', protein: 'huevo',
    name: 'Gallo pinto con huevos revueltos y tomate',
    sides: 'Queso seco',
    gym: '+1 huevo; el pinto sin repetir',
    items: items({ arroz: 0.06, frijoles: 0.06, cebolla: 0.15, huevo: 2, tomate: 0.5, queso: 0.04, aceite: 0.008 }),
    steps: ['Hacé el pinto sofriendo cebolla y agregando arroz y frijoles cocidos.', 'Revolvé los huevos con tomate picado.', 'Serví con un poco de queso seco.'],
  },

  // ───────── Almuerzos (y cena) ─────────
  pollo_guisado: {
    type: 'almuerzo', protein: 'pollo',
    name: 'Pollo guisado con chayote y zanahoria',
    sides: 'Arroz (½ taza) · ensalada de repollo',
    gym: 'Pieza extra de pollo; en la cena, sin arroz',
    items: items({ pollo: 0.35, chayote: 0.5, zanahoria: 0.5, arroz: 0.08, repollo: 0.1, limon: 0.25, ...SOFRITO }),
    steps: ['Sazoná el pollo con sal, ajo y limón.', 'Sofreí cebolla, chiltoma y tomate; agregá el pollo y doralo un poco.', 'Echá agua hasta la mitad, el chayote y la zanahoria en trozos; cociná tapado 30 minutos.', 'Serví con arroz y repollo con limón.'],
  },
  salpicon: {
    type: 'almuerzo', protein: 'res',
    name: 'Salpicón de res',
    sides: 'Arroz · ensalada de tomate y pepino',
    gym: 'Doble salpicón; en la cena, sin arroz',
    items: items({ res: 0.3, cebolla: 0.3, chiltoma: 0.25, limon: 0.5, culantro: 0.1, arroz: 0.08, tomate: 0.5, pepino: 0.3 }),
    steps: ['Cociná la carne en agua con sal y ajo hasta que esté suave (1 hora, o 30 min en olla de presión).', 'Picala bien fina, o desmenuzala.', 'Mezclala con cebolla, chiltoma, culantro picados y jugo de limón.', 'Serví con arroz y la ensalada.'],
  },
  sopa_frijoles: {
    type: 'almuerzo', protein: 'frijoles',
    name: 'Sopa de frijoles con huevo y queso',
    sides: 'Quequisque · 1 tortilla',
    gym: '+1 huevo y más queso',
    items: items({ frijoles: 0.12, huevo: 1, queso: 0.05, quequisque: 0.2, cebolla: 0.2, chiltoma: 0.2, culantro: 0.1, ajo: 0.05, tortilla: 1 }),
    steps: ['Cociná los frijoles con ajo y cebolla (o usá el caldo de los frijoles de la semana).', 'Agregá el quequisque en trozos, la chiltoma y culantro; cociná 15 minutos.', 'Al final, echá los huevos enteros para que se cuezan en el caldo.', 'Serví con queso seco desmoronado y tortilla.'],
  },
  bistec_encebollado: {
    type: 'almuerzo', protein: 'res',
    name: 'Bistec de res encebollado',
    sides: 'Arroz · chayote cocido',
    gym: 'Bistec extra; en la cena, más chayote y sin arroz',
    items: items({ res: 0.33, cebolla: 0.4, tomate: 0.5, chiltoma: 0.25, ajo: 0.05, chayote: 0.5, arroz: 0.08, aceite: 0.01 }),
    steps: ['Aplaná los bisteces, sazoná con sal, ajo y un chorrito de limón o naranja agria.', 'Sellalos en sartén caliente con poquito aceite.', 'Agregá mucha cebolla en ruedas, tomate y chiltoma; tapá y cociná 10 minutos.', 'Serví con arroz y chayote cocido.'],
  },
  cerdo_guisado: {
    type: 'almuerzo', protein: 'cerdo',
    name: 'Cerdo guisado con papa',
    sides: 'Arroz · ensalada de repollo',
    gym: 'Más carne; en la cena, sin arroz',
    items: items({ cerdo: 0.33, papa: 0.2, repollo: 0.1, arroz: 0.08, limon: 0.25, ...SOFRITO }),
    steps: ['Cortá el cerdo en cubos y quitale la grasa visible.', 'Doralo en olla con poquito aceite; agregá el sofrito.', 'Echá agua, tapá y cociná 30 minutos; agregá la papa y 15 minutos más.', 'Serví con arroz y repollo con limón.'],
  },
  pollo_asado: {
    type: 'almuerzo', protein: 'pollo',
    name: 'Pollo a la plancha',
    sides: 'Ensalada de tomate y pepino · 1 tortilla · frijoles',
    gym: 'Pieza extra de pollo',
    items: items({ pollo: 0.35, tomate: 0.5, pepino: 0.3, cebolla: 0.15, limon: 0.5, ajo: 0.05, tortilla: 1, frijoles: 0.05, aceite: 0.005 }),
    steps: ['Abrí las piezas de pollo en filetes y marinálas con limón, ajo y sal (15 minutos).', 'Cocinalas en sartén o plancha caliente, 6 minutos por lado.', 'Serví con la ensalada, frijoles y tortilla.'],
  },
  sopa_res: {
    type: 'almuerzo', protein: 'res',
    name: 'Sopa de res con verduras',
    sides: 'Yuca, chayote, ayote, zanahoria y plátano en la sopa',
    gym: 'Más carne en el plato; poca yuca y plátano',
    items: items({ res_hueso: 0.45, yuca: 0.25, chayote: 0.5, ayote: 0.15, zanahoria: 0.5, platano_verde: 0.3, cebolla: 0.25, chiltoma: 0.25, culantro: 0.15, ajo: 0.05, limon: 0.25 }),
    steps: ['Cociná la carne con agua, sal, ajo y cebolla 1 hora (o 35 min en olla de presión).', 'Agregá yuca y plátano; a los 10 minutos chayote, zanahoria y ayote.', 'Al final, chiltoma y culantro. Serví con limón.'],
  },
  arroz_pollo: {
    type: 'almuerzo', protein: 'pollo',
    name: 'Arroz con pollo y verduras',
    sides: 'Ensalada de repollo y tomate',
    gym: 'Más pollo, menos arroz; en la cena, sobre todo pollo y ensalada',
    items: items({ pollo: 0.33, arroz: 0.1, zanahoria: 0.5, chiltoma: 0.25, cebolla: 0.2, ajo: 0.05, repollo: 0.1, tomate: 0.5, aceite: 0.01 }),
    steps: ['Cociná el pollo en agua con sal y ajo; desmenuzalo y guardá el caldo.', 'Sofreí cebolla, chiltoma y zanahoria picada; agregá el arroz y doralo 2 minutos.', 'Echá el caldo (2 tazas por taza de arroz) y el pollo; tapá a fuego bajo 20 minutos.', 'Serví con la ensalada.'],
  },
  picadillo: {
    type: 'almuerzo', protein: 'res',
    name: 'Picadillo de res con chayote',
    sides: 'Arroz · 1 tortilla',
    gym: 'Más picadillo; en la cena, sin arroz',
    items: items({ res_molida: 0.3, chayote: 0.5, zanahoria: 0.3, papa: 0.1, arroz: 0.07, tortilla: 1, ...SOFRITO }),
    steps: ['Dorá la carne molida en olla sin aceite, rompiéndola con la cuchara.', 'Agregá el sofrito y cociná 3 minutos.', 'Echá chayote, zanahoria y papa en cubitos y un poco de agua; tapá 15 minutos.', 'Serví con arroz o tortilla.'],
  },
  huevo_ayote: {
    type: 'almuerzo', protein: 'huevo',
    name: 'Ayote tierno guisado con huevo y queso',
    sides: 'Frijoles · 1 tortilla',
    gym: '+1 huevo y más queso',
    items: items({ ayote: 0.3, huevo: 2, queso: 0.06, frijoles: 0.06, tortilla: 1, ...SOFRITO }),
    steps: ['Cortá el ayote tierno en cubitos.', 'Sofreí cebolla, chiltoma y tomate; agregá el ayote, tapá y cociná 8 minutos.', 'Echá los huevos batidos y revolvé hasta que cuajen; poné queso encima.', 'Serví con frijoles y tortilla.'],
  },
  cerdo_asado: {
    type: 'almuerzo', protein: 'cerdo',
    name: 'Cerdo asado con yuca y ensalada',
    sides: 'Yuca cocida · ensalada de repollo con tomate',
    gym: 'Más carne; poca yuca (en la cena, sin yuca)',
    items: items({ cerdo: 0.33, yuca: 0.25, repollo: 0.15, tomate: 0.5, limon: 0.5, naranja: 0.5, ajo: 0.05 }),
    steps: ['Marinálo con jugo de naranja, ajo y sal (30 minutos o desde la noche).', 'Asalo en sartén o parrilla hasta que esté bien cocido.', 'Cociná la yuca en agua con sal.', 'Serví con repollo, tomate y limón (como un vigorón, pero sin chicharrón).'],
  },
  sardina_tomate: {
    type: 'almuerzo', protein: 'sardina',
    name: 'Sardina guisada con arroz',
    sides: 'Ensalada de repollo · 1 tortilla',
    gym: 'Lata extra entre los dos; en la cena, sin arroz',
    items: items({ sardina: 0.33, arroz: 0.08, repollo: 0.1, tortilla: 1, limon: 0.25, ...SOFRITO }),
    steps: ['Sofreí cebolla, chiltoma y tomate.', 'Agregá las sardinas con su salsa y calentá 5 minutos sin desbaratarlas mucho.', 'Serví con arroz, repollo con limón y tortilla.'],
  },
  pipian_pollo: {
    type: 'almuerzo', protein: 'pollo',
    name: 'Pollo con pipián guisado',
    sides: 'Arroz · 1 tortilla',
    gym: 'Más pollo; en la cena, sin arroz',
    items: items({ pollo: 0.33, pipian: 0.5, zanahoria: 0.3, arroz: 0.07, tortilla: 1, ...SOFRITO }),
    steps: ['Cortá el pollo en trozos pequeños y doralo con poquito aceite.', 'Agregá el sofrito y luego el pipián en cubos.', 'Tapá y cociná 15 minutos con un poco de agua.', 'Serví con arroz o tortilla.'],
  },
  sopa_pollo: {
    type: 'almuerzo', protein: 'pollo',
    name: 'Sopa de pollo con verduras',
    sides: 'Papa, chayote, zanahoria y quequisque en la sopa · 1 tortilla',
    gym: 'Pieza extra de pollo; poco quequisque',
    items: items({ pollo: 0.4, papa: 0.15, chayote: 0.5, zanahoria: 0.5, quequisque: 0.15, cebolla: 0.25, chiltoma: 0.25, culantro: 0.15, ajo: 0.05, tortilla: 1, limon: 0.25 }),
    steps: ['Cociná el pollo en agua con sal, ajo y cebolla 25 minutos.', 'Agregá papa y quequisque; a los 10 minutos, chayote y zanahoria.', 'Terminá con chiltoma y culantro. Serví con limón y tortilla.'],
  },
  pollo_tortillas: {
    type: 'almuerzo', protein: 'pollo',
    name: 'Tortillas con pollo desmenuzado y repollo',
    sides: 'Frijoles · ensalada de repollo y tomate encima',
    gym: 'Más pollo; 2 tortillas máximo',
    items: items({ pollo: 0.35, tortilla: 2, repollo: 0.15, tomate: 0.5, cebolla: 0.2, chiltoma: 0.2, limon: 0.5, frijoles: 0.05, ajo: 0.05 }),
    steps: ['Cociná el pollo con sal y ajo; desmenuzalo.', 'Guisalo un poco con cebolla, chiltoma y tomate.', 'Picá repollo y tomate con limón y sal.', 'Armá en tortilla calientita (sin freír) con frijoles.'],
  },
  espagueti_pollo: {
    type: 'almuerzo', protein: 'pollo',
    name: 'Espagueti con pollo y verduras',
    sides: 'Ensalada de pepino y tomate',
    gym: 'Más pollo, menos pasta; en la cena, solo pollo con verduras',
    items: items({ espagueti: 0.1, pollo: 0.33, zanahoria: 0.3, pepino: 0.3, queso: 0.03, ...SOFRITO }),
    steps: ['Cociná el espagueti en agua con sal.', 'Cociná el pollo en trocitos con el sofrito y la zanahoria rallada; agregá un poco de agua para hacer salsa.', 'Mezclá con la pasta y poné queso seco rallado encima.', 'Serví con la ensalada.'],
  },
};

// Calendario: b = desayuno, l = almuerzo (y cena). Lunes → domingo.
// El domingo toca sopa, como en casa.
const week = (b, l) => b.map((x, i) => ({ b: x, l: l[i] }));

export const WEEKS = [
  week(
    ['huevos_chiltoma', 'gallo_pinto_huevo', 'avena_banano', 'tortilla_cuajada', 'maduro_cuajada', 'huevos_rancheros', 'pinto_revuelto'],
    ['pollo_guisado', 'salpicon', 'sopa_frijoles', 'bistec_encebollado', 'cerdo_guisado', 'pollo_asado', 'sopa_res'],
  ),
  week(
    ['torta_huevo_verduras', 'frijoles_aguacate', 'avena_papaya', 'guineo_queso', 'pinolillo_tortilla_huevo', 'yuca_cuajada', 'gallo_pinto_huevo'],
    ['arroz_pollo', 'picadillo', 'huevo_ayote', 'cerdo_asado', 'sardina_tomate', 'pipian_pollo', 'sopa_pollo'],
  ),
  week(
    ['papas_huevo', 'huevos_chiltoma', 'avena_banano', 'frijoles_aguacate', 'tortilla_cuajada', 'guineo_queso', 'pinto_revuelto'],
    ['pollo_tortillas', 'bistec_encebollado', 'sopa_frijoles', 'espagueti_pollo', 'cerdo_guisado', 'salpicon', 'sopa_res'],
  ),
  week(
    ['huevos_rancheros', 'torta_huevo_verduras', 'avena_papaya', 'maduro_cuajada', 'papas_huevo', 'pinolillo_tortilla_huevo', 'gallo_pinto_huevo'],
    ['pollo_guisado', 'picadillo', 'huevo_ayote', 'sardina_tomate', 'cerdo_asado', 'arroz_pollo', 'sopa_pollo'],
  ),
];
