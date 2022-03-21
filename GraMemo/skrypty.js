const allKarty = document.querySelectorAll('.karta');
const startPrzycisk = document.querySelectorAll('.button')[0];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.klub === secondCard.dataset.klub)
        znalezionaPara();
    else
        unflipCards();
}

function znalezionaPara() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    setTimeout(() => {
    firstCard.style.opacity=0;
    secondCard.style.opacity=0;

    resetBoard();
  }, 800);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function startGry() {
  allKarty.forEach(card => {
    card.style.opacity=0;
  });
    allKarty.forEach(card => {
      card.addEventListener('click', flipCard);
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

startPrzycisk.addEventListener('click',startGry);