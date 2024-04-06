customElements.define('webshop-variant-combinations', class extends HTMLElement {

    static get observedAttributes() {
        return ['value'];
    }

    get value() {
        return this.getAttribute( 'value' );
    }

    set value( val ) {
        this.setAttribute( 'value', val );
    }
    constructor(){
        super();
        this.selectors = Array.from(this.querySelectorAll('webshop-variant-selector'));
        
    }
    connectedCallback(){
        customElements.whenDefined('webshop-variant-selector').then(() =>{
            this.setSelectors();
        });
        this.addEventListener('variant.update', this, false);
        this.querySelector('form').addEventListener('submit', this, false);
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (oldValue === null || oldValue === newValue) return;
        console.log(`${name} changed from ${oldValue} to ${newValue}`);
        if(name === 'value'){
            this.updateFormFields();
            this.fetchNewData();
        }
    }

    handleEvent(event){
        console.log(`Handle event: ${event.type}`);
        switch ( event.type ){
            case 'variant.update':
                this.setCombination(event);
                break;
            case 'submit':
                this.addToCart(event);
        }
    }
    setSelectors(){
        const currentCombination = this.value.split('.');
        this.selectors.forEach((selector, index) =>{
            selector.value = currentCombination[index];
            selector.selectedIndex = index;
        });
        this.validateSelectors();
    }
    setCombination(){
        this.value = this.selectors.map(vs => vs.value).join('.');
        this.validateSelectors();
    }

    updateFormFields(){
        this.querySelector('input[name="VariantId"]').value = this.value;
    }
    
    validateSelectors(){
        const validCombinations = [
            ['VO12', 'VO22'],
            ['VO12', 'VO23'],
            ['VO12', 'VO24'],
            ['VO12', 'VO25'],
            ['VO13', 'VO22'],
            ['VO13', 'VO24'],
            ['VO13', 'VO25'],
            ['VO14', 'VO22'],
            ['VO14', 'VO23'],
            ['VO14', 'VO24'],
            ['VO15', 'VO22'],
            ['VO15', 'VO23'],
            ['VO15', 'VO24'],
            ['VO15', 'VO25']
        ];

        const selectors = this.selectors;

        let current = null;
        let map = {};
        validCombinations.forEach(combination => {
            
            
            if(current !== combination[0]){
                current = combination[0];
                map[combination[0]] = validCombinations.filter(v => v[0] === current ).map(v => v[1]);
            }
        });
        
        Object.keys(map).forEach((mapKey) =>{
            const selectedValue = this.selectors[0].querySelector('select').value;
            if(selectedValue === mapKey){
                const possibleSelect = this.selectors[1].querySelector('select');
                Array.from(possibleSelect.options).forEach((option) =>{
                    option.disabled = !(map[mapKey].includes(option.value));
                    console.log(`Validating ${mapKey}.${option.value} - should disable: ${!(map[mapKey].includes(option.value))}`);
                })
            }
        })
        
    }
    
    
    
    fetchNewData(){
        console.log(`fetch new data based upon ${this.value}`);
       
    }

    addToCart(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('/', {
            method: 'post',
            body: formData
        })
    }
});