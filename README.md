# Nattitor — portafolio

Soy Freddy Guerra, desarrollador web en Merlo, Buenos Aires. Acá comparto mis proyectos, su código y lo que estoy construyendo.

[Ver el portafolio](https://nattitor-portfolio.vercel.app) · [Mi GitHub](https://github.com/Nattitor)

Está hecho con Next.js, React, TypeScript y Tailwind CSS. Se puede ver en español e inglés y filtrar los proyectos por estado.

## Proyectos

- [Nattitor Analytics Dashboard](https://github.com/Nattitor/b2b-dashboard): un panel de métricas con Supabase y Recharts.
- [Vellura](https://github.com/Nattitor/Vellura): un espacio para preparar cartas de presentación y pitches a partir del CV, guardar documentos y exportarlos a PDF. Para usar la aplicación hay que iniciar sesión.
- **Miru**: todavía en desarrollo. Voy a compartir el enlace cuando esté listo.

La portada de Vellura usa [el logo del propio proyecto](https://github.com/Nattitor/Vellura/blob/c965328bffa742b108ad3880cc1d32db523ac272/components/ui/vellura-logo.tsx), no una captura de su interfaz.

## Correrlo en local

Necesitás Node.js 22 (desde la versión 22.13) o 24 en adelante, y npm.

```sh
npm ci
npm run dev
```

Después, abrí http://localhost:3000. No hace falta configurar variables de entorno ni conectar una base de datos. Las fuentes se descargan durante el build con `next/font` y después se sirven desde el sitio.

Para probar el build de producción:

```sh
npm run build
npm run start
```

## Comprobaciones

```sh
npx playwright install chromium
npm run check
```

Esto ejecuta ESLint, la comprobación de tipos, el build y las pruebas de Playwright. Las pruebas usan el puerto 3001, así que tiene que estar libre.

Se revisan los idiomas, filtros, enlaces, copiado del correo, navegación con teclado y distintos tamaños de pantalla. También hay comprobaciones de accesibilidad con axe y de las cabeceras de seguridad. El portapapeles se simula: las pruebas no cambian lo que tengas copiado.

Para revisar las dependencias, podés ejecutar `npm audit`.

## Cambiar el contenido

Los proyectos, enlaces y tecnologías están en [portfolioData.ts](<src/constants/portfolioData.ts>). Los textos se editan en los diccionarios de [español](<src/locales/es.json>) e [inglés](<src/locales/en.json>).

El sitio abre en español si no hay una preferencia guardada. Al cambiar de idioma, lo recuerda con una cookie y mantiene el filtro de proyectos que hayas elegido.

## Despliegue

Se puede desplegar en Vercel o en un servidor con soporte para Next.js. Necesita renderizado en el servidor para resolver el idioma y generar el nonce de la CSP; no está configurado como exportación estática.

Si cambiás el dominio, actualizá `profile.url` en [portfolioData.ts](<src/constants/portfolioData.ts>): de ahí salen la URL canónica, robots y sitemap. Las cabeceras de seguridad están en [next.config.ts](<next.config.ts>) y [proxy.ts](<src/proxy.ts>).

© Freddy Guerra. Todos los derechos reservados.
