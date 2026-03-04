'use strict'

chrome.storage.local.get(['extensionEnabled'], (result) => {
    if (result.extensionEnabled === false) return;

    const style = document.createElement('style');
    style.innerHTML = `
        .ratings-histogram-chart {
            display: none !important;
        }
        body.show-histogram .ratings-histogram-chart {
            display: block !important;
        }
    `;
    if (document.documentElement) {
        document.documentElement.appendChild(style);
    }

    function addToSeenMovies(movieName) {
        const seenMovies = localStorage.getItem('movies');
        let data = seenMovies ? JSON.parse(seenMovies) : { movies: [] };

        if (!data.movies.includes(movieName)) {
            data.movies.push(movieName);
            localStorage.setItem('movies', JSON.stringify(data));
        }
    }

    setInterval(() => {
        if (!window.location.pathname.includes('/film/')) {
            document.body.classList.remove('show-histogram');
            return;
        }

        const movieName = window.location.pathname.split('/')[2];
        if (!movieName) return;

        const sidebar = document.querySelector(".sidebar");
        const histogramContainers = document.querySelectorAll(".ratings-histogram-chart");

        if (!sidebar || histogramContainers.length === 0) return;

        const isWatchedOnPage = document.querySelector('.action.-watch.-on') !== null;
        const seenMovies = localStorage.getItem('movies');
        const parsedSeenMovies = seenMovies ? JSON.parse(seenMovies) : { movies: [] };
        const isWatchedInStorage = parsedSeenMovies.movies.includes(movieName);

        const isWatched = isWatchedOnPage || isWatchedInStorage;
        const existingMsg = document.querySelector('.hide_histogram_chart');

        if (isWatched) {
            if (existingMsg) existingMsg.style.display = 'none';
            document.body.classList.add('show-histogram');
        } else {
            document.body.classList.remove('show-histogram');

            if (!existingMsg) {
                const hide_histogram_chart = document.createElement('div');
                hide_histogram_chart.classList.add('hide_histogram_chart');
                hide_histogram_chart.style.padding = '12px';
                hide_histogram_chart.style.background = '#2c3440';
                hide_histogram_chart.style.borderRadius = '3px';
                hide_histogram_chart.style.marginBottom = '15px';
                hide_histogram_chart.style.color = '#899aa9';
                hide_histogram_chart.textContent = chrome.i18n.getMessage("hiddenRatingsText");;

                const show_the_truth = document.createElement('a');
                show_the_truth.classList.add('show_the_truth');
                show_the_truth.textContent = chrome.i18n.getMessage("truthButton");
                show_the_truth.style.fontStyle = 'italic';
                show_the_truth.style.cursor = 'pointer';
                show_the_truth.style.color = '#00e054';
                show_the_truth.style.fontWeight = 'bold';
                show_the_truth.style.display = 'block';
                show_the_truth.style.marginTop = '5px';
                show_the_truth.title = chrome.i18n.getMessage("truthButtonTitle");

                show_the_truth.addEventListener('click', function () {
                    hide_histogram_chart.style.display = 'none';
                    document.body.classList.add('show-histogram');
                    addToSeenMovies(movieName);
                });

                hide_histogram_chart.appendChild(show_the_truth);
                sidebar.append(hide_histogram_chart);
            } else {
                existingMsg.style.display = 'block';
            }
        }
    }, 500)
});