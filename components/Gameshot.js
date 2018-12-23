import styled from 'styled-components'
import TagToken from './TagToken'
import theme from '../utils/theme'
import ThumbGame from '../components/ThumbGame'
var isRetina = require('is-retina')

const DivGameshot = styled.div`
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DivMediaWrapperOuter = styled.div`
    width: ${props => props.width}px;
    @media (max-width: ${props => props.width}px) {
        width: 100%;          
    }
`

const DivMediaWrapper = styled.div`
    background-color: ${theme.colors.gameshotTemp};
    text-align: center;      
    width: 100%;
    padding-bottom: ${props => props.paddingBottom}%;
    box-sizing: border-box;        
    position: relative;
`

const MediaImg = styled.img`
    width: 100%;    
    height: auto;
    background-color: ${theme.colors.gameshotTemp};
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
`

const DivMetadata = styled.div`    
    width: 100%;
    box-sizing: border-box;
    max-width: 680px;    
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: ${theme.sizes.gapVerticalPage}px;
    padding-right: ${theme.sizes.gapVerticalPage}px;    
`

const GameshotName = styled.p`
    font-size: ${theme.fontSizes.m}px;
`

const DivTags = styled.div`
    margin-top: 24px;
    margin-bottom: -8px;
`

 const Platform = styled.p`
    margin-top: 24px;
    font-size: ${theme.fontSizes.s}px;
    color: ${theme.colors.fontSecondary};
 `

export default class Gameshot extends React.Component {            
    
    
    render () {              

        const { device, game, id, media, name, platform } = this.props.gameshot                        

        const tags = this.props.gameshot.tags.map((tag, index) =>            
            <TagToken 
                tag={tag}                 
                key={index}
            />
        )    
        
        const styles = {
            video: {                
                backgroundColor: theme.colors.gameshotTemp,
                position: "absolute",
                top: 0, bottom: 0, left: 0, right: 0
            }
        }
        
        let picWidth = media.img.aspectRatio < 1 ? 640*(1+isRetina()) : 1000*(1+isRetina())                      

        return (                

            <DivGameshot key={id}>                
                
                {/* MEDIA */}
                                
                    <DivMediaWrapperOuter width={media.img.aspectRatio < 1 ? 640 : 1000}>
                        <DivMediaWrapper                                                        
                            paddingBottom={100/media.img.aspectRatio}
                        >
                            {Object.keys(media.video).length !== 0 ? (                             
                                // either show video...
                                <video 
                                    autoPlay loop muted playsInline disableremoteplayback="true"
                                    key={media.video.url}                                 
                                    poster={media.img.url}
                                    style={styles.video}
                                    width="100%"
                                    height="auto"
                                >
                                    <source src={media.video.url} type="video/mp4"/>                        
                                </video> 
                            ) : (                                         
                                // ...or image                                                            
                                <picture>
                                    <source srcSet={media.img.url + "?fm=webp" + "&w=" + picWidth + "&fit=max"} type="image/webp"/>
                                    <source srcSet={media.img.url + "?fm=png"  + "&w=" + picWidth + "&fit=max"} type="image/png"/>
                                    <MediaImg 
                                        src={media.img.url}                                                                 
                                        alt={name}                                        
                                    />                                
                                </picture>                                   
                            )}                                           
                        </DivMediaWrapper> 
                    </DivMediaWrapperOuter>                                    

                {/* Metadata */}
                
                <DivMetadata>

                    <GameshotName>{name}</GameshotName>
                    
                    <ThumbGame 
                        id={game.id}
                        height={68}
                        key={game.id}                          
                        layout={"horizontal"}
                        media={game.media}
                        name={game.name}
                        numberOfGameshots={game.numberOfGameshots}                                                     
                        marginTop={20}
                        showTitle={true}
                        width={"auto"}                                                        
                    />                                        

                    <DivTags>{tags}</DivTags>                    
                    
                    <Platform>{platform.name}&nbsp;&nbsp;•&nbsp;&nbsp;{device.name}</Platform>

                </DivMetadata>

            </DivGameshot>
        )
    }
}