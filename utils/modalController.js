let modalController = {}

modalController.showModal =  function(index, e, this_, Router) {
    
    this_.setState({
        showModal: true,
        indexOfGameshotInModal: index,
        docTitle: '"' + this_.props.game.gameshots[index].name + '"' + ' from ' + this_.props.game.name                        
    })
    
    const href = this_.props.url 
    const as = `/gameshot?id=${this_.props.game.gameshots[index]._id}`
    Router.push(href, as)
}

export default modalController