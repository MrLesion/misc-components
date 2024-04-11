import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {buildHtmlElement} from "../utillities";

const CUBE_WIDTH = 10;
const CUBE_HEIGHT = 10;
const CUBE_DEPTH = 10;

class TentVisualizer extends HTMLElement {
    static get observedAttributes() {
        return ['front-widths', 'fronts', 'left-gable', 'right-gable', 'porch', 'view', 'max-width', 'width'];
    }

    get frontWidths() {
        const frontWidths = this.getAttribute( 'front-widths' );
        return frontWidths.split( ',' )
            .filter( element => element );
    }

    set frontWidths( val ) {
        this.setAttribute( 'front-widths', val );
    }

    get fronts() {
        const fronts = this.getAttribute( 'fronts' );
        return fronts.split( ',' )
            .filter( element => element );
    }

    set fronts( val ) {
        this.setAttribute( 'fronts', val );
    }

    get leftGable() {
        return this.getAttribute( 'left-gable' );
    }

    set leftGable( val ) {
        this.setAttribute( 'left-gable', val );
    }

    get rightGable() {
        return this.getAttribute( 'right-gable' );
    }

    set rightGable( val ) {
        this.setAttribute( 'right-gable', val );
    }

    get porch() {
        return this.getAttribute( 'porch' );
    }

    set porch( val ) {
        this.setAttribute( 'porch', val );
    }

    get view() {
        return this.getAttribute( 'view' );
    }

    set view( val ) {
        this.setAttribute( 'view', val );
    }

    get maxWidth() {
        return parseInt( this.getAttribute( 'max-width' ) );
    }

    set maxWidth( val ) {
        this.setAttribute( 'max-width', val );
    }

    constructor() {
        super();
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
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

        switch ( name ) {
            case 'max-width':
                this.clearScene();
                this.buildScene();
                break;
            case 'fronts':
                this.updateFaces();
                if ( oldValue.length !== newValue.length ) {
                    this.updateSortableList();
                }
                break;
            case 'left-gable':
                this.updateGable( name, newValue );
                this.view = 'left';
                break;
            case 'right-gable':
                this.updateGable( name, newValue );
                this.view = 'right';
                break;
            case 'view':
                this.switchView( newValue );
                break;
            case 'porch':
                this.resetScene();
                this.buildScene();
                break;
        }
    }

    handleEvent( event ) {
        console.log( `Handle event: ${ event.type }` );
        switch ( event.type ) {
        }
    }

    buildScene() {
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

        const totalWidth = this.frontWidths.reduce( ( partialSum, a ) => partialSum + parseInt( a ), 0 );
        if ( totalWidth === 0 ) {
            const cube = this.addRemainingSpace( position, this.maxWidth );
            cube.castShadow = true;
            cube.receiveShadow = true;
            this.group.add( cube );
            this.cubes.push( cube );
        } else {
            const fronts = this.fronts;
            const frontWidths = this.frontWidths;
            let availableSpace = this.maxWidth - frontWidths.reduce( ( partialSum, a ) => partialSum + parseInt( a ), 0 );
            fronts.forEach( ( front, index ) => {
                const frontWidth = parseInt( frontWidths[index] );
                const cube = this.generateCube( position, frontWidth );
                this.group.add( cube );
                this.cubes.push( cube );
                position += frontWidth;
            } );
            if ( availableSpace > 0 ) {
                const remainingCube = this.addRemainingSpace( position, availableSpace );
                this.group.add( remainingCube );
                this.cubes.push( remainingCube );
            }

        }

        new THREE.Box3().setFromObject( this.group ).getCenter( this.group.position ).multiplyScalar( -1 );
        this.scene.add( this.group );

        const roof = this.getRoof();
        this.scene.add( roof );

        const porch = this.getPorch();
        if ( porch !== null ) {
            console.log( 'add porch', porch );
            this.group.add( porch );
        }


        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.enableDamping = true;
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.minPolarAngle = Math.PI / 2.4;
        this.controls.maxPolarAngle = Math.PI / 2.4;
        //this.controls.dispose();


        this.resizeRendererToDisplaySize();
        this.switchView( this.view );
        this.controls.update();
    }

    switchView( direction ) {
        switch ( direction ) {
            case 'left':
                const leftX = -this.maxWidth;
                this.updateCamera( leftX );
                break;
            case 'center':
                const centerX = 0;
                this.updateCamera( centerX );
                break;
            case 'right':
                const rightX = this.maxWidth;
                this.updateCamera( rightX );
                break;
        }
        this.createSortableList();
    }

    updateGable( side, value ) {
        const texture = this.textureLoader.load( `./public/fronts/${ value }.png` );
        if ( side === 'left-gable' ) {
            this.cubes[0].material[1].map = texture;
        } else if ( side === 'right-gable' ) {
            this.cubes[this.cubes.length - 1].material[0].map = texture;
        }
    }

    getRoof() {
        const roofGeometry = new THREE.BoxGeometry( CUBE_DEPTH, 1, this.maxWidth );

        let pos = roofGeometry.attributes.position;
        for ( let i = 0; i < pos.count; i++ ) {
            if ( pos.getX( i ) < 0 && pos.getY( i ) > 0 ) {
                pos.setY( i, 3 );
            }
        }
        roofGeometry.computeVertexNormals();
        roofGeometry.rotateY( -(Math.PI / 2) )
        roofGeometry.translate( 0, (CUBE_HEIGHT / 2) + 0.5, 0 );
        //const defaultTexture = this.textureLoader.load( './public/white.png' );

        const roof = new THREE.Mesh( roofGeometry, new THREE.MeshBasicMaterial( {
            color: '#d2d7da'
        } ) );
        return roof;
    }

    getPorch() {

        const boundingBox = new THREE.Box3().setFromObject( this.group );
        const size = new THREE.Vector3();
        const sizes = boundingBox.getSize( size );

        console.log( 'porch position: ', sizes );
        if ( this.porch !== 'none' ) {
            const porch = this.generateCube( sizes.x, 10 );
            const geometry = new THREE.EdgesGeometry( porch.geometry );
            const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
            const wireframe = new THREE.LineSegments( geometry, material );
            porch.add( wireframe );
            return porch;
        }
        return null;
    }

    addRemainingSpace( position, cubeWidth ) {
        const cube = this.generateCube( position, cubeWidth );
        const geometry = new THREE.EdgesGeometry( cube.geometry );
        const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
        const wireframe = new THREE.LineSegments( geometry, material );
        cube.add( wireframe );
        return cube;
    }

    updateFaces() {
        this.resetScene();
        this.buildScene();
        const fronts = this.fronts;
        const defaultTexture = this.textureLoader.load( './public/white.png' );
        this.cubes.forEach( ( cube, index ) => {
            if ( fronts[index] !== undefined ) {
                const texture = this.textureLoader.load( `./public/fronts/${ fronts[index] }.png` );
                cube.material[4].map = texture;
            } else {
                cube.material[4].map = defaultTexture;
            }
        } )
    }

    doRender() {
        requestAnimationFrame( this.doRender.bind( this ) );
        this.renderer.render( this.scene, this.camera );
    }

    updateCamera( cameraX ) {
        const offset = 5;
        const boundingBox = new THREE.Box3().setFromObject( this.group );
        const center = boundingBox.getCenter( new THREE.Vector3() );
        const size = boundingBox.getSize( new THREE.Vector3() );

        const maxDim = Math.max( size.x, size.y, size.z );
        const fov = this.camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

        cameraZ *= offset;

        this.camera.position.y = 5;
        this.camera.position.z = cameraZ;
        this.camera.position.x = cameraX;

        const minZ = boundingBox.min.z;
        const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

        this.camera.far = cameraToFarEdge * 3;
        this.camera.updateProjectionMatrix();
        this.camera.lookAt( center );
        this.controls.update();
    }

    generateCube( position, cubeWidth ) {
        const geometry = new THREE.BoxGeometry( cubeWidth, CUBE_HEIGHT, CUBE_DEPTH );
        geometry.translate( cubeWidth / 2, 0, 0 );
        const defaultTexture = this.textureLoader.load( './public/white.png' );


        const materials = [
            new THREE.MeshBasicMaterial( {
                map: defaultTexture // right end
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture // left end,
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture,
                color: '#d2d7da' // top
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture,
                color: '#d2d7da' // bottom
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture // front
            } ),
            new THREE.MeshBasicMaterial( {
                map: defaultTexture,
                color: '#d2d7da' /// back
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
        if ( needResize ) {
            this.renderer.setSize( width, height, false );
        }
        return needResize;
    }

    resetScene() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.textureLoader = null;
        this.cubes = [];
        this.innerHTML = '';
        this.emit( 'tent.visualizer.reset' );
    }

    clearScene() {
        this.fronts = '';
        this.frontWidth = 0;
        this.frontWidths = '';
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.textureLoader = null;
        this.cubes = [];
        this.innerHTML = '';
        this.emit( 'tent.visualizer.cleared' );
    }

    emit( event ) {
        this.dispatchEvent( new CustomEvent( event ) );
    }

    createSortableList() {
        const list = this.querySelector( '.js-selected-fronts' );
        if ( list ) {
            this.removeChild( list )
        }
        const newList = buildHtmlElement( 'div', { class: 'list-group js-selected-fronts selected-fronts' } );
        this.appendChild( newList );
        this.updateSortableList();
        this.setDraggable();
    }

    updateSortableList() {
        const list = this.querySelector( '.js-selected-fronts' );
        if ( list ) {
            list.innerHTML = '';
            const fronts = this.fronts;
            fronts.forEach( ( front, index ) => {
                const item = buildHtmlElement( 'div', {
                    class: 'list-group-item js-selected-front selected-front-item list-group-item-action',
                    'data-index': index,
                    draggable: true
                } );
                const itemText = buildHtmlElement( 'span', { style: 'pointer-events:none;' }, front );
                item.appendChild( itemText );
                const itemActions = buildHtmlElement( 'span', { class: 'js-selected-front-remove selected-front-item-remove' }, 'x' );
                item.appendChild( itemActions );
                list.appendChild( item );
            } );
            list.querySelectorAll( '.js-selected-front-remove' ).forEach( i => i.addEventListener( 'click', ( event ) => {
                const index = parseInt( event.target.closest( '.js-selected-front' ).dataset.index );
                let fronts = this.fronts;
                let frontWidths = this.frontWidths;
                const frontWidthToRemove = parseInt( frontWidths[index] );
                fronts.splice( index, 1 );
                frontWidths.splice( index, 1 );
                this.frontWidths = frontWidths.join( ',' );
                this.frontWidth = this.frontWidth - frontWidthToRemove;
                this.fronts = fronts.join( ',' );

                this.emit( 'tent.visualizer.cleared' );
            } ) )
        }
    }

    setDraggable() {
        const sortableList = this.querySelector( '.js-selected-fronts' );
        sortableList.addEventListener( 'dragstart', this.onSortStart.bind( this ) );
        sortableList.addEventListener( 'dragend', this.onSortEnd.bind( this ) );
        sortableList.addEventListener( 'dragover', this.onSortOver.bind( this ) );
    }

    onSortStart( event ) {
        this.draggableItem = event.target;
        setTimeout( () => {
            this.draggableItem.classList.add( 'dragged' );
        }, 0 );
    }

    onSortOver( event ) {
        const sortableList = this.querySelector( '.js-selected-fronts' );
        event.preventDefault();
        const afterElement = this.getDragAfterElement( sortableList, event.clientY );
        const draggable = document.querySelector( '.dragged' );
        if ( afterElement == null ) {
            sortableList.appendChild( draggable );
        } else {
            sortableList.insertBefore( draggable, afterElement );
        }
    }

    onSortEnd() {
        const sortableList = this.querySelector( '.js-selected-fronts' );
        this.draggableItem.classList.remove( 'dragged' );
        this.draggableItem = null;
        const newIndexes = Array.from( sortableList.querySelectorAll( '.js-selected-front' ) ).map( i => parseInt( i.dataset.index ) );
        let fronts = this.fronts;
        fronts.forEach( ( front, index ) => {
            let removedItem = fronts.splice( index, 1 )[0];
            fronts.splice( newIndexes.indexOf( index ), 0, removedItem );
        } );
        this.fronts = fronts.join( ',' );
        this.createSortableList();
    }

    getDragAfterElement( container, y ) {
        const draggableElements = [...container.querySelectorAll( '.js-selected-front:not(.dragged)' )];
        return draggableElements.reduce( ( closest, child ) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if ( offset < 0 && offset > closest.offset ) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY } ).element;
    }

}

customElements.define( 'tent-visualizer', TentVisualizer );