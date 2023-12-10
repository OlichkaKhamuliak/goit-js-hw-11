import Notiflix from 'notiflix';
import { getPhotos } from './pixabay-api';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

Notiflix.Notify.init({
    fontFamily: 'Edu TAS Beginner',
    fontSize: '18px',
})

const formEl = document.querySelector('#search-form')
const divGalleryEl = document.querySelector('.gallery')
const moreBtnEl = document.querySelector('.js-load-more')

let page = 1;
const perPage = 40; 
let query = null;

formEl.addEventListener('submit', onSubmit)
moreBtnEl.addEventListener('click', onclick)

async function onSubmit(evt) {
    evt.preventDefault();
    page = 1;
    const searchQuery = evt.target.elements['searchQuery'].value.trim();
    query = searchQuery;
    try {
        const { data } = await getPhotos(page, query)
        const { totalHits, hits, total } = data;
        if (!searchQuery) {
            return Notiflix.Notify.failure('Please enter a search query.')
        }  
        if (hits.length === 0) {
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }    
        divGalleryEl.innerHTML=createMarkup(hits);    
        lightbox.refresh();
Notiflix.Notify.success(`Hooray! We found ${total} images.`)
        if (totalHits > perPage) {
            moreBtnEl.classList.remove('is-hidden')
        }
    } catch(error) {
    console.log(error);
    }
}

async function onclick() {
    page += 1;
    try {
        const { data } = await getPhotos(page, query)
        const { totalHits, hits } = data;
        divGalleryEl.insertAdjacentHTML('beforeend', createMarkup(hits))
        lightbox.refresh();

                // Плавне прокручування сторінки
        const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

        const lastPage = Math.ceil(totalHits / perPage);
        if (lastPage === page) {
            moreBtnEl.classList.add('is-hidden')
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        } 
    } catch(error) {
        console.log(error);
    }
}

function createMarkup(arr) {
    return arr.map(item => `<div class="photo-card">
    <a class="gallery-link" href="${item.largeImageURL}">
    <img class="gallery-image" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
    <b>Likes</b> ${item.likes}
    </p>
    <p class="info-item">
    <b>Views</b> ${item.views}
    </p>
    <p class="info-item">
    <b>Comments</b> ${item.comments}
    </p>
    <p class="info-item">
    <b>Downloads</b> ${item.downloads}
    </p>
    </div>
    </a>
  </div>`).join('')
}

const lightbox = new SimpleLightbox('.photo-card a');


