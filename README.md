# 🌮 Taquería El Mariachi - App de Restaurante Mexicano
### Segundo Desafío Práctico (15%) - Diseño y Programación de Software Multiplataforma
**Universidad Don Bosco (UDB)**

---

## 📹 Enlace del Video de Defensa

> [!IMPORTANT]
> **URL del Video de la Defensa (Máximo 15 minutos):**  
> 🔗 **[Haz clic aquí para ver el video de defensa en Google Drive](https://drive.google.com/file/d/1h595NIy-swRY0RHdKyGo86AjcsY_ua8a/view?usp=sharing)**

---

## 📋 Descripción

App móvil en **React Native + Expo Router + TypeScript** para un restaurante mexicano. Permite explorar un catálogo de 10 alimentos y 5 bebidas, armar una orden con cálculo automático de **IVA (13%)**, confirmar pedidos y consultar un historial persistente en **AsyncStorage**.

---

## 🚀 Tecnologías

- **React Native** con **Expo SDK 57**
- **Expo Router** (enrutamiento basado en archivos `app/`)
- **TypeScript** (`.tsx` / `.ts`)
- **AsyncStorage** para persistencia local
- **Ionicons** para iconografía
- **React Context API** (AuthContext, OrderContext)

---

## 📁 Estructura del Proyecto

```
app/
├── _layout.tsx            ← Stack Navigator raíz y Providers
├── index.tsx              ← Pantalla Login (/)
├── (tabs)/
│   ├── _layout.tsx        ← Tab Navigator inferior
│   ├── menu.tsx           ← Catálogo de Alimentos y Bebidas
│   ├── orden.tsx          ← Carrito con IVA 13% y confirmación
│   └── historial.tsx      ← Historial de compras en AsyncStorage
src/
├── types/
│   └── index.ts           ← Interfaces TypeScript (Producto, Orden, etc.)
├── data/
│   └── menuData.ts        ← 10 alimentos y 5 bebidas tipados
├── context/
│   ├── AuthContext.tsx     ← Autenticación con credenciales locales
│   └── OrderContext.tsx    ← Carrito, IVA 13% y AsyncStorage
├── components/
│   ├── AlertBanner.tsx     ← Alertas visuales en pantalla
│   ├── ProductCard.tsx     ← Tarjeta de producto con selector 1-20
│   ├── OrderItemCard.tsx   ← Ítem de orden con subtotales
│   └── HeaderBar.tsx       ← Barra superior con logout
└── styles/
    └── theme.ts            ← Paleta de colores mexicana
```

---

## 🔑 Credenciales de Acceso

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin` | `123` | Administrador |
| `cliente` | `123` | Cliente Frecuente |
| `udb` | `2026` | Estudiante UDB |

---

## 💻 Instrucciones de Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npx expo start
```

- **Teléfono:** Escanear QR con la app **Expo Go**.
- **Emulador Android:** Presionar tecla `a`.
- **Navegador web:** Presionar tecla `w`.

---

## ✅ Validaciones Implementadas

1. No permite campos vacíos en login ni cantidades.
2. Precios numéricos reales mayores a $0 (no editables).
3. Cantidades: enteros positivos de 1 a 20 unidades.
4. No se puede agregar con 0 unidades.
5. No se puede confirmar orden vacía.
6. Máximo 20 unidades por producto.
7. Errores y alertas visibles en pantalla (no solo consola).
8. Diálogo de confirmación: "¿Confirmar orden por $X.XX?"
9. Al confirmar: guarda en AsyncStorage y limpia carrito.
