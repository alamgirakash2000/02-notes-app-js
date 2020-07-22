'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    } 
}

// Save notes to local storage
function saveNotes(notes){
    localStorage.setItem('notes',JSON.stringify(notes))
}

//Removing Note
function removeNote(id){
    let index=notes.findIndex((note) => note.id===id)
    if(index>=0){
        notes.splice(index,1)
    }
}

//Generating Dom
function generateDOM(note){
    let noteEL=document.createElement('a')
    let time=document.createElement('small')
    let title=document.createElement('p')
    
    time.addEventListener('click',function(){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes,filters)
    })
    noteEL.setAttribute('href',`edit.html#${note.id}`)
   time.textContent= generateLastEdited(note.editedAt)
    if(note.title.length){
        title.textContent= ' '+note.title
    }else{
        title.textContent='Unnamed Note'
    }

    noteEL.classList.add('noteEL')
    noteEL.appendChild(title)
    time.classList.add('text-muted','font-italic')
    noteEL.appendChild(time)
    return noteEL

}

// For sorting the notes
function sortNotes(notes,sortBy){
    if(sortBy==='byEdited'){
        return notes.sort(function(a,b){
            if(a.editedAt>b.editedAt){
                return -1
            }else if(a.editedAt<b.editedAt){
                return 1
            }else{
                return 0
            }
        })
    }

    else if(sortBy==='byRecent'){
        return notes.sort(function(a,b){
            if(a.createdAt>b.createdAt){
                return -1
            }else if(a.createdAt<b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }

    else if(sortBy==='byAlphabetical'){
        return notes.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    }
    else{
        return notes
    }
}

//Get and write the filtered notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach((note) => {
        const noteEl = generateDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

// Generate last edited messege
 const generateLastEdited= (timeStamp) =>`Last edited ${moment(timeStamp).fromNow()}`