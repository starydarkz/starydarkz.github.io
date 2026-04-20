# StaryDarkz Security Blog

Blog personal de investigación en ciberseguridad. Construido con Hugo + tema Starfield personalizado.

## Stack

- **Hugo** — generador de sitios estáticos
- **Tema Starfield** — tema custom con cielo estrellado, tipografía manuscrita (Kalam/Caveat)
- **GitHub Pages** — hosting gratuito
- **GitHub Actions** — deploy automático al hacer push

---

## Plan de implementación

### Paso 1 — Instalar Hugo

```bash
# macOS
brew install hugo

# Windows (con Chocolatey)
choco install hugo-extended

# Linux
sudo apt install hugo
# o descarga el binario desde https://github.com/gohugoio/hugo/releases
```

### Paso 2 — Clonar / inicializar el repositorio

Si ya tienes el repo en GitHub:
```bash
git clone https://github.com/StarydDarkz/starydarkz.github.io
cd starydarkz.github.io
```

Copia todos los archivos de este proyecto dentro del repositorio.

### Paso 3 — Configurar tu información

Edita `hugo.toml` y actualiza:
```toml
baseURL = "https://TU-USUARIO.github.io/"

[params]
  author   = "StaryDarkz"
  linkedin = "https://linkedin.com/in/TU-PERFIL"
  telegram = "https://t.me/TU-USUARIO"
  github   = "https://github.com/TU-USUARIO"
  htb_user = "TU-USUARIO-HTB"
  htb_rank = "Tu rango actual"
  # etc...
```

### Paso 4 — Agregar tu foto

Coloca tu foto de perfil en:
```
static/images/avatar.jpg
```

Si no la pones, se muestra el emoji 🌌 como placeholder.

### Paso 5 — Probar en local

```bash
hugo server -D
```

Abre http://localhost:1313 en el navegador.
El flag `-D` muestra posts en draft para que puedas previsualizarlos.

### Paso 6 — Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings → Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Guarda

### Paso 7 — Primer deploy

```bash
git add .
git commit -m "feat: initial blog setup"
git push origin main
```

GitHub Actions construirá y publicará el sitio automáticamente.
En ~2 minutos estará en: `https://TU-USUARIO.github.io/`

---

## Crear contenido

### Nuevo post

```bash
hugo new posts/nombre-del-post.md
```

El archivo se crea en `content/posts/nombre-del-post.md` con el front matter listo.
Edita el archivo, cambia `draft: false` cuando esté listo, y haz push.

**Front matter disponible:**
```yaml
---
title: "Título del post"
date: 2025-01-15
draft: false
description: "Descripción corta para la tarjeta"
cover: "/images/posts/nombre.png"   # opcional
categories: ["Web"]                  # Web|Malware|Red Team|CTF|Crypto|Network
tags: ["waf", "bypass", "sqli"]
readtime: "10"
featured: false                      # true = aparece en el banner principal
---
```

### Nuevo proyecto

```bash
hugo new proyectos/nombre-herramienta.md
```

**Front matter disponible:**
```yaml
---
title: "NombreHerramienta"
description: "Qué hace en una línea"
github: "https://github.com/StarydDarkz/NombreHerramienta"
language: "Python"    # Python|Go|Rust|C|JavaScript|Bash
stars: "142"
status: "active"      # active|wip|archived
tags: ["scanner", "web"]
---
```

### Shortcodes en posts

**Video de YouTube:**
```
{{< youtube id="dQw4w9WgXcQ" >}}
```

**Cajas de alerta:**
```
{{< alert type="info" title="Nota" >}}
Contenido de la nota aquí.
{{< /alert >}}

{{< alert type="warning" >}}
Advertencia sin título.
{{< /alert >}}

{{< alert type="danger" title="CUIDADO" >}}
Esto es peligroso.
{{< /alert >}}

{{< alert type="tip" >}}
Un consejo útil.
{{< /alert >}}
```

---

## Actualizar stats de plataformas

Edita `hugo.toml` y cambia los valores de `htb_rank`, `thm_rank`, etc.
Haz push y se actualiza automáticamente.

## Estructura de archivos

```
starydarkz-blog/
├── hugo.toml                    ← configuración principal
├── archetypes/
│   ├── posts.md                 ← plantilla para nuevos posts
│   └── proyectos.md             ← plantilla para nuevos proyectos
├── content/
│   ├── posts/                   ← tus investigaciones
│   ├── proyectos/               ← tus herramientas open source
│   └── about/index.md           ← página sobre mí
├── static/
│   └── images/
│       ├── avatar.jpg           ← tu foto de perfil
│       └── posts/               ← imágenes de portada de posts
├── themes/starfield/
│   ├── layouts/                 ← plantillas HTML
│   └── static/
│       ├── css/                 ← estilos
│       └── js/                  ← scripts
└── .github/workflows/deploy.yml ← CI/CD automático
```
