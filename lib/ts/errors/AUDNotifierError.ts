
class AUDNotifierError extends Error{
    constructor(msg){
        super(msg)
        this.message = msg
        this.name = 'AUDNotifierError'
    }
}
export{
    AUDNotifierError
}