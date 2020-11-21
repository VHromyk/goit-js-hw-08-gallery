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
const createItem = galleryItems.map((galleryItem, index) => {
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
    imgEl.setAttribute('data-id', index);
    
    
    imgLi.append(imgA);
    imgA.append(imgEl);


    return imgLi;
});

galleryRef.append(...createItem);




// Открытие модального окна по клику на элемент IMG

function getItemByCick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    if (galleryRef) {
        overlayRef.classList.add('is-open');
    }

    
    changeSrc(event);
    


// Реализация перелистывания с помощью стрелок ArrowLeft и ArrowRight

    const activeIndex = Number(event.target.dataset.id);
    let index = activeIndex;
    
    
    const imageArrayRef = document.querySelectorAll('.gallery__image');
 

    window.addEventListener('keydown', event => {

        if (event.code === 'ArrowLeft' && index > 0) {
            index -= 1;
            
            if (index < 0) {
                index = 0;
            }

            lightBoxImage.src = imageArrayRef[index].dataset.source;
        }

        if (event.code === 'ArrowRight' && index < imageArrayRef.length -1) {
                index += 1;
            if (imageArrayRef.lenght - 1) {
                index = imageArrayRef.lenght - 1
            }

            lightBoxImage.src = imageArrayRef[index].dataset.source;
            }

    });
}



// Прописываю src и alt изображению при всплытии модального окна

function changeSrc(event) {
    const largeImageURL = event.target.dataset.source;
    lightBoxImage.src = largeImageURL;
    const largeImageAlt = event.target.alt;
    lightBoxImage.alt = largeImageAlt;
}


// Удаляю src и alt когда модальное окно закрывается 
function removeSrc() {
    lightBoxImage.src = '';
    lightBoxImage.alt = '';
}

// При нажатии на кнопку Х если класс is-open есть я его удаляю и подчищаю src и alt
function closeOverlayBtn() {
    if (overlayRef.classList.contains('is-open')) {
        overlayRef.classList.remove('is-open');
        removeSrc();
    }
    
}

// Если висит класс is-open и есть нажатие Escape класс is-open снимается и подчищаются src и alt
function closeOverlayByEsc(event) {
    if (overlayRef.classList.contains('is-open') && event.code === 'Escape') {
        overlayRef.classList.remove('is-open');
        removeSrc();
    }
}

// При клике по модальному окну is-open снимается и подчищаются src и alt
function closeOverlayByClick(event) {
    if (event.target.nodeName === 'DIV') {
        overlayRef.classList.remove('is-open');
        removeSrc();
    }
}


// При открытии одального окна получаем индекс активного изображения


function turnImages(event) {
    if (event.code === 'ArrowRight') {
        index += 1;
    } if (index > imageArrayRef.length - 1) {
        index = imageArrayRef.length - 1
    }


    lightBoxImage.src = imageArrayRef[index].dataset.source;



    }




// Создание слушателей событий 

galleryRef.addEventListener('click', getItemByCick);

closeOverlayBtnRef.addEventListener('click', closeOverlayBtn);

overlayRef.addEventListener('click', closeOverlayByClick);

window.addEventListener('keydown', closeOverlayByEsc);
