import Head from 'next/head'
import Page from '../components/Page'
import Router from 'next/router'
import sanity from '../lib/sanity'
import ThumbGame from '../components/ThumbGame'
import theme from '../utils/theme'
import styled from 'styled-components'
import VisibilitySensor from 'react-visibility-sensor'

const Container = styled.div`
    width: 100%; 
    display: ${props => props.display};       
`

const ThumbnailsContainer = styled.div`    
    display: flex;
    width: ${props => props.width}px;      
    margin: 0 auto;    
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {     
        padding-left: ${theme.sizes.gapVerticalPage/2}px;      
        padding-right: ${theme.sizes.gapVerticalPage/2}px;           
    }
`

const Thumbnails = styled.div`    
    width: 100%;
    margin-left: ${props => props.marginLeft}px;
    display: inline-flex;
    flex-wrap: wrap;      
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        margin-left: -10px;          
        box-sizing: border-box;
    }          
`

const GameThumbnailWrapper = styled.div`
    display: block;  
    width: ${theme.sizes.widthThumbGame}px;  
    margin-bottom: ${theme.sizes.gapVerticalThumbGame}px;
    margin-left: ${theme.sizes.gapHorizontalThumbGame}px;    
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        width: 50%; 
        box-sizing: border-box;
        margin-left: 0;
        padding-left: ${theme.sizes.gapHorizontalThumbGame}px;       
    }
`

const DivLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
`

export default class Games extends React.Component {

    constructor(props) {
        super(props);

        this.state = {                               
            windowWidth: 0,            
            display: "none",                           
        }                           

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)        
    }

    static async getInitialProps() { 
        
        const queryForNumberOfGames = 'count(*[_type == "game" && !(_id in path("drafts.**"))])'
        const data = await sanity.fetch(queryForNumberOfGames)                

        return {
            numberOfGames: data,            
        }
    }

    componentDidMount () {                 
        
        this.setState({
            games: history.state.options.games ? history.state.options.games : [],
            numberOfLoadedGames: history.state.options.numberOfLoadedGames ? history.state.options.numberOfLoadedGames : 0,
            loadMoreGames: history.state.options.loadMoreGames ? history.state.options.loadMoreGames : true, 
            display: "block",
        })                        
        
        this.updateWindowDimensions()                
        window.addEventListener('resize', this.updateWindowDimensions)
    } 
    
    componentWillUnmount () {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }
    
    updateWindowDimensions() {
        this.setState({ 
            windowWidth: window.innerWidth,             
        })
    }   

    getGames = async (from, to, isVisible) => {
        
        // Don't run if the loader is hidden
        if (!isVisible) { return }

        const queryForGames = '*[_type == "game" && !(_id in path("drafts.**"))] | order(name asc) {' +
            '"id": _id,' +
            'name, ' +            
            '"media": {' +
                '"imgThumbnail": {' +
                    '"url": img_thumbnail.asset->url,' +                    
                '},' +                
                '"palette": img_thumbnail.asset->metadata.palette' +                                            
            '},' +
            '"numberOfGameshots": count(*[_type == "gameshot" && references(^._id) && !(_id in path("drafts.**"))])' + 
        '} [$from...$to]'        
        
        const data = await sanity.fetch(queryForGames, {from: from, to: to})

        this.setState((prevState) => ({            
            games: prevState.games.concat(data),            
            numberOfLoadedGames: prevState.numberOfLoadedGames + data.length,            
            loadMoreGames: this.props.numberOfGames == prevState.numberOfLoadedGames + data.length ? false : true,       
            display: "block"     
        }), () => {            
            Router.replace(this.props.url.asPath, this.props.url.asPath, {
                shallow: true, 
                games: this.state.games,
                numberOfLoadedGames: this.state.numberOfLoadedGames,
                loadMoreGames: this.state.loadMoreGames,                
            })
        })

    }    

    render() {

        let widthThumbnails = (theme.sizes.widthThumbGame + theme.sizes.gapHorizontalThumbGame) * Math.floor(this.state.windowWidth / (theme.sizes.widthThumbGame + theme.sizes.gapHorizontalThumbGame * 2) )
        let marginLeftThumbnails = -theme.sizes.gapHorizontalThumbGame / 2

        if (this.state.windowWidth < (theme.breakpoints.fullWidthLayout + 1)) {
            widthThumbnails = "100%"
            marginLeftThumbnails = 0
        }       
        
        let gameThumbs = []
        if (this.state.games) {
            gameThumbs = this.state.games.map((game) =>
                <GameThumbnailWrapper key={game.id}>
                    <ThumbGame 
                        id={game.id}                    
                        layout={"vertical"}
                        name={game.name}
                        numberOfGameshots={game.numberOfGameshots} 
                        media={game.media}
                        width={"100%"}                                        
                        showTitle={true}
                    />
                </GameThumbnailWrapper>
            )
        }

        return (
            <Page 
                context="games"                 
                isHeaderImageShown={false} 
                activeNavItem={"games"}
            >
                <Head>
                    <title>Games – GamesWatch</title>  
                    <meta name="description" content="Categories – GamesWatch"></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={theme.url.metaImage}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content="Categories – GamesWatch"></meta>
                    <meta name="twitter:image" content={theme.url.metaImage}></meta>                                                                          
                </Head>
                <Container display={this.state.display}>
                    <ThumbnailsContainer width={widthThumbnails}>
                        <Thumbnails marginLeft={marginLeftThumbnails}>
                            {gameThumbs}                            
                        </Thumbnails>        
                    </ThumbnailsContainer> 
                    {
                        this.state.loadMoreGames &&
                            <VisibilitySensor
                                onChange={(e) => this.getGames(this.state.numberOfLoadedGames, this.state.numberOfLoadedGames + theme.variables.numberOfGamesToGet, e)}
                                intervalDelay={500}
                            >
                                <DivLoader>                                
                                    <img src="/static/icons/loader.svg" />
                                </DivLoader>                            
                            </VisibilitySensor>                
                    }                   
                </Container>
            </Page>
        )
    }
}