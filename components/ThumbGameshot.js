import theme from "../utils/theme";
var isRetina = require('is-retina')
import styled from 'styled-components'
import TagToken from '../components/TagToken'

const DivThumbnail = styled.div`
    width: ${theme.sizes.widthThumbGameshot}px;    
    margin-left: ${theme.sizes.gapHorizontalThumbGameshot}px;
    margin-bottom: ${theme.sizes.gapVerticalThumbGameshot}px;
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        width: 100%;
        margin-left: 0;
    }
`

const AThumbnail = styled.a`    
    display: block;
    cursor: pointer;
    :hover {
        img, video {
            opacity: ${theme.opacities.hoverOnImage};
        }
        .video, video {
            background-color: transparent;
        }   
        .overlay {
            background: black;          
        }         
    }                 
`

const Overlay = styled.div`    
    z-index: 100;
    border-radius: 6px;                
    display: block;  
    background: transparent;  
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        border-radius: 0px;
    }
`

const DivVideo = styled.div`
    background-color: ${props => props.backgroundcolor};
    border-radius: 4px;                    
    overflow: hidden;
    height: ${props => props.height};
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        border-radius: 0px;
        height: auto;
    }
`

const Img = styled.img.attrs({
    style: ({backgroundColor}) => ({
        backgroundColor,
    })    
})`
    border-radius: 4px;                
    display: table-row;
    opacity: 0.97;
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        border-radius: 0px;
        width: 100%;
        height: auto;
    }
`

const GameDescription = styled.div`
    padding-top: 16px;    

    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        padding-left: 16px;
    }
`

const GameshotName = styled.p`
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};    
    padding-left: 8px;
`

const GameName = styled.p`
    font-size: ${theme.fontSizes.s}px;
    font-weight: 400;  
    color: ${theme.colors.fontSecondary};  
    margin-top: 6px;
    padding-left: 8px;
`

const DivTags = styled.div`
    margin-top: 14px;
    margin-bottom: -8px;  
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        padding-left: 16px;
        padding-right: 16px;
    }
`

export default class ThumbGameshot extends React.Component {        

    render () {                    
        
        let imgWidth = theme.sizes.widthThumbGameshot * ( 1 + isRetina() )        
        const styles = {
            video: {
                display: "table-row",
            }
        }

        return (
            <DivThumbnail className="thumb thumb-gameshot">            

                <AThumbnail onClick={this.props.onClick}>  

                    <Overlay className="overlay">
                        {
                            Object.keys(this.props.gameshot.media.video).length !== 0 ? ( 
                                <DivVideo 
                                    // backgroundColor={this.props.gameshot.media.palette.dominant.background}   
                                    backgroundcolor={theme.colors.tint}                                 
                                    height={theme.sizes.widthThumbGameshot / this.props.gameshot.media.img.aspectRatio}
                                    className={"video"}
                                >
                                    <video 
                                        autoPlay loop muted playsInline disableremoteplayback="true"
                                        width="100%"
                                        height="auto"
                                        style={styles.video}
                                        poster={this.props.gameshot.media.img.url + "?w=" + imgWidth}
                                        backgroundColor={theme.colors.tint}
                                    >
                                        <source src={this.props.gameshot.media.video.url} type="video/mp4"/>                        
                                    </video> 
                                </DivVideo>
                            ) : (
                                <picture>
                                    <source srcSet={this.props.gameshot.media.img.url + "?w=" + imgWidth + "&fm=webp"} type="image/webp"/>
                                    <source srcSet={this.props.gameshot.media.img.url + "?w=" + imgWidth + "&fm=png"} type="image/png"/>
                                    <Img 
                                        src={this.props.gameshot.media.img.url + "?w=" + imgWidth}                             
                                        alt={this.props.gameshot.name}
                                        width={theme.sizes.widthThumbGameshot}
                                        height={theme.sizes.widthThumbGameshot / this.props.gameshot.media.img.aspectRatio}
                                        // backgroundColor={this.props.gameshot.media.palette.dominant.background}
                                        backgroundColor={theme.colors.tint}
                                    ></Img>
                                </picture>
                                
                            )
                        }
                    </Overlay> 
                                                                                             
                        <GameDescription>
                            <GameshotName 
                                fontWeight={this.props.context == "game" ? 400 : 700}
                                fontSize={this.props.context == "game" ? theme.fontSizes.s : theme.fontSizes.m}
                            >
                                {this.props.gameshot.name}
                            </GameshotName>
                            {this.props.context !== "game" &&
                                <GameName>
                                    {this.props.gameshot.game.name}
                                </GameName>
                            }                                                
                        </GameDescription>  

                </AThumbnail>
                
                <DivTags>
                    {this.props.gameshot.tags.map((tag, index) => 
                        <TagToken tag={tag} key={index}/>
                    )}
                </DivTags>                                         

            </DivThumbnail>
        )
    }
}