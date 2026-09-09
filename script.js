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

const perfiles = {
  alan: {
    nombre: 'Alán Díaz Rizo', institucion: 'SORBONNE UNIVERSITY · CNRS · LIP6',
    foto: 'assets/alan-diaz-rizo.png',
    contenido: `<p>Alán Díaz Rizo obtuvo la Ingeniería en Comunicaciones y Electrónica por la Universidad de Guadalajara en 2015, la Maestría en Ciencias en Ingeniería Eléctrica por Cinvestav Guadalajara en 2018 y el doctorado en Informática, Telecomunicaciones y Electrónica por la Universidad Sorbona en París en 2023.</p><p>Desde 2024 es profesor asociado en la Universidad Sorbona e investigador del laboratorio LIP6. Forma parte del Comité Técnico IEEE Circuits and Systems for Communications (CASCOM) y ha colaborado como revisor y miembro de comité técnico en ISCAS, DAC, TVLSI y T-CAS.</p><p><strong>Líneas de investigación</strong></p><ul><li>Seguridad y confianza del hardware.</li><li>Protección de propiedad intelectual de circuitos integrados.</li><li>Detección de troyanos de hardware.</li><li>Radio definido por software y procesamiento digital de señales.</li><li>Diseño de circuitos integrados.</li></ul>`
  },
  jenny: { nombre: 'Jenny Benois-Pineau', institucion: 'UNIVERSITÉ BORDEAUX · LABRI UMR 5800', foto: 'assets/jenny-benois-pineau.jpg', contenido: '<p>Jenny Benois-Pineau is a Full Professor of exceptional class of Computer Science at the University Bordeaux and chair of the Video Analysis and Indexing research group in the Image and Sound Department of LABRI Université Bordeaux. She is also chair of international relations at the School of Science and Technology of the University of Bordeaux, comprising 8,500 students.</p><p>Her topics of interest include image and video analysis, artificial intelligence in multimedia and healthcare, and other societal applications. One of her research topics is Explainable AI (XAI) in visual information processing. She has authored and co-authored more than 250 papers in international journals, conference proceedings, books and book chapters, and has tutored and co-tutored 30 PhD students.</p><p>She served as associated editor of <em>Signal Processing: Image Communication</em> and is now on the editorial board of <em>Multimedia Tools and Applications</em> and senior associated editor of <em>JEI SPIE</em>. She has served on numerous international program committees and organized workshops, including at ACM MM, CIVR, CBMI, EI, MMM, IEEE ICIP and IEEE/IAPR ICPR. She is a member of IEEE SPS TC MMSP and was decorated with the Knight of Academic Palms grade.</p>' },
  gladys: { nombre: 'Gladys Diaz', institucion: 'USPN INSTITUT GALILÉE · L2TI LAB', contenido: '<p>Participante de USPN Institut Galilée, L2TI Lab.</p>' },
  carlos: { nombre: 'Carlos Javier González Santamaria', institucion: 'IMT ATLANTIQUE', foto: 'assets/carlos-javier-gonzález-santamaria.jpg', contenido: '<p>Profesor asociado del Institut Mines-Télécom Bretagne, con doctorado obtenido en la Universidad de Reims, Francia. Cuenta con más de una década de experiencia y ha desarrollado una sólida especialización en redes y telecomunicaciones, dispositivos IoT y administración de infraestructuras cloud.</p><p>Ha sido autor de múltiples publicaciones científicas en revistas internacionales indexadas en Scopus y ha participado en comités de revisión de publicaciones como <em>IEEE Access</em>, <em>IEEE Transactions on Industrial Informatics</em> y el <em>International Journal of Communication Systems</em>, entre otras.</p><p>Su investigación se centra en seguridad informática, experimentación de telco cloud native y detección de amenazas mediante aprendizaje federado e inteligencia artificial. Su experiencia también abarca seguridad de sistemas Linux, orquestación de contenedores y entornos cloud.</p>' },
  sergio: { nombre: 'Sergio Jesús González Ambriz', institucion: 'CITEDI-IPN', foto: 'assets/sergio-gonzalez-ambriz.png', contenido: '<p>Doctor en Ciencias por el Centro de Investigación en Computación del Instituto Politécnico Nacional. Desde 2019 trabaja de tiempo completo en el Centro de Investigación y Desarrollo de Tecnología Digital del IPN. Actualmente es miembro del Sistema Nacional de Investigadoras e Investigadores, en nivel candidato.</p><p>Sus intereses de investigación se centran en inteligencia artificial y ciencia de datos, con un enfoque particular en telecomunicaciones 5G e Internet de las Cosas (IoT) y su aplicación en ciudades inteligentes. Ha publicado artículos en revistas internacionales de categoría JCR y ha contribuido a proyectos sobre redes inalámbricas de próxima generación y ciudades inteligentes con diversas instituciones.</p><p>Ha dirigido alumnos de posgrado de CITEDI. Pertenece a la Red de Expertos en Telecomunicaciones del IPN y es miembro de la Red de Investigación México-Francia de la MUFRAMEX.</p>' },
  mireya: { nombre: 'Mireya Saraí García Vázquez', institucion: 'CITEDI-IPN', foto: 'assets/mireya-garcia-vazquez.jpg', contenido: '<p>Actualmente está adscrita como investigadora titular del IPN en CITEDI, Tijuana, Baja California, y es líder del laboratorio de investigación «Análisis multimedia y aprendizaje profundo».</p><p>Su producción científica incluye publicaciones en revistas internacionales, libros, capítulos y conferencias. Su investigación aplica inteligencia artificial a la preservación del patrimonio cultural de México, a la preservación de especies marinas en peligro de extinción, al desarrollo de nuevos materiales para el espacio y al estudio de enfermedades de Alzheimer y Parkinson.</p><p>Pertenece al Sistema Nacional de Investigadoras e Investigadores, Nivel I. Fue Directora del CITEDI, ha sido seleccionada en dos ocasiones por el programa Fulbright, cuenta con tres patentes otorgadas por el Instituto Mexicano de la Propiedad Industrial y fue la primera mujer del CITEDI en obtener el Premio a la Investigación del IPN en 2022. En 2023 fue reconocida por el Gobierno del Estado de Baja California en el Muro de Honor de Mujeres Destacadas del Estado.</p><p>Es coorganizadora del workshop franco-mexicano «Inteligencia Artificial: Aplicaciones e investigación en fragilidad y demencia» y participa activamente en actividades de divulgación para promover vocaciones científicas en niñas y mujeres jóvenes.</p>' },
  jose: { nombre: 'José Cruz Núñez Pérez', institucion: 'CITEDI-IPN', foto: 'assets/jose-cruz-nunez-perez.jpg', contenido: '<p>Ingeniero en Electrónica por el Tecnológico Nacional de México (2001), Maestro en Ciencias en Ingeniería Electrónica por el Centro Nacional de Investigación y Desarrollo Tecnológico (2003) y Doctor en Ciencias por el Institut National des Sciences Appliquées de Lyon, Francia (2007).</p><p>Es miembro del Sistema Nacional de Investigadoras e Investigadores, Nivel I. En 2023 fue distinguido con el Diploma a la Investigación del Instituto Politécnico Nacional. En abril de este año recibió el título de la patente 436329: «Módulo y método electrónico basado en FPGA para la transmisión segura de imágenes usando un sistema caótico esférico de orden fraccional».</p><p>Cuenta con experiencia como responsable técnico en proyectos de investigación sobre modelado y diseño de circuitos y sistemas digitales y analógicos, radiofrecuencia y microondas. Sus contribuciones incluyen sistemas caóticos, diseño de sistemas de seguridad y soluciones en plataformas FPGA y DSP.</p><p>Actualmente es profesor investigador de tiempo completo y responsable del Laboratorio de Telecomunicaciones del Centro de Investigación y Desarrollo de Tecnología Digital del Instituto Politécnico Nacional.</p>' },
  panel: { nombre: 'Panel: Colaboración académica: retos y oportunidades', institucion: '08:05–09:00 H · MODERA JORGE GARCÍA FLORES, MUFRAMEX', contenido: '<p>Participan Jenny Benois-Pineau. Université Bordeaux, LABRI UMR 5800</p>, <p>Mireya Saraí García Vázquez. Citedi- IPN,</p> <p>Alán Rodrigo Díaz Rizo. Sorbonne University, CNRS, LIP6 y</p> <p>José Cruz Núñez Pérez. Citedi- IPN</p>' }
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
  modalContenido.innerHTML = `${perfil.foto ? `<img class="perfil-foto" src="${perfil.foto}" alt="${perfil.nombre}" />` : ''}${perfil.contenido}`;
  modal.showModal();
  window.trackEvent?.('perfil_abierto', { participant: button.dataset.profile });
}));
document.querySelector('.modal-cerrar')?.addEventListener('click', () => modal?.close());
modal?.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
