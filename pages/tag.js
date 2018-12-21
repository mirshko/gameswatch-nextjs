import Head from 'next/head'
import Page from '../components/Page'
import sanity from '../lib/sanity'
import Gameshots from '../components/Gameshots'
import Router from 'next/router'

export default class Tag extends React.Component {

    constructor(props) {
        super(props);  
        
        // this.state = {
        //     docTitle: this.props.docTitle
        // }
        
        // this.updateDocTitle = this.updateDocTitle.bind(this) 
    }

    static async getInitialProps(req) {

        const query = '{' +                                    
            '"tag": *[_type == "tag" && ( _id == $id ) && !(_id in path("drafts.**"))] {' +
                '"id": _id,' +
                'name,' +
                '"numberOfGameshots": count(*[_type == "gameshot" && references($id) && !(_id in path("drafts.**"))]),' +                
                '"gameshot": *[_type == "gameshot" && references($id) && !(_id in path("drafts.**"))] | order(_createdAt desc) { ' +                                        
                    '"imgUrl": image.asset->url,' +                                     
                '} [0]' +
            '} [0]' +            
        '}'               
        
        let data = await sanity.fetch(query, {id: req.query.id})        

        return {
            tag: data.tag,            
            docTitle: data.tag.name + " – GamesWatch",
        }
    }
    
    // // The component mounted for the first time or you came back from another site                 
    // componentDidMount () {
        
    //     // // Always store this state into browser history        
    //     // const url = this.props.url.pathname + "?id=" + this.props.url.query.id
    //     // const as = this.props.url.asPath
    //     // Router.replace(url, as, {
    //     //     shallow: true,             
    //     //     docTitle: this.state.docTitle,
    //     // })        
    // }

    // componentWillReceiveProps (nextProps) {                
                
    //     // When the ?id in the url changes
    //     // if (this.props.url.query.id !== nextProps.url.query.id) {                        
            
    //     //     // Set new state based on new props or retrieve it from history...            
    //     //     this.setState({
    //     //         docTitle: history.state.options.docTitle ? history.state.options.docTitle : nextProps.docTitle,                
    //     //     }, () => {
            
    //     //         // ...and store this new state into browser history, only if not retrieved (if retrieved, it would rewrite the stored gameshots)
    //     //         if (history.state.options.docTitle) { return }
    //     //         const url = this.props.url.pathname + "?id=" + this.props.url.query.id
    //     //         const as = this.props.url.asPath
    //     //         Router.replace(url, as, {
    //     //             shallow: true,                     
    //     //             docTitle: this.state.docTitle,
    //     //         })
    //     //     })   

    //     // }        
    // }    

    // // updateDocTitle (title) {
    // //     this.setState({
    // //         docTitle: title,
    // //     })
    // // }

    render() {   
        
        const metaImage = this.props.tag.gameshot.imgUrl

        return (
            <Page 
                context="tag" 
                tag={this.props.tag} 
                isHeaderImageShown={false}                 
                activeNavItem={"categories"}
            >

                <Head>
                    <title>{this.props.docTitle}</title>    
                    <meta name="description" content={this.props.docTitle}></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={metaImage}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content={this.props.docTitle}></meta>
                    <meta name="twitter:image" content={metaImage}></meta>                                    
                </Head>

                <Gameshots                             
                    context="tag"
                    // docTitle={this.state.docTitle}                    
                    routerPathname="/tag"
                    routerQueryId={this.props.tag.id}                            
                    routerAs={"/tag/" + this.props.tag.id}
                    // updateDocTitle={this.updateDocTitle}                                        
                    url={this.props.url}
                    filterById={this.props.tag.id}
                    numberOfGameshots={this.props.tag.numberOfGameshots}                                 
                ></Gameshots> 

            </Page>
        )
    }
}