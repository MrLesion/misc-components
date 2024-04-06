const wishlist = {
    settings:{
        wishlistStoreKey: 'wishlist.ids',
        productsStoreKey: 'wishlist.products'
    },
    init: () => {
        wishlist.buildList().then(() =>{
            wishlist.bindEvents();
            wishlist.reflow();
        });
        
    },
    store: {
        get: () => {
            const localStore = localStorage.getItem(wishlist.settings.wishlistStoreKey);
            if (localStore !== null) {
                return JSON.parse(localStore);
            }
            return [];
        },
        set: (jsonObj) => {
            localStorage.setItem(wishlist.settings.wishlistStoreKey, JSON.stringify(jsonObj));
            wishlist.reflow();
        },
        add: (favoriteId) => {
            const localStore = wishlist.store.get();
            if (localStore.indexOf(favoriteId) === -1) {
                localStore.push(favoriteId);
                wishlist.products.updateProductFeed(favoriteId);
                wishlist.store.set(localStore);
            }
        },
        remove: (favoriteId) =>{
            let localStore = wishlist.store.get();
            if (localStore.indexOf(favoriteId) > -1) {
                localStore = localStore.filter((id) =>{
                    return id !== favoriteId;
                });
                wishlist.store.set(localStore);
            }
        }
    },
    buildList: async (categoryId = 'smartphones') =>{
        const grid = document.querySelector('.grid');
        const categories = document.querySelector('.categories');
        const header = document.querySelector('.product-header');
        const categoriesReq = fetch('https://dummyjson.com/products/categories').then((response) => response.json());
        const productsReq = fetch(`https://dummyjson.com/products/category/${categoryId}`).then(( response) => response.json());
        
        return Promise.all([categoriesReq, productsReq]).then((json) =>{
            grid.innerHTML = '';
            categories.innerHTML = '';
            json[0].forEach((category) =>{
                const htmlString = `<div class="category-item ${categoryId === category ? 'selected' : ''}">
                        <a href="#" class="js-change-category" data-category-id="${category}">
                        ${category.toUpperCase()}
                        </a>
                      </div>`;
                var doc = new DOMParser().parseFromString(htmlString, "text/html");
                categories.appendChild(doc.querySelector('.category-item '));
            });
            json[1].products.forEach((product) => {
                const htmlString = `<div class="grid-item">
                        <img loading="lazy" src="${product.thumbnail}" alt="${product.title}">
                        <h4>${product.title}</h4>
                        <p>${product.description}</p>
                        <p class="price">${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'DKK' }).format(product.price)}</p>
                        <a href="#" class="js-wishlist-btn wishlist-btn" data-favorite-id="${product.id}"></a>
                      </div>`;
                var doc = new DOMParser().parseFromString(htmlString, "text/html");
                grid.appendChild(doc.querySelector('.grid-item '));
            } );
            header.textContent = categoryId.toUpperCase();
        })
    },
    bindEvents: () => {
        
        const listButton = document.querySelector('.js-list-btn');
        const closeButton = document.querySelector('.js-close-btn');

        listButton.addEventListener('click', (event) =>{
            wishlist.openMenu();
        });
        closeButton.addEventListener('click', (event) =>{
            wishlist.closeMenu();
        });
    },

    openMenu: () => {
        const main = document.querySelector('.main');
        document.querySelector('.sidenav').style.width = '25vw';
        main.style.width = main.offsetWidth + 'px';
        main.style.marginLeft = '25vw';
        
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.onclick = () =>{
           wishlist.closeMenu();
        }
        document.body.style.overflowX = 'hidden';
        document.body.appendChild(overlay);
        setTimeout(() =>{
            overlay.style.opacity = 1;
        }, 50);
    },
    closeMenu:() =>{
        const main = document.querySelector('.main');
        document.querySelector('.sidenav').style.width = '0';
        main.style.width = '100%';
        main.style.marginLeft = '0';
        const overlay = document.querySelector('.overlay');

        overlay.addEventListener('transitionend', () => {
            document.body.style.overflowX = '';
            document.body.removeChild(overlay);
        }, false);

        overlay.style.opacity = 0;
        
    },
    reflow: () =>{
        const wishlistButtons = document.querySelectorAll('.js-wishlist-btn');
        const categoryButtons = document.querySelectorAll('.js-change-category');
        const data = wishlist.store.get();
        wishlistButtons.forEach((wishlistButton) => {
            const favoriteId = parseInt(wishlistButton.dataset.favoriteId);
            wishlistButton.classList.remove('is-remove', 'is-add');
            if(data.indexOf(favoriteId) > -1){
                wishlistButton.classList.add('is-remove', 'is-loaded');
            } else{
                wishlistButton.classList.add('is-add', 'is-loaded');
            }

            wishlistButton.addEventListener('click', (event) => {
                event.preventDefault();
                const favoriteId = parseInt(event.target.dataset.favoriteId);
                if(event.target.classList.contains('is-add')){
                    wishlist.store.add(favoriteId);
                } else if(event.target.classList.contains('is-remove')){
                    wishlist.store.remove(favoriteId);
                    wishlist.products.store.remove(favoriteId);
                }

            })
        });

        categoryButtons.forEach((categoryButton) =>{
            categoryButton.addEventListener('click', (event) =>{
                event.preventDefault();
                const categoryId = event.target.dataset.categoryId
                wishlist.buildList(categoryId).then(() =>{
                    wishlist.reflow();
                });
            });
        })

        
        
        const productData = wishlist.products.store.get();
        wishlist.products.build(productData);
    },
    products: {
        store: {
            get: () => {
                const localStore = localStorage.getItem(wishlist.settings.productsStoreKey);
                if (localStore !== null) {
                    return JSON.parse(localStore);
                }
                return [];
            },
            set: (jsonObj) => {
                localStorage.setItem(wishlist.settings.productsStoreKey, JSON.stringify(jsonObj));
                wishlist.products.build(jsonObj);
            },
            add: (product) => {
                const localStore = wishlist.products.store.get();
                if (localStore.filter(p => p.id === product.id).length === 0) {
                    localStore.push(product);
                    wishlist.products.store.set(localStore);
                }
            },
            remove: (productId) =>{
                let localStore = wishlist.products.store.get();
                if (localStore.filter(p => p.id === productId).length > 0) {
                    localStore = localStore.filter((p) =>{
                        console.log(p.id, productId);
                        return p.id !== productId;
                    });
                    wishlist.products.store.set(localStore);
                }
            }
        },
        updateProductFeed: (id) =>{
            fetch(`https://dummyjson.com/products/${id}`)
                .then((response) => response.json())
                .then((json) => {
                    wishlist.products.store.add(json);
                    
                });
        },
        build: (products) =>{
            const oldList = document.querySelector('.list');
            const list = document.querySelector('.list-elem');
            list.innerHTML = '';
            products.forEach((product) =>{
                const li = document.createElement('li');
                const input = document.createElement('input');
                const label = document.createElement('label');
                input.id = `addFavoriteToCart-${product.id}`;
                input.className = `js-add-favorite-to-cart-input`;
                input.type = 'checkbox';
                input.value = product.id;
                input.onchange = wishlist.products.addToCartCheck;
                label.htmlFor = `addFavoriteToCart-${product.id}`;
                label.textContent =  `ID #${product.id} - ${product.title}`;
                li.appendChild(input);
                li.appendChild(label);
                
                list.appendChild(li);
            });
        },
        addToCartCheck: () =>{
            const addToCartBtn = document.querySelector('.js-add-to-cart');
            const inputs = document.querySelectorAll('.js-add-favorite-to-cart-input');
            const hasChecked = Array.from(inputs).filter(i => i.checked === true).length > 0;
            addToCartBtn.disabled = !hasChecked;
        }
    }
};


window.document.addEventListener('DOMContentLoaded', () => {
    wishlist.init();
});