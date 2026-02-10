# Cómo probar la versión móvil de Music.io

No necesitas instalar nada extra. Tienes dos formas:

---

## Opción 1: Simular móvil en el navegador (sin celular)

1. Arranca la app:
   ```bash
   npm run dev
   ```
2. Abre en **Chrome** o **Edge**: http://localhost:5173/
3. Abre las herramientas de desarrollador:
   - **Chrome/Edge:** `F12` o `Ctrl+Shift+I`
   - **Atajo directo:** `Ctrl+Shift+M` (modo dispositivo)
4. Activa el **modo dispositivo** (icono de móvil/tablet en la barra de DevTools).
5. Elige un dispositivo (ej. iPhone 14 Pro, Pixel 7) o pon ancho ~390 px.
6. Recarga la página (`F5`) y prueba la app como en un móvil.

**Ventaja:** No hace falta celular ni Wi‑Fi. Sirve para ver layout y toques.

---

## Opción 2: Probar en tu celular (misma red Wi‑Fi)

1. Conecta el celular y la PC al **mismo Wi‑Fi**.
2. Arranca la app exponiendo la red local:
   ```bash
   npm run dev:mobile
   ```
3. En la terminal verás algo como:
   ```
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.1.XXX:5173/
   ```
4. En el **celular**, abre el navegador (Chrome, Safari, etc.) y entra a la URL **Network** (ej. `http://192.168.1.XXX:5173/`).
5. Prueba la app en el móvil (notas, secuencia, escalas, piano, etc.).

**Nota:** Si el firewall de Windows pide permiso para Vite, acepta “Red privada” para que el celular pueda entrar.

---

## Resumen de comandos

| Objetivo              | Comando           |
|-----------------------|-------------------|
| Desarrollo normal     | `npm run dev`     |
| Probar en el celular  | `npm run dev:mobile` |

No hace falta instalar apps ni emuladores: solo el navegador y, si quieres, tu celular en la misma Wi‑Fi.
