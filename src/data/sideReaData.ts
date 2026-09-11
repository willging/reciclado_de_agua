import { ComponentInfo } from '../types';

export const SIDEREA_COMPONENTS: ComponentInfo[] = [
  {
    id: 'asegurador-caudal',
    name: 'Asegurador de Caudal',
    category: 'seguridad',
    description: 'Dispositivo hidráulico regulador que estabiliza la presión y garantiza un flujo continuo hacia el sistema de reciclaje sin sobrecargar las tuberías.',
    roleInSideReA: 'Protege las etapas de filtrado y el tanque recuperador de picos súbitos de flujo y asegura que siempre llegue un volumen constante.',
    pageRef: 'VI',
    location: 'Línea de entrada previa al tanque recuperador',
    iconName: 'Gauge'
  },
  {
    id: 'filtro-solidos',
    name: 'Filtro Interceptor de Sólidos en PP Baño',
    category: 'tratamiento',
    description: 'Unidad de filtrado mecánico para retener cabellos, sedimentos, pelusas y partículas en suspensión provenientes de la ducha, lavatorio y bidet.',
    roleInSideReA: 'Previene la colmatación de la bomba de impulsión y mantiene limpias las cañerías del circuito de aguas grises.',
    pageRef: 'VI',
    location: 'Bajo piso o caja de acceso en sector de baño (PP)',
    iconName: 'Filter'
  },
  {
    id: 'interceptor-grasas',
    name: 'Interceptor de Grasas en PP Cocina / Lavarropas',
    category: 'tratamiento',
    description: 'Cámara trampa desengrasadora para separar grasas, restos de jabón denso y aceites por diferencia de densidad.',
    roleInSideReA: 'Evita que las materias grasas y detergentes pesados degraden el tanque recuperador o generen películas y malos olores.',
    pageRef: 'VI',
    location: 'Sector cocina y lavadero antes del colector',
    iconName: 'ShieldAlert'
  },
  {
    id: 'tanque-recuperador',
    name: 'Tanque Recuperador de Aguas Grises',
    category: 'almacenamiento',
    description: 'Depósito principal estanco diseñado para almacenar las aguas grises prefiltradas antes de su reutilización.',
    roleInSideReA: 'Almacena hasta el 50% del agua usada en higiene de la vivienda para abastecer al 100% de las descargas del inodoro.',
    pageRef: 'VI',
    location: 'Área técnica exterior, sótano o entrepiso de servicios',
    iconName: 'Database'
  },
  {
    id: 'dispenser-purificador',
    name: 'Dispenser Purificador',
    category: 'tratamiento',
    description: 'Dosificador automático de agente desinfectante (solución clorada o pastillas desinfectantes) que neutraliza bacterias y previene la formación de biofilm.',
    roleInSideReA: 'Garantiza agua gris tratada, sin olores y biológicamente segura para su permanencia en la mochila del inodoro.',
    pageRef: 'VI',
    location: 'Adosado al cabezal del Tanque Recuperador',
    iconName: 'Droplet'
  },
  {
    id: 'bomba-impulsion',
    name: 'Bomba de Impulsión',
    category: 'impulsion',
    description: 'Electrobomba presurizadora de bajo consumo para elevar y presurizar el agua gris tratada hacia los puntos de consumo.',
    roleInSideReA: 'Impulsa el agua reciclada directamente hacia el depósito del inodoro con la presión y caudal requeridos para su llenado.',
    pageRef: 'VI',
    location: 'Salida del Tanque Recuperador de aguas grises',
    iconName: 'Zap'
  },
  {
    id: 'tanque-reaseguro',
    name: 'Tanque de Reaseguro',
    category: 'seguridad',
    description: 'Depósito auxiliar conectado a la red de agua potable que provee respaldo si el tanque recuperador de aguas grises se queda sin agua.',
    roleInSideReA: 'Garantiza que el inodoro nunca quede inoperativo aunque no haya habido consumo reciente en duchas o lavatorios.',
    pageRef: 'VI',
    location: 'Nivel superior junto a la red potable de alimentación',
    iconName: 'ShieldCheck'
  },
  {
    id: 'valvula-rebalse',
    name: 'Válvula de Rebalse',
    category: 'desague',
    description: 'Dispositivo mecánico de desborde seguro que deriva el exceso de agua gris a la red cloacal si el tanque recuperador supera su capacidad máxima.',
    roleInSideReA: 'Evita inundaciones o sobrepresiones en el sistema domiciliario cuando el ingreso de aguas grises supera el volumen de almacenamiento.',
    pageRef: 'VII',
    location: 'Nivel superior del Tanque Recuperador hacia Cámara de Inspección',
    iconName: 'GitBranch'
  },
  {
    id: 'camara-inspeccion',
    name: 'Cámara de Inspección',
    category: 'desague',
    description: 'Cámara troncal accesible de desagüe domiciliario donde confluyen las aguas cloacales y los rebalses antes de su vertido a la red pública.',
    roleInSideReA: 'Recibe exclusivamente las aguas negras del inodoro y los rebalses de emergencia del recuperador, manteniéndolas separadas del circuito reciclado.',
    pageRef: 'VII',
    location: 'Patio o vereda de conexión a la red cloacal urbana',
    iconName: 'Layers'
  }
];

export const ENVIRONMENTAL_BENEFITS = [
  {
    id: 'ahorro-potable',
    title: 'Ahorro del 40% de Agua Potable',
    metric: '220 L/día',
    submetric: '80.000 L / año por familia de 4 personas',
    description: 'En el sistema tradicional, el inodoro consume el 40% del agua potable pura para evacuar desechos. SiDeReA reemplaza ese volumen con aguas grises recicladas, evitando desperdiciar millones de litros de agua tratada.',
    impactCategory: 'Conservación Hídrica',
    icon: 'Droplets'
  },
  {
    id: 'alivio-cloacas',
    title: 'Descongestión de la Red Cloacal',
    metric: '-40% volumen',
    submetric: 'Menor sobrecarga en colectores urbanos',
    description: 'Al reutilizar el 50% de las aguas de higiene dentro del propio hogar antes de su vertido final, se reduce fuertemente el caudal instantáneo que satura cañerías cloacales y plantas de depuración en picos de consumo.',
    impactCategory: 'Infraestructura Urbana',
    icon: 'Activity'
  },
  {
    id: 'huella-carbono',
    title: 'Reducción de Huella de Carbono',
    metric: '~35 kg CO₂/año',
    submetric: 'Menor energía de potabilización y bombeo',
    description: 'Potabilizar y bombear agua dulce a través de redes kilométricas consume grandes cantidades de energía eléctrica y reactivos químicos. Al demandar un 40% menos agua de red, se mitiga el impacto ambiental energético.',
    impactCategory: 'Energía y Clima',
    icon: 'Leaf'
  },
  {
    id: 'resiliencia-hidrica',
    title: 'Protección de Cuencas y Acuíferos',
    metric: '100% Sostenible',
    submetric: 'Resiliencia ante sequías y cambio climático',
    description: 'Disminuye la presión extractiva sobre ríos, lagos y napas subterráneas en regiones con déficit hídrico, preservando los caudales ecológicos y garantizando la seguridad hídrica a largo plazo.',
    impactCategory: 'Biodiversidad',
    icon: 'Globe'
  }
];

export const ANIMATION_STEPS = [
  {
    id: 1,
    title: '1. Suministro de Agua Potable de Red',
    description: 'El agua potable ingresa desde la red pública al tanque de reserva general y alimenta los puntos de consumo limpio: cocina (10%), duchas, lavatorios y lavarropas (50%), además de conectar al tanque de reaseguro.',
    activeHighlight: 'potable'
  },
  {
    id: 2,
    title: '2. Uso Domiciliario y Generación de Aguas Grises',
    description: 'Los habitantes utilizan la ducha, el lavamanos, el bidet y el lavarropas. Esta agua pierde su potabilidad pero no contiene materia fecal, transformándose en "aguas grises" recuperables (50% del caudal total).',
    activeHighlight: 'consumo'
  },
  {
    id: 3,
    title: '3. Filtrado Primario e Intercepción',
    description: 'Las aguas grises drenan a través del Filtro Interceptor de Sólidos (en el baño) y el Interceptor de Grasas (en cocina/lavadero), reteniendo cabellos, fibras textiles, sedimentos y partículas grasas.',
    activeHighlight: 'filtrado'
  },
  {
    id: 4,
    title: '4. Almacenamiento y Desinfección en Tanque Recuperador',
    description: 'El agua filtrada es dirigida por el Asegurador de Caudal hacia el Tanque Recuperador de Aguas Grises, donde el Dispenser Purificador dosifica un agente desinfectante para impedir fermentaciones o malos olores.',
    activeHighlight: 'almacenamiento'
  },
  {
    id: 5,
    title: '5. Reutilización e Impulsión al Inodoro',
    description: 'La bomba de impulsión eleva el agua gris desinfectada hacia la mochila o depósito del inodoro. Cada descarga utiliza agua 100% reciclada, eliminando el gasto de agua potable.',
    activeHighlight: 'reutilizacion'
  },
  {
    id: 6,
    title: '6. Desagüe Cloacal y Válvula de Rebalse',
    description: 'El inodoro desagua como agua cloacal (línea discontinua) directo a la Cámara de Inspección y de allí a la red cloacal. Si el tanque recuperador rebalsa por exceso de uso, la válvula de rebalse deriva el sobrante seguro a la cámara.',
    activeHighlight: 'desague'
  }
];
