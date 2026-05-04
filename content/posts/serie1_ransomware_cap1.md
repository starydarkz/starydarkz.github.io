---
title: "Serie Ransomware Deep Dive: Capitulo 1"
date: 2026-05-04
draft: true
description: "Fundamentos de que es el Ransomware"
cover: "https://github.com/starydarkz/starydarkz.github.io/blob/main/images/portada_cap1_serieransomware.png?raw=true"
categories: ["Serie de Investigacion"]
tags: ["Serie:Ransomware Deep Dive"]
readtime: "3"
featured: false
---

Antes de empezar a analizar como funcionan los ransomware, su historia y demas objetivos dentro de esta investigacion, tenemos que definir que es un ransomware y cuales tipos de ransomware existen, esto nos podra ayudar a tener una idea mas clara de lo que realmente son y como funcionan.

Segun microsoft detalla [aqui](https://www.microsoft.com/es-mx/security/business/security-101/what-is-ransomware), El ransomware es un tipo de software malintencionado, o malware, que los ciberdelincuentes usan para bloquear el acceso a los datos críticos de una víctima, destruirlos o publicarlos a menos que se pague un rescate.     

La palabra ransom viene de “Ransom” que significa rescate y “[ware](https://www.computerhope.com/jargon/w/ware.htm)” que se suele utilizar como sufijo para describir diferentes tipos de productos informáticos o componentes, ya sean tangibles o intangibles, de ahi que ransomware significa software de rescate, normalmente malicioso.                   

## **Tipos de ransomware**

Podemos dividir los tipos de ransomware en dos categorias:

**Ransomware de cifrado (Crypyo Ranwomware)**

En un ataque de ransomware criptográfico, el atacante cifra los archivos o datos confidenciales de una víctima para que no pueda acceder a ellos a menos que pague un rescate solicitado. En teoría, una vez que la víctima paga, el atacante entrega una clave de descifrado que le da acceso a los archivos o datos, pero no hay ninguna garantía. Muchas organizaciones han perdido permanentemente el acceso a sus archivos incluso después de pagar el rescate.

**Ransomware de bloqueo (Locker Ransomware)**

En ransomware de ransomware de bloqueo, los actores malintencionados bloquean a una víctima el acceso a su dispositivo y les presentan una nota de rescate en pantalla con instrucciones sobre cómo pagar un rescate para recuperar el acceso. Esta forma de ransomware no suele implicar el cifrado, por lo que, cuando la víctima recupera el acceso a su dispositivo, se conservan los datos y archivos confidenciales. El ransomware de bloqueo se usa normalmente en dispositivos móviles.

Estas dos formas principales de ransomware se dividen en los siguientes subtipos:

- **Software de intimidación:** El software de intimidación usa el miedo para que la gente pague un rescate. En estos tipos de ciberataques, los actores malintencionados se hacen pasar por una agencia de cumplimiento de la ley y envían un mensaje a la víctima en el que se le inculpa de un delito y le piden una sanción.
- **Doxware:** En Doxware, los actores malintencionados roban información personal y amenazan con revelarla públicamente si no se paga un rescate.
- **Ransomware de extorsión doble:** En el ransomware de extorsión doble, los atacantes no solo cifran archivos, sino que también roban datos confidenciales y amenazan con liberarlos públicamente si no se paga el rescate.
- **Destrucción de datos:** Con la destrucción de datos, se amenaza con destruir los datos de la víctima si esta no paga el rescate.

## **Puntos clave**

Segun una investigacion realizada por MalwareByte [aqui](https://www.malwarebytes.com/es/ransomware), podemos destacar los siguientes puntos acerca de los ataques de ransomware:

- El ransomware es un tipo de malware que impide a los usuarios acceder a su sistema o a sus archivos personales hasta que se abone el rescate. De ahí su nombre, «ransomware».
- En 2023, [los pagos por ransomware superaron los 1000 millones de dólares anuales por](https://www.threatdown.com/dl-state-of-ransomware-2024) primera vez, mientras que el pago medio por rescate ascendió a 620 000 dólares.
- [En 2024, Threatdown](https://www.threatdown.com/dl-state-of-ransomware-2024) un aumento del 63 % en los ataques de ransomware en Estados Unidos y [Threatdown](https://www.threatdown.com/dl-state-of-ransomware-2024) un incremento del 67 % en los ataques de ransomware en el Reino Unido.
- En 2026, los atacantes han mejorado la rapidez y el sigilo de sus ataques gracias a nuevas tácticas.
- Existen diferentes tipos de ransomware, como el scareware, los programas que bloquean la pantalla, el ransomware de cifrado y otros.
- Los ataques de ransomware afectan a las empresas, pero los particulares también son víctimas de ellos.

Durante esta serie nos estaremos enfocando en los ransomware de tipo de cifrado o crypto ransomware.

La mayoria de amenazas de este tipo siguen un proceso de 3 pasos:

![ProcesoRansomware](https://github.com/starydarkz/starydarkz.github.io/blob/main/images/procesoransom001.png?raw=true)