import slide from './slide'
class WebshopCarousel extends HTMLElement {

    static get observedAttributes() {
        return ['value'];
    }

    get value() {
        return this.getAttribute( 'value' );
    }

    set value( val ) {
        this.setAttribute( 'value', val );
    }

    get label() {
        return this.getAttribute( 'label' );
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

customElements.define('webshop-carousel', WebshopCarousel);