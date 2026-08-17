const categories = ['Weapon','Battle IQ','Strength','Social Class','IQ','Abilities','Stealth','Durability','Speed','Age','Stamina'];

// The generator uses every character image in images/RPG.
// When you add their stats later, add them to each character object here.
const characterFiles = ['5Lean-GUI.png','Amp.png','Berto.png','Bite.png','Biyo.png','Blueberry.png','Bubblegum.png','Candle.png','Cask.png','Cel (Season2).png','Cel(Pre-ParT).png','Chuni (Season1).png','Chuni (Season2).png','Claw.png','Coky.png','Cricket.png','Cytra (Season1).png','Cytra (Season2).png','Dent (Season1).png','Dent (Season2).png','Dirge.png','Doxx.png','Eht.png','Elra.png','Entei.png','Entropy.png','Fig.png','Forty.png','Gate.png','Grafi.png','Hatty.png','Holly.png','HoodedFigure.png','Ian.png','Igra.png','Iram.png','Jul.png','Kal.png','Kits.png','Kora.png','Line.png','Link.png','Lit.png','Lomi.png','Look.png','Loon.png','Lulu (Season2).png','Lulu.png','Lun.png','Lyt (Product).png','Maker.png','Mann.png','Mansion.png','Match.png','Mira (Season1).png','Mira (Season2).png','MiraDad.png','MiraMom.png','Mone (Season1).png','Mone (Season2).png','Navi (Season1).png','Navi (Season2).png','Ness.png','Null (Season 1).png','Null (Season2).png','Olive.png','ParTee.png','Petrol.png','Phobia.png','Plum.png','PPSH.png','Protocol V Admin.png','Random SSG Lackey.png','Raspberry.png','RAT.png','RealPPSH.png','Ribbon.png','Rin.png','Ron.png','Sae.png','Scylla.png','See.png','Shelly.png','Shu.png','Skell.png','SkellDad.png','SkellMom.png','Snom.png','Soria.png','Sprout.png','Stellar.png','Thia.png','Tiar.png','Trench.png','Try.png','Uso.png','Vee.png','Vera.png','Verdict.png','Voice.png','Volt.png','Wat.png','Way.png','Yune.png','Ziri.png'];
const characters = characterFiles.map(file => ({
  name: file.replace(/\.png$/i, ''),
  image: `images/RPG/${encodeURIComponent(file)}`
}));

let current = null;
let picked = [];
let rolling = false;
const $ = selector => document.querySelector(selector);
const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)];

function renderCategories(){
  $('#category-tracker').innerHTML = categories.map((category, index) => {
    const choice = picked.find(item => item.category === category);
    return `<div class="col-sm-6 col-lg-4"><button class="category ${choice ? 'complete' : ''}" type="button" data-category="${category}" ${choice || rolling ? 'disabled' : ''}><small>${String(index + 1).padStart(2,'0')}</small><span><strong>${category}</strong>${choice ? `<em>${choice.character}</em>` : ''}</span></button></div>`;
  }).join('');
  document.querySelectorAll('.category:not(:disabled)').forEach(button => button.addEventListener('click', () => selectCategory(button.dataset.category)));
}

function renderCharacter(character){
  const image = $('#character-image');
  image.style.backgroundImage = `url("${character.image}")`;
  image.innerHTML = '';
  $('#character-name').textContent = character.name;
}

function drawCharacter(){
  if (rolling) return;
  rolling = true;
  renderCategories();
  $('#character-card').classList.remove('hidden');
  $('#character-card').classList.add('is-rolling');
  let steps = 0;
  const finalCharacter = randomCharacter();
  const reel = setInterval(() => {
    renderCharacter(randomCharacter());
    steps++;
    if (steps < 14) return;
    clearInterval(reel);
    current = finalCharacter;
    renderCharacter(current);
    $('#character-card').classList.remove('is-rolling');
    rolling = false;
    renderCategories();
  }, 85);
}

function selectCategory(category){
  if (rolling) return;
  picked.push({ category, character: current.name, image: current.image });
  if (picked.length === categories.length) return showResult();
  drawCharacter();
}

function start(){
  picked = []; current = null;
  $('#landing').classList.add('hidden');
  $('#result').classList.add('hidden');
  $('#draft').classList.remove('hidden');
  $('#empty-roster').classList.add('hidden');
  renderCategories();
  drawCharacter();
}

function showResult(){
  $('#draft').classList.add('hidden');
  $('#result').classList.remove('hidden');
  $('#score-grid').innerHTML = picked.map(item => `<div class="col-sm-6 col-lg-4"><article class="final"><div><small>${item.category}</small><strong>${item.character}</strong></div><img src="${item.image}" alt="${item.character}"></article></div>`).join('');
}

$('#start-button').addEventListener('click', start);
$('#play-again').addEventListener('click', start);
$('#restart-button').addEventListener('click', () => { $('#draft').classList.add('hidden'); $('#landing').classList.remove('hidden'); });
