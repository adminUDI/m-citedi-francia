# Micrositio: Diálogo científico CITEDI–Francia

Micrositio estático y responsive. Ábrase `index.html` en un navegador o publíquese en cualquier servidor web estático.

## Antes de publicar

1. En `analytics.js`, confirme que `googleMeasurementId` corresponda a la propiedad institucional de Google Analytics 4. Esto registra visitas, clics de registro y vistas de las secciones, sin que el sitio guarde información personal.
2. Tras la transmisión, reemplace el bloque `.video-placeholder` en `index.html` por el iframe de la grabación publicada en YouTube.

La URL de registro configurada es `https://n9.cl/fpd4r`, conforme al material entregado.

## Dónde consultar las visitas

Entre a [Google Analytics](https://analytics.google.com/) con la cuenta que sea administradora de la propiedad. Ahí encontrará:

- Total de visitantes y sesiones: **Informes → Adquisición**.
- Visitas por día o mes: cambie el selector de fechas del informe.
- País y ciudad: **Informes → Datos demográficos → Detalles**.
- Celular, computadora o tablet: **Informes → Tecnología → Detalles técnicos**.
- Sección más visitada: cree una exploración con el evento `seccion_vista` y la dimensión `section_name`; los clics de registro usan el evento `registro_click`.
