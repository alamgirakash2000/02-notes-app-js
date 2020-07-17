'use strict'



// Get saved notes
function getSavedNotes(){
    let notesJSON=localStorage.getItem('notes')
    try{
        return JSON.parse(notesJSON)
    }catch(e){
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
    document.querySelector('#note-titles').appendChild(noteEL)

}

// For sorting the notes
function filterNotes(notes,sortBy){
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
function renderNotes(notes,filters){
    notes=filterNotes(notes,filters.sortBy)
    const filteredNotes = notes.filter((note) =>note.title.toLowerCase().includes(filters.searchTexts.toLowerCase()))
     document.querySelector('#note-titles').innerHTML=''
     filteredNotes.forEach(function(note){
        generateDOM(note)
    })
    if(document.querySelector('#note-titles').innerHTML===''){
        document.querySelector('#note-titles').innerHTML='You have no note to see. Please create one by clicking the button'
    }
}

// Generate last edited messege
 const generateLastEdited= (timeStamp) =>`Last edited ${moment(timeStamp).fromNow()}`