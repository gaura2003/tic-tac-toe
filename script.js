let turn = 'X'; 
let gameover = false;
let X = 0;
let O = 0;
let mode = 'u-vs-u'; 

document.getElementById('gameMode').addEventListener('change', function() {
  mode = this.value;
});

let changeTurn = () => {
  return turn === 'X' ? '0' : 'X';
}

let checkWin = () => {
  let boxtext = document.getElementsByClassName('boxtext');
  let win = [
    [0, 1, 2, 0, 6, 0, 450, 0, -2],
    [3, 4, 5, 0, 17, 0, 450, 0, 1],
    [6, 7, 8, 0, 28, 0, 450, 0, 2],
    [0, 3, 6, -11, 17, 90, 450, 0, -6],
    [1, 4, 7, 0, 17, 90, 450, 0, -5],
    [2, 5, 8, 11, 17, 90, 450, 2, -5],
    [0, 4, 8, 1, 17, 45, 630, -14, -5],
    [2, 4, 6, 0, 17, 135, 630, 0, -6]
  ];

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

      
      line.style.transform = `translate(${e[3]}vw , ${e[4]}vw) rotate(${e[5]}deg)`;
      line.style.width = `${e[6]}px`;
      line.style.left = `${e[7]}px`;
      line.style.top = `${e[8]}px`;
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
let resetGame =  () => {
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
reset.addEventListener('click', resetGame );


document.getElementById('reset').addEventListener('click', () => {
  X = 0;
  O = 0;
  document.querySelector('.x').innerText = 'X = 0';
  document.querySelector('.o').innerText = 'O = 0';
  resetGame();
 
});
