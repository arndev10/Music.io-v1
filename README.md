# Music.io

Aplicación web educativa para analizar escalas a partir de notas seleccionadas. Pensada para guitarra y teoría musical.

## Stack

- React + TypeScript
- Vite
- TailwindCSS
- Sin backend (todo local, persistencia en LocalStorage)

## Uso

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Listo para desplegar en Vercel/Netlify (salida en `dist/`).

## Funcionalidad MVP

- Selección de notas cromáticas (12 botones toggle)
- Top 3 escalas probables con % coincidencia y cobertura
- Detalle de escala: tabla grado/nota/nombre, funciones armónicas
- Círculo de quintas interactivo (click para fijar tónica)
- Panel de aprendizaje por escala
- Historial (LocalStorage, últimas 20)
- Copiar/exportar: resumen, tabla de grados, JSON, TXT, reporte
