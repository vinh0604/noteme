import Reflux from "reflux"
import NoteActions from "../actions/index"

export default Reflux.createStore({
    init() {
        this.listenTo(NoteActions.selectNote, this.selectNote)
    },
    selectNote(note) {
        this.trigger(note)
    }
})
