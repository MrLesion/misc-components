customElements.define('webshop-variant-selector', class extends HTMLElement {

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
    constructor(){
        super();
        this.options = this.querySelector('select');
        this.options.addEventListener('change', this, false);
        
    }
    connectedCallback(){
        customElements.whenDefined('webshop-variant-combinations').then(() =>{
            this.combinationsElement = this.closest('webshop-variant-combinations');
        })
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (oldValue === null || oldValue === newValue) return;
        if(name === 'value'){
            this.querySelector('select').value = newValue;
        }
        console.log(`${name} changed from ${oldValue} to ${newValue}`);
    }

    handleEvent(event){
        switch ( event.type ){
            case 'change':
                this.setVariant(event);
                break;
        }
    }
    setVariant(event){
        this.value = event.target.value;
        if(this.combinationsElement === undefined){
            return alert('Missing parent element <webshop-variant-combinations>')
        }
        this.combinationsElement.dispatchEvent(new CustomEvent('variant.update'));
    }
});