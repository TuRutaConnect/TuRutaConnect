# Despliegue en Vercel (PostgreSQL + Vite + Express)

## 1. Instalación de dependencias
Abre tu terminal y ejecuta esto para instalar las nuevas dependencias (Prisma y Seguridad) en tu servidor:
```bash
cd server
npm install
```

## 2. Configuración de Base de Datos
- Ve a [Vercel](https://vercel.com/) y crea un nuevo proyecto conectando tu repositorio de GitHub.
- En la pestaña **Storage** (dentro del dashboard de Vercel), crea una base de datos **Vercel Postgres** (Neon) y asóciala a tu proyecto.
- Esto generará automáticamente variables de entorno (como `DATABASE_URL`) en las *Settings* de Vercel.

## 3. Pruebas Locales antes del Despliegue
Copia tu `DATABASE_URL` (puedes verla en Vercel o Neon.tech) y crea un archivo `server/.env` así:
```env
DATABASE_URL="postgres://..."
```

Aplica el esquema y ejecuta el seed para migrar los 3 lugares del JSON:
```bash
npx prisma db push
npm run seed
```

