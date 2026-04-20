---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
description: "Descripción corta que aparece en la tarjeta del blog"
cover: "/images/posts/{{ .File.ContentBaseName }}.png"
categories: ["Web"]   # Web | Malware | Red Team | CTF | Crypto | Network
tags: ["tag1", "tag2"]
readtime: "10"
featured: false
---

## Introducción

Escribe aquí la introducción de tu investigación.

## Contexto

Explica el contexto del problema o vulnerabilidad.

## Análisis

```python
# Tu código aquí
print("Hello, Cosmos!")
```

## Conclusión

Tus conclusiones y hallazgos.

## Referencias

- [Referencia 1](https://example.com)
