const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

/*listas de todas as imagens da carta*/
const characters = [
  'descobrimento',
  'colonia',
  'independencia',
  'primeiro_reinado',
  'segundo_reinado',
  'primeira_republica',
  'revolucao_1930',
  'era_vargas',
  'ditadura',
  'pos_ditadura',
];

/*Cria os elementos  da tag. Está função ajuda na criação das cartas (linha 117)*/
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

/* cria variáveis vazias para salvar as carta na função  revealCard*/
let firstCard = '';
let secondCard = '';

/* Verifica se o jogo acabou */
const checkEndGame = () => {
  /* procura todos os elementos da clase disabledCards */
  const disabledCards = document.querySelectorAll('.disabled-card');

  /* se o tamanho do disableCard é igual 20 aparece uma mensagem que acabou o jogo */
  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  /* se a primeira carta for igual a segunda carta:
  chama a classe disabled-card; as variaveis firstCard e 
  secondCard ficam nulas; e  chama a função checkEndGame()
  senão
  a classe reveal-card é ativada e as variaveis firstCard e 
   secondCard ficam nulas*/
  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

/*Revela a carta ao clicar
target.parentNode.className.includes('reveal-card'): revela a carta indo 
pelo parentNode e recupera pelo target.

checkCards(): chama a função 'checkCards()';
*/
const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  /* se a primeira carta igual a vazio:
   - clica na primeira carta e salva na variável firstCard;
   senão
   se a segunda carda é igual a vazio:
   - clica na seguunda carta e salva; 

  */
  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

/* 
Cria as cartas para o jogo utilizando a lista 'character'
const card = createElement('...', '...'): cria o elemento de cada classe 
card.appendChild(): cria o filho das clases (coloca a face e o back das cartas);
card.addEventListener('click', revealCard): quando clicar na carta chama a função revealCard;
*/

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

/* Carrega o jogo 
const duplicateCharacters = [...characters, ...characters]: dublica o array;
const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5): embaralha o array;
*/

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
