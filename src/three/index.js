import './tent-vizualizer';

const isabellaVisualizer = {
    visualizer: null,
    init: () => {
        isabellaVisualizer.bindEvents();
    },
    bindEvents: () =>{

        const frontOptionBtns = document.querySelectorAll( '.js-front-item-btn' );
        //const frontOptions = document.querySelectorAll( '.js-front-item' );
        const rightGableOptions = document.querySelectorAll( '.js-right-item' );
        const leftGableOptions = document.querySelectorAll( '.js-left-item' );
        
        isabellaVisualizer.visualizer.addEventListener('tent.visualizer.cleared', () =>{
            frontOptionBtns.forEach(b => b.disabled = false)
            rightGableOptions.forEach(i => i.checked = false);
            leftGableOptions.forEach(i => i.checked = false);
        });

        frontOptionBtns.forEach(i => i.addEventListener('click', (event) =>{
            isabellaVisualizer.addFront(event);
        }));
        /*
        frontOptions.forEach(i => i.addEventListener('change', (event) =>{
            isabellaVisualizer.selectFrontItem(event);
        }));
        
         */
        
        rightGableOptions.forEach(i => i.addEventListener('change', (event) =>{
            isabellaVisualizer.visualizer.setAttribute('right', event.target.value);
        }));

        leftGableOptions.forEach(i => i.addEventListener('change', (event) =>{
            isabellaVisualizer.visualizer.setAttribute('left', event.target.value);
        }));

        document.querySelector('.js-select-width').addEventListener('change', (event) =>{
            isabellaVisualizer.visualizer.setAttribute('front-count', event.target.value);
        });

        document.querySelectorAll( '.js-view-btn' ).forEach( btn => btn.addEventListener( 'click', ( event ) => {
            const direction = event.target.dataset.dir;
            isabellaVisualizer.visualizer.setAttribute('view', direction);
        } ) );
    },
    selectFrontItem: (event) =>{
        const maxCount = parseInt(isabellaVisualizer.visualizer.getAttribute('front-count'));

        const checked = Array.from(document.querySelectorAll( '.js-front-item' )).filter(i => i.checked).map(i => i.value);
        isabellaVisualizer.visualizer.setAttribute('fronts', checked.join(','));

        const currentFaces = isabellaVisualizer.visualizer.getAttribute('fronts').split(',').filter(element => element);
        if(currentFaces.length === maxCount){
            Array.from(document.querySelectorAll( '.js-front-item' )).filter(i => !i.checked).forEach(i => i.disabled = true);
        } else{
            Array.from(document.querySelectorAll( '.js-front-item' )).filter(i => !i.checked).forEach(i => i.disabled = false);
        }
    },
    addFront(event){
        const maxLength = parseInt(isabellaVisualizer.visualizer.getAttribute('max-width'));
        const currentFronts = isabellaVisualizer.visualizer.getAttribute('fronts').split(',').filter(element => element);
        const currentFrontWidths = isabellaVisualizer.visualizer.getAttribute('front-widths').split(',').filter(element => element);
        let currentFrontWidth = parseInt(isabellaVisualizer.visualizer.getAttribute('front-width'));
        
        currentFronts.push(event.target.dataset.value);
        currentFrontWidths.push(event.target.dataset.width);
        
        currentFrontWidth += parseInt(event.target.dataset.width);
        const remainingSpace = maxLength - currentFrontWidth;

        document.querySelectorAll( '.js-front-item-btn' ).forEach((btn) =>{
            console.log(parseInt(btn.dataset.width), remainingSpace);
            if(parseInt(btn.dataset.width) > remainingSpace){
                btn.disabled = true;
            } else{
                btn.disabled = false;
            }
        });
        
        isabellaVisualizer.visualizer.setAttribute('front-width', currentFrontWidth);
        isabellaVisualizer.visualizer.setAttribute('front-widths', currentFrontWidths.join(','));
        isabellaVisualizer.visualizer.setAttribute('fronts', currentFronts.join(','));
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    customElements.whenDefined('tent-visualizer').then(() =>{
        isabellaVisualizer.visualizer = document.querySelector('tent-visualizer');
        isabellaVisualizer.init();
    });
});