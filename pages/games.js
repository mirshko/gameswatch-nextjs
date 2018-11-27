import Head from 'next/head'
import Page from '../components/Page'
import sanity from '../lib/sanity'
import ThumbGame from '../components/ThumbGame'
import theme from '../utils/theme'
import styled from 'styled-components'

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

export default class Games extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
            windowWidth: 0,            
            display: "none",            
        }                    
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);        
    }

    componentDidMount () {                        
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.setState({
            display: "block"
        })  
    }  
    
    componentWillUnmount () {        
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ 
            windowWidth: window.innerWidth,             
        })
    }

    static async getInitialProps() {

        const query = '{' +            
            '"games": *[_type == "game" && !(_id in path("drafts.**"))] | order(name asc) {' +
                '"id": _id,' +
                'name, ' +            
                '"media": {' +
                    '"imgThumbnail": {' +
                        '"url": img_thumbnail.asset->url,' +                    
                    '},' +                
                    '"palette": img_thumbnail.asset->metadata.palette' +                                            
                '},' +
                '"numberOfGameshots": count(*[_type == "gameshot" && references(^._id) && !(_id in path("drafts.**"))])' + 
            '}' +
        
        '}'
        
        const data = await sanity.fetch(query) 
        
        return {
            games: data.games,            
        }
    }

    render() {

        let widthThumbnails = (theme.sizes.widthThumbGame + theme.sizes.gapHorizontalThumbGame) * Math.floor(this.state.windowWidth / (theme.sizes.widthThumbGame + theme.sizes.gapHorizontalThumbGame * 2) )
        let marginLeftThumbnails = -theme.sizes.gapHorizontalThumbGame / 2

        if (this.state.windowWidth < (theme.breakpoints.fullWidthLayout + 1)) {
            widthThumbnails = "100%"
            marginLeftThumbnails = 0
        }

        const thumbsOfGames = this.props.games.map((game) =>
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
                            {thumbsOfGames}
                        </Thumbnails>        
                    </ThumbnailsContainer>                    
                </Container>
            </Page>
        )
    }
}