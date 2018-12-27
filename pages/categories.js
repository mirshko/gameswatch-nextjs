import Head from 'next/head'
import Link from 'next/link'
import Page from '../components/Page'
import sanity from '../lib/sanity'
import ThumbCategory from '../components/ThumbCategory'
import theme from '../utils/theme'
import styled from 'styled-components'
import VisibilitySensor from 'react-visibility-sensor' 

const DivContainer = styled.div`
    display: ${props => props.display};       
    flex-direction: row;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        flex-direction: column;
    }
`

const UlMenu = styled.ul`
    box-sizing: border-box;
    padding-left: 40px;
    width: 280px;    
    font-size: ${theme.fontSizes.m}px;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        width: 100%;
        padding-left: ${theme.sizes.gapVerticalPage}px;   
        margin-bottom: 40px;     
    }
`
const CategoryTypeItemLink = styled.a`
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    opacity: ${props => props.opacity};
`

const DivThumbnailsContainer = styled.div`
    width: 100%;                
    display: flex;
    flex-direction: column;
    justify-content: left;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {        
        padding-left: ${theme.sizes.gapVerticalPage}px;            
    }
`

const Thumbnails = styled.div`
    margin-left: -${theme.sizes.gapHorizontalThumbCategory}px;
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;    
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        display: flex;
        flex-direction: column;
        margin-left: -${theme.sizes.gapHorizontalThumbCategory}px;
        padding-right: ${theme.sizes.gapVerticalPage}px;
    }            
`

const DivLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
`

export default class Categories extends React.Component {

    constructor(props) {
        super(props);

        this.state = {  
            tags: [],  
            numberOfLoadedTags: 0,
            loadMoreTags: true,
            numberOfTags: undefined,            
            windowWidth: 0,            
            display: "none",
            currentCategoryTypeId: this.props.url.query.categoryTypeId,
        }                
        
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);                
    }       

    static async getInitialProps() {     
        
        const queryForCategoryTypes = '*[_type == "categoryType" && !(_id in path("drafts.**"))] | order(name asc) {' +
            '"id": _id,' +
            'name,' +        
        '}'
        
        let data = await sanity.fetch(queryForCategoryTypes)                                
        
        return {                        
            categoryTypes: data,
        }
    }

    componentDidMount () {                        
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.setState({
            display: "flex"
        })
    }  
    
    componentWillUnmount () {        
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    getTags = async (from, to, isVisible) => {

        // Don't run if the loader is hidden
        if (!isVisible) { return }

        const queryForTags = '*[_type == "categoryType" && _id == $categoryTypeId && !(_id in path("drafts.**"))] | order(name asc) {' +    
            '"numberOfTags": count(tags),' +
            '"tags": tags[]->{' +
                '"id": _id,' +
                'name,' +
                '"numberOfGameshots": count(*[_type == "gameshot" && references(^._id) && !(_id in path("drafts.**"))]),' +            
                '"recentGameshots": *[_type == "gameshot" && references(^._id) && !(_id in path("drafts.**"))] | order(_createdAt desc) {' +
                    '"img": {' +
                        '"url": image.asset->url,' + 
                        '"aspectRatio": image.asset->metadata.dimensions.aspectRatio,' +
                    '},' +
                    '"video": {' +
                        '"url": video.asset->url,' +
                        '"format": video.format,' +            
                    '},' +
                    '"palette": image.asset->metadata.palette' +                                            
                '} [0...3]'+            
            '} [$from...$to]' + 
        '} [0]'

        const data = await sanity.fetch(queryForTags, {from: from, to: to, categoryTypeId: this.state.currentCategoryTypeId})

        this.setState((prevState) => ({
            tags: prevState.tags.concat(data.tags),
            numberOfLoadedTags: prevState.numberOfLoadedTags + data.tags.length,
            loadMoreTags: data.numberOfTags == prevState.numberOfLoadedTags + data.tags.length ? false : true,
        }))
    }
    
    restartTags () {
        this.setState({
            currentCategoryTypeId: this.props.url.query.categoryTypeId,
            tags: [],
            numberOfLoadedTags: 0,
            loadMoreTags: true,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.url.query.categoryTypeId !== prevState.currentCategoryTypeId) {
            this.restartTags()
        }
    }

    updateWindowDimensions() {
        this.setState({ 
            windowWidth: window.innerWidth,             
        })
    }
 
    render() {

        const style = {                        
            categoryTypeItem: {
                height: 36,
            },
            categoryTypeItemLink: {                
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                height: "100%",                 
                opacity: 0.4,                
            },
            categoryTypeItemLinkActive: {
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                height: "100%",                 
                color: theme.colors.fontMain,               
            }            
        }

        const widthThumbCategory = this.state.windowWidth > theme.breakpoints.fullWidthLayout ? (theme.sizes.thumbCategoryWidth + "px") : "100%"

        const thumbsOfCategories = this.state.tags.map((category) =>
            <ThumbCategory 
                id={category.id}
                key={category.id} 
                name={category.name}
                numberOfGameshots={category.numberOfGameshots}
                recentGameshots={category.recentGameshots}
                width={widthThumbCategory}
            />
        )

        const menuCategoryTypes = this.props.categoryTypes.map((categoryType, index) =>
            <li key={categoryType.id} style={style.categoryTypeItem}>                   
                <Link 
                    prefetch passHref
                    as={'/categories/' + categoryType.id}
                    href={'/categories?categoryTypeId=' + categoryType.id}
                >
                    <CategoryTypeItemLink opacity={categoryType.id == this.props.url.query.categoryTypeId ? theme.colors.fontMain : 0.4}>
                        {categoryType.name}
                    </CategoryTypeItemLink>                                    
                </Link>
            </li>
        )

        return (
            <Page 
                context="categories" 
                isHeaderImageShown={false}                 
                activeNavItem={"categories"}>
                <Head>
                    <title>Categories – GamesWatch</title>    
                    <meta name="description" content="Categories – GamesWatch"></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={theme.url.metaImage}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content="Categories – GamesWatch"></meta>
                    <meta name="twitter:image" content={theme.url.metaImage}></meta>                                    
                </Head>
                <DivContainer display={this.state.display}>
                    <UlMenu>
                        {menuCategoryTypes}                    
                    </UlMenu>                
                    <DivThumbnailsContainer>
                        <Thumbnails>
                            {thumbsOfCategories}
                        </Thumbnails>    
                        {
                            this.state.loadMoreTags &&
                                <VisibilitySensor
                                    onChange={(e) => this.getTags(this.state.numberOfLoadedTags, this.state.numberOfLoadedTags + theme.variables.numberOfTagsToGet, e)}
                                    intervalDelay={800}
                                >
                                    <DivLoader>                                
                                        <img src="/static/icons/loader.svg" />
                                    </DivLoader>  
                                </VisibilitySensor>
                        }    
                    </DivThumbnailsContainer>
                </DivContainer>
            </Page>
        )
    }
}