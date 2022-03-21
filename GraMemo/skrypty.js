const allKarty = document.querySelectorAll('.karta');
const startPrzycisk = document.querySelectorAll('.button')[0];
let czyDruga = false;
let wTrakcie = false;
let kartaA, kartaB;

function nietrafionyWybor() {
  wTrakcie = true;

  setTimeout(() => {
    kartaA.classList.remove('flip');
    kartaB.classList.remove('flip');

    nowyRuch();
  }, 1500);
}
function wyborKarty() {
  if (wTrakcie) return;
  if (this === kartaA) return;

  this.classList.add('flip');

  if (!czyDruga) {
    czyDruga = true;
    kartaA = this;

    return;
  }
  kartaB = this;

  porownanie();
}

function porownanie() {
    if (kartaA.dataset.klub === kartaB.dataset.klub)
        znalezionaPara();
    else
        nietrafionyWybor();
}

function znalezionaPara() {
    kartaA.removeEventListener('click', wyborKarty);
    kartaB.removeEventListener('click', wyborKarty);
    setTimeout(() => {
    kartaA.style.opacity=0;
    kartaB.style.opacity=0;

    nowyRuch();
  }, 800);
}



function nowyRuch() {
  czyDruga = false;
  wTrakcie = false;
  kartaA = null
  kartaB = null
}

function startGry() {
  allKarty.forEach(card => {
    card.style.opacity=0;
  });
    allKarty.forEach(card => {
      card.addEventListener('click', wyborKarty);
      card.classList.remove('flip'); 
      setTimeout(() => {
      let randomPos = Math.floor(Math.random() * 10);
      card.style.order = randomPos;
      },350);
  });
  setTimeout(() => {
      allKarty.forEach(card => {
      card.style.opacity=1;
      document.getElementById("RestartButton").value = "Restart";
    });
      },350);
  
}

startPrzycisk.addEventListener('click', startGry);