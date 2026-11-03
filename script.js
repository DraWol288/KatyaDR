/* ============================================================
   0. ГОД В ФУТЕРЕ
============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   1. КОРОБКА + ПЛЕЕР
============================================================ */
const giftBox = document.getElementById('giftBox');
const player  = document.getElementById('player');
const hint    = document.getElementById('hint');
const audio   = document.getElementById('audio');
const nowPlaying = document.getElementById('nowPlaying');
const trackList  = document.getElementById('trackList');

let opened = false;
giftBox.addEventListener('click', () => {
  if (opened) return;
  opened = true;
  giftBox.classList.add('open');
  hint.textContent = 'Готово! Внутри — плейлист 💜';
  setTimeout(() => {
    player.classList.add('show');
    burstConfetti(0.4);
  }, 700);
});

trackList.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    trackList.querySelectorAll('li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');
    audio.src = li.dataset.src;
    nowPlaying.textContent = '▶ ' + li.dataset.name;
    audio.play().catch(()=>{});
  });
});

/* ============================================================
   2. КОМПЛИМЕНТЫ (ЗАМЕНИ ТЕКСТЫ НА СВОИ)
============================================================ */
const compliments = [
  "Ты — человек, который делает этот мир теплее 💜",
  "С тобой даже обычный день превращается в праздник ✨",
  "Ты умеешь слушать так, как никто другой 🎧",
  "Твоя улыбка — это отдельный вид искусства 😊",
  "Ты смеёшься так заразительно, что невозможно не улыбнуться 😂",
  "С тобой легко молчать и легко говорить — это редкий дар 🌙",
  "Ты — причина, по которой кто-то (я) верит в дружбу 💙",
  "Твоя энергия заряжает даже на расстоянии ⚡",
  "Ты красива и внутри, и снаружи — редкое сочетание 💎",
  "Ты справляешься со всем — и делаешь это стильно 🔥",
];

const cBox = document.getElementById('complimentBox');
const cBtn = document.getElementById('complimentBtn');
cBtn.addEventListener('click', () => {
  const rand = compliments[Math.floor(Math.random()*compliments.length)];
  cBox.classList.remove('pop');
  void cBox.offsetWidth;
  cBox.textContent = rand;
  cBox.classList.add('pop');
  burstConfetti(0.25);
});

/* ============================================================
   3. THREE.JS — КОМПАКТНЫЙ 3D ТОРТ
============================================================ */
(function initThree(){
  const canvas = document.getElementById('three-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 1.2, 7.5);

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0x9955ff, 1.2));
  const p1 = new THREE.PointLight(0xb26bff, 2.5, 30); p1.position.set(4,6,4); scene.add(p1);
  const p2 = new THREE.PointLight(0x4d7dff, 2.5, 30); p2.position.set(-4,3,-4); scene.add(p2);

  const cake = new THREE.Group();
  cake.scale.set(0.85, 0.85, 0.85);

  const baseMat = new THREE.MeshStandardMaterial({color:0x7a3cff, emissive:0x4a1a9a, emissiveIntensity:.5, roughness:.3, metalness:.4});
  const base = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.1, 0.7, 48), baseMat);
  base.position.y = -1;
  cake.add(base);

  const midMat = new THREE.MeshStandardMaterial({color:0xb26bff, emissive:0x6a2acc, emissiveIntensity:.6, roughness:.3, metalness:.5});
  const mid = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.7, 0.7, 48), midMat);
  mid.position.y = -0.3;
  cake.add(mid);

  const topMat = new THREE.MeshStandardMaterial({color:0x4d7dff, emissive:0x1a3aaa, emissiveIntensity:.7, roughness:.25, metalness:.6});
  const top = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.3, 0.7, 48), topMat);
  top.position.y = 0.4;
  cake.add(top);

  for(let i=0;i<5;i++){
    const angle = (i/5)*Math.PI*2;
    const candle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06,0.06,0.6,12),
      new THREE.MeshStandardMaterial({color:0xffddff, emissive:0xb26bff, emissiveIntensity:1})
    );
    candle.position.set(Math.cos(angle)*0.7, 1.05, Math.sin(angle)*0.7);
    cake.add(candle);

    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.1,12,12),
      new THREE.MeshBasicMaterial({color:0xffcc55})
    );
    flame.position.set(Math.cos(angle)*0.7, 1.45, Math.sin(angle)*0.7);
    cake.add(flame);
  }

  scene.add(cake);

  let mouseX=0, mouseY=0, targetX=0, targetY=0;
  canvas.addEventListener('mousemove', e=>{
    const r = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - r.left)/r.width - .5)*2;
    mouseY = ((e.clientY - r.top)/r.height - .5)*2;
  });

  function animate(){
    requestAnimationFrame(animate);
    targetX += (mouseX - targetX)*0.05;
    targetY += (mouseY - targetY)*0.05;
    cake.rotation.y += 0.008;
    cake.rotation.x = targetY*0.3;
    cake.rotation.z = -targetX*0.2;
    cake.position.y = Math.sin(Date.now()*0.0015)*0.1;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', ()=>{
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w/h; camera.updateProjectionMatrix();
    renderer.setSize(w,h,false);
  });
})();

/* ============================================================
   4. LEAFLET КАРТА — мерцающая градиентная линия
   От Хельсинки — фиолетовый, от Слободского — синий,
   в середине сливаются
============================================================ */
(function initLeafletMap(){
  const helsinki = [60.1699, 24.9384];    // Хельсинки 💜
  const slobodskoy = [58.7238, 50.1767];  // Слободской 💙

  const map = L.map('map-container', {
    center: [(helsinki[0]+slobodskoy[0])/2, (helsinki[1]+slobodskoy[1])/2],
    zoom: 6,
    zoomControl: true,
    scrollWheelZoom: true,
    attributionControl: false,
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 18,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://openstreetmap.fr">OSM France</a>',
    crossOrigin: true,
  }).addTo(map);

  function pulseIcon(color){
    return L.divIcon({
      className: '',
      html: `<div class="pulse-marker" style="background:${color};color:${color};"></div>`,
      iconSize: [20,20],
      iconAnchor: [10,10],
      popupAnchor: [0,-10],
    });
  }

  const markHelsinki = L.marker(helsinki, {icon: pulseIcon('#b26bff')})
    .addTo(map)
    .bindPopup('<b>Хельсинки 🇫🇮</b><br>привет от тебя 💜');

  const markSlobodskoy = L.marker(slobodskoy, {icon: pulseIcon('#4d7dff')})
    .addTo(map)
    .bindPopup('<b>Слободской 🇷🇺</b><br>привет от меня 💙');

  /* ------------------------------------------------------------
     ГРАДИЕНТНАЯ ЛИНИЯ
     Разбиваем прямую на 60 сегментов, каждому — свой цвет.
     От Хельсинки — фиолетовый, к Слободскому — синий,
     в середине — плавное слияние через smoothstep.
  ------------------------------------------------------------ */
  const SEGMENTS = 60;
  const lineLayers = [];

  const purple = [178, 107, 255];  // #b26bff
  const blue   = [ 77, 125, 255];  // #4d7dff

  function lerpColor(t){
    const r = Math.round(purple[0] + (blue[0]-purple[0])*t);
    const g = Math.round(purple[1] + (blue[1]-purple[1])*t);
    const b = Math.round(purple[2] + (blue[2]-purple[2])*t);
    return `rgb(${r},${g},${b})`;
  }
  function smoothstep(t){
    return t*t*(3 - 2*t);
  }

  for (let i = 0; i < SEGMENTS; i++){
    const t1 = i / SEGMENTS;
    const t2 = (i + 1) / SEGMENTS;

    const lat1 = helsinki[0] + (slobodskoy[0]-helsinki[0]) * t1;
    const lng1 = helsinki[1] + (slobodskoy[1]-helsinki[1]) * t1;
    const lat2 = helsinki[0] + (slobodskoy[0]-helsinki[0]) * t2;
    const lng2 = helsinki[1] + (slobodskoy[1]-helsinki[1]) * t2;

    const color = lerpColor(smoothstep(t1));

    const seg = L.polyline([[lat1,lng1],[lat2,lng2]], {
      color: color,
      weight: 5,
      opacity: 0.95,
      lineCap: 'round',
      className: 'gradient-line',
    }).addTo(map);

    lineLayers.push(seg);
  }

  /* ------------------------------------------------------------
     БЕГУЩИЙ ИМПУЛЬС — светящаяся точка едет по линии туда-сюда
  ------------------------------------------------------------ */
  const pulseDot = L.circleMarker(helsinki, {
    radius: 5,
    color: '#ffffff',
    fillColor: '#ffffff',
    fillOpacity: 1,
    weight: 2,
    className: 'line-pulse',
  }).addTo(map);

  let pulseT = 0;
  let pulseDir = 1;
  setInterval(() => {
    pulseT += 0.012 * pulseDir;
    if (pulseT >= 1){ pulseT = 1; pulseDir = -1; }
    if (pulseT <= 0){ pulseT = 0; pulseDir = 1; }

    const t = smoothstep(pulseT);
    const lat = helsinki[0] + (slobodskoy[0]-helsinki[0]) * t;
    const lng = helsinki[1] + (slobodskoy[1]-helsinki[1]) * t;
    pulseDot.setLatLng([lat, lng]);

    const c = lerpColor(t);
    pulseDot.setStyle({ fillColor: '#ffffff', color: c });
  }, 40);

  /* ------------------------------------------------------------
     ПРИБЛИЖЕНИЕ / ОТДАЛЕНИЕ
  ------------------------------------------------------------ */
  const lineGroup = L.featureGroup([...lineLayers, markHelsinki, markSlobodskoy]);

  let isZoomed = false;
  function zoomToLine(){
    if (isZoomed) return;
    isZoomed = true;
    map.flyToBounds(lineGroup.getBounds(), {
      padding: [80, 80],
      duration: 1.2,
      maxZoom: 7,
    });
  }
  function zoomOut(){
    if (!isZoomed) return;
    isZoomed = false;
    map.flyToBounds(lineGroup.getBounds(), {
      padding: [180, 180],
      duration: 1.0,
      maxZoom: 5,
    });
  }

  const container = document.getElementById('map-container');
  container.addEventListener('mouseenter', zoomToLine);
  container.addEventListener('mouseleave', zoomOut);

  let touchZoomed = false;
  container.addEventListener('touchstart', () => {
    if (touchZoomed){ zoomOut(); touchZoomed = false; }
    else            { zoomToLine(); touchZoomed = true; }
  }, {passive:true});

  map.on('dblclick', zoomToLine);

  setTimeout(() => {
    map.flyToBounds(lineGroup.getBounds(), {
      padding: [150, 150],
      duration: 1.5,
      maxZoom: 6,
    });
  }, 500);

  window.addEventListener('resize', () => {
    setTimeout(() => map.invalidateSize(), 200);
  });
})();

/* ============================================================
   5. КОНФЕТТИ
============================================================ */
function burstConfetti(intensity = 0.5){
  const colors = ['#b26bff','#7a3cff','#4d7dff','#e0b0ff','#ffffff'];
  confetti({
    particleCount: Math.floor(120 * intensity * 2),
    spread: 90,
    origin: {y: 0.6},
    colors: colors,
    scalar: 1.1,
  });
  setTimeout(()=>{
    confetti({
      particleCount: Math.floor(80 * intensity * 2),
      angle: 60,
      spread: 70,
      origin: {x: 0, y: 0.7},
      colors: colors,
    });
    confetti({
      particleCount: Math.floor(80 * intensity * 2),
      angle: 120,
      spread: 70,
      origin: {x: 1, y: 0.7},
      colors: colors,
    });
  }, 200);
}

document.getElementById('partyBtn').addEventListener('click', () => {
  const duration = 2500;
  const end = Date.now() + duration;
  (function frame(){
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: {x: 0},
      colors: ['#b26bff','#7a3cff','#4d7dff']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: {x: 1},
      colors: ['#b26bff','#7a3cff','#4d7dff']
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  burstConfetti(1);
});

window.addEventListener('load', () => {
  setTimeout(() => burstConfetti(0.6), 400);
});

/* ============================================================
   6. ТЕМА С СЮРПРИЗОМ
============================================================ */
const themeBtn = document.getElementById('themeBtn');
let isLight = false;
themeBtn.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  document.body.classList.toggle('party', !isLight);
  themeBtn.textContent = isLight ? '☀️ Дневная версия' : '🌙 Ночная версия';
  if (!isLight){
    burstConfetti(0.7);
  }
});
document.body.classList.add('party');

/* ============================================================
   7. EASTER EGGS (ЗАМЕНИ ТЕКСТЫ НА ВАШИ МЕМЫ)
============================================================ */
const eggs = [
  {pos:{top:'12%', left:'8%'},  text:'🐸 Трахни Полину, чтобы Катя ахуела — это явно не забудется'},
  {pos:{top:'28%', right:'6%'}, text:'🍕 Ролки с многострочными постами — легендарный период'},
  {pos:{top:'55%', left:'4%'},  text:'💜 Рак речи — неизлечимый, но привычный диагноз'},
  {pos:{top:'72%', right:'9%'}, text:'🎮 Шецати — наш шип созданный до его известности в фикбуке'},
  {pos:{top:'88%', left:'12%'}, text:'🚀 «Погнали в Хельсинки!» — когда-нибудь точно'},
];

const toast = document.getElementById('eggToast');
let toastTimer;
eggs.forEach((egg, i) => {
  const el = document.createElement('div');
  el.className = 'egg';
  Object.assign(el.style, egg.pos);
  el.title = '???';
  el.addEventListener('click', () => {
    toast.innerHTML = egg.text + '<small>нажми, чтобы закрыть · пасхалка #'+(i+1)+'</small>';
    toast.classList.add('show');
    burstConfetti(0.3);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'), 5000);
  });
  document.body.appendChild(el);
});
toast.addEventListener('click', ()=> toast.classList.remove('show'));

let typed = '';
document.addEventListener('keydown', e => {
  typed += e.key.toLowerCase();
  if (typed.length > 6) typed = typed.slice(-6);
  if (typed.includes('love')){
    typed = '';
    toast.innerHTML = '💜💙 Секретный код активирован!<small>Ты нашёл(ла) главную пасхалку · нажми, чтобы закрыть</small>';
    toast.classList.add('show');
    const end = Date.now() + 3000;
    (function f(){
      confetti({particleCount:8, spread:360, origin:{x:Math.random(), y:Math.random()}, colors:['#b26bff','#4d7dff','#fff']});
      if (Date.now() < end) requestAnimationFrame(f);
    })();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'), 6000);
  }
});

document.addEventListener('keydown', e => {
  typed += e.key.toLowerCase();
  if (typed.includes('cake')){
    typed = '';
    burstConfetti(1.5);
  }
});