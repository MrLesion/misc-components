import { buildHtmlElement } from '../utillities';

class CustomSelect extends HTMLElement {
    static formAssociated = true;

    constructor () {
        super();
        this.shadow            = this.attachShadow( {
            mode: 'open',
            delegatesFocus: true
        } );
        this.name              = '';
        this.default           = '';
        this.search           = false;
        this.height            = 40;
        this.internals         = this.attachInternals();
        this.selected          = {
            value: '',
            text: ''
        };
        const styleSheet       = document.createElement( 'style' );
        const style            = `
            :host {
                position: relative;
                height: 40px;
                width:100%;
                display:block;
                font-family: Arial, Helvetica, sans-serif;
                font-size: .95em;
            }
            :host:focus {
              box-shadow: 0  0 6px rgba(0,0,0,0.5);
            }
            .custom-select-list {
                position:absolute;
                padding:0;
                margin:0;
                list-style:none;
                overflow: hidden;
                width:100%;
                height: ${this.height}px;
                border: 1px solid #ccc;
                border-radius: 3px;
                background-color:#f1f1f1;
                box-shadow: 0 2px 0 rgba(0,0,0, 0);
                transition: all .2s ease;
                
            }
            .custom-select-list.open {
                box-shadow: 0 1px 5px rgba(0,0,0, .2);
                z-index: 9;
            }
            .custom-select-list li {
                display:block;
                padding:10px;
                height: 20px;
                cursor: pointer;
                transition: all .2s ease;
                background-color: transparent;
            }
            .custom-select-list li:hover {
                background-color: #e1e1e1;
            }
            .custom-select-list li.custom-select-list-default {
                border-bottom: 1px solid #ccc
            }
            .custom-select-list li.custom-select-list-default::after {
                content: '\u25BC';
                position: absolute;
                right: 10px;
                top: 15px;
                font-size: 10px;
                color: currentColor;
            }
            .custom-select-list li.custom-select-list-default.error {
                 box-shadow: inset 0 0 6px rgba(255,0,0,0.5);
                  outline: 0;
            }
        `;
        styleSheet.textContent = style;
        window.document.addEventListener( 'DOMContentLoaded', () => {
            this.tabIndex = 0;
            if ( !this.hasAttribute( 'role' ) ) {
                this.setAttribute( 'role', 'select' );
            }
            if ( this.hasAttribute( 'required' ) ) {
                this.setAttribute( 'aria-valid', 'false' );
            }
            this.name                     = this.getAttribute( 'name' );
            this.default                  = this.getAttribute( 'default' );
            this.search                  = String(this.getAttribute( 'search' )) === 'true';
            this.selected                 = {
                value: '',
                text: this.default
            };
            this.fakeSelect               = buildHtmlElement( 'ul', { class: `custom-select-list custom-select-list-${this.name}` } );
            this.defaultOption            = buildHtmlElement( 'li', { class: 'custom-select-list-default' }, this.selected.text );
            
            if(this.search === true){
                this.searcher               = buildHtmlElement( 'div', { class: ``, contenteditable: true } );
            }
            const defaultSelectableOption = buildHtmlElement( 'li', {}, this.default );
            defaultSelectableOption.addEventListener( 'click', this.reset.bind( this ) );
            this.defaultOption.addEventListener( 'click', () => {
                this.toggle.call( this );
            } );
            this.fakeSelect.appendChild( this.defaultOption );

            this.fakeSelect.appendChild( defaultSelectableOption );

            const options = this.querySelectorAll( 'slot' );
            options.forEach( ( option ) => {
                const value      = option.getAttribute( 'value' );
                const fakeOption = buildHtmlElement( 'li', {}, option.textContent );
                this.fakeSelect.appendChild( fakeOption );
                fakeOption.addEventListener( 'click', () => {
                    this.selected = {
                        value: value,
                        text: option.textContent
                    };
                    this.setOption.call( this );
                } );
            } );
            this.shadow.appendChild( styleSheet );
            this.shadow.appendChild( this.fakeSelect );
            this.setValidity.call( this );
        } );
    }

    setHeight () {
        let height = this.fakeSelect.children.length * 40;
        if ( this.fakeSelect.classList.contains( 'open' ) ) {
            height = 40;
        }
        this.fakeSelect.style.height = `${height}px`;
    }

    toggle () {
        this.setHeight();
        this.fakeSelect.classList.toggle( 'open' );
    }

    reset () {
        this.selected = {
            value: '',
            text: this.default
        };
        this.setOption.call( this );
    }

    setOption () {
        this.testValidity.call( this );
        this.internals.setFormValue( this.selected.value );
        this.defaultOption.textContent = this.selected.text;
        this.toggle.call( this );
    }

    testValidity () {
        if ( !this.matches( ':disabled' ) && this.hasAttribute( 'required' ) && !this.selected.value ) {
            this.internals.setValidity( { customError: true }, 'Required' );
            this.focus();
            this.defaultOption.classList.add( 'error' );
        }
        else {
            this.internals.setValidity( {} );
            this.defaultOption.classList.remove( 'error' );
        }
    }

    setValidity () {
        if ( !this.matches( ':disabled' ) && this.hasAttribute( 'required' ) && !this.selected.value ) {
            this.internals.setValidity( { customError: true }, 'Required' );
        }
        else {
            this.internals.setValidity( {} );
        }
    }
}

customElements.define( 'custom-select', CustomSelect );