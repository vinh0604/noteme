import Reflux from "reflux"
import Actions from "../actions"

export default Reflux.createStore({
    init() {
        this.listenTo(Actions.selectNote, this.selectNote)
    },
    selectNote(note) {
        this.trigger(note)
    }
})
