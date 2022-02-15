const body = document.querySelector('body');

const small_grid = document.querySelector('.small_grid');
const small_text = document.querySelector('.small_text');
const icon = document.getElementById("icon");
const icon1 = document.getElementById("a");
const icon2 = document.getElementById("b");
const icon3 = document.getElementById("c");
const nav = document.getElementById('nav');
const navList = document.querySelector('.navList');
const bg_grid = document.querySelector('.bg_grid');
const bg_checked = document.getElementById('bg_checked');
// let navRange_value = document.querySelector('.navRangeTextValue');
let navRangeTextValue = document.querySelector('.navRangeTextValue');
const stop_btn = document.querySelector('.stop_btn');
const gene_btn = document.querySelector('.gene_btn');

var doIteration;
let navSelectedList = [];
let usingGridArray = [];

let myColorVal = 0;


const width_array = [0, 50, 100, 150, 200, 250, 300];
const height_array = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
const rotate_deg = [0, 90, 180, 270];


// refresh with nav setting
document.querySelector('.btn').addEventListener('click', function(){
  let gridHtml = '';
  const iteration = localStorage.getItem('blocks');
  const num = JSON.parse(localStorage.getItem('grids'));
  for(i=0; i<iteration; i++){
    num.forEach(num => {
      gridHtml += `<img class = "eachRect" src =imgs/grid_${num}.png>`
    })
  }
  generateSystem(gridHtml);
})
if(localStorage.getItem('navState') == 'on'){
  nav.classList.add('show');
}else{
  nav.classList.remove('show');
}
const blocksNum = localStorage.getItem('blocks'); //number type
const gridsNum = JSON.parse(localStorage.getItem('grids')); //array type





//hanburger btn
icon.addEventListener('click', function() {
  nav.classList.toggle('show');
  if(nav.classList.contains('show')){
    localStorage.setItem('navState', 'on');
    icon1.classList.add('a');
    icon2.classList.add('c');
    icon3.classList.add('b');
  }else{
    localStorage.setItem('navState', 'off');
    icon1.classList.remove('a');
    icon2.classList.remove('c');
    icon3.classList.remove('b');
  }
});

//making nav list
for(i = 0; i < 4; i++){
  navList.innerHTML += `
  <li class="eachListImg">
    <img class="navListPic" src="imgs/grid_${i}.png" value="${i}">
  </li>
  `;
}


//check bg_checked
bg_checked.addEventListener('click', function(e){
  // console.log(e.target.checked);
  if(e.target.checked){
    bg_grid.classList.add('hide');
  }else{
    bg_grid.classList.remove('hide');
  }
})



//main functions
function makeHtml(array, iteration){
  let gridHtml = '';
  if(myColorVal == 270){
    body.classList.add('myColor');
  }else{
    body.classList.remove('myColor');
  }
  for(i=0; i<iteration; i++){
    array.forEach(array => {
      gridHtml += `<img class= "eachRect" src=imgs/grid_${array}.png>`
    })
  }
  
  generateSystem(gridHtml);
}

function howManyGrid(array){
  doIteration = setInterval(function(){
    var iteration = localStorage.getItem('blocks');
    // // console.log(iteration);
    // navRange_value.textContent = iteration;
    makeHtml(array, iteration);
  },300)

  stop_btn.addEventListener('click', function(){
    clearInterval(doIteration);
  })
}

function generateSystem(html){
  small_grid.innerHTML = html;
//   console.log(small_grid.children);

  const eachRects = Array.from(document.getElementsByClassName('eachRect'));

  eachRects.forEach(element => {
    element.style.cssText = `
      top: ${height_array[Math.floor(Math.random() * 11)]}px;
      left: ${width_array[Math.floor(Math.random() * 7)]}px;
      transform: rotate(${rotate_deg[Math.floor(Math.random() * 4)]}deg);
    `;
  })
}



//CHOOSE HOW MANY GRIDS ARE GONNA USED..
const navListPics = Array.from(document.getElementsByClassName('navListPic'));
//각각의 그리드 이미지를가 html tag가 만들어진 뒤, getElement해야 한다.
if(gridsNum){
  // console.log(gridsNum);
  gridsNum.forEach(value => {
    // console.log(navListPics);
    navListPics.forEach(pic => {
      if(value == pic.getAttribute('value')){
          // console.log(pic.parentElement);
          pic.classList.add('listSelected');
      }
    })
  })
}
navListPics.forEach(data => {
  data.addEventListener('click', function(){
    data.classList.toggle('listSelected');

    //toggle 되어 select된 그리드만 모은 Array.
    const valueArray = [];
    const selectedListPics = document.getElementsByClassName('listSelected');
    navSelectedList = Array.from(selectedListPics);
    navSelectedList.forEach(data => {
      valueArray.push(data.getAttribute('value'));
      // console.log(valueArray);
    })
    localStorage.setItem('grids', JSON.stringify(valueArray));
  })
})



//CHOOSE HOW MANY BLOCKS ARE GONNA USED..
gene_btn.addEventListener('click', function(){
  clearInterval(doIteration);
  howManyGrid(JSON.parse(localStorage.getItem('grids')));
})
