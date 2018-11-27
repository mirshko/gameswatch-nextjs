import isRetina from 'is-retina'
import theme from "../utils/theme";
import styled from 'styled-components'

const Div = styled.div`
    display: block;
    background-color: ${theme.colors.tint};
    height: ${theme.sizes.heightHeaderImage}px;    
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        height: ${theme.sizes.heightHeaderImage + theme.sizes.menuHeight}px;
        height: ${theme.sizes.heightHeaderImage - 60}px;
    }
`
const Image = styled.img`    
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Gradient = styled.div`
    width: 100%;
    height: ${theme.sizes.menuHeight * 2}px;
    background-image: linear-gradient(rgba(0,0,0,0.54), rgba(0,0,0,0));
    position: absolute;
    top: 0;    
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        height: ${theme.sizes.menuHeight * 4}px;
    }
`

export default class HeaderImage extends React.Component {    
    
    render () { 
        
        const imageScale = 1 + isRetina()
        
        return (
            <Div>
                <picture>
                    {/* webp */}
                    <source 
                        media="(max-width: 360px)"
                        srcSet={this.props.imageUrl + "?w=" + 360 * imageScale + "&fm=webp"} 
                        type="image/webp"
                    />
                    <source 
                        media="(max-width: 768px)"
                        srcSet={this.props.imageUrl + "?w=" + 768 * imageScale + "&fm=webp"} 
                        type="image/webp"
                    />
                    <source                         
                        srcSet={this.props.imageUrl + "?w=" + 1280 * imageScale + "&fm=webp"} 
                        type="image/webp"
                    />
                    {/* png */}
                    <source 
                        media="(max-width: 360px)"
                        srcSet={this.props.imageUrl + "?w=" + 360 * imageScale + "&fm=png"} 
                        type="image/png"
                    />
                    <source 
                        media="(max-width: 768px)"
                        srcSet={this.props.imageUrl + "?w=" + 768 * imageScale + "&fm=png"} 
                        type="image/png"
                    />
                    <source 
                        srcSet={this.props.imageUrl + "?w=" + 1280 * imageScale + "&fm=png"}                         
                        type="image/png"
                    />
                    <Image src={this.props.imageUrl}/>
                </picture>
                <Gradient></Gradient>
            </Div>
        )
    }
}
