# Tamagui Component Guide

Una guía/almacén de componentes reutilizables construida con Tamagui, Next.js y Expo.

## 🚀 Características

- ✅ **Componentes de Inputs** variados (texto, archivo, select, multi-select, con filtro)
- ✅ **Tabla Admin** configurable por parámetros
- ✅ **Página de Pagos** con diferentes métodos (maquetación)
- ✅ **Auth Simple (DEMO)** sin backend (email y contraseña, guardado en `localStorage`)
- ✅ **Cross-platform** (Web con Next.js y Mobile con Expo)

## 🛠️ Configuración Rápida

### 1. Instalar Dependencias

```bash
yarn install
```

### 2. Iniciar la Aplicación

```bash
yarn web
```

La aplicación estará disponible en `http://localhost:3000`

## 📱 Rutas Disponibles

- `/` - Página principal con navegación
- `/showcase` - Guía de componentes de inputs
- `/admin-demo` - Demo de tabla admin configurable
- `/payments` - Métodos de pago (maquetación)
- `/auth/sign-in` - Login simple
- `/auth/sign-up` - Registro simple

## 🎨 Componentes Disponibles

### Inputs

- `TextInput` - Input de texto con iconos opcionales
- `FileInput` - Input de archivo (único o múltiple)
- `SelectInput` - Select básico
- `MultiSelectInput` - Selección múltiple
- `SelectWithFilter` - Select con búsqueda/filtro

### Admin

- `AdminTable` - Tabla configurable con búsqueda, ordenamiento y paginación

## 🔐 Autenticación

La autenticación actual es **DEMO**: email y contraseña guardados en `localStorage` (sin servidor, sin BD). Es intencional para que no te bloquee.

## 📝 Comandos Útiles

```bash
# Desarrollo
yarn web           # Iniciar Next.js
yarn native        # Iniciar Expo
```

## 🐘 PostgreSQL en Docker (opcional)

Si quieres levantar un Postgres local (sin usarlo aún):

```bash
yarn db:start
yarn db:logs
yarn db:stop
```

Por defecto expone el puerto **5433** en tu máquina (para no chocar con un Postgres local en 5432). Puedes cambiarlo con `POSTGRES_PORT`.

## Nota

Este proyecto está simplificado y no incluye BD/auth real.

## 📄 Licencia

MIT
