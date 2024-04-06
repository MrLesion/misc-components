import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {buildHtmlElement} from "../utillities";

const CUBE_WIDTH = 10;
const CUBE_HEIGHT = 10;
const CUBE_DEPTH = 10;

class TentVisualizer extends HTMLElement {
    static get observedAttributes() {
        return ['front-count', 'front-width', 'front-widths', 'fronts', 'left', 'right', 'view', 'width'];
    }

    get frontCount() {
        return parseInt(this.getAttribute( 'front-count' ));
    }

    set frontCount( val ) {
        this.setAttribute( 'front-count', val );
    }

    get frontWidth() {
        return parseInt(this.getAttribute( 'front-width' ));
    }

    set frontWidth( val ) {
        this.setAttribute( 'front-width', val );
    }

    get frontWidths() {
        return this.getAttribute( 'front-widths' );
    }

    set frontWidths( val ) {
        this.setAttribute( 'front-widths', val );
    }

    get fronts() {
        return this.getAttribute( 'fronts' );
    }

    set fronts( val ) {
        this.setAttribute( 'fronts', val );
    }

    get left() {
        return this.getAttribute( 'left' );
    }

    set left( val ) {
        this.setAttribute( 'left', val );
    }

    get right() {
        return this.getAttribute( 'right' );
    }

    set right( val ) {
        this.setAttribute( 'right', val );
    }

    get view() {
        return this.getAttribute( 'view' );
    }

    set view( val ) {
        this.setAttribute( 'view', val );
    }

    get width() {
        return parseInt(this.getAttribute( 'width' ));
    }

    set width( val ) {
        this.setAttribute( 'width', val );
    }

    constructor() {
        super();
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.textureLoader = null;
        this.cubes = [];
        this.draggableItem = null;

        //this.initialize();
        this.buildScene();
        this.doRender();
        this.createSortableList();

        window.addEventListener( 'resize', this.updateCamera );
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        if ( oldValue === null || oldValue === newValue ) return;
        console.log( `${ name } changed from ${ oldValue } to ${ newValue }` );
        if ( name === 'front-count' ) {
            this.clearScene();
            this.buildScene();
        } else if ( name === 'fronts' ) {
            this.updateFaces();
            if(oldValue.length !== newValue.length){
                this.updateSortableList();
            }
            
        } else if ( name === 'left' ) {
            this.updateGable(name, newValue);
            this.view = 'left';
        } else if ( name === 'right' ) {
            this.updateGable(name, newValue);
            this.view = 'right';
        } else if ( name === 'view' ) {
            this.switchView(newValue);
        }
    }

    handleEvent( event ) {
        console.log( `Handle event: ${ event.type }` );
        switch ( event.type ) {
        }
    }

    buildScene(){
        this.textureLoader = new THREE.TextureLoader();
        var backgroundTexture = this.textureLoader.load( './public/gradient.png' );

        this.scene = new THREE.Scene();
        this.scene.background = backgroundTexture;
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.set( 12, 5, 10 );
        this.renderer = new THREE.WebGLRenderer(
            {
                antialias: true
            }
        );
        this.appendChild( this.renderer.domElement );

        this.group = new THREE.Group();
        let position = 0;
        
        if(this.frontWidth === 0){
            const cube = this.addRemainingSpace(position, this.width);
            this.group.add( cube );
            this.cubes.push( cube );
        } else{
            const fronts = this.fronts.split(',').filter(element => element);
            const frontWidths = this.frontWidths.split(',')
                .filter(element => element);
            
            
            let availableSpace = this.width - frontWidths.reduce((partialSum, a) => partialSum + parseInt(a), 0);
            fronts.forEach((front, index) =>{
                const frontWidth = parseInt(frontWidths[index]);
                //const cubeWidth = this.width;
                
                const cube = this.generateCube(position, frontWidth);
                this.group.add( cube );
                this.cubes.push( cube );

                const frontPosition = index > 0 ? parseInt(this.frontWidths.split(',').filter(element => element)[index]) : 0;
                console.log(frontPosition, frontWidth)
                position += frontWidth;
                
                
            });
            console.log(`Available space left: ${availableSpace}`);
            console.log(`Available pos: ${position}`);
            const remainingCube = this.addRemainingSpace(position, availableSpace);
            this.group.add( remainingCube );
            this.cubes.push( remainingCube );
        }

        new THREE.Box3().setFromObject( this.group  ).getCenter( this.group.position ).multiplyScalar( -1 );
        this.scene.add( this.group );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.enableDamping = true;
        //controls.dispose();
        this.resizeRendererToDisplaySize();
        this.switchView(this.view);
    }

    initialize() {
        this.textureLoader = new THREE.TextureLoader();
        var backgroundTexture = this.textureLoader.load( './public/gradient.png' );
        
        this.scene = new THREE.Scene();
        this.scene.background = backgroundTexture;
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.set( 12, 5, 10 );
        this.renderer = new THREE.WebGLRenderer();
        this.appendChild( this.renderer.domElement );
        let position = 0;
        this.group = new THREE.Group();
        //let innerGroup = new THREE.Group();
        for ( let i = 0; i < this.frontCount; i++ ) {
            const cube = this.generateCube(position);
            //innerGroup.add(cube);
            /*
            if(innerGroup.children.length === 2){
                this.group.add( innerGroup );
                innerGroup = new THREE.Group();
            }
            
             */
            this.group.add( cube );
            this.cubes.push( cube );
            position += CUBE_WIDTH;
        }
        console.log(this.group);
        new THREE.Box3().setFromObject( this.group  ).getCenter( this.group .position ).multiplyScalar( - 1 );
        this.scene.add( this.group );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.enableDamping = true;
        controls.dispose();
        this.resizeRendererToDisplaySize();
        this.switchView(this.view);
    }
    
    switchView(direction){
        switch ( direction ) {
            case 'left':
                const leftX = -(20 + this.frontCount);
                this.updateCamera(leftX);
                break;
            case 'center':
                const centerX = 0;
                this.updateCamera(centerX);
                break;
            case 'right':
                const rightX = (20 + this.frontCount);
                this.updateCamera(rightX);
                break;
        }
        this.createSortableList();
    }
    
    updateGable(side, value){
        const texture = this.textureLoader.load( `./public/fronts/${value}.png` );
        if(side === 'left'){
            this.cubes[0].material[1].map = texture;
        } else if(side === 'right'){
            this.cubes[this.cubes.length - 1].material[0].map = texture;
        }
    }
    
    addRemainingSpace(position, cubeWidth){
        
        const cube = this.generateCube(position, cubeWidth);
        var geo = new THREE.EdgesGeometry( cube.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0x000000 } );
        var wireframe = new THREE.LineSegments( geo, mat );
        cube.add( wireframe );
        return cube;
    }
    
    updateFaces(){
        this.resetScene();
        this.buildScene();
        const fronts = this.fronts.split(',').filter(element => element);
        console.log('update faces', fronts);
        const defaultTexture = this.textureLoader.load( './public/white.png' );
        this.cubes.forEach((cube, index) =>{
            if(fronts[index] !== undefined){
                const texture = this.textureLoader.load( `./public/fronts/${fronts[index]}.png` );
                cube.material[4].map = texture;
            } else{
                cube.material[4].map = defaultTexture;
            }
        })
    }

    doRender() {
        requestAnimationFrame( this.doRender.bind(this) );
        this.renderer.render( this.scene, this.camera );
    }

    updateCamera(cameraX) {
        const offset = 5;
        const boundingBox = new THREE.Box3().setFromObject( this.group );
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());

        const maxDim = Math.max( size.x, size.y, size.z );
        const fov = this.camera.fov * ( Math.PI / 180 );
        let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

        let addZoom = cameraX === 0 ? (this.frontCount * 0.5) : 0;
        
        cameraZ *= (offset + addZoom);

        this.camera.position.y = 5 + this.frontCount;
        this.camera.position.z = cameraZ;
        this.camera.position.x = cameraX;

        const minZ = boundingBox.min.z;
        const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

        this.camera.far = cameraToFarEdge * 3;
        this.camera.updateProjectionMatrix();

        if ( this.controls ) {
            this.controls.target = center;
            this.controls.maxDistance = cameraToFarEdge * 2;
            this.controls.saveState();

        } else {
            this.camera.lookAt( center )

        }
    }
    
    generateCube(position, cubeWidth){
        console.log('generateCube', position, cubeWidth);
        const geometry = new THREE.BoxGeometry( cubeWidth, CUBE_HEIGHT, CUBE_DEPTH );
        const defaultTexture = this.textureLoader.load( './public/white.png' );
        
        const materials = [
            new THREE.MeshBasicMaterial( {
                map: defaultTexture // right end
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture // left end
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture // front
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture
            } )
        ];

        const cube = new THREE.Mesh( geometry, [...materials] );
        cube.position.x = position;
        
        return cube;
    }

    resizeRendererToDisplaySize() {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            this.renderer.setSize(width, height, false);
        }
        return needResize;
    }
    
    resetScene(){
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.textureLoader = null;
        this.cubes = [];
        this.innerHTML = '';
        this.emit('tent.visualizer.reset');
    }

    clearScene(){
        this.fronts = '';
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.textureLoader = null;
        this.cubes = [];
        this.innerHTML = '';
        this.emit('tent.visualizer.cleared');
    }
    
    emit(event){
        this.dispatchEvent(new CustomEvent(event));
    }

    createSortableList(){
        const list = this.querySelector('.js-selected-fronts');
        if(list){
            this.removeChild(list)
        }
        const newList = buildHtmlElement('div', {class: 'list-group js-selected-fronts selected-fronts'});
        this.appendChild(newList);
        this.updateSortableList();
        this.setDraggable();
    }

    updateSortableList(){
        const list = this.querySelector('.js-selected-fronts');
        if(list){
            list.innerHTML = '';
            const fronts = this.fronts.split(',').filter(element => element);
            fronts.forEach((front, index) =>{
                const item = buildHtmlElement('div', {class: 'list-group-item js-selected-front selected-front-item list-group-item-action', 'data-index': index, draggable: true});
                const itemText = buildHtmlElement('span', {style: 'pointer-events:none;'}, front);
                item.appendChild(itemText);
                const itemActions = buildHtmlElement('span', {class: 'js-selected-front-remove selected-front-item-remove'}, 'x');
                item.appendChild(itemActions);
                list.appendChild(item);
            });
            list.querySelectorAll('.js-selected-front-remove').forEach(i => i.addEventListener('click', (event) => {
                const index = parseInt(event.target.closest('.js-selected-front').dataset.index);
                let fronts = this.fronts.split(',').filter(element => element);
                console.log(index);
                fronts.splice(index, 1);
                this.fronts = fronts.join(',');
                this.emit('tent.visualizer.cleared');
            }))
        }
    }
    
    setDraggable(){
        const sortableList = this.querySelector('.js-selected-fronts');
        sortableList.addEventListener('dragstart', this.onSortStart.bind(this));
        sortableList.addEventListener('dragend', this.onSortEnd.bind(this));
        sortableList.addEventListener('dragover', this.onSortOver.bind(this));
        
        
    }
    
    onSortStart(event){
        console.log(event);
        this.draggableItem = event.target;
        setTimeout(() => {
            this.draggableItem.classList.add('dragged');
        }, 0);
    }
    
    onSortOver(event){
        const sortableList = this.querySelector('.js-selected-fronts');
        event.preventDefault();
        const afterElement = this.getDragAfterElement(sortableList, event.clientY);
        const draggable = document.querySelector('.dragged');
        if (afterElement == null) {
            sortableList.appendChild(draggable);
        } else {
            sortableList.insertBefore(draggable, afterElement);
        }
    }

    onSortEnd(){
        const sortableList = this.querySelector('.js-selected-fronts');
        this.draggableItem.classList.remove('dragged');
        this.draggableItem = null;
        const newIndexes = Array.from(sortableList.querySelectorAll('.js-selected-front')).map(i => parseInt(i.dataset.index));
        let fronts = this.fronts.split(',').filter(element => element);
        fronts.forEach((front, index) =>{
            let removedItem = fronts.splice(index, 1)[0];
            fronts.splice(newIndexes.indexOf(index), 0, removedItem);
        });
        this.fronts = fronts.join(',');
        this.createSortableList();
    }

    getDragAfterElement(container, y){
        const draggableElements = [...container.querySelectorAll('.js-selected-front:not(.dragged)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

}

customElements.define( 'tent-visualizer', TentVisualizer );