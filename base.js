const DOM_strings = {
    cityLists:document.querySelector('.cityList'),
    countryList:document.querySelector('.countryList'),
    img:document.querySelector('.picture'),
    temp:document.querySelector('.temp'),
    desc:document.querySelector('.desc'),
    days:document.querySelector('.days'),
    info:document.querySelector('.sec_2_info'),
    sec_2:document.querySelector('.extra'),
    load:document.querySelector('.output')
    

}

const elements = {
    loader:'loader'
}

const spinner = parent =>{
    const loader = `<span class="${elements.loader}"></span>`;
    parent.insertAdjacentHTML('afterbegin',loader)
}

const clearSpinner = () =>{
    const loader = document.querySelector(`.${elements.loader}`);
    if(loader)
        loader.parentElement.removeChild(loader);
}