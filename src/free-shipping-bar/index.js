import { buildHtmlElement, formatOptionAttribute, formatOptionValue, generateGuid, minifyStyle } from '../utillities';

customElements.define( 'free-shipping-bar', class extends HTMLElement {
    constructor () {
        super();
        this.shadow          = this.attachShadow( { mode: 'open' } );
        this.style
        this.templateRegEx   = /\{\{\s*(.*?)\s*\}\}/g;
        this.styleVariables  = {
            height: 20,
            color: 'currentColor',
            backgroundColor: '#e1e1e1',
            success: '#d4edda',
            progressColor: 'rebeccapurple'
        };
        this.data            = {
            initOnLoad: true,
            min: 0,
            max: 100,
            feeLimit: 20,
            feeLabelBottom: '',
            feeLabelTop: '',
            shippingLimit: 80,
            shippingLabelBottom: '',
            shippingLabelTop: '',
            currentValue: 0,
            template: null
        };
        this.computed        = {
            shippingLimitCalculated () {
                return ( ( this.data.shippingLimit - this.data.min ) / ( this.data.max - this.data.min ) ) * 100;
            },
            currentValueCalculated () {
                const value = ( ( this.data.currentValue - this.data.min ) / ( this.data.max - this.data.min ) ) * 100;
                return value < 100 ? value : 100;
            },
            feeLimitCalculated () {
                return ( ( this.data.feeLimit - this.data.min ) / ( this.data.max - this.data.min ) ) * 100;
            },
            feeLimitReached () {
                return this.data.feeLimit <= this.data.currentValue ? 'reached' : '';
            },
            shippingLimitReached () {
                return this.data.shippingLimit <= this.data.currentValue ? 'reached' : '';
            }
        }
        this.container       = buildHtmlElement( 'div', { id: generateGuid() } );
        this.shadow.appendChild( this.container );
    }

    connectedCallback () {
        console.log('connected');
        this.setDataByAttributes();
        this.setStyle();
        this.dispatchEvent( new CustomEvent( 'connected' ) );
        
        console.log(this.data);
        
        if(this.data.initOnLoad === true){
            window.document.addEventListener( 'DOMContentLoaded', () => {
                this.init();
            } );
        }
    }
    
    init(){
        this.setTemplate();
        this.classList.add('is-loaded');
        this.dispatchEvent( new CustomEvent( 'loaded' ) );
    }

    update ( objUpdate ) {
        Object.keys( objUpdate ).forEach( ( key ) => {
            if(key === 'customStyle'){
                this.styleVariables = Object.assign(this.styleVariables, objUpdate[ key ]);
            }
            if ( Object.hasOwn( this.data, key ) ) {
                this.data[ key ] = formatOptionValue( objUpdate[ key ] );
            }
        } );
        this.container.removeChild( this.container.children[ 0 ] );
        this.setStyle();
        this.setTemplate();
        this.dispatchEvent( new CustomEvent( 'updated' ) );
    }

    setTemplate () {
        const template = this.querySelector( 'template' );
        if ( template !== null ) {
            const clone = document.importNode( template.content, true );
            this.setValues( clone.childNodes )
            this.container.appendChild( clone );
        }
        else {
            this.buildTemplate();
        }
    }

    setValues ( children ) {
        children.forEach( ( child ) => {
            if ( child.nodeType === Node.TEXT_NODE ) {
                const text        = child.textContent;
                child.textContent = text.replace( this.templateRegEx, ( match, variable ) => {
                    if ( Object.hasOwn( this.data, variable ) ) {
                        return this.data[ variable ];
                    }
                    else if ( Object.hasOwn( this.computed, variable ) ) {
                        return this.computed[ variable ].call( this );
                    }
                    else {
                        return match;
                    }
                } );
            }
            else if ( child.nodeType === Node.ELEMENT_NODE ) {
                const pseudoAttributes = Array.from( child.attributes ).filter( a => a.name.substring( 0, 1 ) === ':' );
                for ( let i = 0; i < pseudoAttributes.length; i++ ) {
                    ( ( index ) => {
                        let hasAttribute        = true;
                        const pseudoAttribute   = pseudoAttributes[ index ];
                        const realAttributeName = pseudoAttribute.name.substring( 1 );
                        const realAttribute     = child.getAttribute( realAttributeName );
                        let value               = realAttribute;
                        if ( realAttribute === null ) {
                            hasAttribute = false;
                            child.setAttribute( realAttributeName, '' );
                            value = '';
                        }
                        const newValue = pseudoAttribute.value.replace( this.templateRegEx, ( match, variable ) => {
                            if ( Object.hasOwn( this.data, variable ) ) {
                                return this.data[ variable ];
                            }
                            else if ( Object.hasOwn( this.computed, variable ) ) {
                                return this.computed[ variable ].call( this );
                            }
                            else {
                                return match;
                            }
                        } );
                        if ( hasAttribute === true ) {
                            value += ` ${newValue}`;
                        }
                        else {
                            value = `${newValue}`.trim();
                        }
                        child.removeAttribute( pseudoAttribute.name );
                        child.setAttribute( realAttributeName, value );
                    } )( i );
                }
                this.setValues( child.childNodes );
            }
        } );
    }

    setDataByAttributes () {
        this.getAttributeNames().forEach( ( attributeName ) => {
            if(attributeName === 'custom-style'){
               this.styleVariables = Object.assign(this.styleVariables, JSON.parse(this.getAttribute( attributeName )));
            }
            if ( Object.hasOwn( this.data, formatOptionAttribute( attributeName ) ) ) {
                this.data[ formatOptionAttribute( attributeName ) ] = formatOptionValue( this.getAttribute( attributeName ) );
            }
        } );
    }

    buildTemplate () {
        const container          = buildHtmlElement( 'div', { class: 'free-shipping-bar' } );
        const content            = buildHtmlElement( 'div', { class: 'free-shipping-bar--progress' } );
        const calculatedElements = this.getCalculatedElements.call( this );
        calculatedElements.forEach( ( calculatedElement ) => {
            content.append( calculatedElement );
        } );
        container.appendChild( content );
        this.container.appendChild( container );
    }
    
    setStyle(){
        let styleVariables = this.styleVariables;
        const currentStyleSheet = this.shadow.querySelector('#stylesheet');
        const style          = `
            :host{
                width: 100%;
                margin:0 auto;
                display:block;
                position:relative;
                color: ${styleVariables.color};
                user-select: none;
            }
            .free-shipping-bar--progress{
                width: 100%;
                display:block;
                height: ${styleVariables.height}px;
                background-color: ${styleVariables.backgroundColor};
                border: 1px solid ${styleVariables.dark};
                border-radius: 10px;
                position:relative;
                box-shadow: inset 1px 1px 3px rgba(0,0,0, .35);
            }
            .free-shipping-bar--line{
                height: ${styleVariables.height}px;
                background: ${styleVariables.progressColor};
                left: 0;
                top: 1px;
                border-radius: 10px;
            }
            .free-shipping-bar--label{
                position: absolute;
                transform: translate(-50%, -50%);
                text-align: center;
                font-size: .75em;
                font-weight: bold;
            }
            .free-shipping-bar--label.position-top{
                bottom: ${styleVariables.height + 5}px;
            }
            
            .free-shipping-bar--label.position-bottom{
                top: ${styleVariables.height + 25}px;
                padding: 5px 10px;
                background-color: ${styleVariables.backgroundColor};
                color:invert(${styleVariables.backgroundColor})
                border-radius: 5px;
                box-shadow: 0 1px 2px 0 rgba(0,0,0, .25);
            }
            .free-shipping-bar--label.position-bottom::before{
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-bottom-color: ${styleVariables.backgroundColor};
                top: 0;
                left: 0;
                margin: -9px 50%;
                transform: translateX(-50%);
            }
            .free-shipping-bar--label.position-bottom.reached{
                background-color: ${styleVariables.success};
            }
            .free-shipping-bar--label.position-bottom.reached::before{
                border-bottom-color: ${styleVariables.success};
            }
            .free-shipping-bar--label.align-left{
                transform: translate(0, -50%);
            }
            .free-shipping-bar--label.align-right{
                transform: translate(-100%, -50%);
            }
            .free-shipping-bar--pipe{
                position: absolute;
                top: 0;
                bottom: 0;
                transform: translateX(-50%);
                width: 2px;
                background-color:white;
            }
            .free-shipping-bar--current{
                width: ${styleVariables.height}px;
                height: ${styleVariables.height}px;
                background-color: ${styleVariables.progressColor};
                border-radius: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                border: 4px solid #fff;
                box-shadow: 0 0 2px rgba(0,0,0, .75);
                z-index: 1;
            }
        `;
        if(currentStyleSheet !== null){
            this.shadow.removeChild(currentStyleSheet);
        }
        const styleSheet = buildHtmlElement( 'style', {id: 'stylesheet'}, minifyStyle( style ) );
        this.shadow.appendChild( styleSheet );
    }

    getCalculatedElements () {
        const currentValuePercentage        = ( ( this.data.currentValue - this.data.min ) / ( this.data.max - this.data.min ) ) * 100;
        const feeLimitPercentage            = ( ( this.data.feeLimit - this.data.min ) / ( this.data.max - this.data.min ) ) * 100;
        const shippingLimitPercentage       = ( ( this.data.shippingLimit - this.data.min ) / ( this.data.max - this.data.min ) ) * 100;
        const currentValueElement           = buildHtmlElement( 'div', { class: 'free-shipping-bar--current' } );
        const currentValueLine              = buildHtmlElement( 'div', { class: 'free-shipping-bar--line' } );
        const minValueLabel                 = buildHtmlElement( 'div', { class: 'free-shipping-bar--label position-top align-left' }, new Intl.NumberFormat( 'da-DK', {
            style: 'currency',
            currency: 'DKK'
        } ).format( 0 ) );
        const maxValueLabel                 = buildHtmlElement( 'div', { class: 'free-shipping-bar--label position-top align-right' }, '+' );
        const feeValueLabelTop              = buildHtmlElement( 'div', { class: 'free-shipping-bar--label position-top' }, this.data.feeLabelTop );
        const feeValueLabelBottom           = buildHtmlElement( 'div', { class: 'free-shipping-bar--label position-bottom' }, this.data.feeLabelBottom );
        const feeValuePipe                  = buildHtmlElement( 'div', { class: 'free-shipping-bar--pipe' } );
        const shippingValueLabelTop         = buildHtmlElement( 'div', { class: 'free-shipping-bar--label position-top' }, this.data.shippingLabelTop );
        const shippingValueLabelBottom      = buildHtmlElement( 'div', { class: 'free-shipping-bar--label position-bottom' }, this.data.shippingLabelBottom );
        const shippingValuePipe             = buildHtmlElement( 'div', { class: 'free-shipping-bar--pipe' } );
        currentValueLine.style.width        = `${currentValuePercentage}%`;
        currentValueElement.style.left      = `${currentValuePercentage}%`;
        feeValueLabelTop.style.left         = `${feeLimitPercentage}%`;
        feeValueLabelBottom.style.left      = `${feeLimitPercentage}%`;
        feeValuePipe.style.left             = `${feeLimitPercentage}%`;
        shippingValueLabelTop.style.left    = `${shippingLimitPercentage}%`;
        shippingValueLabelBottom.style.left = `${shippingLimitPercentage}%`;
        shippingValuePipe.style.left        = `${shippingLimitPercentage}%`;
        maxValueLabel.style.left            = `100%`;
        return [
            minValueLabel,
            maxValueLabel,
            currentValueLine,
            currentValueElement,
            feeValueLabelTop,
            feeValueLabelBottom,
            feeValuePipe,
            shippingValueLabelTop,
            shippingValueLabelBottom,
            shippingValuePipe
        ];
    }
} );