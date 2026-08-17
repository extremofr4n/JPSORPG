const characterFiles = ['5Lean-GUI.png','Amp.png','Berto.png','Bite.png','Biyo.png','Blueberry.png','Bubblegum.png','Candle.png','Cask.png','Cel (Season2).png','Cel(Pre-ParT).png','Chuni (Season1).png','Chuni (Season2).png','Claw.png','Coky.png','Cricket.png','Cytra (Season1).png','Cytra (Season2).png','Dent (Season1).png','Dent (Season2).png','Dirge.png','Dizzy.png','Doxx.png','Eht.png','Elra.png','Entei.png','Entropy.png','Fara.png','Fig.png','Forty.png','Gate.png','Grafi.png','Hatty.png','Holly.png','HoodedFigure.png','Ian.png','Igra.png','Iram.png','Jul.png','Kal.png','Kits.png','Kora.png','Line.png','Link.png','Lit.png','Lomi.png','Look.png','Loon.png','Lulu (Season2).png','Lulu.png','Lun.png','Lyt (Product).png','Maker.png','Mann.png','Mansion.png','Match.png','Mira (Season1).png','Mira (Season2).png','MiraDad.png','MiraMom.png','Mone (Season1).png','Mone (Season2).png','Navi (Season1).png','Navi (Season2).png','Ness.png','Null (Season 1).png','Null (Season2).png','Olive.png','ParTee.png','Petrol.png','Phobia.png','Plum.png','PPSH.png','Protocol V Admin.png','Random SSG Lackey.png','Raspberry.png','RAT.png','RealPPSH.png','Ribbon.png','Rin.png','Ron.png','Sae.png','Scylla.png','See.png','Sett.png','Shelly.png','Shu.png','Skell.png','SkellDad.png','SkellMom.png','Snom.png','Soria.png','Sprout.png','Stellar.png','Table.png','Thia.png','Tiar.png','Trench.png','Try.png','Turn.png','Uso.png','Vee.png','Vera.png','Verdict.png','Voice.png','Volt.png','Wat.png','Way.png','Yune.png','Ziri.png'];
const jumpscareFiles = ['ce_veridico.gif', 'Captura de ecrã 2025-04-11 212836.png', 'Screenshot 2025-08-22 003301.png', 'Screenshot 2025-10-06 195139.png', 'asf.gif', 'image-removebg-preview-modified.png', 'sligga_-_Cópia-removebg-preview.png'];
const jumpscareSounds = ['Lobotomy Sound Effect (DOWNLOAD).mp3', 'Spongebob Fail - Sound Effect HD.mp3', 'Android Notification Meme Sound Effect.mp3'];
const $ = selector => document.querySelector(selector);
const characters = characterFiles.map(file => ({ name: file.replace(/\.png$/i, ''), image: `images/RPG/${encodeURIComponent(file)}` }));
let runs, nextRuns, leftRun, rightRun, mergedRun, leftIndex, rightIndex, comparisonCount, busy, precisionIndex, precisionChanged, precisionPass, precisionMode;

const shuffle = list => [...list].sort(() => Math.random() - .5);
const randomItem = list => list[Math.floor(Math.random() * list.length)];

function start() {
  const roster = shuffle(characters);
  runs = roster.map(character => [character]);
  comparisonCount = 0;
  precisionMode = false;
  $('#tier-landing').classList.add('hidden');
  $('#tier-result').classList.add('hidden');
  $('#tier-game').classList.remove('hidden');
  beginPass();
}

function beginPass() {
  if (runs.length === 1) return startPrecisionReview();
  nextRuns = [];
  const pairs = [];
  for (let index = 0; index < runs.length; index += 2) pairs.push([runs[index], runs[index + 1] || null]);
  runNextPair(pairs, 0);
}

function runNextPair(pairs, index) {
  if (index === pairs.length) { runs = nextRuns; beginPass(); return; }
  [leftRun, rightRun] = pairs[index];
  if (!rightRun) { nextRuns.push(leftRun); runNextPair(pairs, index + 1); return; }
  mergedRun = []; leftIndex = 0; rightIndex = 0;
  window.tierNextPair = () => runNextPair(pairs, index + 1);
  renderMatchup();
}

function renderMatchup() {
  const total = characters.length;
  $('#tier-progress').textContent = precisionMode
    ? `Precision check ${precisionIndex + 1} of ${total - 1} · pass ${precisionPass}`
    : `${comparisonCount + 1} decisions made · sorting ${total} characters`;
  const left = precisionMode ? runs[0][precisionIndex] : leftRun[leftIndex];
  const right = precisionMode ? runs[0][precisionIndex + 1] : rightRun[rightIndex];
  $('#matchup').innerHTML = [left, right].map((character, index) => `<div class="col-md-6"><button class="matchup-card" type="button" data-choice="${index}"><img src="${character.image}" alt="${character.name}"><span>${character.name}</span><small>Place higher</small></button></div>`).join('');
  document.querySelectorAll('.matchup-card').forEach(button => button.addEventListener('click', () => choose(Number(button.dataset.choice))));
}

function choose(choice) {
  if (busy) return;
  busy = true;
  const completeChoice = () => {
    if (precisionMode) return completePrecisionChoice(choice);
    mergedRun.push(choice === 0 ? leftRun[leftIndex++] : rightRun[rightIndex++]);
    comparisonCount++;
    busy = false;
    if (leftIndex === leftRun.length || rightIndex === rightRun.length) {
      mergedRun.push(...leftRun.slice(leftIndex), ...rightRun.slice(rightIndex));
      nextRuns.push(mergedRun);
      window.tierNextPair();
    } else renderMatchup();
  };
  if (Math.random() < .05) showJumpscare(completeChoice); else completeChoice();
}

function startPrecisionReview() {
  precisionMode = true;
  precisionIndex = 0;
  precisionChanged = false;
  precisionPass = 1;
  showPrecisionPair();
}

function showPrecisionPair() {
  leftRun = runs[0];
  rightRun = null;
  leftIndex = precisionIndex;
  rightIndex = precisionIndex + 1;
  renderMatchup();
}

function completePrecisionChoice(choice) {
  const ranking = runs[0];
  if (choice === 1) {
    [ranking[precisionIndex], ranking[precisionIndex + 1]] = [ranking[precisionIndex + 1], ranking[precisionIndex]];
    precisionChanged = true;
  }
  comparisonCount++;
  busy = false;
  precisionIndex++;
  if (precisionIndex < ranking.length - 1) return showPrecisionPair();
  if (precisionChanged) {
    precisionIndex = 0;
    precisionChanged = false;
    precisionPass++;
    return showPrecisionPair();
  }
  showResult();
}

function showResult() {
  $('#tier-game').classList.add('hidden');
  $('#tier-result').classList.remove('hidden');
  $('#ranking-list').innerHTML = runs[0].map((character, index) => `<div class="col-sm-6 col-lg-4"><article class="ranking-card rank-${index + 1}"><b>#${index + 1}</b><img src="${character.image}" alt="${character.name}"><strong>${character.name}</strong></article></div>`).join('');
}

function showJumpscare(onComplete) {
  const jumpscare = $('#jumpscare'), image = $('#jumpscare-image'), sound = $('#jumpscare-sound');
  image.src = `images/jumpscares/${encodeURIComponent(randomItem(jumpscareFiles))}`;
  jumpscare.classList.remove('hidden'); jumpscare.setAttribute('aria-hidden', 'false');
  sound.pause(); sound.currentTime = 0; sound.src = `sound/${encodeURIComponent(randomItem(jumpscareSounds))}`; sound.volume = 1; sound.play().catch(() => {});
  setTimeout(() => { jumpscare.classList.add('hidden'); jumpscare.setAttribute('aria-hidden', 'true'); sound.pause(); sound.currentTime = 0; onComplete(); }, 1800);
}

$('#tier-start').addEventListener('click', start);
$('#tier-again').addEventListener('click', start);
$('#tier-reset').addEventListener('click', () => { $('#tier-game').classList.add('hidden'); $('#tier-landing').classList.remove('hidden'); });
