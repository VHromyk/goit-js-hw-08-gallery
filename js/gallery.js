import galleryItems from './gallery-items.js';
// console.log(galleryItems);


const galleryRef = document.querySelector('.js-gallery');
// console.log(galleryRef);

const overlayRef = document.querySelector('.js-lightbox');
// console.log(overlayRef);
const closeOverlayBtnRef = document.querySelector('button[data-action="close-lightbox"]');
// console.log(closeOverlayBtnRef);

const lightBoxImage = document.querySelector('.lightbox__image');
// console.log(lightBoxImage);




// Создание разметки на странице!
const createItem = galleryItems.map(galleryItem => {
    const imgLi = document.createElement('li');
    imgLi.classList.add('gallery__item');
       
    const imgA = document.createElement('a');
    imgA.classList.add('gallery__link');
    imgA.href = galleryItem.original;
    
       
    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.src = galleryItem.preview;
    imgEl.setAttribute('data-source', galleryItem.original);
    imgEl.alt = galleryItem.description;
    
    
    imgLi.append(imgA);
    imgA.append(imgEl);


    return imgLi;
}
);

galleryRef.append(...createItem);




// Создание функций работы с галереей

function getItemByCick(event) {
    event.preventDefault();
    if (event.target.tagName !== 'IMG') {
        return;
    }
    if (galleryRef) {
        overlayRef.classList.add('is-open');
    }
    const largeImageURL = event.target.dataset.source;
    lightBoxImage.src = largeImageURL;
    const largeImageAlt = event.target.alt;
    lightBoxImage.alt = largeImageAlt;
}


function removeSrc() {
    lightBoxImage.src = '';
    lightBoxImage.alt = '';
}


function closeOverlayBtn() {
    overlayRef.classList.remove('is-open');
    removeSrc();
}


function closeOverlayByEsc(event) {
    if (event.key === 'Escape') {
        overlayRef.classList.remove('is-open');
    }
    removeSrc();
}





// Создание слушателей событий 

galleryRef.addEventListener('click', getItemByCick);

closeOverlayBtnRef.addEventListener('click', closeOverlayBtn);

window.addEventListener('keydown', closeOverlayByEsc);

