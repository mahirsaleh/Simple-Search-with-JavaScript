"use strict" ;

const input = document.getElementById('search-box') ;
const form = document.querySelector('.header__form') ;
const button = document.querySelector('.header__button') ;
const cardContainer = document.querySelector('.container__main') ;
const userData = [] ;

form.addEventListener('submit', (event) => {
    event.preventDefault() ;
}) ;

async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users') ;
        const data = await response.json() ;

        // const data = await (await fetch('https://jsonplaceholder.typicode.com/users')).json() ;

        data.forEach((value) => {
            cardContainer.innerHTML += `<div class="main__card">
                                            <p class="card__name">
                                                ${value.name}
                                            </p>
                                            <p class="card__email">
                                                ${value.email}
                                            </p>
                                        </div>` ;
        }) ;

        cardContainer.querySelectorAll('.main__card').forEach((value) => {  
            const dataObject = {
                name: value.querySelector('.card__name').innerText.toLowerCase() ,
                email: value.querySelector('.card__email').innerText.toLowerCase() ,
                element: value 
            } ;
            userData.push(dataObject) ;
        }) ;
    }
    catch(err) {
        cardContainer.innerText = 'Server Error !' ;
    }
} ;

fetchData() ;

input.addEventListener('input', () => {
    const value = input.value.replace(/\s+/g, ' ').trim().toLowerCase() ;

    userData.forEach((obj) => {
        if (!(obj.name.includes(value) || obj.email.includes(value)) ) {
            obj.element.classList.add('hide') ;
        }
        else {
            obj.element.classList.remove('hide') ;
        }        
    }) ;
}) ;


button.addEventListener('click', () => {
    input.value = '' ;

    userData.forEach((childObj) => {
        if (childObj.element.classList.contains('hide')) {
            childObj.element.classList.remove('hide') ;
        }
    }) ; 
}) ;