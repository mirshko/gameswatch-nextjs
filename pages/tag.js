import Head from 'next/head'
import Page from '../components/Page'
import sanity from '../lib/sanity'
import Gameshots from '../components/Gameshots'
import Router from 'next/router'

export default class Tag extends React.Component {

    constructor(props) {
        super(props);             

        this.state = {
            docTitle: this.props.docTitle,
            tag: this.props.tag,
        }
        this.updateDocTitle = this.updateDocTitle.bind(this) 
    }

    static async getInitialProps(req) {

        const query = '{' +                                    
            '"tag": *[_type == "tag" && ( _id == $id ) && !(_id in path("drafts.**"))] {' +
                '"id": _id,' +
                'name,' +
                '"numberOfGameshots": count(*[_type == "gameshot" && references($id) && !(_id in path("drafts.**"))]),' +                
                '"gameshots": *[_type == "gameshot" && references($id) && !(_id in path("drafts.**"))] | order(_createdAt desc) { ' +
                    '"media": {' +
                        '"img": {' +
                            '"url": image.asset->url,' + 
                        '}' +
                    '}' +
                '} [0]' +
            '} [0]' +            
        '}'               
        
        let data = await sanity.fetch(query, {id: req.query.id})        

        return {
            tag: data.tag,            
            docTitle: data.tag.name + " – GamesWatch",
        }
    }
    
    // The component mounted for the first time or you came back from another site                 
    componentDidMount () {
        
        // Always store this state into browser history        
        const url = this.props.url.pathname + "?id=" + this.props.url.query.id
        const as = this.props.url.asPath
        Router.replace(url, as, {
            shallow: true, 
            tag: this.state.tag,
            docTitle: this.state.docTitle,
        })        
    }

    componentWillReceiveProps (nextProps) {                
                
        // When the ?id in the url changes
        if (this.props.url.query.id !== nextProps.url.query.id) {                        
            
            // Set new state based on new props or retrieve it from history...
            console.log(history.state)
            this.setState({
                docTitle: history.state.options.docTitle ? history.state.options.docTitle : nextProps.docTitle,
                tag: history.state.options.tag ? history.state.options.tag : nextProps.tag,
            }, () => {
            
                // ...and store this new state into browser history, only if not retrieved (if retrieved, it would rewrite the stored gameshots)
                if (history.state.options.docTitle) { return }
                const url = this.props.url.pathname + "?id=" + this.props.url.query.id
                const as = this.props.url.asPath
                Router.replace(url, as, {
                    shallow: true, 
                    tag: this.state.tag,
                    docTitle: this.state.docTitle,
                })
            })   

        }        
    }    

    updateDocTitle (title) {
        this.setState({
            docTitle: title,
        })
    }

    render() {                              

        return (
            <Page 
                context="tag" 
                tag={this.state.tag} 
                isHeaderImageShown={false}                 
                activeNavItem={"categories"}
            >

                <Head>
                    <title>{this.state.docTitle}</title>    
                    <meta name="description" content={this.state.docTitle}></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={this.state.tag.gameshots[0] && this.state.tag.gameshots[0].media.img.url}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content={this.state.docTitle}></meta>
                    <meta name="twitter:image" content={this.state.tag.gameshots[0] && this.state.tag.gameshots[0].media.img.url}></meta>                                    
                </Head>

                <Gameshots                             
                    context="tag"
                    docTitle={this.state.docTitle}                    
                    routerPathname="/tag"
                    routerQueryId={this.state.tag.id}                            
                    routerAs={"/tag/" + this.state.tag.id}
                    updateDocTitle={this.updateDocTitle}                                        
                    url={this.props.url}
                    filterById={this.state.tag.id}
                    numberOfGameshots={this.state.tag.numberOfGameshots}                                 
                ></Gameshots> 

            </Page>
        )
    }
}