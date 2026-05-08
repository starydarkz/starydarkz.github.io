---
title: "Serie Ransomware Deep Dive: Capitulo 3"
date: 2026-05-08
draft: false
description: "La evolucion del ransomware, generaciones"
cover: "https://github.com/starydarkz/starydarkz.github.io/blob/main/images/portada_cap3_serieransomware.png?raw=true"
categories: ["Serie de Investigacion"]
tags: ["Serie:Ransomware Deep Dive"]
readtime: "5"
featured: false
---

Durante la historia los ataques de tipo ransomware han evolucionado bastante y su evolución no ha sido lineal ni casual, sino que ha seguido muy de cerca los cambios en la tecnologia, el internet y hasta modelos de negocios criminales. Entender esa evolucion te da bastante ventaja para entender y defendernos de este tipo de amenazas.

Al inicio, el ransomware era bastante rudimentario, uno de los primeros casos conocidos fue el llamado AIDS Trojan (tambien conocido como el ransomware del SIDA), que se distribuía en disquetes fisicos, este no cifraba archivos directamente sino que ocultaba los archivos en el disco C y cifraba su nombre para que las victimas no pudieran encontrarlos y por supuesto pedia un pago de rescate por correo.

Con la expansión de internet en los **2000**, el ransomware empezó a cambiar. Aparecieron variantes que ya usaban criptografia real para cifrar archivos, aunque aun con errores o claves recuperables. En esta etapa, el objetivo era mas "masivo", enfocado mas en infectar a muchos usuarios individuales con pagos relativamente pequeños.

El gran salto ocurre alrededor del **2013** con familias como CryptoLocker, desde aqui empezamos a ver:

- Uso fuer de cifrado (RSA, AES)
- Pagos en Bitcoin para anonimato
- Infraestructura más organizada (servidores de comando y control)

Desde ahí, el ransomware se vuelve un negocio serio...

Luego viene una etapa más agresiva y destructiva con ataques como WannaCry y NotPetya en **2017**. Estos ataques marcaron un antes y un despues porque:

- Se propagaban automaticamente (caracteristicas de malware tipo gusanos)
- Afectaron hospitales, empresas y gobiernos
- Demostraron el impacto global de este tipo de ataques

Despues de eso, el modelo cambia otra vez... Ya no se trata solo de infectar usuarios indiviruales, sino de atacar orgamizaciones grandes. Aqui nace el ransomware dirigido:

- Ataqques manuales (los atacantes entran, exploran y luego cifran)
- Exigen rescates de millones de d dólares
- Se enfocan en empresas críticas

En esta etapa tambien surgen el modelo de negocio "Ransomware-as-a-Service" (RaaS). Básicamente, grupos desarrollan el malware y otros lo usan, repartiendo ganancias. Ejemplos incluyen REvil o DarkSide.

Mas recientemente, aparece la "doble extorcion":

1. Cifran tus archivps
2. Roban tus datos
3. Amenazan con publicarlos si no pagas

Esto hace que incluso con backups, la víctima siga bajo presión.

Actualmente el ransomware es mas dirigido (ataques a medida), mas silencioso (pueden durar semanas o meses dentro de la red) y mas profecional (soporte tecnico, paneles, afiliados y mucho tiempo libre). Las tendencias apuntan a:

- Uso de ingeligencia artificial para automatizar ataques
- Ciberterrorismo mediante ataques a infraestructuras criticas (energia, salud...)
- Mayor combinación con robo de identidad y espionaje