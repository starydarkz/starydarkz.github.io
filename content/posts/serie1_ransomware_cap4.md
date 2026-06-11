---
title: "Serie Ransomware Deep Dive: Capitulo 4"
date: 2026-05-08
draft: true
description: "La evolucion del ransomware, XXX"
cover: "https://github.com/starydarkz/starydarkz.github.io/blob/main/images/portada_cap4_serieransomware.png?raw=true"
categories: ["Serie de Investigacion"]
tags: ["Serie:Ransomware Deep Dive"]
readtime: "15"
featured: false
---

En este capitulo analizaremos las caracteristicas generales de los ransomware entre el 2005 - 2012, y analizaremos una muestra de un ransomware creado en esa epoca para entender como funcionaban y si logramos deshacer el cifrado realizado por el ransomware. En esta etapa es donde el ransomware deja de ser una “prueba de concepto torpe” y empieza a convertirse en algo técnicamente funcional, aunque todavía con fallos importantes.

## Que cambia respecto a los 90?

Aquí ya vemos mejoras claras, principalmente:

- Uso real de criptografía
- Distribución por internet (email, exploits)
- Primeros intentos de monetización digital


![imagen 1](https://github.com/starydarkz/starydarkz.github.io/blob/main/images/image001.png?raw=true)

Es una etapa de transición: **de “bloqueo básico” → a “cifrado real pero imperfecto”**


## Técnicas de cifrado usadas (2005–2012)

Ejemplo conceptual:

```
Key = clave fija
C = AES(Key, archivo)
```

El problema en muchos de los casos es que se usaba la misma clave para todos los archivos cifrados y esta clave estaba dentro del mismo malware, lo que permitia a investigadores de ciberseguridad hacerle reversing al codigo y conseguir la llave de descifrado.


En resumen: Fácil de rompe ( : / )

En este capitulo no solo veremos la teoria, vamos a analizar y realizar diversos experimentos con alguna muestra de ransomware de la epoca, para este caso he seleccionado GPcode especialmente por lo famoso que se volvio, por ser uno de los primeros ransomware y por las investigaciones que se realizaron en torno a este.

## GPcode Ransomware (2006)

GPcode fue uno de los ransomware mas importantes de la epoca ya que fue infecto a muchos equipos y fue uno de los primeros de la epoca, su primera variante fue lanzada en el 2006 la cual luego evolucionaria mejorando sus debilidades años posteriores.

El ransomware CPcode fue lanzado en junio del 2006, infectando ordenadores mediante ataques de spear phishing y se propagaba a travea de archivos adjuntos en correos electronicos que parecian ser solicitudes de empleo. 

Este usaba RSA (inicialmente débil, ~660 bits en primeras variantes) para cifrar los archivos de las victimas y pedia un pago de recate, a cambio de un codigo o clave que les permita desbloquear los archivos afectados.

Esta versión de ransomware es especialmente peligrosa porque puede dejar una puerta trasera abierta a otros hackers. Además, esta puerta de acceso permite a los hackers acceder a información importante como documentos confidenciales, números de seguridad social, números de cuentas bancarias e información de tarjetas de crédito.



** **

Para realizar esta investigacion fuimos hasta los confines del internet para poder encontrar una variante de GPcode que fuese de las primeras, a continuacion se detalla la muestra identificada:

```
MD5: 7cd8e2fc5fe2dc351f24417cc1d23afa
SHA-1: 1490ee2d05b8862d17bb87bc00f0f0cc21c5505f
SHA-256: e1e8fe95693c9cffa68360a02a3a91402949035466e1b42b126e49390d5a7519 
```

Fuente: https://malshare.com/sample.php?action=detail&hash=7cd8e2fc5fe2dc351f24417cc1d23afa


### Demostracion de ransomware

adsasd
### Recuperacion de ransomware




En el siguiente enlace esta el post oficial de Kaspersky de como recuperar los archivos cifrados por CPcode:

https://support.kaspersky.com/common/utility/1809#block3



### Referencias

https://comunicae.es/notas-de-prensa/kaspersky-lab-encuentra-una-posible-solucion-para-recuperar-los-datos-cifrados-por-gpcode-ak


## Muestra de GPcode 2010

A finales de noviembre del 2010, se descubrio una nueva version de CPcode que utiliza un cifrado mas robusto  (RSA-1024 y AES-256) 

#### Tabla Tecnica

- MD5: b14c45c1792038fd69b5c75e604242a3
- SHA-1: 54ab323053f1138e5ccaa8f8afaa38cabca9491f
- SHA-256: e9ffda70e3ab71ee9d165abec8f2c7c52a139b71666f209d2eaf0c704569d3b1

#### Commands:

- "C:\Users\<USER>\AppData\Local\Temp\ntfs_system.bat"
- "C:\Windows\system32\NOTEPAD.EXE" C:\Users\<USER>\Desktop\HOW TO DECRYPT FILES.txt
- C:\Windows\system32\cmd.exe /c ""C:\Users\<USER>\AppData\Local\Temp\ntfs_system.bat" "
- ntfs_system.bat
- C:\Users\Elijah\AppData\Local\Temp\b14c45c1792038fd69b5c75e604242nalysis_subject.exe
- C:\Windows\system32\NOTEPAD.EXE C:\Users\Elijah\Desktop\HOW TO DECRYPT FILES.txt
- "%SAMPLEPATH%\e9ffda70e3ab71ee9d165abec8f2c7c52a139b71666f209d2eaf0c704569d3b1.exe"
- "C:\Windows\system32\NOTEPAD.EXE" %USERPROFILE%\Desktop\HOW TO DECRYPT FILES.txt
- C:\Windows\System32\wuapihost.exe -Embedding
- "C:\Windows\system32\NOTEPAD.EXE" C:\Users\Administrator\Desktop\HOW TO DECRYPT FILES.txt
- "C:\WINDOWS\notepad.exe" C:\Documents and Settings\Administrator\桌面\HOW TO DECRYPT FILES.txt
- cmd /c ""C:\Documents and Settings\Administrator\Local Settings\Temp\EB93A6\ntfs_system.bat" "
- C:\Users\<USER>\Desktop\HOW TO DECRYPT FILES.txt


- **cleanup**

#### Registry set

```yaml
Key: HKEY_USERS\S-1-5-21-575823232-3065301323-1442773979-1000\Control Panel\Desktop\Wallpaper
Value: "%TEMP%\dliknadfilobeikn.bmp"
```

```yaml
key: \REGISTRY\USER\S-1-5-21-1482476501-1645522239-1417001333-500\Control Panel\Desktop\Wallpaper
value: "C:\DOCUME~1\ADMINI~1\LOCALS~1\Temp\glhfglbcdeghiklm.bmp"
```

```yaml
key: \REGISTRY\USER\S-1-5-21-1482476501-1645522239-1417001333-500\Software\Microsoft\Windows\ShellNoRoam\MUICache\C:\Documents and Settings\Administrator\Local Settings\Temp\EB93A6\ntfs_system.bat
vvalue: "ntfs_system"
```

```yaml
key: \REGISTRY\USER\S-1-5-21-1482476501-1645522239-1417001333-500\Software\Microsoft\Windows\ShellNoRoam\MUICache\C:\WINDOWS\notepad.exe
value: "E8AEB0E4BA8BE69CAC00"
```

Referencias

https://www.virustotal.com/gui/file/e9ffda70e3ab71ee9d165abec8f2c7c52a139b71666f209d2eaf0c704569d3b1/detection

https://www.joesandbox.com/analysis/784430/0/html#static

https://tria.ge/241129-pvrsdswjes

## Recuperacion


Referencias

https://support.kaspersky.com/common/utility/1809#block3

#### Detect

```yaml
title: Potentially Suspicious Desktop Background Change Via Registry
id: 85b88e05-dadc-430b-8a9e-53ff1cd30aae
related:
- id: 8cbc9475-8d05-4e27-9c32-df960716c701
type: similar
status: test
description: |
Detects registry value settings that would replace the user's desktop background.
This is a common technique used by malware to change the desktop background to a ransom note or other image.
references:
- https://www.attackiq.com/2023/09/20/emulating-rhysida/
- https://research.checkpoint.com/2023/the-rhysida-ransomware-activity-analysis-and-ties-to-vice-society/
- https://www.trendmicro.com/en_us/research/23/h/an-overview-of-the-new-rhysida-ransomware.html
- https://www.virustotal.com/gui/file/a864282fea5a536510ae86c77ce46f7827687783628e4f2ceb5bf2c41b8cd3c6/behavior
- https://admx.help/?Category=Windows_10_2016&Policy=Microsoft.Policies.WindowsDesktop::Wallpaper
- https://admx.help/?Category=Windows_10_2016&Policy=Microsoft.Policies.ControlPanelDisplay::CPL_Personalization_NoDesktopBackgroundUI
author: Nasreddine Bencherchali (Nextron Systems), Stephen Lincoln @slincoln-aiq (AttackIQ)
date: 2023-12-21
modified: 2025-10-17
tags:
- attack.persistence
- attack.impact
- attack.defense-impairment
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
selection_values_1:
TargetObject|endswith: 'NoChangingWallpaper'
Details: 'DWORD (0x00000001)' # Prevent changing desktop background
selection_values_2:
TargetObject|endswith: '\Wallpaper'
selection_values_3:
TargetObject|endswith: '\WallpaperStyle'
Details: '2' # Stretch
filter_main_svchost:
# Note: Excluding GPO changes
Image|endswith: '\svchost.exe'
filter_main_empty:
TargetObject|endswith: '\Control Panel\Desktop\Wallpaper'
Details: '(Empty)'
filter_main_explorer:
# Normally Explorer.exe is the process that changes the desktop background
Image|endswith: 'C:\Windows\Explorer.EXE'
filter_optional_ec2launch:
Image:
- 'C:\Program Files\Amazon\EC2Launch\EC2Launch.exe'
- 'C:\Program Files (x86)\Amazon\EC2Launch\EC2Launch.exe'
TargetObject|endswith: '\Control Panel\Desktop\Wallpaper'
condition: selection_keys and 1 of selection_values_* and not 1 of filter_main_* and not 1 of filter_optional_*
falsepositives:
- Administrative scripts that change the desktop background to a company logo or other image.
level: medium
```

