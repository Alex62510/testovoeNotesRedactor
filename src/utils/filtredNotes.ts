import {NotesType} from "../store/zustandStore";

export const search = (quary: string, notesWithTag: NotesType[]) => {
    if (!quary) {
        return notesWithTag
    } else {
        const loverCaseQuary = quary.toLocaleLowerCase()
        return notesWithTag.filter(t => t.hashTag.toLocaleLowerCase().includes(loverCaseQuary) ||
            t.notes.toLocaleLowerCase().includes(loverCaseQuary))
    }
}
