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

let allPageArr = []
let pageDivCount = 0;
let pageCardCount = 0;


// Modal Open to add Name for the new page
function addNewFolder() {
    openFolderModal();
}

// Add the Name to side bar when add button is clicked
let sidebarLinkID = 0;

const sideBarNoti = document.querySelector('.emptyNotification');

document.querySelector('.addFolderBtn').addEventListener('click', addToSideBar)

function addToSideBar() {

    // Getting value from text field
    const nameOfFolder = document.querySelector('#nameFolder');

    if (!allPageArr.includes(nameOfFolder.value)) {

        if (nameOfFolder.value === '') {
            alertMsg("Add a name to your Folder")
            return
        }

        const a = document.createElement('a');
        a.setAttribute('id', sidebarLinkID)
        a.className = 'pageLink'
        a.innerHTML = nameOfFolder.value;
        document.querySelector('.sidebar').appendChild(a);

        // Check for atleast one anchor tag is present
        var hasChildDiv = document.querySelector(".sidebar").querySelector("a");

        if (hasChildDiv != null) {
            sideBarNoti.style.display = 'none'
        } else {
            sideBarNoti.style.display = 'block'
        }

        checkActive(sidebarLinkID);
        addNewPage(nameOfFolder.value, sidebarLinkID);

        nameOfFolder.value = "";
        sidebarLinkID++;

    } else {
        alertMsg("You have added another page with same name")
        return
    }

    // Close the modal
    document.querySelector('.openFolderModal').classList.remove("displayBlock");
    document.querySelector('.openFolderModal').classList.add("displayNone");
}

function checkActive(linkId) {
    document.querySelectorAll('.pageLink').forEach((element) => {
        let idEle = parseInt(element.id)
        if (idEle === linkId) {
            element.classList.add('active')
        } else {
            if (element.classList.contains('active')) {
                element.classList.remove('active')
            }
        }

    })
}

// Close modal on out of focus
document.querySelector('#overlayFolder').addEventListener('click', closeFolderModal)

// Add animation for active page Link
document.querySelector('.sidebar').addEventListener('click', activePage);

function activePage(e) {
    if (e.target.classList.contains('pageLink')) {

        if (!(e.target.classList.contains('active'))) {

            let pageArr = Array.from(e.target.parentElement.children);
            pageArr.forEach((item) => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            })
            e.target.classList.add('active');
            addNewPage(e.target.innerHTML, e.target.id);
        }
    }
}

// Adding new page to the sidebar
function addNewPage(nameOfPage, id) {

    const allPages = document.querySelector('.allPages');

    //Create a new ul for every new page
    if (!(allPageArr.includes(nameOfPage))) {
        document.querySelector('.head').innerHTML = nameOfPage;
        const outerDiv = document.createElement('div');
        outerDiv.setAttribute('id', pageDivCount);

        const ul = document.createElement('ul');
        ul.className = 'cards';
        ul.setAttribute('id', nameOfPage);

        const divBtn = document.createElement('div');
        divBtn.className = 'addBtnDiv';
        divBtn.setAttribute('id', 'btn-' + pageDivCount);

        const addButton = document.createElement('button');
        addButton.innerHTML = 'Add a Note';
        addButton.classList = 'addBtn';

        divBtn.appendChild(addButton);

        ul.appendChild(divBtn);
        outerDiv.appendChild(ul);
        allPages.appendChild(outerDiv);
        pageDivCount++;
        console.log(pageDivCount)

        allPageArr.push(nameOfPage)
        console.log(allPageArr)

    }

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

    document.querySelector('#btn-' + id).children[0].addEventListener('click', newHandle0);
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
    li.setAttribute('id', 'card-' + pageCardCount);

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
    div7.className = 'card-fav';
    div7.classList.add('tooltip')

    const pinToTopToolTip = document.createElement('div');
    pinToTopToolTip.className = 'bottomPinToTop'
    pinToTopToolTip.innerHTML = "Pin to Top"

    cardTitle.innerHTML = document.querySelector('#tagline').value

    div3.innerHTML = document.querySelector('#note').value;

    div5.innerHTML = '<i class="fa fa-minus"></i>';
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

    document.querySelector('#note').value = ""
    document.querySelector('#tagline').value = ""
    pageCardCount++;
    console.log(pageCardCount)

    let idNum = document.getElementById(e.currentTarget.btnParam).parentElement.id;

    let buttons = document.querySelector("#btn-" + idNum)

    document.getElementById(e.currentTarget.btnParam).insertBefore(li, buttons);

}


// -------------- End add card function functions --------------


// -------------- Update Note functions ---------------
document.querySelector(".allPages").addEventListener('mouseover', (e) => {

    if (e.target.parentElement.classList.contains("card-update")) {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener('click', updateNote)
    }
    if (e.target.parentElement.classList.contains("card-delete")) {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.addEventListener('click', removeNote)
    }

})

// Close modal on out of focus
document.querySelector('#overlayUpd').addEventListener('click', closeModalUpd)

function updateNote(e) {

    // CHECK IF THE CURRENT CLICKED ELEMENTS PARENT HAS A CLASS OF CARD-UPDATE
    if (e.target.parentElement.classList.contains("card-update")) {
        console.log('asd')
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
// --------------- Update Note Function End--------------


// ------------ Removing a Note -------------------
function fooCloseModalDelete() {
    document.querySelector('.deleteModal').classList.remove("displayBlock");
    document.querySelector('.deleteModal').classList.add("displayNone");
}


function removeNote(e) {
    if (e.target.parentElement.classList.contains("card-delete")) {

        openDeleteModal();

        document.getElementById('deleteCard').addEventListener('click', () => {
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
            fooCloseModalDelete()
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

// ------------------Download as pdf functions---------------------
document.querySelector('.download').addEventListener('click', genPDF)
document.querySelector('#overlaySaveFile').addEventListener('click', closeSaveFileModal)

function genPDF(e) {

    let parentDivChildrenArray = e.target.parentElement.parentElement.parentElement.parentElement.children

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