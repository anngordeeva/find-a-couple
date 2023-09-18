// функция генерирующая массив парных чисел
let arr = [];

function createNumbersArray() {

  for (let i = 1; i <= 8; i++) {
    arr.push(i);
    arr.push(i);
  }
  return arr;
}
createNumbersArray();

// функция перемешивания массива
function shuffle() {
  let arrShuffle = arr.length, temporaryValue, randomIndex;

  // Пока есть элементы для перемешивания
  while (0 !== arrShuffle) {

    // Взять оставшийся элемент
    randomIndex = Math.floor(Math.random() * arrShuffle--);

    // И поменять его местами с текущим элементом
    temporaryValue = arr[arrShuffle];
    arr[arrShuffle] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
return arr;
}

// кнопка для старта игры
const wrapper = document.getElementById('wrapper')
const buttonStart = document.createElement('button')
const title = document.createElement('h1')

buttonStart.classList.add('button__start')
title.classList.add('title')

title.textContent = 'Игра в пары'
buttonStart.textContent = 'Начать игру'
wrapper.append(title)
wrapper.append(buttonStart)

buttonStart.addEventListener('click', function() {
  title.remove()
  buttonStart.remove()
  startGame()
})

// функция для рестарта
const restart = () => {
  const buttonRestart = document.createElement('button')
  const titleWin = document.createElement('h1')

  buttonStart.classList.add('button__start')
  titleWin.classList.add('title')

  titleWin.textContent = 'Вы выиграли!'
  buttonRestart.textContent = 'Начать игру заново?'

  wrapper.append(titleWin)
  wrapper.append(buttonRestart)
  buttonRestart.addEventListener('click', function() {
    titleWin.remove()
    buttonRestart.remove()
    shuffle()
    startGame()
  })
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(arr) {
  const container = document.createElement('div')
  container.classList.add('container')
  wrapper.append(container)
  
  let arrNumber = shuffle(arr)

  // массив для парных чисел
  let openedCardsForCmp = []

  let successCount = 0

  // цикл для добавления массива чисел в карточку
  for (const number of arrNumber) {

    const card = document.createElement('div')
    const cardNumber = document.createElement('h2')
  
    card.classList.add('card')
    cardNumber.classList.add('card__number')

    cardNumber.textContent = number

    container.append(card);
    card.append(cardNumber)

    // условия для проверки карточек
    card.addEventListener('click', function() {
      if(!card.classList.contains('open') && openedCardsForCmp.length < 2) {
        openedCardsForCmp.push({ card, number })

        if(openedCardsForCmp.length === 1) {
          card.classList.add('open')
        }

        if(openedCardsForCmp.length === 2) {

          const [first, second] = openedCardsForCmp

          if(first.number === second.number) {

            first.card.classList.add('success')
            second.card.classList.add('success')
            successCount += 2
            console.log(openedCardsForCmp)

            // конец игры
            if(successCount === arrNumber.length) {
              container.remove()
              restart()
            }

            openedCardsForCmp = []
          } else {
             second.card.classList.add('open')
            setTimeout(() => {
              first.card.classList.remove('open')
              second.card.classList.remove('open')
              openedCardsForCmp = []
            }, 500)
          }
        }
      }
    })
  }
}
