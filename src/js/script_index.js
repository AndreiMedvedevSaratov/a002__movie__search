import './keyboard.js';

// ----- Constants ----- //
const OMDB_API_KEY = '3a55aba2';
const YANDEX_API_KEY = 'trnsl.1.1.20200507T105254Z.a3ee0899632558b5.ebc00129070c6a43d70033c0ed7ba2c85eb05d1b';
const SEARCH_STRING = document.querySelector('.search__field');
const SEARCH_RESULT_STRING = document.querySelector('.search__result');
const CSS_LOADER = document.querySelector('.lds-ring');
let searchMovieName = '';
let slides = [];
let numberOfFoundSlides = 0;
const KEYBOARD_MAIN_AREA = document.getElementsByClassName('keyboardMainArea');

// ----- Swiper - Slider ----- //
const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  centerInsufficientSlides: !0,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 100,
    },
    775: {
      slidesPerView: 2,
      spaceBetween: 75,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 100,
    },
    1600: {
      slidesPerView: 4,
      spaceBetween: 100,
    },
  },
});

// ----- Getting information by Yandex API ----- //
async function getWordTranslation(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_API_KEY}&text=${word}&lang=ru-en`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.text[0];
  } catch (e) {
    SEARCH_RESULT_STRING.textContent = `Yandex cannot translate '${word}'`;
    CSS_LOADER.classList.remove('active');
    return new Error('Something wrong with Yandex translation API');
  }
}

async function translate(Info) {
  const result = await getWordTranslation(Info);
  return result;
}

// ----- Getting Movie Rating ----- //
async function getMovieRating(imdbID) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`;
  try {
    return fetch(url)
      .then((el) => el.json())
      .then((el) => el.imdbRating);
  } catch (e) {
    return new Error('Something wrong with OMDB data base connection');
  }
}

// ----- Getting information by API OMDB----- //
async function getMovieTitle(pageNumber, searchTitle) {
  let url = '';
  if (pageNumber === 1) url = `https://www.omdbapi.com/?s=${searchTitle}&apikey=${OMDB_API_KEY}&type=movie`;
  else url = `https://www.omdbapi.com/?s=${searchTitle}&page=${pageNumber}&apikey=${OMDB_API_KEY}&type=movie`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    return new Error('Something wrong with OMDB data base connection');
  }
}

// ----- Slider update with new slides (first 10 movies) ----- //
async function swiperUpdatesFirstTenCards() {
  if (/[А-я]/i.test(searchMovieName)) {
    searchMovieName = await translate(searchMovieName);
  }
  SEARCH_RESULT_STRING.textContent = `Show results for '${searchMovieName}'`;
  CSS_LOADER.classList.add('active');
  const result = await getMovieTitle(1, searchMovieName);
  if (result.Error) {
    SEARCH_RESULT_STRING.textContent = `Nothing found for '${searchMovieName}'`;
    CSS_LOADER.classList.remove('active');
  } else {
    const data = result;
    const pageNumber = 1;
    if (data.totalResults === 0) {
      SEARCH_RESULT_STRING.textContent = `Nothing found for '${searchMovieName}'`;
      throw Error('Nothing found');
    }
    numberOfFoundSlides = data.totalResults;
    slides = [];
    for (let i = 10 * (pageNumber - 1); i < numberOfFoundSlides && i < 10 * pageNumber; i++) {
      const movieRate = await getMovieRating(data.Search[i].imdbID);
      slides.push({
        movieTitle: data.Search[i - 10 * (pageNumber - 1)].Title,
        moviePoster: data.Search[i - 10 * (pageNumber - 1)].Poster,
        movieYear: data.Search[i - 10 * (pageNumber - 1)].Year,
        movieRating: movieRate,
        movieLink: `https://www.imdb.com/title/${data.Search[i - 10 * (pageNumber - 1)].imdbID}/videogallery`,
      });
    }
    swiper.removeAllSlides();
    for (let i = 0; i < slides.length; i += 1) {
      swiper.appendSlide(`<div class="swiper-slide card swiper-slide-next">\n
										<div class="card__header">\n
										<a href="${slides[i].movieLink}" target="_blank">${slides[i].movieTitle}</a>\n
										</div>\n
										<div class="card__body">\n
										<a href="${slides[i].movieLink}" target="_blank"><div class="poster" style="background-image: url(${slides[i].moviePoster})"></div>\n
										</div></a>\n
										<div class="card__footer">\n
										<div class="year">${slides[i].movieYear}</div>\n
										<div class="imbd-rating">\n
										<span class="star">&#9733;</span>${slides[i].movieRating}</div>\n
										</div>\n
										</div>`);
    }
    swiper.update();
    CSS_LOADER.classList.remove('active');
  }
}

// ----- Slider update with new slides (next 10 movies) ----- //
async function swiperUpdatesNextTenCards() {
  if (/[А-я]/i.test(searchMovieName)) {
    searchMovieName = await translate(searchMovieName);
  }
  SEARCH_RESULT_STRING.textContent = `Show results for '${searchMovieName}':`;
  const currentPage = Math.floor(slides.length / 10) + 1;
  CSS_LOADER.classList.add('active');
  const result = await getMovieTitle(currentPage, searchMovieName);
  if (result.Error) {
    SEARCH_RESULT_STRING.textContent = `Nothing found for '${searchMovieName}':`;
    CSS_LOADER.classList.remove('active');
  } else {
    const data = result;
    if (data.totalResults > slides.length) {
      numberOfFoundSlides = Number(data.totalResults);
      for (let i = 0; i < numberOfFoundSlides - currentPage * 10 && i < 10; i += 1) {
        const movieRate = await getMovieRating(data.Search[i].imdbID);
        slides.push({
          movieTitle: data.Search[i].Title,
          moviePoster: data.Search[i].Poster,
          movieYear: data.Search[i].Year,
          movieRating: movieRate,
          movieLink: `https://www.imdb.com/title/${data.Search[i].imdbID}/videogallery`,
        });
        swiper.appendSlide(`<div class="swiper-slide card swiper-slide-next">\n
											<div class="card__header">\n
                      <a href="${slides[slides.length - 1].movieLink}" target="_blank">
                      ${slides[slides.length - 1].movieTitle}</a>\n
											</div>\n
											<div class="card__body">\n
                      <a href="${slides[slides.length - 1].movieLink}" 
                      target="_blank"><div class="poster" style="background-image: 
                      url(${slides[slides.length - 1].moviePoster})"></div>\n
											</div></a>\n
											<div class="card__footer">\n
											<div class="year">${slides[slides.length - 1].movieYear}</div>\n
											<div class="imbd-rating">\n
											<span class="star">&#9733;</span>${slides[slides.length - 1].movieRating}</div>\n
											</div>\n
											</div>`);
      }
      swiper.update();
      CSS_LOADER.classList.remove('active');
    } else CSS_LOADER.classList.remove('active');
  }
}

// ----- Button Keyboard pressed ----- //
document.getElementById('KEYBOARD').onclick = function () {
  KEYBOARD_MAIN_AREA[0].classList.toggle('active');
};

// ----- Enter on keyboard pressed by mouse ----- //
document.addEventListener('click', (e) => {
  if (e.srcElement.innerText === 'Enter') {
    searchMovieName = SEARCH_STRING.value;
    if (searchMovieName === '') SEARCH_RESULT_STRING.textContent = 'Request must not be an empty string, try again...';
    else {
      KEYBOARD_MAIN_AREA[0].classList.remove('active');
      swiperUpdatesFirstTenCards();
    }
  }
});

// ----- Cleaning search string ----- //
document.querySelector('.clean__field').addEventListener('click', () => {
  SEARCH_STRING.value = '';
  SEARCH_RESULT_STRING.textContent = '';
  searchMovieName = '';
});

// ----- Button Search pressed ----- //
document.querySelector('.search__submit').addEventListener('click', () => {
  event.preventDefault();
  searchMovieName = SEARCH_STRING.value;
  if (searchMovieName === '') SEARCH_RESULT_STRING.textContent = 'Request must not be an empty string, try again...';
  else {
    KEYBOARD_MAIN_AREA[0].classList.remove('active');
    swiperUpdatesFirstTenCards();
  }
});

// ----- Swiper end first 10 cards, need to update ----- //
swiper.on('reachEnd', () => {
  swiperUpdatesNextTenCards();
});

// ----- On page load, I load information about movies "Terminator" ----- //
window.addEventListener('DOMContentLoaded', () => {
  searchMovieName = 'Terminator';
  swiperUpdatesFirstTenCards();
});