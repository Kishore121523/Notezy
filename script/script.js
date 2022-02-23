// ------------------ Insructions Overlay ---------------------

const intro = document.querySelector('.intro');
const closeBtn = document.querySelector('.introClose').children[0];
const infoBtn = document.querySelector('.info').children[1];

infoBtn.addEventListener('click', () => {
    if (intro.classList.contains("displayNone")) {

        intro.classList.remove("displayNone")
        intro.classList.add("displayBlock")
    }
})

document.querySelector("#overlay").addEventListener('click', (e) => {
    if (e.target.id === 'overlay') {
        if (intro.classList.contains("displayBlock")) {
            intro.classList.remove("displayBlock")
            intro.classList.add("displayNone")
        }
    }
})

closeBtn.addEventListener('click', function() {
    if (intro.classList.contains("displayBlock")) {
        intro.classList.remove("displayBlock")
        intro.classList.add("displayNone")
    }
})


//---------------- SideBar Functions ----------------

const hamburger = document.querySelector('.hamburger')
const sideBar = document.querySelector('.sidebar')

hamburger.addEventListener('click', openSideBar);

// Opening Side bar when hamburger icon is clicked
function openSideBar(e) {
    if (e.target.parentElement.parentElement.classList.contains("top-part")) {
        sideBar.classList.remove('sideBarClosed')
        document.querySelector('#overlaySideBar').classList.remove('displayNone')
        document.querySelector('#overlaySideBar').classList.add('displayBlock')
    }
}

// Close SideBar on out of focus(while clicking on overlay)
document.querySelector("#overlaySideBar").addEventListener('click', (e) => {
    if (e.target.getAttribute('id') === 'overlaySideBar') {
        sideBar.classList.add('sideBarClosed')
        document.querySelector('#overlaySideBar').classList.remove('displayBlock')
        document.querySelector('#overlaySideBar').classList.add('displayNone')
    }
})

// Adding Pages to SideBar by Clicking Add Folder Button
addFolderBtn = document.querySelector('.folder-add');

addFolderBtn.addEventListener('click', addNewFolder);

newFolder = document.querySelector('.newFold');
newFolder.addEventListener('click', addNewFolder)

if (localStorage.getItem("allPageArrLocal") === null) {
    allPageArrLocal = [];
} else {
    allPageArrLocal = JSON.parse(localStorage.getItem("allPageArrLocal"));
}

if (localStorage.getItem("pageDivCountLocal") === null) {
    pageDivCountLocal = "0";
} else {
    pageDivCountLocal = localStorage.getItem("pageDivCountLocal");
}

if (localStorage.getItem("pageCardCountLocal") === null) {
    pageCardCountLocal = "0";
} else {
    pageCardCountLocal = localStorage.getItem("pageCardCountLocal");
}




// Modal Open to add Name for the new page
function addNewFolder() {
    openFolderModal();
}

// Add the Name to side bar when add button is clicked
let sidebarLinkID = 0;

if (localStorage.getItem("sidebarLinkID") === null) {
    sidebarLinkID = 0;
} else {
    sidebarLinkID = localStorage.getItem("sidebarLinkID");
}


const sideBarNoti = document.querySelector('.emptyNotification');

// Modal button is clicked and first the sideBar is updated
document.querySelector('.addFolderBtn').addEventListener('click', addToSideBar)


function addToSideBar() {

    // Getting value from text field
    const nameOfFolder = document.querySelector('#nameFolder');

    let index = false;

    //removing the pageName from the page array
    for (let i = 0; i < allPageArrLocal.length; i++) {
        if (allPageArrLocal[i].nameOfPage == nameOfFolder.value) {
            index = true;
        }
    }

    if (!index) {

        if (nameOfFolder.value === '') {
            alertMsg("Please Name your Page!")
            return
        }

        const linkDiv = document.createElement('div');
        const deleteIcon = document.createElement('i')
        const a = document.createElement('a');

        deleteIcon.classList.add('far')
        deleteIcon.classList.add('fa-trash-alt')

        linkDiv.classList.add('deletePage');
        deleteIcon.classList.add('deleteIcon')

        a.setAttribute('id', sidebarLinkID)
        a.className = 'pageLink'
        a.innerHTML = nameOfFolder.value;

        linkDiv.appendChild(a)
        linkDiv.appendChild(deleteIcon)

        document.querySelector('.sidebar').appendChild(linkDiv);

        // Check for atleast one anchor tag is present
        var hasChildDiv = document.querySelector(".sidebar").querySelector("a");

        if (hasChildDiv != null) {
            sideBarNoti.style.display = 'none'
        } else {
            sideBarNoti.style.display = 'block'
        }

        // adding active animation to the sidebar pages
        checkActive(sidebarLinkID);

        // adding the page to the main dom
        addNewPage(nameOfFolder.value, sidebarLinkID);

        nameOfFolder.value = "";
        sidebarLinkID++;
        localStorage.setItem('sidebarLinkID', sidebarLinkID)

    } else {
        alertMsg("You have added another page with same name!")
        return
    }

    // Close the modal
    document.querySelector('.openFolderModal').classList.remove("displayBlock");
    document.querySelector('.openFolderModal').classList.add("displayNone");
}

// Add active class when first added to sidebar 
function checkActive(linkId) {

    linkId = parseInt(linkId)

    document.querySelectorAll('.pageLink').forEach((element) => {
        let idEle = parseInt(element.id)

        if (idEle === linkId) {
            element.parentElement.classList.add('active')
        } else {
            if (element.parentElement.classList.contains('active')) {
                element.parentElement.classList.remove('active')
            }
        }

    })
}

// Close modal on out of focus
document.querySelector('#overlayFolder').addEventListener('click', closeFolderModal)

// Add active classes when links in sideBar are clicked after added
document.querySelector('.sidebar').addEventListener('click', activePage);

function activePage(e) {

    // setting link as active when deletePageDiv is clicked or directly the link(a) is clicked

    if (e.target.classList.contains('deletePage')) {

        if (!(e.target.classList.contains('active'))) {

            let pageArr = Array.from(e.target.parentElement.children);

            pageArr.forEach((item) => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            })

            e.target.classList.add('active');

            // addNewPage(nameOfPage,idNumberOfPage)
            addNewPage(e.target.children[0].innerHTML, e.target.children[0].id);
        }

    } else if (e.target.classList.contains('pageLink')) {

        if (!(e.target.parentElement.classList.contains('active'))) {

            let pageArr = Array.from(e.target.parentElement.parentElement.children);

            pageArr.forEach((item) => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            })
            e.target.parentElement.classList.add('active');

            // addNewPage(nameOfPage,idNumberOfPage)
            addNewPage(e.target.innerHTML, e.target.id);
        }
    }
}

// Adding new page to the sidebar
function addNewPage(nameOfPage, id) {

    // selecting the allPages div
    const allPages = document.querySelector('.allPages');

    // Create a new ul for every new page (with checking the name of page is already present in the allPageArr)
    let index = false;

    //removing the pageName from the page array
    for (let i = 0; i < allPageArrLocal.length; i++) {
        if (allPageArrLocal[i].nameOfPage == nameOfPage) {
            index = true;
        }
    }

    if (!index) {

        // setting the head element with the nameOfPage
        document.querySelector('.head').innerHTML = nameOfPage;

        const outerDiv = document.createElement('div');
        outerDiv.setAttribute('id', pageDivCountLocal);

        const ul = document.createElement('ul');
        ul.className = 'cards';
        ul.setAttribute('id', nameOfPage);

        const divBtn = document.createElement('div');
        divBtn.className = 'addBtnDiv';
        divBtn.setAttribute('id', 'btn-' + pageDivCountLocal);

        const addButton = document.createElement('button');
        addButton.innerHTML = 'Add a Note';
        addButton.classList = 'addBtn';

        divBtn.appendChild(addButton);

        ul.appendChild(divBtn);
        outerDiv.appendChild(ul);
        allPages.appendChild(outerDiv);

        allPageArrLocal.push({ nameOfPage: nameOfPage, id: pageDivCountLocal })
        localStorage.setItem("allPageArrLocal", JSON.stringify(allPageArrLocal));

        pageDivCountLocal++;
        localStorage.setItem('pageDivCountLocal', pageDivCountLocal)

    }

    // if the page is already present
    let allCards = document.querySelectorAll('.cards');

    allCards.forEach((currentPage) => {
        if (!(currentPage.id === nameOfPage)) {
            currentPage.parentElement.classList.remove('displayBlockPure')
            currentPage.parentElement.classList.add('displayNonePure')
        } else {
            currentPage.parentElement.classList.remove('displayNonePure')
            currentPage.parentElement.classList.add('displayBlockPure')
            document.querySelector('.head').innerHTML = nameOfPage;
        }
    })

    try {
        document.querySelector('#btn-' + id).children[0].addEventListener('click', newHandle0);
    } catch {
        return
    }

}

var newHandle0 = function(e) {

    let currDiv = e.target.parentElement.parentElement.parentElement;
    let btnId = e.currentTarget.parentElement.id;

    addBtnFunc(btnId.charAt(btnId.length - 1), currDiv.id, currDiv.children[0].id);

}

// Close modal on out of focus
document.querySelector('.modal').addEventListener('click', closeModal)

function addBtnFunc(currBtnId, currDivId, nameOfUl) {

    openModal();
    document.querySelector('.modal').focus()
    document.querySelector('#tagline').focus()

    if (currBtnId === currDivId) {

        document.querySelector('.modalBtn').btnParam = nameOfUl
        document.querySelector('.modalBtn').addEventListener('click', addCardToPage);

    }

}


// Adding card to a page
function addCardToPage(e) {

    if (document.querySelector('#note').value === "" || document.querySelector('#tagline').value === "") {
        alertMsg("Oops! You forgot something...");
        return
    }

    document.querySelector('.modal').classList.remove("displayBlock");
    document.querySelector('.modal').classList.add("displayNone");


    const li = document.createElement('li');
    li.className = 'card';
    li.setAttribute('id', 'card-' + pageCardCountLocal);

    const cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';

    const div1 = document.createElement('div');
    div1.className = 'card-inner';

    const div3 = document.createElement('div');
    div3.className = 'card-content';

    const div4 = document.createElement('div');
    div4.className = 'card-options';

    const div5 = document.createElement('div');
    div5.className = 'card-delete';
    div5.classList.add('tooltip')

    const deleteToolTip = document.createElement('div');
    deleteToolTip.className = 'bottomPinToTop'
    deleteToolTip.innerHTML = "Delete Note"

    const div6 = document.createElement('div');
    div6.className = 'card-update';
    div6.classList.add('tooltip')

    const updateToolTip = document.createElement('div');
    updateToolTip.className = 'bottomPinToTop'
    updateToolTip.innerHTML = "Update Note"

    const div7 = document.createElement('div');
    div7.classList.add('card-fav')
    div7.classList.add('tooltip')

    const pinToTopToolTip = document.createElement('div');
    pinToTopToolTip.className = 'bottomPinToTop'
    pinToTopToolTip.innerHTML = "Mark/Unmark"
    cardTitle.innerHTML = document.querySelector('#tagline').value

    div3.innerHTML = document.querySelector('#note').value;

    div5.innerHTML = '<i class="far fa-trash-alt"></i>';
    div6.innerHTML = '<i class="far fa-edit"></i>';
    div7.innerHTML = '<i class="far fa-star"></i>';

    li.appendChild(cardTitle)
    li.appendChild(div1);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div4.appendChild(div6);
    div6.appendChild(updateToolTip);
    div4.appendChild(div7);
    div7.appendChild(pinToTopToolTip)
    div4.appendChild(div5);
    div5.appendChild(deleteToolTip)

    let cardContent = document.querySelector('#note').value;

    if (cardContent.length > 50) {
        div4.classList.remove('card-options')
        div4.classList.add('card-options-big')
    }

    let idNum = document.getElementById(e.currentTarget.btnParam).parentElement.id;

    let buttons = document.querySelector("#btn-" + idNum)

    document.getElementById(e.currentTarget.btnParam).insertBefore(li, buttons);

    storeTaskInLocalStorage(document.querySelector('#tagline').value, document.querySelector('#note').value, idNum, pageCardCountLocal);

    document.querySelector('#note').value = ""
    document.querySelector('#tagline').value = ""
    pageCardCountLocal++;
    localStorage.setItem('pageCardCountLocal', pageCardCountLocal)
}

function storeTaskInLocalStorage(title, content, currentPageId, pageCardCountLocal) {

    let fullPageCardArrayLocal;

    if (localStorage.getItem("page" + currentPageId.toString()) === null) {
        fullPageCardArrayLocal = [];
    } else {
        fullPageCardArrayLocal = JSON.parse(localStorage.getItem("page" + currentPageId.toString()));
    }

    fullPageCardArrayLocal.push({ title: title, content: content, id: pageCardCountLocal.toString(), favClicked: "0", cardStyle: "card-title", cardStyle1: "card-fav" });

    localStorage.setItem("page" + currentPageId.toString(), JSON.stringify(fullPageCardArrayLocal));
}

// -------------- End add card function functions --------------


// --------------------- Delete whole Page ------------------------------

function fooClosePageModalDelete() {
    document.querySelector('.deletePageModal').classList.remove("displayBlock");
    document.querySelector('.deletePageModal').classList.add("displayNone");
}

document.querySelector('.sidebar').addEventListener('mouseover', (e) => {

    if (e.target.classList.contains('deleteIcon')) {
        let deletePageBtn = e.target

        deletePageBtn.addEventListener('click', (e) => {
            targetBtn = e.target

            openDeletePageModal();

            document.getElementById('deletePage').addEventListener('click', () => {
                handle2(targetBtn)
                fooClosePageModalDelete()
            })

            document.getElementById('takeMebackPage').addEventListener('click', () => {
                fooClosePageModalDelete();
            })

            document.querySelector('#overlayDeletePage').addEventListener('click', closeDeletePageModal)

        })
    }

})

function handle2(targetBtn) {
    try {

        let pageDivName = targetBtn.previousElementSibling.innerHTML;
        let pageDivNameId = targetBtn.previousElementSibling.id;

        if (document.querySelector(`#${pageDivName}`).parentElement != null) {
            let currentPageDivUlSideBar = document.querySelector(`#${pageDivName}`).parentElement;

            //removing the ul tag in the sidebar
            currentPageDivUlSideBar.remove()
        }

        //deleting the page title
        if (document.querySelector('.head').innerHTML === pageDivName) {
            document.querySelector('.head').innerHTML = ''
        }

        let index = -1;
        //removing the pageName from the page array
        for (let i = 0; i < allPageArrLocal.length; i++) {
            if (allPageArrLocal[i].nameOfPage == pageDivName) {
                index = i;
            }
        }
        if (index > -1) {

            // allPageArr.splice(index, 1);
            allPageArrLocal.splice(index, 1)
            localStorage.setItem("allPageArrLocal", JSON.stringify(allPageArrLocal));

        }

        //deleting the page from the allPages 
        targetBtn.parentElement.remove()

        //removing the notes of current page when whole page is deleted
        localStorage.removeItem("page" + pageDivNameId.toString())

    } catch {
        targetBtn.removeEventListener('click', function() {})
    }

}


// -------------- Update Note functions ---------------

document.querySelector(".allPages").addEventListener('mouseover', (e) => {

    if (e.target.parentElement.classList.contains("card-update")) {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener('click', updateNote)
    }
    if (e.target.parentElement.classList.contains("card-delete")) {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener('click', removeNote)
    }
    if (e.target.parentElement.classList.contains("card-fav") || e.target.parentElement.classList.contains("card-fav-icon")) {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener('click', addFavNote)
    }


})

// Close modal on out of focus
document.querySelector('#overlayUpd').addEventListener('click', closeModalUpd)

function updateNote(e) {

    // CHECK IF THE CURRENT CLICKED ELEMENTS PARENT HAS A CLASS OF CARD-UPDATE
    if (e.target.parentElement.classList.contains("card-update")) {
        // STORING CLICKED CARD'S ID
        const currentId = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("id")

        // GETTING CLICKED CARD'S TITLE AND NOTE
        let title = document.getElementById(currentId).childNodes[0]
        let note = document.getElementById(currentId).childNodes[1].childNodes[0];

        // OPENING MODAL ONCE UPDATE BUTTON IS CLICKED
        openModalUpd();

        // GETTING VALUE FROM FIELDS OF OPENED MODAL
        const tagline = document.querySelector('#taglineUpd');
        const notes = document.querySelector('#noteUpd');

        // SETTING THE VALUE OF CLICKED CARD'S FIELD TO MODAL FIELD
        tagline.value = title.innerHTML;
        notes.value = note.innerHTML;

        // CHECK IF CURRENTID AND CLICKED CARD'S ID IS SAME
        if (document.getElementById(currentId).getAttribute("id") === currentId) {

            const modalBtnUpd = document.querySelector('.modalBtnUpd')
                // UPDATE FUNCTION
            modalBtnUpd.addEventListener('click', updateField);
            // SETTING A PARAM OF CLICKED CARD TO CURRENTID
            modalBtnUpd.myParam = currentId;
        }


        e.preventDefault();
    }
}

function updateField(e) {

    // GETTING MYPARAM OF CLIKED CARD
    let thisCounts = e.currentTarget.myParam

    let thisPageId = document.getElementById(thisCounts).parentElement.parentElement.id

    // TO GET CURRENT CARD-TITLE AND CARD-CONTENT
    thisTitle = document.getElementById(thisCounts).childNodes[0]
    thisNote = document.getElementById(thisCounts).childNodes[1].childNodes[0]

    const tagline = document.querySelector('#taglineUpd');
    const notes = document.querySelector('#noteUpd');

    // CHECK FOR EMPTY FIELDS IN MODAL
    if (document.querySelector('#noteUpd').value === "") {
        alertMsg("Oops! You forgot something...");
        return
    }
    // UPDATING VALUES FROM MODAL TO CURRENT CARD
    thisTitle.innerHTML = tagline.value;
    thisNote.innerHTML = notes.value;

    storeUpdatedNote(tagline.value, notes.value, thisPageId, parseInt(thisCounts.charAt(thisCounts.length - 1)))
        // TO GET CURRENT CARD-OPTIONS
    let cardOpt = document.getElementById(thisCounts).childNodes[1].childNodes[1];

    // TO SET THE FLEX DIRECTION ON CURRENT CARD-OPTIONS
    if (thisNote.innerHTML.length > 50) {
        cardOpt.classList.remove('card-options')
        cardOpt.classList.add('card-options-big')
    } else {
        cardOpt.classList.remove('card-options-big')
        cardOpt.classList.add('card-options')
    }

    // REMOVING MODAL AFTER UPDATE BUTTON IS CLICKED
    document.querySelector('.modalUpd').classList.remove("displayBlock");
    document.querySelector('.modalUpd').classList.add("displayNone");

    e.preventDefault();
}

function storeUpdatedNote(title, content, currentPageId, currentCardIdNum) {
    let fullPageCardArrayLocal;

    if (localStorage.getItem("page" + currentPageId.toString()) === null) {
        fullPageCardArrayLocal = [];
    } else {
        fullPageCardArrayLocal = JSON.parse(localStorage.getItem("page" + currentPageId.toString()))
        for (let i = 0; i < fullPageCardArrayLocal.length; i++) {
            if (fullPageCardArrayLocal[i].id == currentCardIdNum) {
                fullPageCardArrayLocal[i].title = title
                fullPageCardArrayLocal[i].content = content
            }
        }
    }

    localStorage.setItem("page" + currentPageId.toString(), JSON.stringify(fullPageCardArrayLocal));
}
// --------------- Update Note Function End--------------


//---------Adding note as fav-------------
function addFavNote(e) {

    if (e.target.parentElement.classList.contains("card-fav") || e.target.parentElement.classList.contains("card-fav-icon")) {

        let currentPageId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
        let currentNoteIdFavListElement = e.target.parentElement.parentElement.parentElement.parentElement
        let currentNoteIdFavListElementFullId = currentNoteIdFavListElement.id
        let currentCardIdFavNumber = currentNoteIdFavListElementFullId.charAt(currentNoteIdFavListElementFullId.length - 1)

        let fullPageCardArrayLocal;

        if (localStorage.getItem("page" + currentPageId) === null) {
            fullPageCardArrayLocal = [];
        } else {
            fullPageCardArrayLocal = JSON.parse(localStorage.getItem("page" + currentPageId));
        }

        for (let i = 0; i < fullPageCardArrayLocal.length; i++) {

            if (fullPageCardArrayLocal[i].id == currentCardIdFavNumber) {

                clicked = parseInt(fullPageCardArrayLocal[i].favClicked)
                console.log(clicked)

                if (clicked % 2 == 0) {

                    let addfavNoteStyle = fullPageCardArrayLocal[i].cardStyle
                    let iconStyle = fullPageCardArrayLocal[i].cardStyle1

                    console.log(iconStyle)

                    if (currentNoteIdFavListElement.children[0].classList.contains(addfavNoteStyle)) {

                        clicked++;
                        fullPageCardArrayLocal[i].favClicked = clicked

                        currentNoteIdFavListElement.children[0].classList.remove(addfavNoteStyle)
                        currentNoteIdFavListElement.children[1].children[1].children[1].classList.remove(iconStyle)

                        fullPageCardArrayLocal[i].cardStyle = "card-title-fav"
                        fullPageCardArrayLocal[i].cardStyle1 = "card-fav-icon"

                        addfavNoteStyle = fullPageCardArrayLocal[i].cardStyle
                        iconStyle = fullPageCardArrayLocal[i].cardStyle1

                        currentNoteIdFavListElement.children[0].classList.add(addfavNoteStyle)
                        currentNoteIdFavListElement.children[1].children[1].children[1].classList.add(iconStyle)

                    }

                } else {

                    let addfavNoteStyle = fullPageCardArrayLocal[i].cardStyle
                    let iconStyle = fullPageCardArrayLocal[i].cardStyle1

                    console.log(iconStyle)

                    if (currentNoteIdFavListElement.children[0].classList.contains(addfavNoteStyle)) {

                        clicked++;
                        fullPageCardArrayLocal[i].favClicked = clicked

                        currentNoteIdFavListElement.children[0].classList.remove(addfavNoteStyle)
                        currentNoteIdFavListElement.children[1].children[1].children[1].classList.remove(iconStyle)

                        fullPageCardArrayLocal[i].cardStyle = "card-title"
                        fullPageCardArrayLocal[i].cardStyle1 = "card-fav"


                        addfavNoteStyle = fullPageCardArrayLocal[i].cardStyle
                        iconStyle = fullPageCardArrayLocal[i].cardStyle1

                        currentNoteIdFavListElement.children[0].classList.add(addfavNoteStyle)
                        currentNoteIdFavListElement.children[1].children[1].children[1].classList.add(iconStyle)

                    }

                }

                localStorage.setItem("page" + currentPageId, JSON.stringify(fullPageCardArrayLocal));
            }
        }

    }
}


// ------------ Removing a Note -------------------
function fooCloseModalDelete() {
    document.querySelector('.deleteModal').classList.remove("displayBlock");
    document.querySelector('.deleteModal').classList.add("displayNone");
}


function removeNote(e) {

    if (e.target.parentElement.classList.contains("card-delete")) {

        openDeleteModal();

        document.getElementById('deleteCard').addEventListener('click', () => {
            try {

                //local Storage delete card
                titleToDelete = e.target.parentElement.parentElement.parentElement.parentElement.children[0].innerHTML
                contentTODelete = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id

                //page0,page1 etc array is selected using the id attribute
                if (localStorage.getItem("page" + id.toString()) === null) {
                    fullPageCardArrayLocal = [];
                } else {
                    fullPageCardArrayLocal = JSON.parse(localStorage.getItem("page" + id.toString()))

                    fullPageCardArrayLocal.forEach((eachCard, index) => {
                        if (eachCard.title == titleToDelete.toString() && eachCard.content == contentTODelete.toString()) {
                            fullPageCardArrayLocal.splice(index, 1)
                        }
                    })
                    localStorage.setItem("page" + id.toString(), JSON.stringify(fullPageCardArrayLocal));
                }
                localStorage.setItem("page" + id.toString(), JSON.stringify(fullPageCardArrayLocal));
                e.target.parentElement.parentElement.parentElement.parentElement.remove();
                fooCloseModalDelete()
            } catch {
                return
            }

        })

        document.getElementById('takeMeback').addEventListener('click', () => {
            fooCloseModalDelete();
        })
        document.querySelector('#overlayDelete').addEventListener('click', closeDeleteModal)

    }

}


// --------- Alert Message in case of error ---------
function alertMsg(text) {
    document.querySelector('.alertModal').classList.remove("displayNone");
    document.querySelector('.alertModal').classList.add("displayBlock");

    document.querySelector('.alertText').innerHTML = text;

    setTimeout(foo1, 1500);

    function foo1() {
        document.querySelector('.alertModal').classList.remove("displayBlock")
        document.querySelector('.alertModal').classList.add("displayNone")
    }
}


// --------------Download as pdf functions---------------------
document.querySelector('.download').addEventListener('click', genPDF)
document.querySelector('#overlaySaveFile').addEventListener('click', closeSaveFileModal)

function genPDF(e) {

    let parentDivChildrenArray = e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children

    allTitleArr = []
    allContentArr = []
    var doc = new jsPDF('p', 'pt', 'a4');
    var pageWidth = 595;
    var pageHeight = 842;
    var pageMargin = 20;
    pageWidth -= pageMargin * 2;
    pageHeight -= pageMargin * 2;
    var startX = pageMargin;
    var startY = pageMargin;

    console.log(parentDivChildrenArray)

    Array.from(parentDivChildrenArray).forEach((element) => {

        if (element.classList.contains('displayBlockPure')) {

            cardArray = Array.from(element.children[0].children)

            cardArray.forEach((card) => {
                if (card.classList.contains('card')) {
                    allTitleArr.push(card.children[0].innerHTML)
                    allContentArr.push(card.children[1].children[0].innerHTML)
                }
            })

            for (let i = 1; i <= allTitleArr.length; i++) {

                if (startY >= pageHeight) {
                    doc.addPage();
                    startY = pageMargin // Restart height position
                }

                doc.text(`Title-${i}: ${allTitleArr[i - 1]}`, startX, startY, { maxWidth: 480, align: 'justify' });

                startY2 = 0
                startY2 = startY + 20

                doc.text(`Note-${i}: ${allContentArr[i - 1]}`, startX, startY2, { maxWidth: 480, align: 'justify' });

                wid = doc.getTextDimensions(allContentArr[i - 1]).w

                if (wid < 150) {
                    startY2 += 40
                } else if (wid > 150 && wid < 450) {
                    startY2 += 50
                } else if (wid > 450 && wid < 650) {
                    startY2 += 60
                } else if (wid > 650 && wid < 850) {
                    startY2 += 70
                } else if (wid > 850 && wid < 1000) {
                    startY2 += 80
                } else if (wid > 1000 && wid < 1250) {
                    startY2 += 90
                } else {
                    startY2 += 130
                }
                startY = startY2
            }
        } else {
            return
        }
    })

    document.querySelector('.nameFileModal').classList.remove('displayNone')
    document.querySelector('.nameFileModal').classList.add('displayBlock')

    document.querySelector('.nameFileBtn').saveParam = doc
    document.querySelector('.nameFileBtn').addEventListener('click', setFileName)

}

function setFileName(e) {
    let nameOfFile = ''
    nameOfFile = document.querySelector('#nameFile').value;
    console.log(nameOfFile)
    e.currentTarget.saveParam.save(`${nameOfFile}.pdf`)

    document.querySelector('#nameFile').value = ""

    document.querySelector('.nameFileModal').classList.remove('displayBlock')
    document.querySelector('.nameFileModal').classList.add('displayNone')
}


// ---------------Tooltip toggler functions-----------------------
let toggler = document.querySelector('.toggler');
let allNodes = document.querySelectorAll('.tooltip');

toggler.addEventListener('click', () => {

    this.active = !this.active;

    if (this.active) {
        // removing tooltip class with click
        allNodes.forEach((current) => {
            if (current.classList.contains('tooltip')) {
                current.classList.remove('tooltip')
                toggler.classList.add('enabled')
                toggler.classList.add('disabled')
                document.querySelectorAll(".left").forEach((element) => {
                    element.style.display = 'none'
                })
            }
        })
    } else {
        // adding tooltip class with click
        allNodes.forEach((current) => {
            if (!current.classList.contains('tooltip')) {
                toggler.classList.remove('disabled')
                toggler.classList.add('enabled')
                document.querySelectorAll(".left").forEach((element) => {
                    element.style.display = 'block'
                })
                current.classList.add('tooltip')

            }
        })
    }
}, true)


// change theme and save styles to local storage
document.querySelector('.themeSwitch').addEventListener('click', changeThemeNumber)
window.addEventListener('load', changeTheme)

// window.localStorage.setItem('i', '0');
if (localStorage.getItem("i") === null) {
    localStorage.setItem('i', '0')
} else {
    i = localStorage.getItem("i");
}

function changeThemeNumber() {
    i = parseInt(window.localStorage.getItem('i'))
    i += 1
    window.localStorage.setItem('i', i.toString())

    if (i % 5 === 0) {
        theme = 'default';
        document.body.setAttribute('data-theme', theme)
    } else if (i % 5 === 1) {
        theme = 'white';
        document.body.setAttribute('data-theme', theme)
    } else if (i % 5 === 2) {
        theme = 'purple';
        document.body.setAttribute('data-theme', theme)
    } else if (i % 5 === 3) {
        theme = 'green';
        document.body.setAttribute('data-theme', theme)
    } else {
        theme = 'orange';
        document.body.setAttribute('data-theme', theme)
    }

}

function changeTheme() {

    i = parseInt(window.localStorage.getItem('i'))
        // console.log(i)
    if (i % 5 === 0) {
        theme = 'default';
        window.localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', window.localStorage.getItem('theme'))
    } else if (i % 5 === 1) {
        theme = 'white';
        window.localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', window.localStorage.getItem('theme'))
    } else if (i % 5 === 2) {
        theme = 'purple';
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', window.localStorage.getItem('theme'))
    } else if (i % 5 === 3) {
        theme = 'green';
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', window.localStorage.getItem('theme'))
    } else {
        theme = 'orange';
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', window.localStorage.getItem('theme'))
    }
}

// Filter tasks.
filterField = document.querySelector('.filter');
filterField.addEventListener('keyup', filterTasks);

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.cards').forEach((eachCard) => {
        if (eachCard.parentElement.classList.contains("displayBlockPure")) {
            document.querySelectorAll(".card").forEach(function(cardInner) {

                const item = cardInner.firstChild.textContent;
                if (item.toLowerCase().indexOf(text) != -1) {
                    cardInner.style.display = "block";
                } else {
                    cardInner.style.display = "none";
                }

            });
        }

    })

}

// --------------------------------------Local Storage Functions---------------------------------------------
document.addEventListener("DOMContentLoaded", getTasks);

function getTasks() {
    let allPageArrLocal;

    if (localStorage.getItem("allPageArrLocal") === null) {
        allPageArrLocal = [];
    } else {
        allPageArrLocal = JSON.parse(localStorage.getItem("allPageArrLocal"));
    }

    let pageDivCountLocal;
    if (localStorage.getItem("pageDivCountLocal") === null) {
        pageDivCountLocal = -1;
    } else {
        pageDivCountLocal = localStorage.getItem("pageDivCountLocal");
    }

    //sideBar functions
    allPageArrLocal.forEach((elem) => {

        const linkDiv = document.createElement('div');
        const deleteIcon = document.createElement('i')
        const a = document.createElement('a');

        deleteIcon.classList.add('far')
        deleteIcon.classList.add('fa-trash-alt')

        linkDiv.classList.add('deletePage');
        deleteIcon.classList.add('deleteIcon')

        a.setAttribute('id', elem.id)
        a.className = 'pageLink'
        a.innerHTML = elem.nameOfPage;

        linkDiv.appendChild(a)
        linkDiv.appendChild(deleteIcon)

        document.querySelector('.sidebar').appendChild(linkDiv);

        // Check for atleast one anchor tag is present
        var hasChildDiv = document.querySelector(".sidebar").querySelector("a");

        if (hasChildDiv != null) {
            sideBarNoti.style.display = 'none'
        } else {
            sideBarNoti.style.display = 'block'
        }

        checkActive(elem.id);

        // adding the page to the main dom
        addNewPage(elem.nameOfPage, elem.id);

    })

    // creating a div for the pages
    const allPages = document.querySelector('.allPages');

    allPageArrLocal.forEach((curr) => {

        const outerDiv = document.createElement('div');
        outerDiv.setAttribute('id', curr.id);

        const ul = document.createElement('ul');
        ul.className = 'cards';
        ul.setAttribute('id', curr.nameOfPage);

        const divBtn = document.createElement('div');
        divBtn.className = 'addBtnDiv';
        divBtn.setAttribute('id', 'btn-' + curr.id);

        const addButton = document.createElement('button');
        addButton.innerHTML = 'Add a Note';
        addButton.classList = 'addBtn';

        divBtn.appendChild(addButton);

        ul.appendChild(divBtn);
        outerDiv.appendChild(ul);
        allPages.appendChild(outerDiv);
        let allCards = document.querySelectorAll('.cards');

        allCards.forEach((currentPage) => {
            if (!(currentPage.id === curr.nameOfPage)) {
                currentPage.parentElement.classList.remove('displayBlockPure')
                currentPage.parentElement.classList.add('displayNonePure')
            } else {
                currentPage.parentElement.classList.remove('displayNonePure')
                currentPage.parentElement.classList.add('displayBlockPure')
                document.querySelector('.head').innerHTML = curr.nameOfPage;
            }


            document.querySelector('#btn-' + parseInt(curr.id)).children[0].addEventListener('click', newHandle0);
        })

        if (localStorage.getItem("page" + curr.id.toString()) === null) {
            currentPageContentArr = [];
        } else {
            currentPageContentArr = JSON.parse(localStorage.getItem("page" + curr.id.toString()));
        }

        currentPageContentArr.forEach((currentElement) => {
            const li = document.createElement('li');
            li.className = 'card';
            li.setAttribute('id', 'card-' + currentElement.id);

            const cardTitle = document.createElement('div');
            cardTitle.className = currentElement.cardStyle

            const div1 = document.createElement('div');
            div1.className = 'card-inner';

            const div3 = document.createElement('div');
            div3.className = 'card-content';

            const div4 = document.createElement('div');
            div4.className = 'card-options';

            const div5 = document.createElement('div');
            div5.className = 'card-delete';
            div5.classList.add('tooltip')

            const deleteToolTip = document.createElement('div');
            deleteToolTip.className = 'bottomPinToTop'
            deleteToolTip.innerHTML = "Delete Note"

            const div6 = document.createElement('div');
            div6.className = 'card-update';
            div6.classList.add('tooltip')

            const updateToolTip = document.createElement('div');
            updateToolTip.className = 'bottomPinToTop'
            updateToolTip.innerHTML = "Update Note"

            const div7 = document.createElement('div');
            div7.classList.add(currentElement.cardStyle1)
            div7.classList.add('tooltip')

            const pinToTopToolTip = document.createElement('div');
            pinToTopToolTip.className = 'bottomPinToTop'
            pinToTopToolTip.innerHTML = "Mark/Unmark"

            cardTitle.innerHTML = currentElement.title

            div3.innerHTML = currentElement.content

            div5.innerHTML = '<i class="far fa-trash-alt"></i>';
            div6.innerHTML = '<i class="far fa-edit"></i>';
            div7.innerHTML = '<i class="far fa-star"></i>';

            li.appendChild(cardTitle)
            li.appendChild(div1);
            div1.appendChild(div3);
            div1.appendChild(div4);
            div4.appendChild(div6);
            div6.appendChild(updateToolTip);
            div4.appendChild(div7);
            div7.appendChild(pinToTopToolTip)
            div4.appendChild(div5);
            div5.appendChild(deleteToolTip)


            if (currentElement.content.length > 50) {
                div4.classList.remove('card-options')
                div4.classList.add('card-options-big')
            }

            let idNum = curr.id;

            let buttons = document.querySelector("#btn-" + idNum)

            document.getElementById(curr.nameOfPage).insertBefore(li, buttons);

        })
    })



}