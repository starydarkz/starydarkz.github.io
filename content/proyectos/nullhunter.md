---
title: "NullHunter"
date: 2024-10-01
draft: false
description: "Scanner de vulnerabilidades automatizado para aplicaciones web, enfocado en OWASP Top 10."
github: "https://github.com/StarydDarkz/NullHunter"
language: "Python"
stars: "142"
status: "active"
tags: ["scanner", "web", "owasp", "python", "automation"]
cover: "/images/proyectos/nullhunter.png"
---

## ¿Qué hace?

NullHunter es un scanner de vulnerabilidades web que automatiza la detección de las vulnerabilidades del OWASP Top 10. Diseñado para ser rápido, extensible y fácil de usar.

## Instalación

```bash
git clone https://github.com/StarydDarkz/NullHunter
cd NullHunter
pip install -r requirements.txt
```

## Uso básico

```bash
# Scan completo
python nullhunter.py -u https://target.com --full

# Solo SQLi
python nullhunter.py -u https://target.com --sqli

# Con output en JSON
python nullhunter.py -u https://target.com --full -o report.json
```

## Características

- Detección de SQL Injection (error-based, blind, time-based)
- XSS reflected y stored
- SSRF básico
- Path traversal
- Generación de reportes en HTML/JSON
- Soporte para proxies (Burp Suite)
