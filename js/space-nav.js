(function () {
    let triggerElem = document.querySelector('.js-menu-trigger'),
        pageLinksElem = document.querySelectorAll('.js-open-page'),
        pageBody = document.querySelector('.js-page-body'),
        menuOpen = false;

    window.addEventListener('load', () => {
        loadPage();
    })

    loadPage = async (page = 'home.html') => {
        const response = await fetch(`./pages/${page}`);

        if (!response.ok) {
            const errorMsg = `An error has occured: ${response.status}`;
            pageBody.innerHTML = errorMsg;
            throw new Error(errorMsg);
        }

        const text = await response.text();
        pageBody.innerHTML = text;
    }

    openMenu = () => {
        menuOpen = true;
        document.body.classList.add('fixed');
        triggerElem.classList.add('open')
        setTimeout(() => {
            pageBody.classList.add('open');
        })
    }

    closeMenu = () => {
        menuOpen = false;
        document.body.classList.remove('fixed');
        triggerElem.classList.remove('open');
        setTimeout(() => {
            pageBody.classList.remove('open');
        })
    }

    menuTrigger = () => {
        if (!menuOpen) {
            openMenu();
            return;
        }
        closeMenu();
    }

    triggerElem.addEventListener('click', () => {
        menuTrigger();
    })

    pageLinksElem.forEach(elem => {
        elem.addEventListener('click', (event) => {
            event.preventDefault();
            loadPage(elem.getAttribute("href"));
            menuTrigger();
        })
    })


})()