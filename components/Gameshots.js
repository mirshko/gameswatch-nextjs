import Gameshot from '../components/Gameshot'
import {isSafari} from 'react-device-detect'
import Masonry from 'react-masonry-component'
import Modal from '../components/Modal'
import Router from 'next/router'
import theme from '../utils/theme'
import ThumbGameshot from '../components/ThumbGameshot'
import VisibilitySensor from 'react-visibility-sensor'
import styled, { keyframes } from 'styled-components'

const numberOfGameshotsToLoad = 30

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
            display: "none",                                              
            numberOfLoadedGameshots: 0,
            loadMoreGameshots: true,
            windowWidth: 0, 
            indexOfGameshotInModal: this.props.url.query.gameshotIndex,           
        }    
        
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)   
        this.handlePrevGameshot = this.handlePrevGameshot.bind(this)   
        this.handleNextGameshot = this.handleNextGameshot.bind(this) 
        this.onKeyDown = this.onKeyDown.bind(this)                        
        this.loadMoreGameshots = this.loadMoreGameshots.bind(this)   
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
        const as = `/gameshot/${this.props.gameshots[index].id}`
        Router.push(url, as, {shallow: true})
        
        this.props.updateDocTitle('"' + this.props.gameshots[index].name + '" from ' + this.props.gameshots[index].game.name)
        
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
                const as = `/gameshot/${this.props.gameshots[this.state.indexOfGameshotInModal].id}`
                Router.push(href, as, {shallow: true})
                this.props.updateDocTitle('"' + this.props.gameshots[this.state.indexOfGameshotInModal].name + '" from ' + this.props.gameshots[this.state.indexOfGameshotInModal].game.name)
            })
        }        
    }

    handleNextGameshot () {
        if (this.state.indexOfGameshotInModal !== this.props.gameshots.slice(0, this.state.numberOfLoadedGameshots).length - 1) {            
            this.setState((prevState) => ({
                indexOfGameshotInModal: prevState.indexOfGameshotInModal + 1,                
            }), () => {
                const href = `${this.props.routerPathname}?gameshotIndex=${this.state.indexOfGameshotInModal}&id=${this.props.routerQueryId}`
                const as = `/gameshot/${this.props.gameshots[this.state.indexOfGameshotInModal].id}`
                Router.push(href, as, {shallow: true})
                this.props.updateDocTitle('"' + this.props.gameshots[this.state.indexOfGameshotInModal].name + '" from ' + this.props.gameshots[this.state.indexOfGameshotInModal].game.name)
            })
        }
    }

    loadMoreGameshots () {                
        this.setState((prevState) => ({            
            numberOfLoadedGameshots: prevState.numberOfLoadedGameshots + numberOfGameshotsToLoad,
            loadMoreGameshots: prevState.numberOfLoadedGameshots + numberOfGameshotsToLoad < this.props.gameshots.length ? true : false,
        }))        
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

        const gameshotThumbs = this.props.gameshots.slice(0, this.state.numberOfLoadedGameshots).map((gameshot, index) =>
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
                        numberOfGameshots=              {this.props.gameshots.slice(0, this.state.numberOfLoadedGameshots).length}
                    >                        
                        <Gameshot gameshot={this.props.gameshots[this.props.url.query.gameshotIndex]}/>
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
                        <VisibilitySensor onChange={this.loadMoreGameshots}>
                            <DivLoader>                                
                                <img src="../static/icons/loader.svg" />
                            </DivLoader>                            
                        </VisibilitySensor>                
                }
            </DivGameshots>                            
        )
    }
}