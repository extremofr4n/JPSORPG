const categories = ['Weapon', 'Skill', 'Strength', 'Speed', 'Durability', 'Stamina', 'Stealth', 'Battle IQ', 'IQ', 'Ability', 'Social Class', 'Age'];
const scoreKeys = categories.slice(0, 10);

const characterFiles = ['5Lean-GUI.png','Amp.png','Berto.png','Bite.png','Biyo.png','Blueberry.png','Bubblegum.png','Candle.png','Cask.png','Cel (Season2).png','Cel(Pre-ParT).png','Chuni (Season1).png','Chuni (Season2).png','Claw.png','Coky.png','Cricket.png','Cytra (Season1).png','Cytra (Season2).png','Dent (Season1).png','Dent (Season2).png','Dirge.png','Dizzy.png','Doxx.png','Eht.png','Elra.png','Entei.png','Entropy.png','Fara.png','Fig.png','Forty.png','Gate.png','Grafi.png','Hatty.png','Holly.png','HoodedFigure.png','Ian.png','Igra.png','Iram.png','Jul.png','Kal.png','Kits.png','Kora.png','Line.png','Link.png','Lit.png','Lomi.png','Look.png','Loon.png','Lulu (Season2).png','Lulu.png','Lun.png','Lyt (Product).png','Maker.png','Mann.png','Mansion.png','Match.png','Mira (Season1).png','Mira (Season2).png','MiraDad.png','MiraMom.png','Mone (Season1).png','Mone (Season2).png','Navi (Season1).png','Navi (Season2).png','Ness.png','Null (Season 1).png','Null (Season2).png','Olive.png','ParTee.png','Petrol.png','Phobia.png','Plum.png','PPSH.png','Protocol V Admin.png','Random SSG Lackey.png','Raspberry.png','RAT.png','RealPPSH.png','Ribbon.png','Rin.png','Ron.png','Sae.png','Scylla.png','See.png','Sett.png','Shelly.png','Shu.png','Skell.png','SkellDad.png','SkellMom.png','Snom.png','Soria.png','Sprout.png','Stellar.png','Table.png','Thia.png','Tiar.png','Trench.png','Try.png','Turn.png','Uso.png','Vee.png','Vera.png','Verdict.png','Voice.png','Volt.png','Wat.png','Way.png','Yune.png','Ziri.png'];

// Each group is name|weapon,skill,strength,speed,durability,stamina,stealth,battle IQ,IQ,ability.
// Social Class and Age have no source scores in the supplied file, so they stay blank.
const scoreData = '5Lean-GUI|1,2,1,1,2,5,1,1,2,3;Amp|1,3,1,1,1,1,2,1,3,1;Berto|1,4,3,2,3,1,1,3,3,1;Bite|2,2,1,2,1,1,3,2,1,1;Biyo|1,1,1,1,1,2,1,1,3,1;Blueberry|1,1,1,1,1,1,1,1,1,1;Candle|1,4,1,2,3,3,1,1,2,3;Cask|2,3,2,1,2,1,1,2,3,4;Cel (Season2)|4,3,4,2,1,2,2,3,2,3;Cel(Pre-ParT)|4,2,3,1,1,2,2,3,2,3;Chuni (Season1)|3,2,1,2,2,1,1,3,4,1;Chuni (Season2)|4,2,1,3,2,1,1,4,3,1;Claw|1,1,1,1,1,1,1,1,1,1;Coky|1,3,1,1,2,1,1,5,4,4;Cricket|5,4,4,2,2,3,5,2,3,1;Cytra (Season1)|1,1,1,1,1,1,1,1,1,1;Cytra (Season2)|1,5,1,5,1,1,1,3,4,3;Dent (Season1)|3,3,1,1,2,1,1,3,4,1;Dent (Season2)|4,3,2,1,2,1,1,3,4,1;Dirge|4,5,1,4,2,5,3,5,4,1;Dizzy|1,2,2,2,2,1,2,2,3,3;Doxx|1,1,1,1,1,1,1,1,3,1;Eht|5,2,5,4,4,3,1,1,1,5;Elra|1,3,1,1,1,1,1,1,3,1;Entei|1,1,1,1,1,1,1,1,1,1;Entropy|1,1,1,1,1,1,1,1,1,1;Fig|1,1,1,1,1,1,1,1,1,1;Forty|1,3,4,4,5,4,1,3,1,5;Gate|1,2,2,1,1,1,1,1,2,1;Grafi|4,5,3,4,3,2,1,5,2,1;Hatty|1,1,1,1,1,1,1,1,1,1;Holly|1,1,1,1,1,1,1,1,1,1;HoodedFigure|5,5,2,1,3,2,4,4,3,2;Ian|3,2,1,1,1,1,1,2,4,1;Igra|1,2,3,1,1,1,1,1,2,1;Iram|1,1,1,1,1,1,1,1,1,1;Jul|3,1,5,3,4,3,1,1,2,1;Kal|2,2,4,3,2,3,1,4,1,1;Kits|3,2,1,1,1,5,2,2,3,1;Kora|1,1,1,1,1,1,1,1,1,1;Line|1,1,1,1,1,1,1,1,1,1;Link|3,3,2,2,1,1,1,2,3,1;Lit|1,1,1,1,1,1,1,1,1,1;Lomi|1,1,1,1,1,1,1,1,1,1;Look|1,1,1,1,1,1,1,1,1,1;Loon|1,1,1,3,1,1,1,1,1,1;Lulu|1,3,1,1,2,1,1,2,2,1;Lulu (Season2)|1,3,1,1,2,1,1,2,2,1;Lun|1,1,1,1,1,1,1,1,1,1;Lyt (Product)|4,3,4,3,2,3,1,4,3,4;Maker|3,5,1,2,1,1,1,1,5,4;Mann|3,3,2,3,2,3,1,3,2,1;Mansion|1,5,1,1,1,1,1,4,5,1;Match|5,3,5,4,4,3,1,5,2,3;Mira (Season1)|3,2,2,2,1,1,1,3,1,2;Mira (Season2)|2,3,3,2,1,2,1,3,2,2;MiraDad|1,4,1,2,2,3,1,2,4,1;MiraMom|1,4,1,2,1,3,3,1,3,1;Mone (Season1)|1,1,2,2,1,1,1,3,1,1;Mone (Season2)|2,2,2,5,1,2,1,3,2,1;Navi (Season1)|4,2,3,3,1,1,2,1,1,1;Navi (Season2)|4,2,3,3,2,2,3,2,2,1;Ness|2,3,1,2,2,1,1,1,4,1;Null (Season 1)|3,4,1,3,3,1,3,4,4,2;Null (Season2)|4,3,1,3,3,1,3,5,4,3;Olive|1,1,1,1,1,1,1,1,1,1;ParTee|4,3,1,1,4,5,1,1,1,4;Petrol|1,5,1,2,1,3,1,3,3,1;Phobia|1,1,1,1,1,1,1,1,1,1;Plum|1,1,1,1,1,1,1,1,1,1;PPSH|3,4,3,2,3,1,1,3,2,2;Protocol V Admin|1,1,1,1,1,1,1,3,3,1;Random SSG Lackey|1,1,2,1,1,1,1,1,1,1;Raspberry|1,1,1,1,1,1,1,1,1,1;RAT|1,4,1,3,1,2,3,2,4,3;RealPPSH|3,4,3,2,5,1,1,3,2,5;Ribbon|1,1,1,1,1,1,1,1,1,1;Rin|1,4,1,1,2,2,1,1,3,1;Ron|2,2,3,2,3,2,1,4,2,1;Sae|4,4,1,2,1,2,1,5,5,1;Scylla|1,5,3,2,4,1,1,4,2,3;See|1,1,1,1,1,1,1,1,1,1;Sett|3,3,1,1,1,1,2,4,4,1;Shelly|2,3,2,1,2,3,1,3,2,4;Shu|2,2,1,1,1,1,1,3,1,1;Skell|2,2,4,2,3,3,1,3,2,1;SkellDad|1,1,1,1,1,1,1,1,1,1;SkellMom|1,1,1,1,1,1,1,1,1,1;Snom|1,1,1,1,1,1,1,1,1,1;Soria|1,1,1,1,1,1,1,1,1,1;Sprout|1,1,1,1,1,1,1,1,1,1;Stellar|1,1,1,1,1,1,1,1,1,1;Table|3,2,3,1,3,2,1,2,2,3;Thia|2,3,3,1,2,2,1,1,2,1;Tiar|1,1,1,1,1,1,1,1,1,1;Trench|2,2,3,1,3,1,1,2,1,1;Try|1,1,3,2,5,5,1,1,2,3;Turn|3,2,1,3,1,2,2,3,2,1;Uso|2,3,3,2,5,4,1,3,1,5;Vee|3,5,2,4,2,2,1,2,4,2;Vera|3,4,1,2,1,3,1,3,4,1;Verdict|4,4,5,5,4,2,2,5,3,3;Voice|2,3,1,2,1,1,3,2,4,4;Volt|1,3,1,1,2,3,1,1,2,4;Wat|1,3,1,2,1,3,1,1,3,1;Way|1,1,1,1,1,1,1,1,1,1;Yune|1,1,1,1,1,1,1,1,1,1;Ziri|2,4,1,1,1,2,1,1,4,1';
const scoreLookup = Object.fromEntries(scoreData.split(';').map(entry => {
  const [name, values] = entry.split('|');
  return [name, Object.fromEntries(scoreKeys.map((key, index) => [key, Number(values.split(',')[index])]))];
}));
const characters = characterFiles.map(file => {
  const name = file.replace(/\.png$/i, '');
  return { name, image: `images/RPG/${encodeURIComponent(file)}`, scores: scoreLookup[name] || {} };
});

let current = null;
let picked = [];
let rolling = false;
let expertMode = false;
let drawnCharacters = [];
const $ = selector => document.querySelector(selector);
const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)];
const scoreFor = (character, category) => character.scores[category] ?? '';
const scoreLabel = score => score === '' ? '' : String(score);

function renderCategories() {
  $('#category-tracker').innerHTML = categories.map((category, index) => {
    const choice = picked.find(item => item.category === category);
    const score = expertMode ? '' : choice ? scoreLabel(choice.score) : current && !rolling ? scoreLabel(scoreFor(current, category)) : '';
    const character = choice ? `<em>${choice.character}</em>` : '';
    return `<div class="col-sm-6 col-lg-4"><button class="category ${choice ? 'complete' : ''}" type="button" data-category="${category}" ${choice || rolling ? 'disabled' : ''}><small>${String(index + 1).padStart(2, '0')}</small><span><strong>${category}</strong>${character}</span>${score ? `<b class="category-score">${score}</b>` : ''}</button></div>`;
  }).join('');
  document.querySelectorAll('.category:not(:disabled)').forEach(button => button.addEventListener('click', () => selectCategory(button.dataset.category)));
}

function renderCharacter(character) {
  const image = $('#character-image');
  image.style.backgroundImage = `url("${character.image}")`;
  image.innerHTML = '';
  $('#character-name').textContent = character.name;
}

function drawCharacter() {
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
    drawnCharacters.push(current);
    renderCharacter(current);
    $('#character-card').classList.remove('is-rolling');
    rolling = false;
    renderCategories();
  }, 85);
}

function selectCategory(category) {
  if (rolling) return;
  if (Math.random() < 0.01) {
    showJumpscare(() => saveCategory(category));
    return;
  }
  saveCategory(category);
}

function saveCategory(category) {
  picked.push({ category, character: current.name, image: current.image, score: scoreFor(current, category), drawIndex: drawnCharacters.length - 1 });
  if (picked.length === categories.length) return showResult();
  drawCharacter();
}

function start() {
  picked = [];
  current = null;
  drawnCharacters = [];
  expertMode = $('#expert-mode').checked;
  $('#landing').classList.add('hidden');
  $('#result').classList.add('hidden');
  $('#draft').classList.remove('hidden');
  $('#empty-roster').classList.add('hidden');
  renderCategories();
  drawCharacter();
}

function showResult() {
  $('#draft').classList.add('hidden');
  $('#result').classList.remove('hidden');
  const currentTotal = picked.reduce((total, item) => total + (Number(item.score) || 0), 0);
  const optimalDraft = getOptimalDraft(drawnCharacters);
  $('#final-score').innerHTML = `<span>Final score</span><strong>${currentTotal} / ${optimalDraft.total}</strong><small>best possible from your draws</small>`;
  $('#score-grid').innerHTML = picked.map(item => {
    const optimalStat = optimalDraft.assignments[item.drawIndex];
    const optimalScore = optimalStat ? scoreLabel(scoreFor(drawnCharacters[item.drawIndex], optimalStat)) : '';
    const optimalHint = expertMode && optimalStat ? `(${optimalStat}${optimalScore ? ` ${optimalScore}` : ''}) ` : '';
    return `<div class="col-sm-6 col-lg-4"><article class="final"><div><small>${[item.category, scoreLabel(item.score)].filter(Boolean).join(' · ')}</small><strong>${optimalHint}${item.character}</strong></div><img src="${item.image}" alt="${item.character}"></article></div>`;
  }).join('');
}

function getOptimalDraft(charactersDrawn) {
  let drafts = Array(1 << categories.length);
  drafts[0] = { total: 0, assignments: [] };

  charactersDrawn.forEach(character => {
    const nextDrafts = Array(1 << categories.length);
    drafts.forEach((draft, usedCategories) => {
      if (!draft) return;
      categories.forEach((category, index) => {
        if (usedCategories & (1 << index)) return;
        const newMask = usedCategories | (1 << index);
        const total = draft.total + (Number(scoreFor(character, category)) || 0);
        if (!nextDrafts[newMask] || total > nextDrafts[newMask].total) {
          nextDrafts[newMask] = { total, assignments: [...draft.assignments, category] };
        }
      });
    });
    drafts = nextDrafts;
  });

  return drafts.reduce((best, draft) => !draft || best && best.total >= draft.total ? best : draft, null);
}

function showJumpscare(onComplete) {
  rolling = true;
  renderCategories();
  const jumpscare = $('#jumpscare');
  const sound = $('#jumpscare-sound');
  jumpscare.classList.remove('hidden');
  jumpscare.setAttribute('aria-hidden', 'false');
  sound.pause();
  sound.currentTime = 0;
  sound.volume = 1;
  sound.play().catch(() => {});
  setTimeout(() => {
    jumpscare.classList.add('hidden');
    jumpscare.setAttribute('aria-hidden', 'true');
    sound.pause();
    sound.currentTime = 0;
    rolling = false;
    onComplete();
  }, 1800);
}

$('#start-button').addEventListener('click', start);
$('#play-again').addEventListener('click', start);
$('#restart-button').addEventListener('click', () => { $('#draft').classList.add('hidden'); $('#landing').classList.remove('hidden'); });
