const textSend = document.querySelector('.textSend');
const shareBtn = document.querySelector('.shareBtn');
const gardenBox = document.querySelector('.gardenBox');

let imgHtml = `
<img src="assets/elements/04.png">
`

textSend.addEventListener('submit', function(e){
    e.preventDefault();
    gardenBox.innerHTML += imgHtml;
})
