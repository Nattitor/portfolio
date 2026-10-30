# Nattitor — portafolio

Portafolio de Freddy Guerra, desarrollador web en Merlo, Buenos Aires.

[Sitio publicado](https://nattitor-portfolio.vercel.app) · [GitHub](https://github.com/Nattitor)

## Desarrollo

Requiere Node.js 22 desde la versión 22.13, o Node.js 24 o posterior. Probado con Node.js 24 y npm 11.

```sh
npm ci
npm run dev
```

Abre http://localhost:3000. No necesita variables de entorno ni servicios externos para funcionar.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

El proyecto usa Next.js App Router, React, TypeScript y Tailwind CSS. Las fuentes se descargan durante el build mediante `next/font` y se sirven desde el propio sitio. ESLint 10 carga directamente las reglas de Next.js, TypeScript y React Hooks; no se usa el paquete agregado `eslint-config-next`, cuyos plugins de React, importaciones y accesibilidad aún declaran compatibilidad solo hasta ESLint 9. La accesibilidad se comprueba con axe y las pruebas de teclado indicadas abajo.

## Contenido

- [Nattitor Analytics Dashboard](https://github.com/Nattitor/b2b-dashboard): panel de métricas con Supabase y Recharts.
- [Vellura](https://github.com/Nattitor/Vellura): documentos para postulaciones a partir del CV. Su aplicación publicada requiere iniciar sesión.
- Miru: en desarrollo; todavía no se muestra un enlace público.

Los enlaces, estados y tecnologías se editan en [portfolioData.ts](<src/constants/portfolioData.ts>). Los textos están en los diccionarios [español](<src/locales/es.json>) e [inglés](<src/locales/en.json>). Las descripciones de los proyectos no sustituyen una auditoría de sus repositorios o servicios.

El idioma inicial se resuelve en el servidor con la cookie `portfolio-lang`; sin una preferencia válida se usa español. El selector conserva la preferencia durante un año y actualiza el idioma del documento, el título y la descripción. Los filtros no se reinician al cambiar de idioma.

La paleta nocturna azul/violeta, Lyra y los pequeños acentos dorados conservan la referencia a Ayabe (Admire Vega, Umamusume). La estrella fugaz recuerda «Like a Shooting Star»: aparece una sola vez, junto con una entrada breve del hero. No hay animaciones continuas ni librerías de animación; las entradas, el destello, las transiciones y el desplazamiento suave se desactivan con `prefers-reduced-motion`. La portada de Vellura es una ilustración de documentos, no una captura de la aplicación.

## Pruebas

```sh
npx playwright install chromium
npm run build
npm test
```

Playwright inicia el build de producción en el puerto 3001; debe estar libre. Se comprueban los dos idiomas, persistencia de la cookie, filtros, enlaces, copiado con sus rutas de error, cabeceras y tamaños de 320 a 1440 px. axe revisa accesibilidad en móvil y escritorio; no reemplaza una revisión manual con tecnologías de asistencia. El portapapeles se simula para comprobar éxito, fallback, errores y foco sin modificar el del equipo. Los informes y las capturas se guardan en las carpetas de resultados ignoradas por Git.

`npm run check` ejecuta lint, tipos, build y pruebas. Es necesario instalar Chromium antes de usarlo.

## Seguridad y despliegue

La política CSP usa un nonce nuevo por petición. Los scripts de producción no permiten `unsafe-inline` ni `unsafe-eval`; los atributos de estilo sí permiten estilos inline por `next/image` y el fallback del portapapeles. En desarrollo se permite `unsafe-eval` y WebSocket para las herramientas de Next.js. Las cabeceras se definen en [next.config.ts](<next.config.ts>) y [proxy.ts](<src/proxy.ts>).

La cookie de idioma es legible por JavaScript porque la modifica el selector; usa `SameSite=Lax` y `Secure` al navegar por HTTPS. No contiene información de autenticación. El sitio no incluye analítica ni formularios que almacenen datos.

Se puede desplegar como aplicación Next.js, por ejemplo en Vercel. El renderizado por petición es necesario para el idioma y la CSP; no está configurado como exportación estática. Si cambia el dominio, actualiza `profile.url` en [portfolioData.ts](<src/constants/portfolioData.ts>), usado por la URL canónica, robots y sitemap.

Antes de actualizar o publicar, ejecuta también `npm audit` y revisa los avisos aplicables. Que las pruebas pasen no garantiza ausencia de vulnerabilidades.

© Freddy Guerra. Todos los derechos reservados.
