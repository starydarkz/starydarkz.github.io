---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
description: "Descripción corta del proyecto"
github: "https://github.com/StarydDarkz/{{ .File.ContentBaseName }}"
language: "Python"     # Python | Go | Rust | C | JavaScript | Bash
stars: "0"
status: "active"       # active | archived | wip
tags: ["tag1", "tag2"]
cover: "/images/proyectos/{{ .File.ContentBaseName }}.png"
---

## ¿Qué hace?

Describe el propósito principal del proyecto.

## Instalación

```bash
git clone https://github.com/StarydDarkz/{{ .File.ContentBaseName }}
cd {{ .File.ContentBaseName }}
pip install -r requirements.txt
```

## Uso

```bash
python main.py --help
```

## Características

- Feature 1
- Feature 2

## Demo

Capturas de pantalla o GIFs aquí.
