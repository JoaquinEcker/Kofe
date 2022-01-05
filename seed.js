const { Users, Products } = require("./api/models");
const S = require("sequelize");

const fakeUsers = [
  {
    name: "Lucas Maraz",
    email: "lucas@gmail.com",
    password: "123456",
  },
  {
    name: "Joaquin Ecker",
    email: "joaco@gmail.com",
    password: "123456",
  },
  {
    name: "Lautaro Torres",
    email: "lauta@gmail.com",
    password: "123456",
  },
  {
    name: "SuperAdmin",
    email: "super@admin.com",
    password: "super123",
    role: "superAdmin",
  },
  {
    name: "Admin",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin",
  },
];

const fakeProducts = [
  //------------------------------Cafeteras------------------------------
  {
    title: "Dolce Gusto Piccolo XS",
    description:
      "La Piccolo XS, supercompacta y funcional, se adapta a cualquier espacio para que disfrutes una amplia gama de variedades de cafés, lattes, chocolates y tés. Y gracias a su sistema de selección manual, siempre tendrás el control.",
    imgUrl:
      "https://http2.mlstatic.com/D_NQ_NP_2X_948937-MLA46335706729_062021-F.webp",
    price: 15900,
    tag: "Cafetera",
  },

  {
    title: "Dolce Gusto Genio S",
    description:
      "Con la Genio S solo tenés que seleccionar el tamaño del café, presionar un botón y disfrutar de una deliciosa gama de bebidas con calidad de cafetería. Su diseño perfilado le permite encajar en cualquier cocina",
    imgUrl:
      "https://www.casanissei.com/media/catalog/product/cache/ef70040224a801a7e53890035f03a841/6/0/600__600__1003b6-digital-genio_s_basic_white_mlx__1_.jpg",
    price: 22999,
    tag: "Cafetera",
  },

  {
    title: "Dolce Gusto Genio S Plus",
    description:
      "Nuestra Genio S Plus no solo es elegante y moderna. Te permite preparar con facilidad una amplia variedad de bebidas adaptada por completo a tus gustos y con calidad de cafetería. Disponible en dos colores.",
    imgUrl: "https://m.media-amazon.com/images/I/41YK-DacsxL.jpg",
    price: 24999,
    tag: "Cafetera",
  },

  {
    title: "Nespresso Essenza Plus Black",
    description:
      "Nespresso Essenza Plus, que se adapta a cualquier tipo cocina, siempre estará ahí cuando lo necesites. Ya sea para un café espresso, un lungo, un americano o incluso un té con la opción de agua caliente. Está aquí para vos y para cualquier otra persona a la que quieras agasajar.",
    imgUrl: "https://dam.delonghi.com/600x600/assets/223512",
    price: 27990,
    tag: "Cafetera",
  },

  {
    title: "Nespresso Lattissima Pro",
    description:
      "Lattissima Pro está inspirada en la calidad de las máquinas profesionales aunque es extremadamente fácil de usar gracias a su tecnología de avanzada y su intuitiva pantalla táctil en un diseño puro y robusto con terminaciones de aluminio. Disfrutá de un incomparable Capuccino o Latte Macchiato con sólo apretar un botón.",
    imgUrl:
      "https://www.manual.ar/thumbs/products/l/76879-nespresso-lattissima-pro.jpg",
    price: 89990,
    tag: "Cafetera",
  },

  {
    title: "Cabrales Caffitaly S16",
    description:
      "La S16 Caffitaly es una cafetera simple, rápida y eficiente, con su patente para el sistema de Caffitaly, que infundirá un perfecto espresso auténtico así como un café filtrado en pocos segundos.",
    imgUrl:
      "https://tienda.cabrales.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/c/a/caffitaly_s16_1_.jpg",
    price: 16000,
    tag: "Cafetera",
  },

  {
    title: "Nespresso Inissia D40",
    description:
      "La Nespresso Inissia D40 es una cafetera para cápsulas monodosis con capacidad de 700 mL. Posee un modo de uso muy sencillo e intuitivo con una potencia de 1260 W.",
    imgUrl:
      "https://pardohogar.vtexassets.com/arquivos/ids/164760/d40--1.jpg?v=637359433044170000",
    price: 22100,
    tag: "Cafetera",
  },

  {
    title: "Oster PrimaLatte",
    description:
      "Vive la experiencia de un café auténtico y delicioso que ofrece la cafetera automática de espresso Oster® PrimaLatte™. Ahora con funciones que te permiten disfrutar variedades de bebidas, desde espresso, capuccinos y lattes, hasta el uso de cápsulas de Dolce Gusto*. Todo al toque de un botón.",
    imgUrl:
      "https://osterar.vteximg.com.br/arquivos/ids/156164-700-700/BVSTEM6603B-1.jpg?v=637388930068770000/",
    price: 39999,
    tag: "Cafetera",
  },

  {
    title: "Nespresso Essenza Express",
    description:
      "Essenza combina en forma inteligente un diseño compacto y una simplicidad de uso inigualable, con una gran variedad de materiales y superficies para hacer de cada degustacion una verdadera obra de arte. Cuenta con modo ahorro de energia, regulación electrónica de la temperatura y una función automática con botones iluminados para la fácil propagación de la cantidad de café deseada (Espresso o Lungo)",
    imgUrl:
      "https://ddz5v9n0a16cg.cloudfront.net/webapp_webp/images/fotos/b/0000025000/14003_2.webp",
    price: 14999,
    tag: "Cafetera",
  },

  //---------------------------------------Capsulas------------------------------------------------------

  {
    title: "Nespresso - Cape Town Envivo Lungo",
    description:
      "Cape Town Lungo refleja esa historia con su potente blend de Arábica indio y Robusta. El Robusta mexicano de tueste medio aporta un cuerpo completo, mientras que los Arábicas indios tostados oscuros aportan una nota amarga y potente con un aroma amaderado característico de la India.",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSEWxVvLojKRFB10BCxUNmpKOgaaYNFXfP025deZ0YH0_g0mYgwUEiH32YsQFvDtnTAyAoEpO4Ojb0MqZUIMgwpApC6uLwfmw",
    price: 83,
    tag: "Capsulas",
  },

  {
    title: "Nespresso - Volluto Decaffeinato",
    description:
      "Volluto Decaffeinato es un café puro Arábica de América del Sur ligeramente tostado revela dulces notas de galleta realzadas por un punto de acidez y una nota afrutada.",
    imgUrl:
      "https://simaro.co/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/N/e/Nespresso-OriginalLine-Espresso-Cpsulas-Volluto-Decaffeinato---40-Recuento_3.jpeg",
    price: 83,
    tag: "Capsulas",
  },

  {
    title: "Nespresso - Scuro",
    description:
      "Basándose en el estilo de los baristas de Melbourne –maestros en los sabores intensos, aunque perfectamente balanceados – denota variedades arábicas de cafés de Colombia y Etiopía tostadas por separado con un gran contraste para crear un sabor intenso de café tostado que combina a la perfección con la leche.",
    imgUrl:
      "https://nespresso.com.pa/wp-content/uploads/2020/02/75461-Corto-300x300.jpg",
    price: 89,
    tag: "Capsulas",
  },

  {
    title: "Nespresso - Nicaragua",
    description:
      "Si el proceso de 'Black Honey' fuera el camino fácil hacia un café delicioso, todos lo harían. Pero no todos los artesanos se atreven. No es un proceso común porque requiere una supervisión meticulosa. Los granos Arábica de Master Origin Nicaragua son secados de forma meticulosa bajo el sol de Nicaragua, para absorver los azucares naturales del fruto. Un café con equilibrio perfecto, satinada textura suave y dulces notas a cereales.",
    imgUrl:
      "https://locatamos.com/wp-content/uploads/2013/06/nespresso-variations-caramelito.jpg",
    price: 91,
    tag: "Capsulas",
  },

  {
    title: "Nespresso - Ispirazione Palermo Kazaar",
    description:
      "La ciudad siciliana de Palermo es la inspiración detrás de esta poderoso blend. Sicilia una vez se puso en el camino del antiguo comercio del café y esta encrucijada de influencias africanas y árabes dio forma al perfil oscuro y pesado de la taza de café Robusta, que finalmente se convirtió en un elemento básico de la región. Ispirazione Palermo Kazaar captura la esencia de estas influencias para brindar un tueste oscuro intenso del sur que resalta el carácter salvaje y especiado de este blend.",
    imgUrl:
      "https://nespresso.com.pa/wp-content/uploads/2020/02/75721-Palermo-Kazaar.jpg",
    price: 82,
    tag: "Capsulas",
  },

  {
    title: "Nespresso - TAMUKA mu ZIMBABWE",
    description:
      "TAMUKA mu ZIMBABWE está llena de frutalidad y brillante acidez. Sentirás notas aromáticas desde arándano a frutos rojos y grosella a uva.",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/commons/img/coffees/OL/capsules/tamuka-mu-zimbabwe_L.png",
    price: 90,
    tag: "Capsulas",
  },
  {
    title: "Nespresso - Nicaragua La Cumplida Refinada",
    description:
      "Nicaragua La Cumplida Refinada es el segundo capítulo de Master Origin Nicaragua. De la misma finca enclavada en las montañas que rodean Matagalpa provienen los granos de café de la misma variedad Arábica Marsellesa.Pero hicimos algo completamente nuevo con este grano. Desarrollamos un proceso de poscosecha único utilizando fermentación natural para crear un sabor a frutos rojos muy diferente.Es un proceso natural, pero aún requiere habilidad para controlar los diversos elementos. Con un ojo atento en la cereza de café cosechada durante la fermentación, los maestros artesanos de La Cumplida ajustaron el tiempo y la temperatura para descubrir solo las mejores notas de sabor.",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/connoisseurship/capsule/ol/cumplida_L.png",
    price: 94,
    tag: "Capsulas",
  },
  {
    title: "Buenos Aires Lungo",
    description:
      "El carácter dulce y suavemente tostado de nuestro Lungo es propicio para hacer exactamente eso. Elaborado con un Arábica colombiano lavado, amado por su delicadeza, y un Robusta ligeramente tostado de Uganda, este blend seduce con sus notas a cereales malteados y a pochoclo dulce.",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/pdp/capsules/buenos-aires_L.png",
    price: 86,
    tag: "Capsulas",
  },
  {
    title: "Stockholm Fortissio Lungo",
    description:
      "Carácter salado y maltoso distintivo que desde entonces ha capturado corazones y paladares. Suecos. Hoy, rendimos homenaje a esta historia y recreamos el sabor y el cuerpo distintivos de este café,",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/pdp/capsules/stockholm_L.png",
    price: 86,
    tag: "Capsulas",
  },
  {
    title: "Vanilla Éclair",
    description:
      "Sabor suave y sus notas a cereales malteados. El sabor a vainilla aporta una capa aterciopelada a esta café Nespresso aromatizado. Probalo como Cappuccino y degustá sus notas dulces de almendra que afloran a través de su delicado sabor a crema.",
    imgUrl:
      "https://www.nespresso.com/shared_res/mos/free_html/int/barista-flavoured/coffee-pdp/img/vanilla-eclair/capsule_vanilla-Eclair_OL_L.png",
    price: 98,
    tag: "Capsulas",
  },
  {
    title: "Caramel Crème Brulee",
    description:
      "El cálido sabor del caramelo suaviza las notas tostadas de nuestro espresso más equilibrado y suave, dejándonos una sensación exquisita de DULZURA.",
    imgUrl:
      "https://www.nespresso.com/shared_res/mos/free_html/int/barista-flavoured/coffee-pdp/img/caramel-brulee/capsule_caramel-Brulee_OL_L.png",
    price: 85,
    tag: "Capsulas",
  },
  {
    title: "Cocoa Truffle",
    description:
      "El sabor a cacao negro se une a las notas a cereales malteados del Espresso base del BARISTA CREATIONS Cocoa Truffle.",
    imgUrl:
      "https://www.nespresso.com/shared_res/mos/free_html/int/barista-flavoured/coffee-pdp/img/cocoa-truffe/capsule_cocoa_OL_L.png",
    price: "98",
    tag: "Capsulas",
  },
  {
    title: "Ispirazione Ristretto Italiano Decaffeinato",
    description:
      "Audazmente tostado pero equilibrado por suaves notas a cacao. Podés captar algunas de las sutiles notas de acidez y frutales que hacen que esta cápsula Nespresso Decaffeinato sea tan misteriosamente compleja. Es un perfil digno de un embajador: un café que explica la pasión de los italianos por el café y tiene sentido por qué está arraigado en la vida cotidiana. Extraído del clásico de 25 ml, pronto verás cuán acertados son los italianos.",
    imgUrl:
      "https://www.nespresso.com/ecom/medias/sys_master/public/14310845710366/RistrettoDeca-XL.png",
    price: 98,
    tag: "Capsulas",
  },
  {
    title: "Shanghai Lungo",
    description:
      "World Explorations Shanghai Lungo es un blend suave y frutal de Arábicas de cuatro orígenes distintos que representan el variado gusto de una ciudad moderna como Shanghai.",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/pdp/capsules/shanghai_L.png",
    price: 86,
    tag: "Capsulas",
  },
  {
    title: "Ethiopia",
    description:
      "El proceso natural tradicional agrega un sabor único, rico en sabor e increíblemente aromático. En Ethiopia con Arábica procesada en seco, podrás capturar cualquier cosa, desde el aroma cálido de la fruta madura hasta delicadas notas de azahar.",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/connoisseurship/capsule/ol/ethiopia_L.png",
    price: 94,
    tag: "Capsulas",
  },
  {
    title: "Volluto Decaffeinato",
    description:
      "Volluto Decaffeinato es un café puro Arábica de América del Sur ligeramente tostado revela dulces notas de galleta realzadas por un punto de acidez y una nota afrutada",
    imgUrl:
      "https://www.nespresso.com/ecom/medias/sys_master/public/14281158131742/Volluto-XL.png",
    price: 86,
    tag: "Capsulas",
  },
  {
    title: "Scuro",
    description:
      "Basándonos en el estilo de los baristas de Melbourne –maestros en los sabores intensos, aunque perfectamente balanceados – elegimos variedades arábicas de cafés de Colombia y Etiopía y las tostamos por separado con un gran contraste para crear un sabor intenso de café tostado que combina a la perfección con la leche.",
    imgUrl:
      "https://www.nespresso.com/shared_res/nc2/pdp_bg/barista/scuro-capsule.png",
    price: 90,
    tag: "Capsulas",
  },
  {
    title: "Cape Town Envivo Lungo",
    description:
      "Cape Town Envivo Lungo muestra vivaces notas especiadas y aromáticamente amaderadas con una intensa intensidad proveniente de sus poderosos granos de Robusta",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/pdp/capsules/capetown_L.png",
    price: 86,
    tag: "Capsulas",
  },
  {
    title: "Colombia",
    description:
      "Los granos arábica de nuestro Master Origin Colombia se dejan madurar durante mucho más tiempo en las ramas y luego se recogen de forma individual justo el día en el que están perfectamente listos. Un peculiar café de cosecha tardía con potentes notas avinadas y a frutos rojos.",
    imgUrl:
      "https://www.nespresso.com/ecom/medias/sys_master/public/14310528417822/Colombia-XL.png",
    price: 94,
    tag: "Capsulas",
  },
  {
    title: "Vienna Linizio Lungo",
    description:
      "Sorprendentemente redondeado y suave, este café cuenta con notas malteadas y aromáticas que brillan a través de este blend.",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/pdp/capsules/vienna_L.png",
    price: "86",
    tag: "Capsulas",
  },
  {
    title: "Ispirazione Napoli",
    description:
      "Desde las calles de Nápoles, el ritual local de café, profundamente arraigado en su comunidad, inspiró nuestro método de tueste oscuro, que desarrolló, magistralmente, el café en un grado intenso. Realzado con Robusta, el resultado es una taza de café Nespresso aterciopelada y cremosa con un cuerpo extremadamente robusto y un retrogusto agradable y amargo. Un homenaje a la capacidad de tueste de la capital italiana del café.",
    imgUrl:
      "https://www.nespresso.com/ecom/medias/sys_master/public/14310738788382/Napoli-XL.png",
    price: 82,
    tag: "Capsulas",
  },

  {
    title: "Capriccio",
    description:
      "Una nota de cereales característica equilibrada por una ligera acidez",
    imgUrl:
      "https://www.nespresso.com/ecom/medias/sys_master/public/14281157640222/Capriccio-XL.png",
    price: 82,
    tag: "Capsulas",
  },
  {
    title: "Ispirazione Roma",
    description:
      "Desde los días de la antigua Roma, una gran cantidad de culturas pasaron por esta metrópoli. Las diferentes civilizaciones se elevan hasta nuestros días cuando la Roma moderna agrega su capa de elegancia a la rica historia de la ciudad. Ispirazione Roma también es bellamente complejo. Existe un sutil equilibrio entre la fuerza del tueste, las notas a cereales y la delicadeza de la acidez y los aromas elegantes.",
    imgUrl:
      "https://www.nespresso.com/ecom/medias/sys_master/public/14318837432350/rOMA-XL.png",
    price: 82,
    tag: "Capsulas",
  },
  {
    title: "India",
    description:
      "Master Origin India adquiere sus aromas intensos, amaderados y especiados del Robusta monzónico, exclusivos de la costa suroeste de la India, mezclado con granos Arábica de la India. Estos son expuestos a los húmedos vientos monzónicos y al implacable calor de la India, para cultivar un carácter robusto y potente. Preparate para una taza de café intensa y aromática.",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/connoisseurship/capsule/ol/india_L.png",
    price: 94,
    tag: "Capsulas",
  },
  {
    title: "Indonesia",
    description:
      "Master Origin Indonesia es elaborado en la nublada selva del norte de Sumatra por caficultores que han perfeccionado el arte de descascarado en húmedo. Este método distintivo y caracteristico de la zona, por su clima humedo, crea un sabor inconfundiblemente exótico, con un cuerpo rico y aterciopelado, y un salvaje sabor aromático.",
    imgUrl:
      "https://www.nespresso.com/shared_res/agility/n-components/connoisseurship/capsule/ol/indonesia_L.png",
    price: 94,
    tag: "Capsulas",
  },

  //---------------------------------------Accesorios------------------------------------------------------

  {
    title: "Taza ORIGIN espresso",
    description:
      "Cada taza está hecha de porcelana de doble pared. Diseñado por India Mahdavi, su forma está inspirada en el grano de café, con un exterior blanco mate y un interior de color barnizado. Dimensiones (Altura x Diámetro): 4.8 cm x 6.53 cm",
    imgUrl:
      "https://http2.mlstatic.com/D_NQ_NP_806750-MLA32495200287_102019-O.webp",
    price: 1800,
    tag: "Accesorios",
  },
  {
    title: "Tazas VIEW Espresso",
    description:
      "Set de 2 tazas Espresso de vidrio templado (Capacidad: 80 ml) con acabado cromado y brilloso.",
    imgUrl:
      "https://www.amara.com/static/uploads/images-2/products/huge/194831/double-walled-coffee-tea-glass-set-of-2-400ml-564704.jpg",
    price: 3300,
    tag: "Accesorios",
  },
  {
    title: "Jarro Submarino",
    description:
      "jarro para que disfrutes de los mejores submarinos o lo que deses. El vidrio es liso y de una resistencia óptima.",
    imgUrl:
      "https://www.amara.com/static/uploads/images-2/products/huge/148310/tourron-french-breakfast-cup-orange-265388.jpg",
    price: 1500,
    tag: "Accesorios",
  },
  {
    title: "Set 3 Jarritos con Manija 220ml",
    description:
      "El juego de 3 es un jarro que puede usar como equipo adicional para sus bebidas calientes en su hogar. Este vidrio está hecho de material de alta calidad que es más fuerte y duradero. Este, tiene un diseño más simple pero elegante y tiene una impresión lujosa.",
    imgUrl:
      "https://http2.mlstatic.com/D_NQ_NP_2X_970499-MLA45224925077_032021-F.webp",
    price: 1400,
    tag: "Accesorios",
  },
  {
    title: "2 Tazas doble vidrio 200 Ml",
    description:
      "Esta taza de café de doble capa tiene un diseño, que previene el aislamiento térmico de manera eficiente, haciendola más segura y conveniente para beber té caliente. Sensación estética brillante y translúcida, le permite disfrutar de una bebida agradable. Puede soportar temperaturas de 20 a 150 grados.",
    imgUrl:
      "https://http2.mlstatic.com/D_NQ_NP_2X_962534-MLA47206439880_082021-F.webp",
    price: 2600,
    tag: "Accesorios",
  },
  {
    title: "3 Tazas chicas con plato 80 Ml",
    description:
      "Taza de vidrio templado resistente. Este diseño es ideal para una cafetera con capsulas. Muestra el compromiso con el sabor del café y trae 3 platos.",
    imgUrl:
      "https://http2.mlstatic.com/D_NQ_NP_2X_802589-MLA42592067038_072020-F.webp",
    price: 1600,
    tag: "Accesorios",
  },
  {
    title: "Taza chica Barista Verde Italiana 80cc",
    description:
      "Excelente capacidad para exaltar el aroma del café gracias al fondo diseñado para este fin, alta resistencia al choque térmico del lavavajillas. Máxima resistencia a arañazos y golpes",
    imgUrl:
      "https://www.amara.com/static/uploads/images-2/products/x/huge/1124263/sketch-mug-charcoal-116582.jpg",
    price: 4500,
    tag: "Accesorios",
  },
  {
    title: "Taza Cafe Pocillo",
    description:
      "Te presentamos este pocillo de vidrio para el café. Ideales para darle ese color que le falta a tu mesa",
    imgUrl:
      "https://m.media-amazon.com/images/I/817cN1aqNxL._AC_SL1500_.jpg",
    price: 2200,
    tag: "Accesorios",
  },
  {
    title: "Tazas pocillo mini",
    description:
      "El set de tazas presentan una excelente cantidad, hechas con vidrio de doble capa estan diseñadas para disfrutar un cafe expresso",
    imgUrl:
      "https://m.media-amazon.com/images/I/613vcDWG9vS._AC_SL1500_.jpg",
    price: 3500,
    tag: "Accesorios",
  },
  {
    title: "Bolsa reciclable",
    description:
      "Agregá la Bolsa de Reciclaje a tu carrito y ayudanos a recolectar y reciclar tus cápsulas de café Nespresso usadas. La bolsa puede almacenar hasta 100 cápsulas aproximdamente.",
    imgUrl:
      "https://sc04.alicdn.com/kf/HTB1otjwXOYrK1Rjy0Fdq6ACvVXaE.jpg",
    price: 1,
    tag: "Accesorios",
  },
];

const seed = async () => {
  await Users.bulkCreate(fakeUsers);
  await Products.bulkCreate(fakeProducts);
  return process.exit();
};

seed();
