---
title: "FortiSIEM CMDB Validator"
date: 2026-05-03
draft: false
description: "FortiSIEM CMDB Validator utiliza la API de FortiSIEM para extraer y analizar informacion sobre los equipos integrados en la CMDB del FortiSIEM."
cover: "https://raw.githubusercontent.com/starydarkz/Fortisiem_CMDB_Validator/refs/heads/main/Example/2.png"
github: "https://github.com/starydarkz/Fortisiem_CMDB_Validator"
language: "Python"
status: "active"
tags: ["fortisiem", "fortisiem-api", "python", "automation"]
---

# FortiSIEM CMDB Validator

La idea de este proyecto fue poder crear una herramienta para poder generar un reporte con informacion sobre el estado actual en cuanto al envio de bitacoras centralizadas en el FortiSIEM.

La motivacion fue debido a que no se tenia una forma de poder validar que tipos de auditorias se estan centralizando en el SIEM de cada equipo integrado, mas alla del protocolo de integracion, lo cual no te permite validar si estos equipos realmente se estan centralizando de forma correcta, especialmente en metodos de integracion como Syslog en donde el SIEM no tiene control de lo que se esta monitoreando, solo sabe que esta recibiendo eventos pero no controla lo que recibe.

Tener esta data, ademas de poder validar la ultima vez que enviaron eventos y cuales no en un solo reporte ayuda bastante cuando el investigador o ingeniero de SIEM necesita validar grandes cantidades de equipos, validar las integraciones de los equipos y poder llevar un control de inventario basado en lo que realmente el FortiSIEM esta recibiendo.

Este tipo de tareas puede ser tedioso cuando tienes que administrar cientos o miles de servidores o incluso en modelos MSSP en donde tienes multiples clientes y debes validar que todo este correctamente integrado.

Este proyecto utiliza la API disponible de FortiSIEM para extraer todos los equipos integrados de la CMDB, luego valida las auditorias que estan enviando en el rango de tiempo especificado y en base a filtros determina que tipo de auditorias se estan enviando (ej: Servidor A esta integrado por Syslog y esta enviando eventos de Windows Security Events, Windows System Events, Sysmon Events) y por consiguiente mediante excel filtrar para identificar auditorias faltantes.

Imagina revisar todos los firewalls de la infraestructura y que todos esten enviando eventos al FortiSIEM, pero validar que 19 de 20 equipos estan enviando eventos de trafico y alertas IPS, pero el ultimo equipo no tenia las auditorias de IPS habilitadas (el perfil no estaba configurado correctamente en el firewall), pero no te habias dado cuenta porque siempre veias Logs... Con FortiSIEM CMDB Validator podras facilmente generar un reporte y revisar el estado actual de las integraciones.


## Ejemplos:

Extrae toda la informacion del a CMDB:

```python3 fsmcmdbval.py -u super/usuario -p Password -s 127.0.0.1 -o file.xlsx -xall```


![](https://github.com/starydarkz/Fortisiem_CMDB_Validator/blob/main/Example/2.png?raw=true)
![](https://github.com/starydarkz/Fortisiem_CMDB_Validator/blob/main/Example/1.png?raw=true)
![](https://github.com/starydarkz/Fortisiem_CMDB_Validator/blob/main/Example/3.png?raw=true)