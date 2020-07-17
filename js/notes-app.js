'use strict'

let notes=getSavedNotes()
  
//For storing the search queries
let filters={
    searchTexts: '',
    sortBy: 'byEdited'
}

renderNotes(notes,filters)

//Search Queries
document.querySelector('#search').addEventListener('input', function(e){
    filters.searchTexts=e.target.value;
    renderNotes(notes,filters) 
})


document.querySelector('#filter-by').addEventListener('change',function(e){
    filters.sortBy= e.target.value
    renderNotes(notes,filters)
})

document.querySelector('#create-button').addEventListener('click',function(e){
    const timeStamp=moment().valueOf()
    let id=uuidv4()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timeStamp,
        editedAt: timeStamp
    })
    saveNotes(notes)
    renderNotes(notes,filters)
    location.assign(`edit.html#${id}`)
})

window.addEventListener('storage',function(e){
    if(e.key==='notes'){
        notes=JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})
