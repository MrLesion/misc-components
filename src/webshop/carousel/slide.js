class WebshopCarouselSlide extends HTMLElement {

    static get observedAttributes() {
        return [];
    }
    

    constructor() {
        super();

    }

    connectedCallback() {

    }

    attributeChangedCallback( name, oldValue, newValue ) {
        if ( oldValue === null || oldValue === newValue ) return;
        if ( name === 'value' ) {
            //this.querySelector('select').value = newValue;
        }
        console.log( `${ name } changed from ${ oldValue } to ${ newValue }` );
    }

    handleEvent( event ) {
        switch ( event.type ) {

        }
    }
}

customElements.define('webshop-carousel-slide', WebshopCarouselSlide);