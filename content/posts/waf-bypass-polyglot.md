---
title: "Bypass de WAF con Polyglot Payloads"
date: 2024-12-15
draft: false
description: "Técnicas para evadir Web Application Firewalls usando payloads que funcionan en múltiples contextos de inyección al mismo tiempo."
cover: "/images/posts/waf-bypass.png"
categories: ["Web"]
tags: ["waf", "bypass", "sqli", "polyglot"]
readtime: "12"
featured: true
---

## Introducción

Un **polyglot payload** es una cadena que es válida sintácticamente en múltiples contextos al mismo tiempo. En el contexto de WAF bypass, esto significa que un solo payload puede funcionar como SQL injection, XSS, y path traversal simultáneamente.

## ¿Por qué los WAFs fallan?

Los WAFs modernos utilizan reglas basadas en patrones (regex) o machine learning. Ambos enfoques tienen puntos ciegos:

1. **Reglas regex**: pueden ser evadidas con encoding alternativo
2. **ML-based**: confunden payloads multi-contexto con tráfico legítimo

## El payload

```python
# Ejemplo de polyglot payload
payload = "';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//\";"
payload += "alert(String.fromCharCode(88,83,83))//\";alert(String.fromCharCode(88,83,83))//--> "
```

## Técnica: Double-encoding

```bash
# Original
' OR 1=1--

# URL encoded
%27%20OR%201%3D1--

# Double encoded
%2527%2520OR%25201%253D1--
```

## Conclusión

Los polyglot payloads son efectivos precisamente porque rompen el modelo de amenaza que asumen la mayoría de los WAFs: que un ataque pertenece a una sola categoría.

## Referencias

- [OWASP WAF Bypass Techniques](https://owasp.org)
- [PortSwigger Web Academy](https://portswigger.net/web-security)
