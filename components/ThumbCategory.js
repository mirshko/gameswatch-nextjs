import isRetina from 'is-retina'
import Link from 'next/link'
import styled from 'styled-components'
import theme from '../utils/theme'

const borderRadius = 4

const DivThumbnail = styled.div`
    width: ${props => props.width};
    margin-bottom: ${theme.sizes.gapVerticalThumbCategory}px;   
    margin-left: ${theme.sizes.gapHorizontalThumbCategory}px;             
`

const LinkThumbnail = styled.a`
    display: block;
    cursor: pointer;
    :hover {
        .overlay {
            opacity: 0.1;
        }        
    }
`

const DivImages = styled.div`
    width: 100%; 
    height: auto; 
    display: flex;
    flex-direction: row;                
`

const ImgWrapper = styled.div`
    position: relative;
    width: ${props => props.width};
    height: ${props => props.height};
    background: ${theme.colors.tint};     
    margin-top: ${props => props.marginTop}; 
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;   
    border-top-left-radius: ${props => props.borderTopLeftRadius}px;
    border-top-right-radius: ${props => props.borderTopRightRadius}px;
    border-bottom-left-radius: ${props => props.borderBottomLeftRadius}px;
    border-bottom-right-radius: ${props => props.borderBottomRightRadius}px;    
`

const Overlay = styled.div`
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    display: block;
    background: black;
    opacity: 0;
    width: 100%;
    height: 100%;    
`

const Img = styled.img`
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    
`   

const CategoryName = styled.p`
    font-size: ${theme.fontSizes.xl}px;
    font-Weight: 700;
    margin-top: 16px;
`

export default class ThumbCategory extends React.Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            imageScale: 1
        }                    
    }
    
    componentDidMount () {
        this.setState({
            imageScale: 1 + isRetina()
        })
    }  

    render () {                
        
        let src0 = "https://cdn.sanity.io/images/foij3hbc/production/384d0123e630c835bcac42e214aae59df3ca60b7-2x2.png?"
        let src1 = "https://cdn.sanity.io/images/foij3hbc/production/384d0123e630c835bcac42e214aae59df3ca60b7-2x2.png?"
        let src2 = "https://cdn.sanity.io/images/foij3hbc/production/384d0123e630c835bcac42e214aae59df3ca60b7-2x2.png?"

        if (this.props.recentGameshots[0]) {
            src0 = this.props.recentGameshots[0].img.url + "?w=" + 300 * this.state.imageScale + "&h=" + 300 * this.state.imageScale + "&fit=crop&crop=center"
        }

        if (this.props.recentGameshots[1]) {
            src1 = this.props.recentGameshots[1].img.url + "?w=" + 150 * this.state.imageScale + "&h=" + 150 * this.state.imageScale + "&fit=crop&crop=center"
        }

        if (this.props.recentGameshots[2]) {
            src2 = this.props.recentGameshots[2].img.url + "?w=" + 150 * this.state.imageScale + "&h=" + 150 * this.state.imageScale + "&fit=crop&crop=center"
        }

        const style = {                                  
            numberOfGameshots: {
                fontSize: theme.fontSizes.s,
                marginTop: 8,
                color: theme.colors.fontSecondary,
            },            
            thumbnailImages_right: {
                width: "30%", 
                height: 220,
                marginLeft: 5,
                display: "flex",
                flexDirection: "column",
            }                                                      
        }                
        
        const videoThumbnail = (gameshot) => {
            return <video 
                autoPlay loop muted playsInline disableremoteplayback="true"  
                width={videoWidth(gameshot)} 
                height={videoHeight(gameshot)}
            >
                <source src={gameshot.video.url} type="video/mp4"/>                        
            </video> 
            
        }
        
        const videoWidth = (gameshot) => {
            return gameshot.img.aspectRatio>1 ? "auto" : "100%"
        }
        const videoHeight = (gameshot) => {
            return gameshot.img.aspectRatio>1 ? "100%" : "auto"
        }
        
        const name = this.props.name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');        
            
        const thereIsVideo = (gameshot) => {
            return Object.keys(gameshot.video).length !== 0
        }         

        return (
            <DivThumbnail width= {this.props.width}>
                <Link 
                    prefetch passHref
                    href={'/tag?id=' + this.props.id}
                    as={'/tag/' + this.props.id}
                > 
                    <LinkThumbnail>

                        {/* Images */}

                        <DivImages>
                            <ImgWrapper
                                width="70%"      
                                height="220px"                                
                                borderTopLeftRadius={borderRadius}                                                
                                borderBottomLeftRadius={borderRadius}
                            >                                
                                {/* Proceed only if there are some recent gameshots */}
                                {this.props.recentGameshots.length !== 0 &&
                                    thereIsVideo(this.props.recentGameshots[0]) ? (                                         
                                        // video
                                        videoThumbnail(this.props.recentGameshots[0])
                                    ) : (
                                        // image
                                        <picture>
                                            <source srcSet={src0 + "&fm=webp"} type="image/webp" />
                                            <source srcSet={src0 + "&fm=png"}  type="image/png"  />
                                            <Img src={src0} />
                                        </picture>                                                                                                        
                                    )                                                                         
                                } 
                                {/* Overlay */}
                                <Overlay className="overlay" />                                          
                            </ImgWrapper>                 
                            <div style={style.thumbnailImages_right}>
                                <ImgWrapper
                                   width="100%"      
                                   height="105px"                                   
                                   borderTopRightRadius={borderRadius}                                                                                   
                                >
                                    {this.props.recentGameshots[1] &&
                                        thereIsVideo(this.props.recentGameshots[1]) ? (
                                            // video
                                            videoThumbnail(this.props.recentGameshots[1])
                                        ) : (
                                            // image
                                            <picture>
                                                <source srcSet={src1 + "&fm=webp"} type="image/webp" />
                                                <source srcSet={src1 + "&fm=png"}  type="image/png"  />
                                                <Img src={src1}/>
                                            </picture> 
                                        )
                                    } 
                                    {/* Overlay */}
                                    <Overlay className="overlay" /> 
                                </ImgWrapper>
                                <ImgWrapper
                                    width="100%"      
                                    height="110px"                                    
                                    marginTop="5px"
                                    borderBottomRightRadius={borderRadius}
                                >
                                    {
                                        this.props.recentGameshots[2] &&
                                            thereIsVideo(this.props.recentGameshots[2]) ? (
                                                // video
                                                videoThumbnail(this.props.recentGameshots[2])
                                            ) : (
                                                // image
                                                <picture>
                                                    <source srcSet={src2 + "&fm=webp"} type="image/webp" />
                                                    <source srcSet={src2 + "&fm=png"}  type="image/png"  />
                                                    <Img src={src2}/>
                                                </picture> 
                                            )
                                    }   
                                    {/* Overlay */}
                                    <Overlay className="overlay" />           
                                </ImgWrapper>                                                   
                            </div>
                        </DivImages>

                        {/* Text */}

                        <CategoryName>{name}</CategoryName>
                        <p style={style.numberOfGameshots}>{this.props.numberOfGameshots} gameshots</p>

                    </LinkThumbnail>
                </Link>
            </DivThumbnail>
        )
    }
}