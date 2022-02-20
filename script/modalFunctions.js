// -------- Modals Open and Close Function ---------

function openModalUpd() {
    document.querySelector('.modalUpd').classList.remove("displayNone");
    document.querySelector('.modalUpd').classList.add("displayBlock");
}

function closeModalUpd(e) {
    if (e.target.classList.contains('modalUpd')) {
        document.querySelector('.modalUpd').classList.remove("displayBlock");
        document.querySelector('.modalUpd').classList.add("displayNone");
    }
}

function openModal() {
    document.querySelector('.modal').classList.remove("displayNone");
    document.querySelector('.modal').classList.add("displayBlock");
}

function closeModal(e) {
    if (e.target.classList.contains('modal')) {
        document.querySelector('.modal').classList.remove("displayBlock");
        document.querySelector('.modal').classList.add("displayNone");
    }
}

function openFolderModal() {
    document.querySelector('.openFolderModal').classList.remove("displayNone");
    document.querySelector('.openFolderModal').classList.add("displayBlock");
}

function closeFolderModal(e) {

    if (e.target.classList.contains('openFolderModal')) {
        document.querySelector('.openFolderModal').classList.remove("displayBlock");
        document.querySelector('.openFolderModal').classList.add("displayNone");
    }
}

function openDeleteModal() {
    document.querySelector('.deleteModal').classList.remove("displayNone");
    document.querySelector('.deleteModal').classList.add("displayBlock");
}

function closeDeleteModal(e) {

    if (e.target.classList.contains('deleteModal')) {
        document.querySelector('.deleteModal').classList.remove("displayBlock");
        document.querySelector('.deleteModal').classList.add("displayNone");
    }
}

function openDeletePageModal() {
    document.querySelector('.deletePageModal').classList.remove("displayNone");
    document.querySelector('.deletePageModal').classList.add("displayBlock");
}


function closeDeletePageModal(e) {

    if (e.target.classList.contains('deletePageModal')) {
        document.querySelector('.deletePageModal').classList.remove("displayBlock");
        document.querySelector('.deletePageModal').classList.add("displayNone");
    }
}

function closeSaveFileModal(e) {

    if (e.target.classList.contains('nameFileModal')) {
        document.querySelector('.nameFileModal').classList.remove("displayBlock");
        document.querySelector('.nameFileModal').classList.add("displayNone");
    }

}