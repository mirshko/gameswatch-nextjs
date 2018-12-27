import Head from 'next/head'
import Button from '../components/Button'
import Page from '../components/Page'
import styled from 'styled-components'
import Wrapper from '../components/Wrapper';
import theme from '../utils/theme'

const breakpointForTwoColumns = 767

const Container = styled.div`
    width: 100%;                
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 180px;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        padding-top: 220px;        
    }
`

const DivHeader = styled.div`
    display: flex;
    flex-direction: column;    
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
`

const Headline = styled.h1`
    text-align: center;
    font-size: 40px;
    line-height: 120%;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        font-size: 36px;
    }
`

const Subheadline = styled.p`
    text-align: center;
    max-width: 700px;
    font-size: ${theme.fontSizes.xxl}px;
    line-height: 160%;
    margin-top: 50px;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        font-size: ${theme.fontSizes.xl}px;
    }
`

const DivSections = styled.div`
    display: flex;
    flex-direction: row;  
    margin-top: 140px; 
    @media (max-width: ${breakpointForTwoColumns}px) {     
        flex-direction: column;
        div:nth-child(2) {
            margin-top: 100px;
        }
    }
`

const DivSection = styled.div`
    width: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;    
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
    @media (max-width: ${breakpointForTwoColumns}px) {         
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
    }    
`

const DivSectionInner = styled.div`
    max-width: 480px;        
`

const SectionHeadline = styled.h2`
    margin-top: 24px;
`

const SectionParagraph = styled.p`
    margin-top: 20px;
    font-size: ${theme.fontSizes.m}px;
    line-height: 160%; 
`

const DivFooter = styled.div`
    text-align: center;
    font-size: ${theme.fontSizes.xxl}px;  
    line-height: 140%;  
    margin-top: 140px;
    margin-bottom: 140px;
    a {
        border-bottom: 3px solid #00E484;
        :hover {
            border-bottom-color: #00D77D;
        }
    }
`

export default class About extends React.Component {
    
    render() {                              

        return (
            <Page 
                context="about"                 
                isHeaderImageShown={false}                 
                activeNavItem={"about"}>
                <Head>
                    <title>GamesWatch – About</title>    
                    <meta name="description" content="GamesWatch – About"></meta>
                    <meta name="keywords" content="game,games,design,gaming,game design"></meta>
                    <meta name="author" content="Marek Minor"></meta>   
                    <meta property="og:image" content={theme.url.metaImage}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:description" content="GamesWatch – About"></meta>
                    <meta name="twitter:image" content={theme.url.metaImage}></meta>
                </Head>

                <Container>
                    <Wrapper
                        maxWidth={1280}
                        breakpointForTurningOnVerticalPadding={640}                            
                    >

                        <DivHeader>
                            <Headline>Showcasing the amazing world of games.</Headline>
                            <Subheadline>I find games amazing and want to shine a spotlight on them. Right now this is a reference website for fans and game creators alike, but my goal is to make this a bigger and better games-related platform for everyone.</Subheadline>
                        </DivHeader>
                        
                        <DivSections>
                            <DivSection>
                                <DivSectionInner>
                                    <img src="/static/img/about_instagram.svg"></img>
                                    <SectionHeadline>Curious?</SectionHeadline>
                                    <SectionParagraph>I'm posting tidbits of game trivia regularly on the GamesWatch Instagram account.</SectionParagraph>
                                    <Button 
                                        emphasis="secondary" 
                                        href="https://www.instagram.com/gameswatch/" 
                                        target="_blank"
                                        marginTop={40}
                                    >
                                        To Instagram →
                                    </Button>
                                </DivSectionInner>
                            </DivSection>
                            <DivSection>
                                <DivSectionInner>
                                    <img src="/static/img/about_support.svg"></img>
                                    <SectionHeadline>Show some love!</SectionHeadline>
                                    <SectionParagraph>GamesWatch is my side project that I invest a lot of my free time and money into. If you love games just like me and want to see GamesWatch succeed, please consider <b>buying me a coffee</b>! Even the smallest contribution can go a long way. Thank you!</SectionParagraph>
                                    <Button 
                                        emphasis="main" 
                                        href="https://www.buymeacoffee.com/marekminor" 
                                        target="_blank"
                                        marginTop={40}
                                    >
                                        Buy me a coffee
                                    </Button>
                                </DivSectionInner>
                            </DivSection>                    
                        </DivSections>

                        <DivFooter>
                            <p>Being made now by <a href="https://twitter.com/TristanMinor" target="_blank">Marek Minor</a></p>
                        </DivFooter>
                    
                    </Wrapper>
                </Container>

            </Page>
        )
    }
}