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
  gladys: { nombre: 'Gladys Diaz', institucion: 'USPN INSTITUT GALILÉE · L2TI LAB', foto: 'assets/gladys-diaz.png', fotoClase: 'foto-gladys-modal', contenido: '<p>Dr. Gladys Diaz is an Associate Professor and HDR researcher in Computer Networks at Université Sorbonne Paris Nord (USPN), and a member of the Network team at the Laboratoire de Traitement et Transport de l’Information (L2TI). She received her PhD from the Institut National Polytechnique de Lorraine in 2000 and her HDR (Habilitation à Diriger les Recherches) from Université Pierre et Marie Curie in 2016.</p><p>She has more than 20 years of experience in doctoral supervision. She has supervised approximately 50 engineering projects and Bachelor’s and Master’s theses, successfully guided seven PhD theses to completion, and currently supervises four doctoral theses.</p><p><strong>Research themes</strong></p><ul><li>Dynamic communication-network management, QoS, and information modelling.</li><li>Cloud, Fog, and Edge networking; SDN/NFV and network slicing.</li><li>IoT, indoor air quality, and 5G/next-generation networks.</li><li>Autonomous network service orchestration.</li></ul>' },
  david: { nombre: 'David A. Cordova Morales', institucion: 'USPN INSTITUT GALILÉE · L2TI LAB', foto: 'assets/david.PNG', contenido: '<p>David A. Cordova Morales is an Associate Professor in Computer Networks and Security at Université Sorbonne Paris Nord (USPN), affiliated with the Laboratoire de Traitement et Transport de l’Information (L2TI). He holds MSc and PhD degrees in Computer Science from Sorbonne Université, specializing in computer networks.</p><p>His research focuses on computer networks and distributed systems, with particular interests in network security and privacy, digital trust infrastructures, authentication and key management, and applied machine learning for network security. He is a Candidate within Mexico’s Sistema Nacional de Investigadoras e Investigadores (SNII) and maintains an academic collaboration with the Instituto Politécnico Nacional’s Centro de Investigación en Computación.</p><p><strong>Research themes</strong></p><ul><li>Computer networks and distributed systems.</li><li>Network security, privacy, and digital trust.</li><li>Authentication, key management, and IoT security.</li><li>Applied machine learning for network security.</li></ul>' },
  'gladys-david': { nombre: 'Gladys Diaz and David A. Cordova Morales', institucion: 'USPN INSTITUT GALILÉE · L2TI LAB', contenido: '<section class="semblanza-compartida"><h3>Gladys Diaz</h3><p>Associate Professor and HDR researcher in Computer Networks at Université Sorbonne Paris Nord (USPN), and a member of the L2TI Laboratory. Her research covers dynamic network management, Cloud/Fog/Edge networking, SDN/NFV, IoT, indoor air quality, 5G networks, and autonomous service orchestration.</p><h3>David A. Cordova Morales</h3><p>Associate Professor in Computer Networks and Security at USPN, affiliated with L2TI. His expertise includes computer networks and distributed systems, security and privacy, digital trust, authentication and key management, IoT, and machine learning for network security.</p></section>' },
  carlos: { nombre: 'Carlos Javier González Santamaria', institucion: 'IMT ATLANTIQUE', foto: 'assets/carlos-javier-gonzález-santamaria.jpg', contenido: '<p>Profesor asociado del Institut Mines-Télécom Bretagne, con doctorado obtenido en la Universidad de Reims, Francia. Cuenta con más de una década de experiencia y ha desarrollado una sólida especialización en redes y telecomunicaciones, dispositivos IoT y administración de infraestructuras cloud.</p><p>Ha sido autor de múltiples publicaciones científicas en revistas internacionales indexadas en Scopus y ha participado en comités de revisión de publicaciones como <em>IEEE Access</em>, <em>IEEE Transactions on Industrial Informatics</em> y el <em>International Journal of Communication Systems</em>, entre otras.</p><p>Su investigación se centra en seguridad informática, experimentación de telco cloud native y detección de amenazas mediante aprendizaje federado e inteligencia artificial. Su experiencia también abarca seguridad de sistemas Linux, orquestación de contenedores y entornos cloud.</p>' },
  sergio: { nombre: 'Sergio Jesús González Ambriz', institucion: 'CITEDI-IPN', foto: 'assets/sergio-gonzalez-ambriz.png', contenido: '<p>Doctor en Ciencias por el Centro de Investigación en Computación del Instituto Politécnico Nacional. Desde 2019 trabaja de tiempo completo en el Centro de Investigación y Desarrollo de Tecnología Digital del IPN. Actualmente es miembro del Sistema Nacional de Investigadoras e Investigadores, en nivel candidato.</p><p>Sus intereses de investigación se centran en inteligencia artificial y ciencia de datos, con un enfoque particular en telecomunicaciones 5G e Internet de las Cosas (IoT) y su aplicación en ciudades inteligentes. Ha publicado artículos en revistas internacionales de categoría JCR y ha contribuido a proyectos sobre redes inalámbricas de próxima generación y ciudades inteligentes con diversas instituciones.</p><p>Ha dirigido alumnos de posgrado de CITEDI. Pertenece a la Red de Expertos en Telecomunicaciones del IPN y es miembro de la Red de Investigación México-Francia de la MUFRAMEX.</p>' },
  ciro: { nombre: 'Dr. Ciro Andrés Martínez García Moreno', institucion: 'CITEDI-IPN', foto: 'assets/ciro-martinez-garcia-moreno.jpg', contenido: "<p>Ingeniero en comunicaciones y electrónica por la Escuela Superior de Ingeniería Mecánica y Eléctrica del Instituto Politécnico Nacional; Especialidad en instrumentación y metrología de la Escuela Superior de Electricidad de París, Francia; Doctorado en Ciencias Físicas de la Universidad de París-XI, Francia.</p><p>Experiencia profesional como profesor-investigador y director de planeación del Centro de Investigación Científica y de Educación Superior de Ensenada, B.C.; como director técnico y fundador de la empresa de base tecnológica Eclectek en Ensenada, B.C.; como asesor tecnológico del Instituto Latinoamericano de la Comunicación Educativa; y como profesor-investigador y director del Centro de Investigación y Desarrollo de Tecnología Digital del Instituto Politécnico Nacional en Tijuana, B.C.</p><p>Su experiencia docente incluye cursos de licenciatura, especialidad, maestría y doctorado en instituciones nacionales e internacionales, siendo director de varias tesis de maestría y licenciatura. Ha dirigido y participado en diversos proyectos de investigación y cuenta con publicaciones en revistas y memorias de congresos nacionales e internacionales.</p><p>Sus líneas de interés son: internet de las cosas, ciudades inteligentes y sistemas digitales. Es miembro de la Red de Expertos en Telecomunicaciones del Instituto Politécnico Nacional y actual coordinador de los programas de Maestría y Doctorado en Ciencias en Sistemas Digitales del Instituto Politécnico Nacional.</p>" },
  mireya: { nombre: 'Mireya Saraí García Vázquez', institucion: 'CITEDI-IPN', foto: 'assets/mireya-garcia-vazquez.jpg', contenido: '<p>Actualmente está adscrita como investigadora titular del IPN en CITEDI, Tijuana, Baja California, y es líder del laboratorio de investigación «Análisis multimedia y aprendizaje profundo».</p><p>Su producción científica incluye publicaciones en revistas internacionales, libros, capítulos y conferencias. Su investigación aplica inteligencia artificial a la preservación del patrimonio cultural de México, a la preservación de especies marinas en peligro de extinción, al desarrollo de nuevos materiales para el espacio y al estudio de enfermedades de Alzheimer y Parkinson.</p><p>Pertenece al Sistema Nacional de Investigadoras e Investigadores, Nivel I. Fue Directora del CITEDI, ha sido seleccionada en dos ocasiones por el programa Fulbright, cuenta con tres patentes otorgadas por el Instituto Mexicano de la Propiedad Industrial y fue la primera mujer del CITEDI en obtener el Premio a la Investigación del IPN en 2022. En 2023 fue reconocida por el Gobierno del Estado de Baja California en el Muro de Honor de Mujeres Destacadas del Estado.</p><p>Es coorganizadora del workshop franco-mexicano «Inteligencia Artificial: Aplicaciones e investigación en fragilidad y demencia» y participa activamente en actividades de divulgación para promover vocaciones científicas en niñas y mujeres jóvenes.</p>' },
  jose: { nombre: 'José Cruz Núñez Pérez', institucion: 'CITEDI-IPN', foto: 'assets/jose-cruz-nunez-perez.jpg', contenido: '<p>Ingeniero en Electrónica por el Tecnológico Nacional de México (2001), Maestro en Ciencias en Ingeniería Electrónica por el Centro Nacional de Investigación y Desarrollo Tecnológico (2003) y Doctor en Ciencias por el Institut National des Sciences Appliquées de Lyon, Francia (2007).</p><p>Es miembro del Sistema Nacional de Investigadoras e Investigadores, Nivel I. En 2023 fue distinguido con el Diploma a la Investigación del Instituto Politécnico Nacional. En abril de este año recibió el título de la patente 436329: «Módulo y método electrónico basado en FPGA para la transmisión segura de imágenes usando un sistema caótico esférico de orden fraccional».</p><p>Cuenta con experiencia como responsable técnico en proyectos de investigación sobre modelado y diseño de circuitos y sistemas digitales y analógicos, radiofrecuencia y microondas. Sus contribuciones incluyen sistemas caóticos, diseño de sistemas de seguridad y soluciones en plataformas FPGA y DSP.</p><p>Actualmente es profesor investigador de tiempo completo y responsable del Laboratorio de Telecomunicaciones del Centro de Investigación y Desarrollo de Tecnología Digital del Instituto Politécnico Nacional.</p>' },
  panel: { nombre: 'Panel: Colaboración académica: retos y oportunidades', institucion: 'MODERA JORGE GARCÍA FLORES · MUFRAMEX', contenido: '<p>Participan:</p><ul class="panelistas"><li><strong>Jenny Benois-Pineau</strong><br />Université Bordeaux, LABRI UMR 5800</li><li><strong>Mireya Saraí García Vázquez</strong><br />CITEDI-IPN</li><li><strong>Alán Rodrigo Díaz Rizo</strong><br />Sorbonne University, CNRS, LIP6</li><li><strong>José Cruz Núñez Pérez</strong><br />CITEDI-IPN</li></ul>' }
};

perfiles['sergio-ciro'] = {
  nombre: 'Sergio Jesús González Ambriz y Ciro Andrés Martínez García Moreno',
  institucion: 'CITEDI-IPN',
  contenido: '<section class="semblanza-compartida"><h3>Sergio Jesús González Ambriz</h3><p>Doctor en Ciencias por el IPN e investigador del CITEDI. Su investigación se enfoca en inteligencia artificial, ciencia de datos, telecomunicaciones 5G e Internet de las Cosas aplicados a ciudades inteligentes.</p><h3>Dr. Ciro Andrés Martínez García Moreno</h3><p>Doctor en Ciencias Físicas por la Universidad de París-XI, con trayectoria como profesor-investigador y director del CITEDI. Sus líneas de interés son Internet de las Cosas, ciudades inteligentes y sistemas digitales. Coordina los programas de Maestría y Doctorado en Ciencias en Sistemas Digitales del IPN.</p></section>'
};

const horarios = {
  alan: '08:05–09:00 H · Panel',
  jenny: '08:05–09:00 H · Panel',
  mireya: '08:05–09:00 H · Panel',
  jose: '08:05–09:00 H · Panel',
  gladys: '09:00–09:20 H · Plática conjunta con David A. Cordova Morales',
  david: '09:00–09:20 H · Plática conjunta con Gladys Diaz',
  'gladys-david': '09:00–09:20 H · Plática',
  carlos: '09:20–09:40 H · Plática',
  sergio: '09:40–10:00 H · Plática conjunta con Ciro Andrés Martínez García Moreno',
  ciro: '09:40–10:00 H · Plática conjunta con Sergio Jesús González Ambriz',
  'sergio-ciro': '09:40–10:00 H · Plática',
  panel: '08:05–09:00 H · Panel'
};

const modal = document.querySelector('#perfil-modal');
const modalNombre = document.querySelector('#perfil-nombre');
const modalInstitucion = document.querySelector('#perfil-institucion');
const modalContenido = document.querySelector('#perfil-contenido');
document.querySelectorAll('[data-profile]').forEach((button) => button.addEventListener('click', () => {
  const perfil = perfiles[button.dataset.profile];
  if (!perfil || !modal) return;
  modalNombre.textContent = perfil.nombre;
  modalInstitucion.textContent = horarios[button.dataset.profile]
    ? `${horarios[button.dataset.profile]} · ${perfil.institucion}`
    : perfil.institucion;
  modalContenido.innerHTML = `${perfil.foto ? `<img class="perfil-foto ${perfil.fotoClase || ''}" src="${perfil.foto}" alt="${perfil.nombre}" />` : ''}${perfil.contenido}`;
  modal.showModal();
  window.trackEvent?.('perfil_abierto', { participant: button.dataset.profile });
}));
document.querySelector('.modal-cerrar')?.addEventListener('click', () => modal?.close());
modal?.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
