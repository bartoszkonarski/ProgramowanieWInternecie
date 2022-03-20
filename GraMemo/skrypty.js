const allKarty = document.querySelectorAll('.karta');

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

(function shuffle() {
  allKarty.forEach(card => {
    let randomPos = Math.floor(Math.random() * 10);
    card.style.order = randomPos;
  });
})();

allKarty.forEach(card => card.addEventListener('click', flipCard));