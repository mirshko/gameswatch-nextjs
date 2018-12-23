import Head from 'next/head'
import Gameshot from '../components/Gameshot'
import Page from '../components/Page'
import sanity from '../lib/sanity'
import theme from '../utils/theme';
import styled from 'styled-components'

const DivOne = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: ${theme.sizes.menuHeight + 20}px;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        padding-top: ${theme.sizes.heightMenuShrank + 20}px;
    }
`

const DivTwo = styled.div`
    width: 100%;
    max-width: 1080px;    
`

export default class GameshotPage extends React.Component {

    constructor(props) {
        super(props)                   
        this.state = {                        
            showGameshot: false,
        }                    
    }
    
    static async getInitialProps(req) {

        const query = '{' +
            '"gameshot": *[_type == "gameshot" && _id == $id] {' +
                '"id": _id,' +
                '"media": {' +
                    '"img": {' +
                        '"url": image.asset->url,' +
                        '"aspectRatio": image.asset->metadata.dimensions.aspectRatio,' +
                        '"width": image.asset->metadata.dimensions.width,' +
                    '},' +
                    '"video": {' +
                        '"url": video.asset->url,' +
                        '"format": video.format,' +
                    '},' +
                        '"palette": image.asset->metadata.palette' +                                            
                '},' +
                '"device": {' +
                    '"name": device->name,' +
                    '"id": device->_id' +
                '},' +
                '"game": {' +
                    '"name": game->name,' +
                    '"id": game->_id,' +
                    '"numberOfGameshots": count(*[_type == "gameshot" && references(^.game->_id) && !(_id in path("drafts.**"))]),' +
                    '"media": {' +
                        '"imgThumbnail" :{' +
                            '"url": game->img_thumbnail.asset->url' +
                        '},' +
                        '"palette": game->img_thumbnail.asset->metadata.palette' +                                            
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
            '} [0]' +

        '}'                                    

        const data = await sanity.fetch(query, {id: req.query.id})

        return {
            gameshot: data.gameshot,            
        }
    }

    componentDidMount () {
        this.setState({
            showGameshot: true
        })
    }

    render() {        

        return (
            <Page 
                context="gameshot" 
                isHeaderImageShown={false}
            >            
                <Head>
                    <title>"{this.props.gameshot.name}" from {this.props.gameshot.game.name}</title>                                        
                    <meta name="description" content={'"' + this.props.gameshot.name + '" from ' + this.props.gameshot.game.name}></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={this.props.gameshot.media.img.url}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content={'"' + this.props.gameshot.name + '" from ' + this.props.gameshot.game.name}></meta>
                    <meta name="twitter:image" content={this.props.gameshot.media.img.url}></meta>   
                </Head>                
                <DivOne>
                    <DivTwo>
                        { this.state.showGameshot &&
                            <Gameshot gameshot={this.props.gameshot} hideModal={null}/>
                        }
                    </DivTwo>
                </DivOne>
            </Page>
        )
    }
}