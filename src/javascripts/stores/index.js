import Reflux from "reflux"
import NoteActions from "../actions/index"

export default Reflux.createStore({
    listenables: [NoteActions]
})
