---
title: "Serie Ransomware Deep Dive: Capitulo 4"
date: 2026-06-10
draft: false
description: "La evolución del ransomware, Generacion 2005 - 2012 y GPcode"
cover: "https://github.com/starydarkz/starydarkz.github.io/blob/main/static/images//portada_cap4_serieransomware.png?raw=true"
categories: ["Serie de Investigación"]
tags: ["Serie:Ransomware Deep Dive"]
readtime: "12"
featured: false
---

En este capitulo analizaremos las caracteristicas generales de los ransomware entre el 2005 - 2012, y tambien analizaremos una muestra de un ransomware creado en esa epoca para entender como funciónaban y si logramos deshacer el cifrado realizado por el ransomware. En esta etapa es donde el ransomware deja de ser una “prueba de concepto torpe” y empieza a convertirse en algo técnicamente funciónal, aunque todavía con fallos importantes.

## ¿Qué cambia respecto a los 90?

Aquí ya vemos mejoras claras, principalmente:

- Uso real de criptografía
- Distribución por internet (email, exploits)
- Primeros intentos de monetización digital

Sin embargo, también se destacan algunas debilidades como:


![imagen 1](https://github.com/starydarkz/starydarkz.github.io/blob/main/static/images/image001.png?raw=true)

![imagen 1](/static/images/image001.png)


Es una etapa de transición: **de “bloqueo básico” --> a “cifrado real pero imperfecto”**


## Técnicas de cifrado usadas (2005–2012)

Un ejemplo conceptual de como se implementaba el cifrado seria el siguiente:

```
Key = clave fija
C = AES(Key, archivo)
```

El problema en muchos de los casos es que se usaba la misma clave para todos los archivos cifrados y esta clave estaba dentro del mismo malware, lo que permitía a investigadores de ciberseguridad hacerle reversing al código y conseguir la llave de descifrado. Básicamente, esto se resume en: fácil de romper.

Ahora vamos a diseccionar y hacer experimentos con una muestra de algún ransomware de esa época. En este caso seleccioné GPCode por su popularidad y también debido a que se tiene mucha información pública disponible sobre esta amenaza de ransomware criptográfico.

## GPcode Ransomware (2006)

GPcode fue uno de los ransomware más importantes de la época, infectó a miles de equipos y fue uno de los primeros de su clase. Su primera variante fue lanzada en 2006, la cual luego evolucionaría mejorando sus debilidades en años posteriores.

El ransomware GPcode fue lanzado en junio de 2006, infectando ordenadores mediante ataques de spear phishing. Se propagaba a través de archivos adjuntos en correos electrónicos que parecían ser solicitudes de empleo. 


{{< alert type="danger" title="Nota Tecnica: Perspectiva del Atacante" >}}
**Objetivo:** Conseguir que la víctima ejecute el archivo malicioso.

**Técnicas utilizadas**

- Correos electrónicos de spear phishing.
- Suplantación de solicitudes de empleo.
- Uso de archivos adjuntos atractivos para aumentar la tasa de apertura.
- Aprovechamiento de la confianza y curiosidad de los usuarios.

**Ventaja para el atacante**

En 2006 existían menos soluciones de filtrado de correo y menor concienciación sobre phishing, por lo que la probabilidad de éxito era elevada.
{{< /alert >}}

{{< alert type="info" title="Nota Tecnica: Perspectiva del Defensor" >}}
**Indicadores de riesgo**

- Correos inesperados con currículums adjuntos.
- Archivos ejecutables disfrazados como documentos.
- Remitentes desconocidos o dominios sospechosos.
- Solicitudes de empleo enviadas a personas o departamentos no relacionados con recursos humanos.

**Controles recomendados**

- Filtrado de correo electrónico.
- Bloqueo de extensiones ejecutables en correos.
- Capacitación de usuarios contra phishing.
- Soluciones antivirus y EDR.
- Políticas de mínimo privilegio.

**Preguntas para el análisis**

- ¿Quién recibió el correo?
- ¿El archivo adjunto fue abierto?
- ¿Existieron alertas de seguridad previas a la ejecución?
{{< /alert >}}

{{< alert type="tip" title="Nota Tecnica: Perspectiva del Forense" >}}
**Evidencias de interés**

- Correos electrónicos originales.
- Encabezados SMTP.
- Archivos adjuntos recuperados.
- Metadatos del archivo malicioso.
- Registros de ejecución del sistema.

**Artefactos a recolectar**

- PST/OST de Outlook.
- Logs del servidor de correo.
- Prefetch (si existía en el sistema operativo).
- Eventos de Windows relacionados con la ejecución.
- Copias del malware para análisis.

**Preguntas del investigador**

- ¿Cuál fue el correo inicial?
- ¿Qué usuario ejecutó el archivo?
- ¿Cuándo ocurrió la infección?
- ¿Existen indicadores que permitan identificar otras víctimas?
{{< /alert >}}

Este usaba RSA (inicialmente débil, ~660 bits en las primeras variantes) para cifrar los archivos de las víctimas y pedía un pago de rescate, a cambio de un código o clave que les permitiera desbloquear los archivos afectados.

Esta versión de ransomware es especialmente peligrosa porque puede dejar una puerta trasera abierta a otros hackers. Además, esta puerta de acceso permite a los hackers acceder a información importante como documentos confidenciales, números de seguridad social, números de cuentas bancarias e información de tarjetas de crédito.

Para realizar esta investigación nos adentramos hasta los confines de internet para encontrar una variante temprana de GPcode... y lo logramos. A continuación se muestra la muestra identificada:

```yaml
MD5: 7cd8e2fc5fe2dc351f24417cc1d23afa
SHA-1: 1490ee2d05b8862d17bb87bc00f0f0cc21c5505f
SHA-256: e1e8fe95693c9cffa68360a02a3a91402949035466e1b42b126e49390d5a7519 
```
_Fuente: https://malshare.com/sample.php?action=detail&hash=7cd8e2fc5fe2dc351f24417cc1d23afa_

A esta muestra la llamaremos GPcode (e1e8) y nos enfocaremos tanto en la emulación como en las técnicas forenses que permiten la recuperación de los archivos cifrados, es decir, utilizar técnicas forenses para revertir el daño causado por el ransomware mediante una vulnerabilidad en su implementación.

Sucede que, mediante el análisis de la muestra GPcode (e1e8), se pudo identificar una falla en su implementación que permite la recuperación de los archivos afectados por el ransomware.

La vulnerabilidad radica en que, antes de realizar el cifrado, el malware crea una copia temporal del archivo original. Posteriormente, genera una nueva versión cifrada y elimina el archivo original del sistema. Sin embargo, debido a una implementación incorrecta del proceso de eliminación, los datos originales permanecen almacenados físicamente en el disco hasta que son sobrescritos por nueva información.

Esta debilidad permitió a los investigadores de Kaspersky Lab desarrollar métodos de recuperación basados en herramientas de análisis forense. Como resultado, en muchos casos era posible restaurar parcial o totalmente la información sin necesidad de disponer de la clave de descifrado proporcionada por los atacantes.

El hallazgo evidenció una de las principales limitaciones de las primeras variantes de ransomware: aunque lograban impedir el acceso a los archivos de la víctima, sus mecanismos de cifrado y eliminación de datos aún presentaban errores de diseño que podían ser aprovechados por especialistas en respuesta a incidentes y análisis forense digital. Atacantes 0, Forenses 1. :D.


{{< alert type="danger" title="Nota Tecnica: Perspectiva del atacante" >}}
La eliminación incompleta de los archivos originales reducía significativamente la efectividad del ransomware, ya que las víctimas podían recuperar su información sin pagar el rescate.
{{< /alert >}}

{{< alert type="info" title="Nota Tecnica: Perspectiva del defensor" >}}
La detección temprana de variantes con errores criptográficos o de implementación puede permitir la recuperación de datos y reducir el impacto del incidente.
{{< /alert >}}

{{< alert type="tip" title="Nota Tecnica: Perspectiva forense" >}}
La preservación del disco afectado es fundamental, ya que los archivos eliminados podrían recuperarse mientras sus sectores no hayan sido sobrescritos. Esto convierte al análisis forense de disco en una de las técnicas más valiosas para responder a este tipo de infecciones.
{{< /alert >}}

Los hallazgos de esta investigación son gracias al equipo de Kaspersky Lab, quienes publicaron el siguiente post en donde explican cómo recuperar los archivos cifrados por GPcode:

[Kaspersky - Recuperar archivos cifrados por GPcode](https://support.kaspersky.com/common/utility/1809#block3)


### Ejecución y Recuperación de la muestra de GPcode Ransomware

En el siguiente video se puede observar la ejecución del ransomware y su posterior recuperación. Para realizar esta prueba se utilizó una máquina virtual con Windows 10 aislada de internet y sin protecciones de seguridad activas.

Luego del cifrado, se utilizó la herramienta recomendada por Kaspersky para la recuperación de los archivos afectados, mediante una utilidad forense que permite recuperar archivos eliminados.

Algo curioso: el ransomware solo cifra archivos con extensiones específicas, por lo que archivos con extensiones como ".png" no son afectados, como se demostrará en el siguiente video:

{{< youtube id="iMBBIhjmi6o" >}}


## Muestra de GPcode 2010

Pero la historia no acaba ahí...

A finales de noviembre de 2010 se descubrió una nueva versión de GPcode que utiliza un cifrado más robusto (RSA-1024 y AES-256) y que además corregía la vulnerabilidad que permitía recuperar archivos cifrados mediante herramientas forenses.

A esto se le conoce como "Evolución del Ransomware", un fenómeno que se ha repetido múltiples veces a lo largo de los años.

A esta muestra la llamaremos GPcode (e9ff) y haremos un análisis detallado de su funcionamiento, tanto mediante ejecución en laboratorio como con herramientas online de análisis de malware (sandboxes).

```yaml
- MD5: b14c45c1792038fd69b5c75e604242a3
- SHA-1: 54ab323053f1138e5ccaa8f8afaa38cabca9491f
- SHA-256: e9ffda70e3ab71ee9d165abec8f2c7c52a139b71666f209d2eaf0c704569d3b1
```

{{< youtube id="R5bUOmdUjDw" >}}

Utilizando herramientas de sandbox, ejecutamos la muestra GPcode (e9ff) y observamos su comportamiento. A continuación se detallan los comandos que se ejecutan durante la ejecución del ransomware:

### Comandos:

- `C:\Users\<USER>\AppData\Local\Temp\ntfs_system.bat` —> Script de limpieza del ransomware
- `C:\Windows\system32\NOTEPAD.EXE ... HOW TO DECRYPT FILES.txt` — Abre la nota de rescate al usuario
- `cmd /c "...ntfs_system.bat"` — Ejecuta el script de limpieza via cmd
- `%SAMPLEPATH%\e9ffda70...d3b1.exe` — Ejecutable principal del ransomware
- `C:\Windows\System32\wuapihost.exe -Embedding` — Proceso del sistema utilizado como cobertura


### Modificaciones en llaves de registro

El ransomware GPcode (e9ff) realiza las siguientes modificaciones en el registro de Windows:

##### Cambia el fondo de pantalla para mostrar la nota de rescate

- `HKCU\Control Panel\Desktop\Wallpaper`
  → `%TEMP%\dliknadfilobeikn.bmp` 

##### Registra el script de limpieza en la caché del shell

- `HKCU\Software\Microsoft\Windows\ShellNoRoam\MUICache\...\ntfs_system.bat`
  → `ntfs_system` — Registra el script de limpieza en la caché del shell

- `HKCU\Software\Microsoft\Windows\ShellNoRoam\MUICache\...\notepad.exe`
  → `E8AEB0E4BA8BE69CAC00` — Asociación para abrir la nota de rescate


{{< alert type="danger" title="Nota Tecnica: Perspectiva del Atacante" >}}
GPcode (e9ff) incorpora mejoras importantes respecto a versiones anteriores. Además de utilizar cifrado AES-256 y RSA-1024, implementa mecanismos destinados a reforzar el impacto psicológico de la infección, como modificar el fondo de pantalla y mostrar automáticamente la nota de rescate. Estas acciones buscan que la víctima comprenda rápidamente que sus archivos han sido secuestrados y aumentar la presión para realizar el pago.
{{< /alert >}}


{{< alert type="info" title="Nota Tecnica: Perspectiva del Defensor" >}}
Una de las actividades más visibles de GPcode (e9ff) es la modificación del fondo de pantalla mediante cambios en el registro de Windows. Este comportamiento puede ser detectado con la siguiente regla Sigma, permitiendo identificar indicios de ransomware incluso cuando el proceso de cifrado ya ha comenzado.

```yaml
title: Potentially Suspicious Desktop Background Change Via Registry
id: 85b88e05-dadc-430b-8a9e-53ff1cd30aae
status: test
description: |
  Detects registry value settings that replace the user's desktop background.
  Common technique used by malware to display a ransom note as wallpaper.
tags:
  - attack.persistence
  - attack.impact
  - attack.t1112
  - attack.t1491.001
logsource:
  product: windows
  category: registry_set
detection:
  selection_keys:
    TargetObject|contains:
      - 'Control Panel\Desktop'
      - 'CurrentVersion\Policies\ActiveDesktop'
      - 'CurrentVersion\Policies\System'
  selection_values_2:
    TargetObject|endswith: '\Wallpaper'
  selection_values_3:
    TargetObject|endswith: '\WallpaperStyle'
    Details: '2'
  filter_main_explorer:
    Image|endswith: 'C:\Windows\Explorer.EXE'
  condition: selection_keys and 1 of selection_values_* and not filter_main_explorer
falsepositives:
  - Administrative scripts that change the desktop background.
level: medium
```

La monitorización de cambios en claves sensibles del registro complementa otras capacidades de detección basadas en comportamiento y ayuda a acelerar la respuesta ante un incidente.
{{< /alert >}}


{{< alert type="tip" title="Nota Tecnica: Perspectiva Forense" >}}
Los cambios realizados en el registro constituyen una evidencia valiosa para reconstruir la actividad del malware. En esta muestra se observa la modificación de la clave `HKCU\Control Panel\Desktop\Wallpaper`, utilizada para mostrar la nota de rescate a la víctima.

Junto con los archivos temporales y la nota de rescate, estos artefactos permiten establecer una línea temporal de la infección y comprender las acciones ejecutadas por el ransomware en el sistema comprometido.
{{< /alert >}}

## Referencias - Análisis de e9ff mediante herramientas online

- [VirusTotal - e9ff](https://www.virustotal.com/gui/file/e9ffda70e3ab71ee9d165abec8f2c7c52a139b71666f209d2eaf0c704569d3b1/detection)
- [Joe Sandbox - e9ff](https://www.joesandbox.com/analysis/784430/0/html#static)
- [Tria.ge - e9ff](https://tria.ge/241129-pvrsdswjes)

