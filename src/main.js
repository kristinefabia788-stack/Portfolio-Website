const profilePhoto = new URL('../assets/profile-photo.jpg', import.meta.url).href;
const safeDormLogo = new URL('../assets/safedorm-logo.png', import.meta.url).href;
const studentManagementImage = new URL('../assets/student-management-system.webp', import.meta.url).href;
const studentDashboardImage = new URL('../assets/responsive-student-dashboard.jpg', import.meta.url).href;

const technical = [
  ['HTML5','Markup'],['CSS3','Styling'],['JavaScript','Scripting'],
  ['Tailwind CSS','Utility CSS'],['Flutter','Mobile Apps'],['Dart','Language'],
  ['Firebase','Backend'],['Git','Version Control'],['GitHub','Collaboration'],
  ['Responsive Web Design','Layouts'],['UI/UX Design','Interfaces']
];
const soft = ['Communication','Teamwork','Problem Solving','Time Management','Adaptability','Creativity','Critical Thinking','Willingness to Learn'];
const projects = [
  { name:'SafeDorm+', badge:'Student Project', image:safeDormLogo, imageClass:'safe-dorm-image', desc:'A dormitory safety system concept designed to help monitor residents, alerts, sensors, and room safety information through a centralized application.', tags:['Flutter','Dart','Firebase','UI/UX Design'] },
  { name:'Student Management System', badge:'Student Project', image:studentManagementImage, imageFit:'cover', desc:'A student management application designed to organize student information and demonstrate authentication and database integration.', tags:['Flutter','Dart','Firebase Authentication','Firebase'] },
  { name:'Responsive Student Dashboard', badge:'Student Project', image:studentDashboardImage, imageFit:'cover', desc:'A responsive academic dashboard interface designed to present grades, attendance, subjects, announcements, schedules, and student profile information.', tags:['Flutter','Dart','Responsive UI','Material Design'] }
];
const timeline = [
  { label:'College / Undergraduate', title:'BS Information Technology', place:'Urdaneta City University', date:'Present', desc:'Currently developing skills in programming, web and mobile development, database systems, user interface design, and information technology concepts.' },
  { label:'Academic Seminar', title:'Research Ethics Seminar', place:'Urdaneta City University', date:'Seminar', desc:'Research ethics, informed consent, privacy, participant protection, and responsible handling of information.' },
  { label:'Practical Activity', title:'Responsive Interface Design Activity', place:'Hands-On Laboratory Session', date:'Hands-On Training', desc:'Creating responsive interfaces for mobile, tablet, and desktop screen sizes.' },
  { label:'Technical Training', title:'Advanced Web Development', place:'Academic Coursework & Self-Paced Exploration', date:'Continuing', desc:'Modern web development concepts and technologies.' }
];

const $ = (s) => document.querySelector(s);

$('#heroImg').src = profilePhoto;

$('#tech').innerHTML = technical.map(([n, d]) => `<div class="skill">${n}<small>${d}</small></div>`).join('');
$('#soft').innerHTML = soft.map((n) => `<div class="skill">${n}</div>`).join('');

$('#projectGrid').innerHTML = projects.map((p) => `
  <article class="card project${p.image ? ' project-with-image' : ''}">
    <div class="thumb">${p.image ? `<img class="${[p.imageFit === 'cover' ? 'project-preview-image' : '', p.imageClass || ''].filter(Boolean).join(' ')}" src="${p.image}" alt="${p.name} preview">` : p.icon}</div>
    <div class="project-content p-4">
      <span class="chip">${p.badge}</span>
      <h3 class="project-title font-semibold mt-3 text-lg">${p.name}</h3>
      <p class="project-description text-xs text-slate-400 mt-2 leading-relaxed">${p.desc}</p>
      <div class="project-tags flex flex-wrap gap-1.5 mt-3">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
  </article>`).join('');

$('#timeline').innerHTML = timeline.map((t) => `
  <li class="card">
    <div class="flex justify-between items-center gap-3 text-xs text-slate-400"><span class="text-violet-300 font-medium">${t.label}</span><span>${t.date}</span></div>
    <h3 class="font-semibold mt-2 text-lg">${t.title}</h3>
    <p class="text-xs text-emerald-400 mt-1">${t.place}</p>
    <p class="text-xs text-slate-400 mt-2 leading-relaxed">${t.desc}</p>
  </li>`).join('');

// Mobile navigation drawer
const drawer = $('#mobileDrawer');
const toggle = $('#toggle');
const closeDrawer = $('#closeDrawer');
const drawerBackdrop = $('#drawerBackdrop');
const siteHeader = $('#siteHeader');
const main = $('main');
let previousBodyOverflow = '';

const setMenu = (open) => {
  if (open) previousBodyOverflow = document.body.style.overflow;
  drawer.classList.toggle('open', open);
  drawerBackdrop.classList.toggle('visible', open);
  drawer.setAttribute('aria-hidden', String(!open));
  drawer.toggleAttribute('inert', !open);
  siteHeader.toggleAttribute('inert', open);
  main.toggleAttribute('inert', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  document.body.style.overflow = open ? 'hidden' : previousBodyOverflow;

  if (open) {
    closeDrawer.focus();
  } else {
    const focusTarget = toggle.getClientRects().length ? toggle : $('#menu a');
    focusTarget.focus();
  }
};

toggle.addEventListener('click', () => setMenu(!drawer.classList.contains('open')));
closeDrawer.addEventListener('click', () => setMenu(false));
drawerBackdrop.addEventListener('click', () => setMenu(false));
drawer.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (!drawer.classList.contains('open')) return;
  if (e.key === 'Escape') {
    setMenu(false);
    return;
  }
  if (e.key === 'Tab') {
    const focusable = [...drawer.querySelectorAll('a[href], button:not([disabled])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
  if (e.matches && drawer.classList.contains('open')) setMenu(false);
});

// Active nav link on scroll
const links = [...document.querySelectorAll('.nav-link')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      links.forEach((l) => l.classList.toggle('active', l.hash === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section').forEach((s) => observer.observe(s));

const aboutSection = $('#about');
const aboutRevealObserver = new IntersectionObserver(([entry], revealObserver) => {
  if (entry.isIntersecting) {
    aboutSection.classList.add('is-visible');
    revealObserver.unobserve(aboutSection);
  }
}, { threshold: 0.12 });
aboutRevealObserver.observe(aboutSection);

// Contact form validation (front-end only)
$('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const status = $('#status');
  const fields = [...form.querySelectorAll('[required]')];
  const invalidFields = fields.filter((field) => {
    const valid = field.checkValidity() && field.value.trim().length > 0;
    field.setAttribute('aria-invalid', String(!valid));
    return !valid;
  });

  if (invalidFields.length) {
    status.textContent = 'Please fill in all required fields with a valid email address.';
    status.className = 'text-xs min-h-4 text-pink-400';
    invalidFields[0].focus();
    return;
  }

  status.textContent = 'Thank you! Your details pass validation. This demo form is not connected to email yet.';
  status.className = 'text-xs min-h-4 text-emerald-400';
  form.reset();
  fields.forEach((field) => field.removeAttribute('aria-invalid'));
});

$('#form').addEventListener('input', (e) => {
  const field = e.target;
  if (field.matches('[required]') && field.checkValidity() && field.value.trim()) {
    field.removeAttribute('aria-invalid');
  }
});

$('#year').textContent = new Date().getFullYear();