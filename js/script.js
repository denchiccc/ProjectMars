/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';
document.addEventListener('DOMContentLoaded', () => {


    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const advdel = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        newMovies = document.querySelector('.promo__interactive-list'),

        addForm = document.querySelector('form.add'),
        addImput = document.querySelector('.adding__input'),
        addFavoritMovies = document.querySelector('[type="checkbox"]');


    // удоляет рекламу с сайта
    function delAdv(adv) {
        adv.forEach(item => {
            item.remove();
        });
    };


    // меняет название жанра и фото
    const makeChanges = () => {
        genre.innerHTML = 'драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };


    // сортирует массив по алфавиту
    const sortArr = (arr) => {
        arr.sort();
    };


    // заменяет массив
    function createMoviesList(films, perent) {
        perent.innerHTML = "";
        sortArr(films);
        films.forEach((item, i) => {
            perent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${item}
        <div class="delete"></div>
    </li>`
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMoviesList(movieDB.movies, newMovies);
            });
        });
    }


    // при отправке формы добовляет новый фильм в список
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilms = addImput.value;
        const favorit = addFavoritMovies.checked;
        if (newFilms) {

            if (newFilms.length > 21) {
                newFilms = `${newFilms.slice(0, 21)}...`;
            }
            if (favorit) {
                console.log('Добовляем любимый фильм');
            }
            movieDB.movies.push(newFilms);
            sortArr(movieDB.movies);
            createMoviesList(movieDB.movies, newMovies);

        }
        event.target.reset();
    });



    makeChanges();

    delAdv(advdel);
    createMoviesList(movieDB.movies, newMovies);
});