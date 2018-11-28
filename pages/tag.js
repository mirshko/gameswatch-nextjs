import Head from 'next/head'
import Page from '../components/Page'
import sanity from '../lib/sanity'
import Gameshots from '../components/Gameshots';

export default class Category extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            docTitle: this.props.docTitle
        }     
        
        this.updateDocTitle = this.updateDocTitle.bind(this) 
    }

    static async getInitialProps(req) {

        const query = '{' +                                    
            '"tag": *[_type == "tag" && ( _id == $id ) && !(_id in path("drafts.**"))] {' +
                '"id": _id,' +
                'name,' +
                '"numberOfGameshots": count(*[_type == "gameshot" && references($id) && !(_id in path("drafts.**"))]),' +                
                '"gameshots": {' +
                    '"media": {' +
                        '"img": {' +
                            '"url": image.asset->url,' + 
                        '}' +
                    '}' +
                '}' +
            '} [0]' +            
        '}'               
        
        let data = await sanity.fetch(query, {id: req.query.id})        

        return {
            tag: data.tag,            
            docTitle: data.tag.name + " – GamesWatch"
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

        return (
            <Page 
                context="tag" 
                tag={this.props.tag} 
                isHeaderImageShown={false}                 
                activeNavItem={"categories"}
            >

                <Head>
                    <title>{this.state.docTitle}</title>    
                    <meta name="description" content={this.state.docTitle}></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={this.props.tag.gameshots[0] && this.props.tag.gameshots[0].media.img.url}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content={this.state.docTitle}></meta>
                    <meta name="twitter:image" content={this.props.tag.gameshots[0] && this.props.tag.gameshots[0].media.img.url}></meta>                                    
                </Head>

                <Gameshots                             
                    context="tag"
                    docTitle={this.props.docTitle}                    
                    routerPathname="/tag"
                    routerQueryId={this.props.tag.id}                            
                    routerAs={"/tag/" + this.props.tag.id}
                    updateDocTitle={this.updateDocTitle}                                        
                    url={this.props.url}
                    filterById={this.props.tag.id}
                ></Gameshots> 

            </Page>
        )
    }
}