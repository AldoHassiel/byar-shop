# Byar Shop

Plataforma de e-commerce con gestión de productos, carrito de compras, órdenes y administración.

## Tabla de Contenidos

- [Módulos](#módulos)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Contribuir](#contribuir)

## Módulos

- **Tienda Pública**: Exploración de productos, búsqueda y filtrado
- **Autenticación**: Registro e inicio de sesión
- **Cliente**: Carrito, favoritos, historial de compras, datos personales, direcciones, métodos de pago
- **Administrador**: Gestión de productos, categorías, subcategorías, marcas y órdenes

## Tecnologías

| Categoría | Tecnología |
|-----------|-----------|
| Framework | React 19.2.4 |
| Lenguaje | TypeScript ~5.9.3 |
| Build | Vite 8.0.1 |
| Estilos | TailwindCSS 4.2.2 |
| Enrutamiento | React Router 7.13.1 |
| HTTP Client | Axios 1.13.6 |
| Estado Global | React Context |
| UI Components | shadcn |
| Iconos | Lucide React 0.577.0 |
| Gráficos | Recharts 2.15.4 |
| Notificaciones | Sonner 2.0.7 |
| Linter | ESLint 9.39.4 |

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-repositorio>
cd byar-shop
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (crear `.env.local`):
```
VITE_API_URL=<url-api-backend>
```

## Estructura de Carpetas

```
src/
├── api/              # Configuración y servicios HTTP
│   ├── api.config.ts
│   ├── auth.api.ts
│   ├── productos.api.ts
│   ├── carrito.ts
│   ├── categorias.api.ts
│   ├── compras.api.ts
│   ├── direcciones.api.ts
│   ├── marcas.api.ts
│   ├── metodos-de-pago.api.ts
│   ├── mis-datos.api.ts
│   ├── mis-favoritos.api.ts
│   ├── negocio.api.ts
│   └── subcategorias.api.ts
├── components/       # Componentes reutilizables
│   ├── ui/           # Componentes UI base
│   ├── modales/      # Componentes de diálogos y modales
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── TarjetaProducto.tsx
│   ├── Paginacion.tsx
│   ├── SelectorCantidad.tsx
│   ├── SubirImagen.tsx
│   ├── SeguirViendo.tsx
│   └── Corazon.tsx
├── hooks/            # Custom hooks
│   ├── useProductos.tsx
│   ├── useCarrito.tsx
│   ├── useFavoritos.tsx
│   ├── useCompras.tsx
│   ├── useDirecciones.tsx
│   ├── useMisDatos.tsx
│   ├── useMetodosDePago.tsx
│   ├── useMarca.tsx
│   ├── useNegocio.tsx
│   ├── useCategorias.tsx
│   └── useSubcategorias.tsx
├── paginas/          # Páginas de la aplicación
│   ├── publicas/     # Acceso público
│   ├── auth/         # Login y registro
│   ├── cliente/      # Panel de cliente
│   └── admin/        # Panel administrativo
├── rutas/            # Configuración de enrutamiento
├── layouts/          # Layouts generales
├── lib/              # Utilidades y helpers
├── global/           # Store global (Zustand)
├── types/            # Definiciones TypeScript
├── assets/           # Imágenes y recursos estáticos
├── App.tsx
├── main.tsx
└── index.css
```

## Desarrollo

Iniciar servidor de desarrollo:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

## Build

Crear build de producción:
```bash
npm run build
```

## Contribuir

1. Crear rama para la feature: `git checkout -b feature/nombre-feature`
2. Realizar cambios
3. Ejecutar lint: `npm run lint`
4. Commit: `git commit -am 'Descripción de cambios'`
5. Push: `git push origin feature/nombre-feature`
6. Abrir Pull Request
