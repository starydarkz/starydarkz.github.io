---
title: "FortiSIEM CMDB Validator"
date: 2024-10-01
draft: false
description: "FortiSIEM CMDB Validator utiliza la API de FortiSIEM para extraer y analizar informacion sobre los equipos integrados en la CMDB del FortiSIEM para exportar el resultado en CSV.
"
github: "https://github.com/starydarkz/Fortisiem_CMDB_Validator"
language: "Python"
status: "active"
tags: ["fortisiem", "python", "automation"]
cover: "https://github.com/starydarkz/fortisiem_cmdb_validator/raw/main/portada.png"
---

## ¿Qué hace?

FortiSIEM CMDB Validator utiliza la API de FortiSIEM para extraer y analizar informacion sobre los equipos integrados en la CMDB del FortiSIEM para exportar el resultado en CSV.

## Instalación

```bash
git clone https://github.com/starydarkz/fortisiem_cmdb_validator.git
cd fortisiem_cmdb_validator
pip3 install -r requeriments.txt
```

## Funciones de la herramienta:
- Extraer equipos de la CMDB de FortiSIEM a partir de un listado.
- Extraer equipos que no envian eventos por un tiempo determinado en la CMDB.
- Extraer todos los equipos de la CMDB de FortiSIEM y mostrar si han enviado eventos o no en un rango de tiempo.

