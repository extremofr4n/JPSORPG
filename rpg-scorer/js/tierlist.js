const characterFiles = ['5Lean-GUI.png','Amp.png','Berto.png','Bite.png','Biyo.png','Blueberry.png','Bubblegum.png','Candle.png','Cask.png','Cel (Season2).png','Cel(Pre-ParT).png','Chuni (Season1).png','Chuni (Season2).png','Claw.png','Coky.png','Cricket.png','Cytra (Season1).png','Cytra (Season2).png','Dent (Season1).png','Dent (Season2).png','Dirge.png','Dizzy.png','Doxx.png','Eht.png','Elra.png','Entei.png','Entropy.png','Fara.png','Fig.png','Forty.png','Gate.png','Grafi.png','Hatty.png','Holly.png','HoodedFigure.png','Ian.png','Igra.png','Iram.png','Jul.png','Kal.png','Kits.png','Kora.png','Line.png','Link.png','Lit.png','Lomi.png','Look.png','Loon.png','Lulu (Season2).png','Lulu.png','Lun.png','Lyt (Product).png','Maker.png','Mann.png','Mansion.png','Match.png','Mira (Season1).png','Mira (Season2).png','MiraDad.png','MiraMom.png','Mone (Season1).png','Mone (Season2).png','Navi (Season1).png','Navi (Season2).png','Ness.png','Null (Season 1).png','Null (Season2).png','Olive.png','ParTee.png','Petrol.png','Phobia.png','Plum.png','PPSH.png','Protocol V Admin.png','Random SSG Lackey.png','Raspberry.png','RAT.png','RealPPSH.png','Ribbon.png','Rin.png','Ron.png','Sae.png','Scylla.png','See.png','Sett.png','Shelly.png','Shu.png','Skell.png','SkellDad.png','SkellMom.png','Snom.png','Soria.png','Sprout.png','Stellar.png','Table.png','Thia.png','Tiar.png','Trench.png','Try.png','Turn.png','Uso.png','Vee.png','Vera.png','Verdict.png','Voice.png','Volt.png','Wat.png','Way.png','Yune.png','Ziri.png'];
const $ = selector => document.querySelector(selector);
const characters = characterFiles.map(file => ({ name: file.replace(/\.png$/i, ''), image: `images/RPG/${encodeURIComponent(file)}` }));
const roundCount = 3;
let roster, pairings, pairingIndex, round, comparisonCount, busy;

const shuffle = list => [...list].sort(() => Math.random() - .5);

function start() {
  roster = shuffle(characters).map((character, seed) => ({ ...character, score: 0, seed }));
  comparisonCount = 0;
  round = 0;
  $('#tier-landing').classList.add('hidden');
  $('#tier-result').classList.add('hidden');
  $('#tier-game').classList.remove('hidden');
  beginRound();
}

function beginRound() {
  if (round === roundCount) return showResult();
  const shuffled = shuffle(roster);
  pairings = [];
  for (let index = 0; index < shuffled.length; index += 2) pairings.push([shuffled[index], shuffled[index + 1]]);
  pairingIndex = 0;
  renderMatchup();
}

function renderMatchup() {
  const total = roundCount * Math.floor(characters.length / 2);
  $('#tier-progress').textContent = `${comparisonCount + 1} of ${total} decisions · round ${round + 1} of ${roundCount}`;
  const [left, right] = pairings[pairingIndex];
  $('#matchup').innerHTML = [left, right].map((character, index) => `<div class="col-md-6"><button class="matchup-card" type="button" data-choice="${index}"><img src="${character.image}" alt="${character.name}"><span>${character.name}</span><small>Place higher</small></button></div>`).join('');
  document.querySelectorAll('.matchup-card').forEach(button => button.addEventListener('click', () => choose(Number(button.dataset.choice))));
}

function choose(choice) {
  if (busy) return;
  busy = true;
  const completeChoice = () => {
    pairings[pairingIndex][choice].score++;
    comparisonCount++;
    busy = false;
    pairingIndex++;
    if (pairingIndex < pairings.length) return renderMatchup();
    round++;
    beginRound();
  };
  completeChoice();
}

function showResult() {
  $('#tier-game').classList.add('hidden');
  $('#tier-result').classList.remove('hidden');
  const ranking = [...roster].sort((a, b) => b.score - a.score || a.seed - b.seed);
  $('#ranking-list').innerHTML = ranking.map((character, index) => `<div class="col-sm-6 col-lg-4"><article class="ranking-card rank-${index + 1}"><b>#${index + 1}</b><img src="${character.image}" alt="${character.name}"><strong>${character.name}</strong></article></div>`).join('');
}

$('#tier-start').addEventListener('click', start);
$('#tier-again').addEventListener('click', start);
$('#tier-reset').addEventListener('click', () => { $('#tier-game').classList.add('hidden'); $('#tier-landing').classList.remove('hidden'); });
