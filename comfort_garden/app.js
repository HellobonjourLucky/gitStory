const textSend = document.querySelector('.textSend');
const shareBtn = document.querySelector('.shareBtn');
const gardenBox = document.querySelector('.gardenBox');

let imgHtml = `
<img src="assets/elements/04.png">
`

// console.log(textSEnd);
textSend.addEventListener('submit', function(){
    gardenBox.innerHTML += imgHtml;
})
