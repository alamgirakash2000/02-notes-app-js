'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-button').addEventListener('click',function(e){
    const timeStamp=moment().valueOf()
    let id=uuidv4()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
    saveNotes(notes)
    renderNotes(notes,filters)
    location.assign(`edit.html#${id}`)
})

//Search Queries
document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText=e.target.value;
    renderNotes(notes,filters) 
})


document.querySelector('#filter-by').addEventListener('change',function(e){
    filters.sortBy= e.target.value
    renderNotes(notes,filters)
})


window.addEventListener('storage',function(e){
    if(e.key==='notes'){
        notes=JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})
