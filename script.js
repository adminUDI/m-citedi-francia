const menuButton = document.querySelector('.menu-boton');
const menu = document.querySelector('.menu');
menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('abierto');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('[data-track]').forEach((link) => link.addEventListener('click', () => {
  window.trackEvent?.('registro_click', { placement: link.dataset.track });
}));

const observedSections = document.querySelectorAll('main section[id]');
const viewed = new Set();
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const section = entry.target;
    if (entry.isIntersecting && !viewed.has(section.id)) {
      viewed.add(section.id);
      window.trackEvent?.('seccion_vista', { section_name: section.id });
      sectionObserver.unobserve(section);
    }
  });
}, { threshold: 0.45 });
observedSections.forEach((section) => sectionObserver.observe(section));

const visitsTotal = document.querySelector('#visitas-total');
const visitsStatus = document.querySelector('#visitas-estado');

function showVisitCount(data) {
  if (!visitsTotal || !visitsStatus || !Number.isFinite(Number(data?.total))) return;
  visitsTotal.textContent = new Intl.NumberFormat('es-MX').format(Number(data.total));
  const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
  visitsStatus.textContent = updatedAt && !Number.isNaN(updatedAt.getTime())
    ? `Actualizado: ${new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(updatedAt)}`
    : 'Conteo actualizado.';
}

async function registerAndLoadVisitCount() {
  const endpoint = window.SITE_ANALYTICS?.publicVisitCounterEndpoint;
  if (!endpoint || !visitsTotal || !visitsStatus) return;

  visitsTotal.textContent = 'Cargando…';
  visitsStatus.textContent = 'Consultando el conteo publicado.';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    showVisitCount(await response.json());
  } catch (error) {
    visitsTotal.textContent = 'No disponible';
    visitsStatus.textContent = 'No fue posible actualizar el conteo publicado.';
  }
}

registerAndLoadVisitCount();

const perfiles = {
  alan: {
    nombre: 'Alán Díaz Rizo', institucion: 'SORBONNE UNIVERSITY · CNRS · LIP6',
    contenido: `<p>Alán Díaz Rizo obtuvo la Ingeniería en Comunicaciones y Electrónica por la Universidad de Guadalajara en 2015, la Maestría en Ciencias en Ingeniería Eléctrica por Cinvestav Guadalajara en 2018 y el doctorado en Informática, Telecomunicaciones y Electrónica por la Universidad Sorbona en París en 2023.</p><p>Desde 2024 es profesor asociado en la Universidad Sorbona e investigador del laboratorio LIP6. Forma parte del Comité Técnico IEEE Circuits and Systems for Communications (CASCOM) y ha colaborado como revisor y miembro de comité técnico en ISCAS, DAC, TVLSI y T-CAS.</p><p><strong>Líneas de investigación</strong></p><ul><li>Seguridad y confianza del hardware.</li><li>Protección de propiedad intelectual de circuitos integrados.</li><li>Detección de troyanos de hardware.</li><li>Radio definido por software y procesamiento digital de señales.</li><li>Diseño de circuitos integrados.</li></ul><p><a href="mailto:alan-rodrigo.diaz-rizo@lip6.fr">alan-rodrigo.diaz-rizo@lip6.fr</a></p>`
  },
  jenny: { nombre: 'Jenny Benois-Pineau', institucion: 'UNIVERSITÉ BORDEAUX · LABRI UMR 5800', contenido: '<p>Participante de la Université Bordeaux, LABRI UMR 5800.</p><p>La semblanza académica ampliada podrá agregarse aquí cuando esté disponible.</p>' },
  gladys: { nombre: 'Gladys Diaz', institucion: 'USPN INSTITUT GALILÉE · L2TI LAB', contenido: '<p>Participante de USPN Institut Galilée, L2TI Lab.</p><p><a href="mailto:gladys.diaz@imap.univ-paris13.fr">gladys.diaz@imap.univ-paris13.fr</a></p>' },
  carlos: { nombre: 'Carlos Javier González Santamaria', institucion: 'IMT ATLANTIQUE', contenido: '<p>Participante de IMT Atlantique.</p><p><a href="mailto:carlos-javier.gonzalez-santamaria@imt-atlantique.fr">carlos-javier.gonzalez-santamaria@imt-atlantique.fr</a></p>' },
  sergio: { nombre: 'Sergio Jesús González Ambriz', institucion: 'CITEDI-IPN', contenido: '<p>Participante de CITEDI-IPN.</p><p>La semblanza académica ampliada podrá agregarse aquí cuando esté disponible.</p>' },
  mireya: { nombre: 'Mireya Saraí García Vázquez', institucion: 'CITEDI-IPN', contenido: '<p>Participante de CITEDI-IPN.</p><p>La semblanza académica ampliada podrá agregarse aquí cuando esté disponible.</p>' },
  jose: { nombre: 'José Cruz Núñez Pérez', institucion: 'CITEDI-IPN', contenido: '<p>Participante de CITEDI-IPN.</p><p>La semblanza académica ampliada podrá agregarse aquí cuando esté disponible.</p>' },
  panel: { nombre: 'Panel: Impulsando la colaboración académica', institucion: '08:05–09:00 H · MODERA JORGE GARCÍA FLORES, MUFRAMEX', contenido: '<p>Participan Jenny Benois-Pineau, Mireya Saraí García Vázquez, Alan Rodrigo Díaz Rizo y José Cruz Núñez Pérez.</p><p>Selecciona una tarjeta de participante para consultar la información disponible de cada persona.</p>' }
};

const modal = document.querySelector('#perfil-modal');
const modalNombre = document.querySelector('#perfil-nombre');
const modalInstitucion = document.querySelector('#perfil-institucion');
const modalContenido = document.querySelector('#perfil-contenido');
document.querySelectorAll('[data-profile]').forEach((button) => button.addEventListener('click', () => {
  const perfil = perfiles[button.dataset.profile];
  if (!perfil || !modal) return;
  modalNombre.textContent = perfil.nombre;
  modalInstitucion.textContent = perfil.institucion;
  modalContenido.innerHTML = perfil.contenido;
  modal.showModal();
  window.trackEvent?.('perfil_abierto', { participant: button.dataset.profile });
}));
document.querySelector('.modal-cerrar')?.addEventListener('click', () => modal?.close());
modal?.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
