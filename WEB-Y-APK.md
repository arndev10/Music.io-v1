# Music.io: Web, escritorio y celular

## Cómo usarla en cada dispositivo

| Dónde | Cómo |
|------|------|
| **Celular** | PWA (añadir a inicio) o APK instalado |
| **PC / escritorio** | Abrir la misma URL en Chrome o Edge |
| **Tablet** | Igual que celular: PWA o navegador |

Un solo proyecto sirve para todo. No necesitas app de escritorio aparte.

---

## Opción 1: PWA en el celular (sin APK)

1. **Publica la app en la web** (Vercel, Netlify, etc.):
   ```bash
   npm run build
   ```
   Sube la carpeta `dist/` a tu hosting.

2. En el **celular**, abre la URL de tu app (ej. `https://music-io.vercel.app`).

3. En **Chrome (Android):** menú (⋮) → **“Añadir a la pantalla de inicio”** / **“Instalar la aplicación”**.

4. En **Safari (iPhone):** botón compartir → **“Añadir a la pantalla de inicio”**.

La app se abre a pantalla completa, sin barra del navegador, como una app instalada. No necesitas APK ni App Store.

---

## Opción 2: APK para Android (app instalable)

Si quieres un archivo `.apk` para instalar (o publicar), usa **Capacitor** para empaquetar la web en una app Android.

### Requisitos

- **Node** (ya lo tienes).
- **Android Studio** (para generar el APK): [developer.android.com/studio](https://developer.android.com/studio).

### Pasos

1. **Instalar Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init "Music.io" "com.musicio.app"
   ```

2. **Añadir la plataforma Android:**
   ```bash
   npm install @capacitor/android
   npx cap add android
   ```

3. **Generar la web y sincronizar:**
   ```bash
   npm run build
   npx cap sync android
   ```

4. **Abrir en Android Studio y construir el APK:**
   ```bash
   npx cap open android
   ```
   En Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**. El `.apk` queda en `android/app/build/outputs/apk/`.

5. **Instalar el APK en el celular:** copia el archivo al móvil e instálalo (activa “Orígenes desconocidos” si Android lo pide).

---

## Resumen

- **Uso normal:** Web en PC + PWA en el celular (añadir a inicio). Sin APK.
- **Si quieres APK:** Sigue la opción 2 con Capacitor y Android Studio.
- **Escritorio:** No hace falta app aparte; la misma URL en el navegador es suficiente.
