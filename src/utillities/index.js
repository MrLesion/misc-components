const buildHtmlElement = ( tagName, attributes = {}, content = '' ) => {
    const htmlElement = document.createElement( tagName );
    Object.keys( attributes ).forEach( key => htmlElement.setAttribute( key, attributes[ key ] ) );
    if ( content !== '' ) {
        htmlElement.innerHTML = content;
    }
    return htmlElement;
}
const formatOptionAttribute = ( strOptionsAttributeName ) => {
    return strOptionsAttributeName.split( '-' ).map( ( char, index ) => index ? char.charAt( 0 ).toUpperCase() + char.slice( 1 ).toLowerCase() : char.toLowerCase() ).join( '' );
}
const formatOptionValue = ( strAttribute ) => {
    let value = Number( strAttribute );
    if ( isNaN( value ) ) {
        value = strAttribute;
        if ( value.toLowerCase() === 'true' ) {
            value = true;
        }
        else if ( value.toLowerCase() === 'false' ) {
            value = false;
        }
        else if ( value.indexOf( ',' ) > -1 ) {
            value = value.split( ',' ).map( ( str ) => str );
        }
    }
    return value;
}

const generateGuid = () => {
    const array = new Uint32Array(4);
    crypto.getRandomValues(array);

    return `${toHex(array[0], 8)}-${toHex(array[1], 4)}-${toHex(array[2], 4)}-${toHex(array[3], 8)}`;
}

const toHex = (value, length) => {
    let hex = value.toString(16);
    while (hex.length < length) {
        hex = '0' + hex;
    }
    return hex;
}

const minifyStyle = (input) =>{
    let output = input;
    output = output.replace(/\/\*[\s\S]*?\*\//g, '');
    output = output.replace(/\s+/g, ' ');
    output = output.trim();
    return output;
}


export { buildHtmlElement, formatOptionAttribute, formatOptionValue, generateGuid, minifyStyle }