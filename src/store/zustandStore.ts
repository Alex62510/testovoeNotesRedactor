import {create} from "zustand";

export type ZustandType = {
    notesWithTag: NotesType[],
    mappedNoteWithTag: NotesType[],
    addNotes: (value: NotesType) => void,
    changeNotes: (value: NotesType) => void,
    removeNotes: (id: string) => void
    addNotesWithTag: (notesWithTag: NotesType[]) => void
}
export type NotesType = { id: string, hashTag:string, notes: string }
export const useZustand = create<ZustandType>((set, get) => ({

    notesWithTag: [],
    mappedNoteWithTag: [],
    addNotes: (value: NotesType) => set((state) => {
        let valueAsObj = localStorage.getItem('notes')
        if (valueAsObj) {
            const valueStorage = JSON.parse(valueAsObj)
            localStorage.setItem('notes', JSON.stringify([...valueStorage, value]))
        } else {
            localStorage.setItem('notes', JSON.stringify([value]))
        }
        return {notesWithTag: [...state.notesWithTag, value]}
    }),
    addNotesWithTag: (notesWithTag: NotesType[]) => set((state) => ({notesWithTag: [...notesWithTag]})),
    removeNotes: (tag) => set((state) => ({notesWithTag: state.notesWithTag.filter(t => t.id !== tag)})),
    changeNotes: (value: NotesType) => set((state) => {
        let valueAsObj = localStorage.getItem('notes')
        if (valueAsObj) {
            const valueStorage = JSON.parse(valueAsObj)
            localStorage.setItem('notes', JSON.stringify(valueStorage.map((t:NotesType)=>t.id===value.id?value :t)))
        } else {
            localStorage.setItem('notes', JSON.stringify([value]))
        }
        console.log({notesWithTag: state.notesWithTag.map(t => t.id === value.id ? {...value} : {...t})})
        return {notesWithTag: state.notesWithTag.map(t => t.id === value.id ? value : t)}
    })
}))