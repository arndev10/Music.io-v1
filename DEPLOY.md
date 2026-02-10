# Publicar Music.io para usarla sin la PC

Para que la app funcione en el celular (y en cualquier dispositivo) **sin** ejecutar `npm run dev:mobile` en tu PC, hay que **publicarla en internet** (deploy). Después solo abres una URL desde el celular.

---

## Opción 1: Vercel (recomendada, gratis)

1. **Crea una cuenta** en [vercel.com](https://vercel.com) (con GitHub o email).

2. **Genera la app** (una vez en tu PC):
   ```bash
   cd "d:\PROYECTOS CURSOR\Music.io-v1"
   npm run build
   ```
   Se crea la carpeta `dist` con la app lista para publicar.

3. **Sube el proyecto a Vercel:**
   - Entra a [vercel.com](https://vercel.com) → **Add New** → **Project**.
   - Si tienes el proyecto en **GitHub**: conéctalo y Vercel detectará Vite. Pulsa **Deploy**.
   - Si **no** usas GitHub: instala Vercel CLI y publica desde la carpeta del proyecto:
     ```bash
     npm i -g vercel
     vercel
     ```
     Sigue las preguntas (login si pide) y al final te dará una URL.

4. **URL final:** Algo como `https://music-io-v1-xxx.vercel.app`. Esa URL la abres desde el celular (o cualquier dispositivo) y la app funciona sin tener la PC encendida.

---

## Opción 2: Netlify (gratis, sin instalar nada)

1. **Genera la app** en tu PC:
   ```bash
   cd "d:\PROYECTOS CURSOR\Music.io-v1"
   npm run build
   ```

2. Entra a [netlify.com](https://netlify.com) y crea cuenta (gratis).

3. Arrastra la carpeta **`dist`** (está dentro de tu proyecto) a la zona de **"Drag and drop your site output folder here"** en el panel de Netlify.

4. Netlify te dará una URL (ej. `https://random-name-123.netlify.app`). Esa es tu app publicada: ábrela desde el celular cuando quieras.

---

## Después de publicar

- **Celular:** Abre el navegador, escribe la URL (ej. la de Vercel o Netlify) y usa Music.io. No necesitas la PC.
- **Añadir a la pantalla de inicio:** En el celular, en Chrome → menú (⋮) → **"Añadir a la pantalla de inicio"** para que se abra como app.
- **PC:** Misma URL en Chrome o Edge.

No vuelves a depender de `npm run dev:mobile`; la app corre en los servidores de Vercel o Netlify.
