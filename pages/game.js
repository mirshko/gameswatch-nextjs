import Head from 'next/head'
import Page from '../components/Page'
import sanity from '../lib/sanity'
import Gameshots from '../components/Gameshots'
import styled from 'styled-components'
import theme from '../utils/theme'

const DivCopyright = styled.div`
    width: 100%;
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;    
`
const ParagraphCopyright = styled.p`
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.fontSizes.s}px;
    text-align: center;
    line-height: 1.2;
    margin-top: 8px;
    width: 100%;
    max-width: 720px;    
`

export default class Game extends React.Component {    

    constructor(props) {
        super(props);                
    }

    static async getInitialProps(req) {

        const query = '{' +                        
            '"game": *[_type == "game" && _id == $id] {' +
                'name,' +
                '"id": _id,' +
                '"developers": developers[]->{' +
                    'name' +
                '},' +
                '"urlImgHeader": img_header.asset->url,' + 
                '"urlImgThumbnail": img_thumbnail.asset->url,' + 
                '"numberOfGameshots": count(*[_type == "gameshot" && references($id) && !(_id in path("drafts.**"))]),' +                                
            '} [0]' +
        '}'                        
        
        const data = await sanity.fetch(query, {id: req.query.id})

        return {
            game: data.game,            
            docTitle: data.game.name + " – GamesWatch"
        }
    }
    
    componentWillReceiveProps (nextProps) {                
        // Update the doc title when the props.docTitle has changed
        if (this.props.docTitle !== nextProps.docTitle) {
            this.updateDocTitle(nextProps.docTitle)            
        }        
    }

    updateDocTitle (title) {
        this.setState({
            docTitle: title
        })
    }

    render() {   
        
        const copyright = this.props.game.developers.map((developer, index) => 
            <ParagraphCopyright key={index}>
                &#x24B8; {this.props.game.developers[index].name}
            </ParagraphCopyright>
        )

        return (
            <Page 
                activeNavItem={"games"}
                context="game" 
                game={this.props.game} 
                isHeaderImageShown={true}                 
            >                

                <Head>
                    <title>{this.props.docTitle}</title>  
                    <meta name="description" content={this.props.docTitle}></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={this.props.game.urlImgThumbnail}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content={this.props.docTitle}></meta>
                    <meta name="twitter:image" content={this.props.game.urlImgThumbnail}></meta>
                </Head>
                
                <Gameshots                             
                    context="game"                    
                    routerPathname="/game"
                    routerQueryId={this.props.game.id}                            
                    routerAs={"/game/" + this.props.game.id}
                    updateDocTitle={this.updateDocTitle}
                    docTitle={this.props.docTitle}
                    url={this.props.url}
                    filterById={this.props.game.id}  
                    numberOfGameshots={this.props.game.numberOfGameshots}
                    // ref={this.gameshots}                  
                ></Gameshots> 
                
                <DivCopyright>{copyright}</DivCopyright>

            </Page>
        )
    }
}