/* Analítica: agregue aquí el ID de medición de Google Analytics 4 antes de publicar. */
window.SITE_ANALYTICS = { googleMeasurementId: 'G-JHFJDX7WV0' };

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
