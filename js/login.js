const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

/*O Document método querySelector() retorna o primeiro 
Elementdentro do documento que corresponde ao seletor ou 
grupo de seletores especificado. Se nenhuma correspondência 
for encontrada, nullserá retornado.*/

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

/* O validateInput valida se o usuario digitou um nome 
com pelo menos três caracteres, se for maior ou igaul a três 
caracteres ativa o butão. 
Se o usuario digitar o nome e depois apagar 
o "button.setAttribute('disabled', '')" desabilita o botão 
novamente se for menor que três caracter.
*/

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
}
/* - event.preventDefault(): bloqueia a recarga da pagina;
 - localStorage.setItem('player', input.value): salva o que o 
 usuario digitou;
 - window.location = 'pages/game.html': abre na janela a 
 pagina do gamer; 
*/

input.addEventListener('input', validateInput);
/*sempre que o jogador digitar algo no input a variável
"validateInput" será acionada */

form.addEventListener('submit', handleSubmit);
/*quando o botão for acionado que o jogador a variável
"handleSubmit" será acionada */