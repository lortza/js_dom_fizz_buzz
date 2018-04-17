
// Set up the Number Grid
const nums = Array.from(Array(100).keys())
const grid = document.querySelector('#grid')

// Populate the grid with number tiles
let tiles = ''
nums.forEach(function(num) {
  let marker = 'na'
  num += 1

  if(num % 3 === 0 && num % 5 === 0){
    marker = 'fb'
  } else if(num % 3 === 0){
    marker = 'f'
  } else if(num % 5 === 0){
    marker = 'b'
  }
  tiles += `<p id="${marker}-${num}" class="tile">${num}</p>`

});
grid.innerHTML = tiles


// Change the tile styles and content
const changeAppearance = function(tile){
  if(tile.element.classList.contains('on')){
    tile.element.classList.remove(tile.marker)
    tile.element.classList.remove('on')
    tile.element.textContent = tile.num
  } else {
    tile.element.classList.add(tile.marker)
    tile.element.classList.add('on')
    tile.element.textContent = tile.marker
  }
}


const toggleFizzBuzz = function(e){
  let tile = {}

  if(e.target.localName === 'p'){
    tile.element = e.target
    tile.content = e.target.textContent
    tile.marker = tile.element.getAttribute('id').split('-')[0]
    tile.num = tile.element.getAttribute('id').split('-')[1]
  }

  if(tile.marker !== 'na' && tile.element !== undefined){
    changeAppearance(tile)
  }
}


const revealAll = function(marker){
  let allPs = document.querySelectorAll('p')

  Array.from(allPs).forEach(function(p){
    if(p.getAttribute('id').split('-')[0] == marker){
      p.classList.add(marker)
      p.classList.add('on')
    }
  })
}

const clearAll = function(e){
  let allPs = document.querySelectorAll('p')

  Array.from(allPs).forEach(function(p){
    let num = p.getAttribute('id').split('-')[1]
    p.classList = ['tile']
    p.textContent = num
  })
}


// Listen for Tile clicks
grid.addEventListener('click', toggleFizzBuzz)

// Listen for Reveal buttons
let markers = ['f','b','fb']
markers.forEach(function(marker) {
  document.querySelector(`#${marker}`).addEventListener('click', revealAll.bind(this, marker))
});

// Listen for Clear All button
document.querySelector('#clear').addEventListener('click', clearAll)
