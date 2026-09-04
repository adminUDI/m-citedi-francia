/*
 * Google Analytics registra el tráfico; sus cifras no se pueden leer de forma
 * segura desde un sitio estático. Para publicar un total en la página,
 * configure publicVisitCounterEndpoint con un endpoint HTTPS que incremente
 * atómicamente una visita y responda JSON: { "total": 1234, "updatedAt": "..." }.
 * El endpoint debe aceptar POST y habilitar CORS para el dominio publicado.
 */
window.SITE_ANALYTICS = {
  googleMeasurementId: 'G-JHFJDX7WV0',
  publicVisitCounterEndpoint: ''
};

window.trackEvent = function (name, params = {}) {
  if (window.gtag && window.SITE_ANALYTICS.googleMeasurementId) {
    window.gtag('event', name, params);
  }
};

if (window.SITE_ANALYTICS.googleMeasurementId) {
  const id = window.SITE_ANALYTICS.googleMeasurementId;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}
