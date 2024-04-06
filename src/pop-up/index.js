import { buildHtmlElement } from '../utillities';

customElements.define('pop-up', class extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        const style = `
            .pop-up-btn{
                cursor: pointer;
                position: fixed;
                padding: .5em 1em;
                background: red;
                color: white;
                opacity:1;
                transition: all .5s ease;
                border-radius: 3px;
                box-shadow: 0 3px 5px 0px rgba(0,0,0, .25);
            }
            .pop-up-content{
                position: fixed;
                padding: .5em 1em;
                background: #ccc;
                opacity:1;
                transition: all .5s ease;
                min-height: 100px;
                min-width: 200px;
                border-radius: 3px;
                box-shadow: 0 1px 1px 0px rgba(0,0,0, .5);
            }
            .position-0{
                bottom: 1em;
                right: 1em;
            }
            .position-1{
                bottom: 1em;
                left: 1em;
            }
            .pop-up-content.position-0{
                bottom: .5em;
                right: .5em;
            }
            .pop-up-content.position-1{
                bottom: .5em;
                left: .5em;
            }
        `;
        const styleSheet = buildHtmlElement('style', {}, style);
        this.options = {
            buttonText: 'Pop me',
            position: 0,
            wait: 100,
            content: null
        };
        this.shadow.appendChild(styleSheet);
    }
    connectedCallback(){
        this.setOptionsByAttributes();
        window.document.addEventListener( 'DOMContentLoaded', () => {
            this.setTemplate();
            this.renderButton();
        });
    }
    
    setOptionsByAttributes(){
        const optionNames = this.getAttributeNames();
        optionNames.forEach((optionName) =>{
            this.options[optionName] = this.getAttribute(optionName);
        });
    }

    setTemplate(){
        const template = this.querySelector('template');
        this.options.content = template !== null ? template.content : buildHtmlElement('span', {}, '[template missing]');
    }
    
    renderButton(){
        const button = buildHtmlElement('a', {class: `pop-up-btn`}, this.options.buttonText);
        button.onclick = this.renderContent.bind(this);
        this.renderElement.call(this, button);
    }
    renderContent(){
        console.log(this.options.content);
        const content = buildHtmlElement('div', {class: 'pop-up-content'});
        content.appendChild(this.options.content);
        this.renderElement.call(this, content);
    }
    renderElement(domElement){
        domElement.style.opacity = 0;
        this.shadow.appendChild(domElement);
        const height = domElement.offsetHeight;
        domElement.style.bottom = `-${height}px`;

        setTimeout(() =>{
            domElement.classList.add(`position-${this.options.position}`);
            domElement.style = '';
        }, this.options.wait);
    }
});