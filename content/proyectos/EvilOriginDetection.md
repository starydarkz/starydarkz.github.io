---
title: "Evil Origin Detection"
date: 2026-05-06
draft: false
description: "Evil Origin Detection es una herramienta de codigo abierto de correalcion de inteligencia de ameanzas y fuentes abiertas."
cover: "https://github.com/starydarkz/EvilOriginDetection/blob/main/tool.png?raw=true"
github: "https://github.com/starydarkz/EvilOriginDetection"
language: "Python"
status: "active"
tags: ["cti", "osint","automation"]
---

# Evil Origin Detection

Cuando era analista en un SOC, tenia que revisar muchas alertas al dia en donde tenia que validar que estos indicadores no sean de compromiso (IOC), para eso usaba herramientas como Virustotal, AbuseipDB, entre otras herramientas de inteligencia, sin embargo para cada indicador tenia que abrir muchas herramientas y seguir un proceso para determinar si realmente son maliciosas o no.

Aun asi a veces tenia que ir mas alla de lo que estas plataformas me aportaban, como hacer OSINT para saber sobre el origen de ese indicador y porque esta interactuando en la infraestructura, usaba dorks de google, tecnicas de dns pasivo, ver el contenido de esa URL para ver relamente de que trata, revisar puertos abiertos, indagar mas en el proveedor de esa IP o incluso geolocalizar dicho indicador.

De esta forma nacio Evil Origin Detection, la idea es realizar todo este analisis, conectar todas esas plataformas de inteligencia y poder correlacionar esa informacion para identiricar patrones y posible actividad maliciosa, poder ver la actividad que ha tenido en internet!.

La realidad es que existen plataformas similares que conectan otras herramientas de inteligencia de amenazas e intentan reunir la mayor cantidad de informacion posible, sin embargo la mayoria son de Pago, no estan tan enfocadas en la correlacion de informacion o carecen de funciones interesantes. Este proyecto no necesariamente sea lo mas original que exista, pero con pasion, actualizaciones constantes y apoyo de la comunidad podemos crear una buena plataforma de inteligencia.

Este proecto es opensource y se encuentra alojkado en github en el enlace de arriba "Ver Github", adicional actualmente este proyecto esta hosteado aqui para pruebas:

https://evilorigindetection.onrender.com/

