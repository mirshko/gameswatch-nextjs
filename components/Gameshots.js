import Gameshot from '../components/Gameshot'
import {isSafari} from 'react-device-detect'
import Masonry from 'react-masonry-component'
import Modal from '../components/Modal'
import Router from 'next/router'
import theme from '../utils/theme'
import ThumbGameshot from '../components/ThumbGameshot'
import VisibilitySensor from 'react-visibility-sensor'
import sanity from '../lib/sanity'
import styled, { keyframes } from 'styled-components'

const slideUpGameshots = keyframes`
    from {
        margin-top: 60px;
        opacity: 0;
    }
    to {
        margin-top: 20px;
        opacity: 100%;
    }
`

const DivGameshots = styled.div`
    margin: 0 auto 40px auto;     
    width: ${props => props.width}px;
    display: ${props => props.display};
    /* animation: ${slideUpGameshots} 0.15s ease-in; */
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        width: 100%;
    }
`

const DivLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
`

export default class Gameshots extends React.Component {        

    constructor(props) {
        super(props);

        this.state = {            
            gameshots: [],                                       
            numberOfLoadedGameshots: 0,
            loadMoreGameshots: true,
            numberOfGameshots: undefined,
            windowWidth: 0, 
            indexOfGameshotInModal: this.props.url.query.gameshotIndex,                       
        }    
        
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)   
        this.handlePrevGameshot = this.handlePrevGameshot.bind(this)   
        this.handleNextGameshot = this.handleNextGameshot.bind(this) 
        this.onKeyDown = this.onKeyDown.bind(this)                                
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);                    
    }
    
    componentDidMount () {  
        this.setState({
            display: "block"            
        })                      
        document.addEventListener('keydown', this.onKeyDown)        
        window.addEventListener('resize', this.updateWindowDimensions)
        this.updateWindowDimensions()        
    }  
    
    componentWillUnmount () {
        document.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    getGameshots = async (from, to, isVisible) => {                      
        
        // Don't run if the loader is hidden
        if (!isVisible) { return }

        // Find out if we are filtering gameshots by ID or not
        let ref = ''
        if (this.props.filterById !== undefined) { 
            ref = '&& references("' + this.props.filterById + '")'
        } 

        const queryForGameshots = '{' +                                     
            '"gameshots": *[_type == "gameshot" ' + ref + ' && !(_id in path("drafts.**"))] | order(_createdAt desc) {' +
                '"id": _id,' +
                '"media": {' +
                    '"img": {' +
                        '"url": image.asset->url,' +
                        '"aspectRatio": image.asset->metadata.dimensions.aspectRatio,' +
                    '},' +
                    '"video": {' +
                        '"url": video.asset->url,' +
                        '"format": video.format,' +
                    '},' +
                    '"palette": {' +
                        '"dominant": image.asset->metadata.palette.dominant' +
                    '}' +
                '},' +
                '"device": {' +
                    '"name": device->name,' +
                    '"id": device->_id' +
                '},' +
                '"game": {' +
                    '"name": game->name,' +
                    '"id": game->_id,' +
                    '"numberOfGameshots": count(*[_type == "gameshot" && references(^.game->_id) && !(_id in path("drafts.**")) ]),' +
                    '"media": {' +
                        '"imgThumbnail": {' +
                            '"url": game->img_thumbnail.asset->url' +
                        '},' +
                        '"palette": {' +
                            '"dominant": game->img_thumbnail.asset->metadata.palette.dominant' +
                        '}' +
                    '}' +                        
                '},' +
                'name,' +
                '"platform": {' +
                    '"name": device->platform->name,' +
                    '"id": device->platform->_id' +
                '},' +        
                '"tags": tags[]->{' +
                    '"id": _id,' +
                    'name' +
                '} | order(name asc)' +                
            '} [$from...$to]' +
        '}'
        
        const data = await sanity.fetch(queryForGameshots, {from, to})
        
        this.setState((prevState) => ({            
            gameshots: prevState.gameshots.concat(data.gameshots),            
            numberOfLoadedGameshots: prevState.numberOfLoadedGameshots + data.gameshots.length,            
            loadMoreGameshots: this.props.numberOfGameshots == prevState.numberOfLoadedGameshots + data.gameshots.length ? false : true,            
        }))        
    }   
    
    restartGameshots () {
        this.setState({
            gameshots: [],
            numberOfLoadedGameshots: 0,
            loadMoreGameshots: true,
        })
    }

    componentDidUpdate (prevProps) {
        if (this.props.filterById !== prevProps.filterById) {
            this.restartGameshots()
        }
    }


    updateWindowDimensions() {
        this.setState({ 
            windowWidth: window.innerWidth,             
        })
    }

    showModal (index, e) {
        
        this.setState({            
            indexOfGameshotInModal: index,            
        })         

        const url = `${this.props.routerPathname}?gameshotIndex=${index}&id=${this.props.routerQueryId}`
        const as = `/gameshot/${this.state.gameshots[index].id}`
        Router.push(url, as, {shallow: true})
        
        this.props.updateDocTitle('"' + this.state.gameshots[index].name + '" from ' + this.state.gameshots[index].game.name)
        
    }

    hideModal () {                              
        
        const url = `${this.props.routerPathname}?id=${this.props.routerQueryId}`
        const as = this.props.routerAs
        Router.push(url, as, {shallow: true})

        this.props.updateDocTitle(this.props.docTitle)
    }
    
    hideModalByClickingOnOverlay (e) {
        if (e.target.id == "overlay") {
            this.hideModal()
        }
    }

    onKeyDown (e) {
        
        // ESC
        if (e.keyCode === 27) {
            this.hideModal()
        }
        
        // LEFT
        if (e.keyCode === 37) {
            if (this.props.url.query.gameshotIndex) {
                this.handlePrevGameshot()
            }            
        }

        // RIGHT
        if (e.keyCode === 39) {
            if (this.props.url.query.gameshotIndex) {
                this.handleNextGameshot()
            }
        }

    }

    handlePrevGameshot () {        
        if (this.state.indexOfGameshotInModal !== 0) {            
            this.setState((prevState) => ({
                indexOfGameshotInModal: prevState.indexOfGameshotInModal - 1,                
            }), () => {
                const href = `${this.props.routerPathname}?gameshotIndex=${this.state.indexOfGameshotInModal}&id=${this.props.routerQueryId}`
                const as = `/gameshot/${this.state.gameshots[this.state.indexOfGameshotInModal].id}`
                Router.push(href, as, {shallow: true})
                this.props.updateDocTitle('"' + this.state.gameshots[this.state.indexOfGameshotInModal].name + '" from ' + this.state.gameshots[this.state.indexOfGameshotInModal].game.name)
            })
        }        
    }

    handleNextGameshot () {
        if (this.state.indexOfGameshotInModal !== this.state.gameshots.length - 1) {            
            this.setState((prevState) => ({
                indexOfGameshotInModal: prevState.indexOfGameshotInModal + 1,                
            }), () => {
                const href = `${this.props.routerPathname}?gameshotIndex=${this.state.indexOfGameshotInModal}&id=${this.props.routerQueryId}`
                const as = `/gameshot/${this.state.gameshots[this.state.indexOfGameshotInModal].id}`
                Router.push(href, as, {shallow: true})
                this.props.updateDocTitle('"' + this.state.gameshots[this.state.indexOfGameshotInModal].name + '" from ' + this.state.gameshots[this.state.indexOfGameshotInModal].game.name)
            })
        }
    }

    render () {

        const numberOfGameshotsThatFitHorizontally = Math.floor(this.state.windowWidth / (theme.sizes.widthThumbGameshot + theme.sizes.gapHorizontalThumbGameshot * 2))
        let masonryWidth = (theme.sizes.widthThumbGameshot + theme.sizes.gapHorizontalThumbGameshot) * numberOfGameshotsThatFitHorizontally
        let masonryMarginLeft = -theme.sizes.gapHorizontalThumbGameshot

        if (this.state.windowWidth < (theme.breakpoints.fullWidthLayout + 1)) {
            masonryWidth = "100%"
            masonryMarginLeft = 0
        }            
        
        const style = {            
            masonry: {
                width: masonryWidth,
                marginLeft: masonryMarginLeft,                
            }
        }

        const masonryOptions = {
            transitionDuration: 0,            
        }

        const gameshotThumbs = this.state.gameshots.map((gameshot, index) =>
            <ThumbGameshot
                context={this.props.context}                
                key={gameshot.id} 
                onClick={(e) => this.showModal(index, e)}                                
                gameshot={gameshot}
            />
        )                

        let bodyStyle
        
        if (isSafari) { 
            bodyStyle = <style jsx global>{`body { overflow: hidden; position: fixed; width: 100% }`}</style>
        } else {
            bodyStyle = <style jsx global>{`body { overflow: hidden; }`}</style>
        }

        return (
            <DivGameshots
                display={this.state.display}
                width={masonryWidth - theme.sizes.gapHorizontalThumbGameshot}
            >                    
                {this.props.url.query.gameshotIndex && bodyStyle}
                {this.props.url.query.gameshotIndex &&                    
                    <Modal 
                        hideModal=                      {this.hideModal} 
                        hideModalByClickingOnOverlay=   {(e) => this.hideModalByClickingOnOverlay(e)}
                        handlePrevGameshot=             {this.handlePrevGameshot}
                        handleNextGameshot=             {this.handleNextGameshot}
                        indexOfGameshotInModal=         {this.props.url.query.gameshotIndex}
                        numberOfGameshots=              {this.state.gameshots.length}
                    >                        
                        <Gameshot gameshot={this.state.gameshots[this.props.url.query.gameshotIndex]}/>
                    </Modal>
                }

                <Masonry                        
                    className={'masonry'}
                    elementType={'div'}
                    options={masonryOptions}
                    style={style.masonry}                   
                >                                        
                    {gameshotThumbs}                                         
                </Masonry>
                {
                    this.state.loadMoreGameshots &&
                        <VisibilitySensor 
                            onChange={(e) => this.getGameshots(this.state.numberOfLoadedGameshots, this.state.numberOfLoadedGameshots + theme.variables.numberOfGameshotsToGet, e)}
                            intervalDelay={800}
                        >
                            <DivLoader>                                
                                <img src="../static/icons/loader.svg" />
                            </DivLoader>                            
                        </VisibilitySensor>                
                }
            </DivGameshots>                            
        )
    }
}