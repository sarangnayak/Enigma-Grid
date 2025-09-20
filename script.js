// Grid & encryption logic
const gridHolder = document.getElementById('gridHolder');
const inBox = [];
const outputSpan = document.getElementById('output');
const seedSpan = document.getElementById('seed');
const inputField = document.getElementById('userInput');
const seedWindow = document.querySelector('.seedwindow');
const seedTextarea = seedWindow.querySelector('textarea');
const toggleBtn = document.querySelector('.toggle-btn');
const copyInputBtn = document.getElementById('copyInput');
const copyOutputBtn = document.getElementById('copyOutput');
const copySeedBtn = document.getElementById('copySeed');

// Create 23x23 grid
for(let i=0;i<529;i++){
  const cell = document.createElement('div');
  cell.classList.add('inner');
  gridHolder.appendChild(cell);
  inBox.push(cell);
}

// Randomize grid & encrypt
function updateGrid(){
  let binaryKey = '';
  inBox.forEach(cell => {
    if(Math.random() < 0.5){
      const hue = 270 + Math.random()*60; // purple range
      const color = `hsl(${hue}, 80%, 60%)`;
      cell.style.backgroundColor = color;
      binaryKey += '1';
    } else {
      cell.style.backgroundColor = 'transparent';
      binaryKey += '0';
    }
  });

  seedSpan.textContent = binaryKey;
  seedTextarea.value = binaryKey;

  const msg = inputField.value || 'enigma.Grid';
  const keyBytes = new Uint8Array(Math.ceil(binaryKey.length/8));
  for(let i=0;i<binaryKey.length;i+=8){
    const byte = binaryKey.substring(i,i+8).padEnd(8,'0');
    keyBytes[i/8] = parseInt(byte,2);
  }
  const inputBytes = new TextEncoder().encode(msg);
  const encryptedBytes = new Uint8Array(inputBytes.length);
  for(let i=0;i<inputBytes.length;i++){
    encryptedBytes[i] = inputBytes[i] ^ keyBytes[i % keyBytes.length];
  }
  outputSpan.textContent = btoa(String.fromCharCode(...encryptedBytes));
}

// Animate cells with GSAP
function animateCells(){
  inBox.forEach((cell,i)=>{
    gsap.to(cell,{
      scale: Math.random()*0.6 +0.7,
      duration: 1.5,
      yoyo:true,
      repeat:-1,
      delay: (i%23)*0.02
    });
  });
}

// Particle background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for(let i=0;i<150;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx:(Math.random()-0.5)*1.2,
    vy:(Math.random()-0.5)*1.2,
    size: Math.random()*2+1,
    hue: 270 + Math.random()*60
  });
}

function animateCanvas(){
  ctx.fillStyle = 'rgba(26,13,44,0.15)'; // match bg
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    if(p.x<0 || p.x>canvas.width) p.vx*=-1;
    if(p.y<0 || p.y>canvas.height) p.vy*=-1;

    ctx.fillStyle = `hsl(${p.hue},80%,70%)`;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    // small star shape
    const spikes = 4;
    const outer = p.size*2;
    const inner = p.size;
    for(let i=0;i<spikes;i++){
      const angle = (i*(Math.PI*2)/spikes);
      ctx.lineTo(p.x + Math.cos(angle)*outer, p.y + Math.sin(angle)*outer);
      const angle2 = angle + Math.PI/spikes;
      ctx.lineTo(p.x + Math.cos(angle2)*inner, p.y + Math.sin(angle2)*inner);
    }
    ctx.closePath();
    ctx.fill();
  });
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// Seed toggle with smooth transition
let open = false;
toggleBtn.addEventListener('click',()=>{
  open = !open;
  gsap.to(seedWindow, {left: open ? 20 : -350, duration:0.5, ease:"power2.out"});
  toggleBtn.textContent = open ? '× Hide Seed' : '+ Show Seed';
});

// Copy buttons
copyInputBtn.addEventListener('click',()=>navigator.clipboard.writeText(inputField.value));
copyOutputBtn.addEventListener('click',()=>navigator.clipboard.writeText(outputSpan.textContent));
copySeedBtn.addEventListener('click',()=>navigator.clipboard.writeText(seedSpan.textContent));

// Update loop
updateGrid();
animateCells();
setInterval(updateGrid,5000);

// Responsive
window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Animate credit "Made by Sarang Nayak"
document.addEventListener('DOMContentLoaded', () => {
  const creditWrapper = document.querySelector('.credit .ml12');
  if(creditWrapper){
    creditWrapper.innerHTML = creditWrapper.textContent.replace(/\S/g,"<span class='letter'>$&</span>");
    anime.timeline({loop:true})
      .add({
        targets: '.credit .ml12 .letter',
        translateY: [20,0],
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el,i)=> 50*i
      }).add({
        targets: '.credit .ml12 .letter',
        translateY: [0,-20],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1000,
        delay: (el,i)=> 30*i
      });
  }
});
