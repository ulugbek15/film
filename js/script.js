//Template
const elTemplate = document.querySelector('#template').content;

//List
const elList = document.querySelector('.film__card-wrapper');
const elPaginationBtn = document.querySelector('.button-group');

//Form
const elForm = document.querySelector('.film__form');
const elSearch = document.querySelector('.film__search');
const elSelect = document.querySelector('.film__select');

const APIKEY = '7c1ffea8';
let searchedFilm = 'hulk';
let pageCount = 1;
let filmType = 'movie';

elForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const searchValue = elSearch.value.trim();
    
    searchedFilm = searchValue;
    
    
    elSearch.value = null;
    
    fetchMovies()
})

elSelect.addEventListener('change', () =>{
    const selectValue = elSelect.value.trim();
    filmType = selectValue;
    fetchMovies()
    
})


function renderMovies(arr, element){
    element.innerHTML = null;

    if(arr){
        arr.forEach((film) => {
            const cloneTemplate = elTemplate.cloneNode(true)
            
            const newImg = cloneTemplate.querySelector('.film__card-img')
            const newTtle = cloneTemplate.querySelector('.film__sub-title')
            
            newImg.setAttribute('src', film.Poster)
            newImg.onerror = (e) => {
                e.target.src = 'http://via.placeholder.com/250x300/?text=Img+NotFound'
            }
            newTtle.textContent = film.Title
            
            element.appendChild(cloneTemplate)
        })
    }else{
        elList.innerHTML = '<h1>Film is not defined... (</h1>'
    }

}

// Pagination BTN
function renderBtn(arr, element){
    element.innerHTML = null;
    for(let i = 1; i <= arr; i++){
        let newBtn = document.createElement('button');
        newBtn.setAttribute('class', 'film__pagination-btn')
        newBtn.value = i;
        newBtn.textContent = i;
        
        newBtn.addEventListener('click', (e) =>{
            pageCount = Number(e.target.value)
            
            if(newBtn.value == pageCount){
                newBtn.style.backgroundColor = "skyblue";
            }

            fetchMovies()
        })
        element.appendChild(newBtn)
    }
}


function fetchMovies(){
    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchedFilm}&type=${filmType}&page=${pageCount}`)
    .then(res => res.json())
    .then(data => {
        elList.innerHTML = `<img class="spinner" src='../img/spinner.svg' width="150" height="150"/>`
        setTimeout(() =>{
            if(data){
                renderMovies(data.Search, elList)
                const total = Math.ceil(data.totalResults / 10)
                renderBtn(total, elPaginationBtn)
            }
        },500)

        
    })
}

fetchMovies()