import Link from 'next/link'
import theme from '../utils/theme'
import styled from 'styled-components'

const AThumbnail = styled.a`    
    display: flex;
    align-items: ${props => props.alignItems};
    flex-direction: ${props => props.flexDirection};
    
    cursor: pointer;    
    :hover img {
        opacity: ${theme.opacities.hoverOnImage};
    }    
`
const Overlay = styled.div`        
    border-radius: 4px;                
    display: block;  
    background: black;  
`
const ImgThumbnail = styled.img`            
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 4px;
    background-color: ${props => props.backgroundColor};                 
    display: table-row;
`

export default class ThumbGame extends React.Component {           

    render () {

        const style = {
            thumb: {
                width: this.props.width,
                marginBottom: this.props.marginBottom,   
                marginLeft: this.props.marginLeft,  
                marginTop: this.props.marginTop, 
                display: "flex",                                                           
            },
            text: {
                paddingLeft: this.props.layout == "horizontal" ? 20 : 0,
                lineHeight: 1.2,                
            },
            name: {
                fontSize: this.props.layout == "horizontal" ? theme.fontSizes.m : theme.fontSizes.m,
                fontWeight: 700,
                marginTop: this.props.layout == "horizontal" ? 0 : 14,
            }, 
            numberOfGameshots: {
                fontSize: theme.fontSizes.s,
                marginTop: 4,
                color: theme.colors.fontSecondary                
            }
        }          

        return (
            <div style={style.thumb}>
                <Link 
                    prefetch passHref
                    as={'/game/' + this.props.id}
                    href={'/game?id=' + this.props.id}
                > 
                    <AThumbnail 
                        alignItems={this.props.layout == "horizontal" ? "center" : ""}
                        flexDirection={this.props.layout == "horizontal" ? "row" : "column"}
                    >  
                        <Overlay>
                            <picture>
                                <source srcSet={this.props.media.imgThumbnail.url + "?fm=webp"} type="image/webp"/>
                                <source srcSet={this.props.media.imgThumbnail.url + "?fm=png"} type="image/png"/>
                                <ImgThumbnail 
                                    src={this.props.media.imgThumbnail.url}
                                    backgroundColor={theme.colors.tint}   
                                    height={this.props.height} 
                                    width={this.props.width}                          
                                ></ImgThumbnail>                        
                            </picture>                            
                        </Overlay>                      
                        {
                            this.props.showTitle &&
                                <div style={style.text}>
                                    <p style={style.name}>{this.props.name}</p>
                                    <p style={style.numberOfGameshots}>{this.props.numberOfGameshots} gameshots</p>
                                </div>
                        }
                    </AThumbnail>
                </Link>
            </div>
        )
    }
}
