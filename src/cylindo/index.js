const getCylindoFeatures = () =>{
    let returnValue = {};
    const initialState = document.querySelector('.js-initial-cylindo-state').textContent;
    let splitInitialState = initialState.split(' ');
    returnValue[splitInitialState[0]] = splitInitialState[1];

    const variants = document.querySelectorAll(".js-cylindo-variants");
    const optionals = document.querySelectorAll('.js-cylindo-optional');

    Array.from(variants).forEach(variant => {
        returnValue[variant.name] = variant.value;
    });

    Array.from(optionals).filter(o => o.checked === true).forEach(optional => {
        returnValue[optional.name] = optional.value;
    });
    
    console.log('features', returnValue);
    
    return returnValue;
}

const setCylindoFeatures = (viewer) =>{
    viewer.features = getCylindoFeatures();
}

const updateViewers = () =>{
    const viewers = document.querySelectorAll("cylindo-viewer");
    viewers.forEach((viewer) =>{
        setCylindoFeatures(viewer);
    });
}

const init = () =>{
    const variants = document.querySelectorAll(".js-cylindo-variants");
    const optionals = document.querySelectorAll('.js-cylindo-optional');
    
    variants.forEach(variant => {
        variant.addEventListener("change", event => {
            updateViewers();
        });
    });

    optionals.forEach(optional => {
        optional.addEventListener("change", event => {
            updateViewers();
        });
    });

    updateViewers();
}

document.addEventListener('DOMContentLoaded', () =>{
    init();
});

