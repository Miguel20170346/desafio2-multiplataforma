import { Producto } from '../types';

export const menuData: Producto[] = [
  // ===================== 10 ALIMENTOS MEXICANOS =====================
  {
    id: 'f1',
    name: 'Tacos al Pastor (3 pzas)',
    category: 'alimentos',
    price: 5.50,
    description: 'Tortillas de maíz con carne de cerdo marinada al achiote, piña asada, cebolla y cilantro.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f2',
    name: 'Enchiladas Verdes Suizas',
    category: 'alimentos',
    price: 6.75,
    description: 'Tres enchiladas de pollo cubiertas con salsa verde cremosa, queso gratinado y crema.',
    image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f3',
    name: 'Quesadillas de Birria',
    category: 'alimentos',
    price: 7.00,
    description: 'Dos quesadillas doradas con queso Oaxaca fundido, birria de res y consomé para chopear.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f4',
    name: 'Burrito California Especial',
    category: 'alimentos',
    price: 6.50,
    description: 'Tortilla de harina rellena de carne asada, papas doradas, queso, frijoles y guacamole.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f5',
    name: 'Chilaquiles Rojos con Huevo',
    category: 'alimentos',
    price: 5.75,
    description: 'Totopos bañados en salsa roja, pollo deshebrado, crema, queso cotija y huevo estrellado.',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f6',
    name: 'Sopes Tradicionales (2 pzas)',
    category: 'alimentos',
    price: 4.80,
    description: 'Bases de maíz pellizcado con frijoles refritos, carne de res, lechuga, crema y queso.',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f7',
    name: 'Tostadas de Tinga (2 pzas)',
    category: 'alimentos',
    price: 4.50,
    description: 'Tostadas crujientes con frijoles, tinga de pechuga con cebolla caramelizada, aguacate y crema.',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f8',
    name: 'Fajitas Mixtas Norteñas',
    category: 'alimentos',
    price: 8.25,
    description: 'Tiras de carne de res y pollo con pimientos y cebolla salteados, servidas con tortillas.',
    image: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f9',
    name: 'Pozole Rojo Tradicional',
    category: 'alimentos',
    price: 6.00,
    description: 'Caldo rojo con maíz cacahuazintle, carne de cerdo, orégano, rábano picado y tostadas.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f10',
    name: 'Nachos Supremos con Carne',
    category: 'alimentos',
    price: 5.25,
    description: 'Totopos con queso cheddar fundido, carne molida especiada, pico de gallo y jalapeños.',
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=800&q=80',
  },

  // ===================== 5 BEBIDAS MEXICANAS =====================
  {
    id: 'b1',
    name: 'Agua de Horchata (500ml)',
    category: 'bebidas',
    price: 2.00,
    description: 'Receta tradicional a base de arroz con leche, canela molida, vainilla y hielo.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b2',
    name: 'Agua de Jamaica (500ml)',
    category: 'bebidas',
    price: 1.80,
    description: 'Infusión fría de flor de jamaica pura, refrescante y con toque cítrico natural.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b3',
    name: 'Jarritos de Mandarina (370ml)',
    category: 'bebidas',
    price: 2.25,
    description: 'Refresco mexicano en botella de vidrio, endulzado con azúcar de caña sabor mandarina.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b4',
    name: 'Limonada con Chía (500ml)',
    category: 'bebidas',
    price: 2.20,
    description: 'Jugo de limón criollo recién exprimido, endulzado al gusto con chía y hojas de menta.',
    image: 'https://images.unsplash.com/photo-1523371067-1ac2b210851a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b5',
    name: 'Michelada Clásica sin Alcohol',
    category: 'bebidas',
    price: 2.75,
    description: 'Vaso escarchado con sal y tajín, salsa inglesa, jugo de limón y clamato sazonado.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
  },
];

export const getProductsByCategory = (category: string): Producto[] => {
  if (!category || category === 'todos') {
    return menuData;
  }
  return menuData.filter((item) => item.category === category);
};
