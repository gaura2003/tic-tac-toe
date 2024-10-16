let turn = 'X';
let gameover = false;
let X = 0;
let O = 0;
let mode = 'u-vs-u';

document.getElementById('gameMode').addEventListener('change', function () {
  mode = this.value;
});

let changeTurn = () => {
  return turn === 'X' ? '0' : 'X';
}

let win = [
  [0, 1, 2, { mobile: [0, 14, 0], desktop: [0, 6, 0] }, 'horizontal', 0, -2],
  [3, 4, 5, { mobile: [0, 39, 0], desktop: [0, 17, 0] }, 'horizontal', 0, 1],
  [6, 7, 8, { mobile: [0, 65, 0], desktop: [0, 28, 0] }, 'horizontal', 0, 2],
  [0, 3, 6, { mobile: [-26, 40, 90], desktop: [-11, 17, 90] }, 'vertical', 0, -6],
  [1, 4, 7, { mobile: [0, 40, 90], desktop: [0, 17, 90] }, 'vertical', 0, -5],
  [2, 5, 8, { mobile: [26, 40, 90], desktop: [11, 17, 90] }, 'vertical', 2, -5],
  [0, 4, 8, { mobile: [4, 40, 45], desktop: [1, 17, 45] }, 'diagonal', -14, -5],
  [2, 4, 6, { mobile: [0, 40, 135], desktop: [0, 17, 135] }, 'diagonal', 0, -6]
];

let checkWin = () => {
  let boxtext = document.getElementsByClassName('boxtext');
  let lineWidth = window.innerWidth <= 640 ? 300 : 450;
  let diagLineWidth = window.innerWidth <= 640 ? 420 : 630;

  win.forEach(e => {
    if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
      (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
      boxtext[e[0]].innerText !== '') {
      let line = document.querySelector('.line');
      document.querySelector('.turn').innerText = boxtext[e[0]].innerText + ' Won';
      if (boxtext[e[0]].innerText === 'X') {
        document.querySelector('.x').innerText = 'X = ' + ++X;
      } else {
        document.querySelector('.o').innerText = 'O = ' + ++O;
      }
      gameover = true;

      let transformValues = window.innerWidth <= 640 ? e[3].mobile : e[3].desktop;
      line.style.transform = `translate(${transformValues[0]}vw , ${transformValues[1]}vw) rotate(${transformValues[2]}deg)`;

      line.style.width = e[4] === 'diagonal' ? `${diagLineWidth}px` : `${lineWidth}px`;
      line.style.left = `${e[5]}px`;
      line.style.top = `${e[6]}px`;
      line.style.display = 'block';
      document.querySelector('.hidden').style.display = 'block';
    }
  });

  let isDraw = Array.from(boxtext).every(box => box.innerText !== '');
  if (isDraw && !gameover) {
    document.querySelector('.turn').innerText = 'It\'s a Draw!';
    gameover = true;
    document.querySelector('.hidden').style.display = 'block';
  }
}

let computerMove = () => {
  let boxes = document.getElementsByClassName('boxes');
  let emptyBoxes = Array.from(boxes).filter(element => {
    let boxtext = element.querySelector('.boxtext');
    return boxtext.innerText === '';
  });

  if (emptyBoxes.length > 0 && !gameover) {
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let selectedBox = emptyBoxes[randomIndex];
    let boxtext = selectedBox.querySelector('.boxtext');
    boxtext.innerText = turn;
    checkWin();
    if (!gameover) {
      turn = changeTurn();
      document.getElementsByClassName('turn')[0].innerText = 'Turn for ' + turn;
    }
  }
}

let boxes = document.getElementsByClassName('boxes');
Array.from(boxes).forEach(element => {
  element.addEventListener('click', () => {
    let boxtext = element.querySelector('.boxtext');
    if (boxtext.innerText === '' && !gameover) {
      boxtext.innerText = turn;
      checkWin();
      if (!gameover) {
        turn = changeTurn();
        document.getElementsByClassName('turn')[0].innerText = 'Turn for ' + turn;

        if (mode === 'computer-vs-u' && turn === '0') {
          computerMove();
        }
      }
    }
  });
});

let reset = document.querySelector('.reset');
let resetGame = () => {
  let line = document.querySelector('.line');
  let boxtext = document.querySelectorAll('.boxtext');
  boxtext.forEach(element => {
    element.innerText = '';
  });
  gameover = false;
  turn = 'X';
  document.getElementsByClassName('turn')[0].innerText = 'Turn for ' + turn;
  line.style.width = `0px`;
  line.style.left = `0px`;
  line.style.top = `0px`;
  document.querySelector('.hidden').style.display = 'none';
}

reset.addEventListener('click', resetGame);

document.getElementById('reset').addEventListener('click', () => {
  X = 0;
  O = 0;
  document.querySelector('.x').innerText = 'X = 0';
  document.querySelector('.o').innerText = 'O = 0';
  resetGame();
});
