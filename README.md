# 🛏️ Home Market — Catálogo Digital

Catálogo digital premium para Home Market. Construido en HTML, CSS y JavaScript puro. Sin frameworks, sin backend, 100% estático.

---

## 📁 Estructura de archivos

```
home-market-catalogo/
│
├── index.html          ← Página principal
├── style.css           ← Todos los estilos
├── script.js           ← Toda la lógica
├── productos.json      ← ⭐ Aquí editas los productos
├── README.md           ← Este archivo
│
├── img/
│   ├── hero.jpg        ← Imagen del banner principal
│   ├── logo.png        ← Logo (opcional)
│   └── placeholder.jpg ← Imagen de respaldo
│
└── productos/          ← Fotos de cada producto
    ├── cama-sealy.jpg
    ├── cabecera-milano.jpg
    └── ...
```

---

## 🖥️ Cómo abrirlo en Visual Studio Code

1. Abre **Visual Studio Code**
2. Menú → **File → Open Folder**
3. Selecciona la carpeta `home-market-catalogo`
4. Instala la extensión **Live Server** (si no la tienes):
   - Panel izquierdo → 🧩 Extensiones
   - Busca: `Live Server` de Ritwick Dey
   - Clic en **Install**

---

## ▶️ Cómo probarlo con Live Server

1. Con la carpeta abierta en VS Code
2. Clic derecho sobre `index.html`
3. Selecciona **"Open with Live Server"**
4. Se abre automáticamente en tu navegador
5. ¡Listo! Cualquier cambio que guardes se actualiza en vivo

> ⚠️ **Importante:** Debes usar Live Server para que el fetch de `productos.json` funcione. Si abres el HTML directo desde el explorador de archivos, el catálogo mostrará productos de demostración automáticamente.

---

## 🖼️ Cómo agregar imágenes

1. Prepara tu foto (recomendado: **800×600 px**, formato JPG o WebP)
2. Cópiala a la carpeta **`/productos/`**
3. Usa ese nombre exacto en `productos.json`

```
📂 productos/
   mi-nueva-cama.jpg   ← Copiaste la foto aquí
```

---

## ➕ Cómo agregar productos al JSON

Abre `productos.json` y agrega un nuevo objeto al final del array:

```json
{
  "nombre": "Nombre del producto",
  "categoria": "Camas",
  "descripcion": "Descripción corta y emocional del producto.",
  "medidas": "Queen y King",
  "precio": "Desde L 15,000",
  "promo": "Nuevo",
  "imagen": "productos/mi-nueva-cama.jpg"
}
```

### Categorías válidas:
- `Camas`
- `Cabeceras`
- `Closets`
- `Muebles`
- `Almohadas`
- `Accesorios`
- `Línea Hotelera`

### Etiquetas de promo válidas:
| Texto          | Color     |
|----------------|-----------|
| `40% OFF`      | Rojo      |
| `Nuevo`        | Azul      |
| `Disponible`   | Verde     |
| `Últimas unidades` | Madera |
| `Viral`        | Morado    |
| `Más vendida`  | Gris azul |
| `""` (vacío)   | Sin badge |

> Si dejas `"promo": ""` no aparece ninguna etiqueta.

---

## 🌐 Cómo subir a GitHub

### Paso 1 — Crear repositorio
1. Ve a [github.com](https://github.com) → **New repository**
2. Nombre: `home-market-catalogo`
3. Marca **Public**
4. Clic en **Create repository**

### Paso 2 — Subir los archivos
**Opción A — Desde la web de GitHub (más fácil):**
1. Arrastra toda la carpeta al repositorio
2. Clic en **Commit changes**

**Opción B — Desde la terminal:**
```bash
cd home-market-catalogo
git init
git add .
git commit -m "Catálogo Home Market inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/home-market-catalogo.git
git push -u origin main
```

---

## 🚀 Cómo activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Clic en **Settings** (pestaña de arriba)
3. Panel izquierdo → **Pages**
4. En "Branch" selecciona: **main** → **/ (root)**
5. Clic en **Save**
6. Espera 1-2 minutos

Tu catálogo estará disponible en:
```
https://TU_USUARIO.github.io/home-market-catalogo/
```

---

## 📲 Cambiar número de WhatsApp

Abre `script.js` y en la línea:
```js
const WA_NUMERO = '50494700698';
```
Cambia el número. El código de Honduras es `504`.

---

## 🎨 Cambiar colores

Abre `style.css` y edita las variables al inicio:
```css
:root {
  --azul:     #123D4A;  ← Color principal
  --madera:   #C9A77B;  ← Acentos dorados
  --rojo:     #D94132;  ← Promos/descuentos
  --bg:       #F4EFE8;  ← Fondo beige
}
```

---

## 🖼️ Cambiar imagen del hero

Reemplaza el archivo `img/hero.jpg` con tu propia foto de dormitorio premium. Dimensiones recomendadas: **1920×1080 px**.

---

## ✅ Checklist antes de publicar

- [ ] Imágenes de productos agregadas a `/productos/`
- [ ] `productos.json` actualizado con todos los productos
- [ ] Imagen hero en `img/hero.jpg`
- [ ] Número de WhatsApp correcto en `script.js`
- [ ] Probado en móvil (usa DevTools → responsive)
- [ ] Subido a GitHub
- [ ] GitHub Pages activado

---

*Home Market — Dormí mejor. Viví mejor.* 🛏️
