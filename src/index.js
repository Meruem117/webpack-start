import $ from 'jquery'

const title = document.querySelector('#title')
title.addEventListener('click', () => {
    $(body).css('backgroundColor', 'red')
})