import Head from 'next/head'
import Page from '../components/Page'
import React from 'react'
import sanity from '../lib/sanity'
import theme from '../utils/theme'
import SectionHeader from '../components/SectionHeader';
import ThumbGame from '../components/ThumbGame';
import TagToken from '../components/TagToken';
import Gameshots from '../components/Gameshots';
import styled from 'styled-components'
import Wrapper from '../components/Wrapper';

const Container = styled.div`
    width: 100%;                
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const GameThumbnails = styled.div`
    display: inline-flex;                
    flex-wrap: wrap;          
    width: 100%;    
    box-sizing: border-box;
    max-width: ${theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 3}px;
    
    @media (max-width: ${ theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 2 + theme.sizes.gapVerticalPage * 2 }px) {
        padding-left: ${theme.sizes.gapVerticalPage/2}px;
        padding-right: ${theme.sizes.gapVerticalPage/2}px;
    }
`

const GameThumbnailWrapper = styled.div`    
    
    display: block;
    width: 25%;
    margin-bottom: ${theme.sizes.gapHorizontalThumbGame}px;    
    padding-left: ${theme.sizes.gapHorizontalThumbGameshot}px;    
    :first-child, 
    :nth-child(5) {
        margin-left: -${theme.sizes.gapHorizontalThumbGameshot / 2 }px;
    }

    @media (max-width: 640px) {        
        width: 50%;
        :nth-child(odd) {
            margin-left: -${theme.sizes.gapHorizontalThumbGameshot / 2 }px;
        }
    }    
`

// const RecentTags = styled.div`
//     display: flex;
//     flex-direction: row; 
//     flex-wrap: wrap;                  
//     width: 100%; 
//     max-width: ${theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 3}px;
// ` 

export default class Index extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {            
            docTitle: this.props.docTitle            
        }       
        
        this.updateDocTitle = this.updateDocTitle.bind(this) 
    }
    
    static async getInitialProps() {
        
        const query = '{' +                        
            
            '"recentGames": *[_type == "game" && !(_id in path("drafts.**"))] | order(_createdAt desc) {' +
                '"id": _id,' +                        
                '"media": {' +
                    '"imgThumbnail": {' +
                        '"url": img_thumbnail.asset->url,' +                    
                    '},' +                
                    '"palette": { ' +
                        '"dominant": img_thumbnail.asset->metadata.palette.dominant'+
                    '}' +                                            
                '},' +
            '} [0...8],' +

            '"numberOfAllGameshots": count(*[_type == "gameshot" && !(_id in path("drafts.**"))])' +                                

            // '"recentTags": *[_type == "tag" && !(_id in path("drafts.**"))] | order(name asc) {' +
            //     '"id": _id,' +
            //     'name,' +
            //     '"numberOfGameshots": count(*[_type == "gameshot" && references(^._id) && !(_id in path("drafts.**"))])' + 
            // '} [0...10000],' +

        '}'        
            
        const data = await sanity.fetch(query)        

        // let recentTags = data.recentTags.sort( (a, b) => {return b.numberOfGameshots - a.numberOfGameshots})
        // recentTags = recentTags.slice(0, 30)

        return {                     
            recentGames: data.recentGames,                        
            docTitle: "GamesWatch – Games, curated.",
            numberOfGameshots: data.numberOfAllGameshots
            // recentTags: recentTags,
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
    
    render () {               

        const gameThumbnails = this.props.recentGames.map((recentGame, index) =>                        
            <GameThumbnailWrapper
                key={recentGame.id}                                 
            >
                <ThumbGame 
                    id={recentGame.id}
                    key={recentGame.id}                                 
                    media={recentGame.media}
                    width={"100%"}                                        
                    showTitle={false}
                ></ThumbGame>
            </GameThumbnailWrapper>
        )

        // const recentTags = this.props.recentTags.map((recentTag, index) =>
        //     <TagToken 
        //         tag={recentTag} 
        //         onClick={null} 
        //         key={index}
        //     ></TagToken>
        // )        

        return (
            <Page 
                context="home" 
                isHeaderImageShown={false}                 
                activeNavItem="home"
            >        
                <Head>
                    <title>{this.state.docTitle}</title> 
                    <meta name="description" content="Game design, curated."></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={theme.url.metaImage}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content="Game design, curated."></meta>
                    <meta name="twitter:image" content={theme.url.metaImage}></meta>
                </Head>                
                
                <Container>                    
                    
                        {/* Recent Games */}
                        <Wrapper
                            maxWidth={theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 2}
                            breakpointForTurningOnVerticalPadding={theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 2 + theme.sizes.gapVerticalPage * 2}                            
                        >
                            <SectionHeader
                                title="Recent Games"
                                link="See All Games"
                                href="/games"
                                paddingLeft={theme.sizes.gapHorizontalThumbGame}>                    
                            </SectionHeader>                    
                        </Wrapper>
                        <GameThumbnails>
                            {gameThumbnails}
                        </GameThumbnails>
                        
                        {/* Recent Tags */}
                        {/* <Wrapper
                            maxWidth={theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 2}
                            breakpointForTurningOnVerticalPadding={theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 2 + theme.sizes.gapVerticalPage * 2}                            
                        >
                            <SectionHeader
                                title="Most Frequent Tags"
                                link=""
                                href=""   
                                paddingLeft={theme.sizes.gapHorizontalThumbGame}>                                     
                            </SectionHeader>                    
                            <RecentTags>
                                {recentTags}
                            </RecentTags>
                        </Wrapper> */}
                        
                        
                        {/* Recent Gameshots */}
                        <Wrapper
                            maxWidth={theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 2}
                            breakpointForTurningOnVerticalPadding={theme.sizes.widthThumbGameshot * 3 + theme.sizes.gapHorizontalThumbGameshot * 2 + theme.sizes.gapVerticalPage * 2}
                        >
                            <SectionHeader
                                title="Recent Gameshots"
                                link=""
                                href="#"   
                                paddingLeft={theme.sizes.gapHorizontalThumbGame}>                                     
                            </SectionHeader>  
                        </Wrapper>                        
                        <Gameshots                             
                            context="home"
                            docTitle={this.props.docTitle}                            
                            routerPathname="/"
                            routerQueryId=""
                            routerAs="/"
                            updateDocTitle={this.updateDocTitle}                            
                            url={this.props.url}  
                            numberOfGameshots={this.props.numberOfGameshots}                          
                        ></Gameshots> 
                    
                </Container>
            </Page>           
        )
    }
}