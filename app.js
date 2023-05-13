class App {
    constructor() {
        this.notes = []
        this.title = ''
        this.text = ''
        this.id = ''

        this.$form = document.querySelector('#form')
        this.$noteTitle = document.querySelector('#note-title')
        this.$noteText = document.querySelector('#note-text')
        this.$formButtons = document.querySelector('#form-buttons')
        this.$placeholder = document.querySelector('#placeholder')
        this.$notes = document.querySelector('#notes')
        this.$formCloseBtn = document.querySelector('#form-close-button')
        this.$modal = document.querySelector('.modal')
        this.$modalTitle = document.querySelector('.modal-title')
        this.$modalText = document.querySelector('.modal-text')
        this.$modalCloseBtn = document.querySelector('.modal-close-button')
        
        this.addEventListeners()
    }

    addEventListeners() {
        document.body.addEventListener('click', event => {
            this.handleFormClick(event)
            this.selectNote(event)
            this.openModal(event)
        })
        
        this.$form.addEventListener('submit', event => {
            event.preventDefault()
            const text = this.$noteText.value
            const title = this.$noteTitle.value
            const hasNote = text || title

            if (hasNote) {
                this.addNote({title, text})
            }
        })

        this.$formCloseBtn.addEventListener('click', event => {
            event.stopPropagation()
            this.closeForm()
        })

        this.$modalCloseBtn.addEventListener('click', event => {
            this.closeModal(event)
        })
    }
    
    handleFormClick(event) {
        const isFormClicked = this.$form.contains(event.target)

        const text = this.$noteText.value
        const title = this.$noteTitle.value
        const hasNote = text || title

        if (isFormClicked) {
            this.openForm()
        } else if (hasNote) {
            this.addNote({title, text})
        } else {
            this.closeForm()
        }
    }

    openForm() {
        this.$form.classList.add('form-open')
        this.$noteTitle.style.display = 'block'
        this.$formButtons.style.display = 'block'
    }

    closeForm() {
        this.$form.classList.remove('form-open')
        this.$noteTitle.style.display = 'none'
        this.$formButtons.style.display = 'none'
        this.$noteText.value = ''
        this.$noteTitle.value = ''
    }

    openModal(event) {
        if (event.target.closest('.note')) {
            this.$modal.classList.toggle('open-modal')
            this.$modalTitle.value = this.title
            this.$modalText.value = this.text
        }
    }

    closeModal(event) {
        this.editNote()
        this.$modal.classList.toggle('open-modal')
    }

    addNote({title, text}) {
        const newNote = {
            title,
            text,
            color: 'white',
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        }
        this.notes = [...this.notes, newNote]
        this.displayNotes()
        this.closeForm()
    }

    editNote() {
        const title = this.$modalTitle.value
        const text = this.$modalText.value
        this.notes = this.notes.map(note => {
            return note.id === Number(this.id) ? { ...note, title, text } : note
        })
        this.displayNotes()
    }

    selectNote(event) {
        const $selectedNote = event.target.closest('.note')
        if (!$selectedNote) return
        const [$noteTitle, $noteText] = $selectedNote.children
        this.title = $noteTitle.innerText
        this.text = $noteText.innerText
        this.id = $selectedNote.dataset.id
     }

    displayNotes() {
        const hasNotes = this.notes.length > 0
        this.$placeholder.style.display = hasNotes ? 'none' : 'flex'
        
        this.$notes.innerHTML = this.notes.map(note => `
            <div style='background: ${note.color}' class='note' data-id='${note.id}'>
                <div class="${note.title && 'note-title'}"> ${note.title} </div>
                <div class='note-text'> ${note.text} </div>
            </div>
        `).join('')
    }
}

new App()