import theme from "../utils/theme";
import styled from 'styled-components'

const DivHeader = styled.div`
    text-align: center;    
    padding-top: ${props => props.height}px;
    padding-bottom: 60px;  
    padding-left: ${theme.sizes.gapVerticalPage}px;
    padding-right: ${theme.sizes.gapVerticalPage}px; 
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        padding-top: ${props => props.doubleHeight}px;
    }         
`

const Title = styled.h1`
    font-size: 40px;
    line-height: 1.2;
    font-weight: 700;    
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        font-size: 32px;
    }         
`

const Subtitle = styled.p`
    font-size: 20px;
    margin: 8px auto 0px auto;
    color: ${theme.colors.fontSecondary};
    line-height: 1.5;
    max-width: 700px;    
    @media (max-width: ${theme.breakpoints.fullWidthLayout}px) {
        font-size: 18px;
    }         
`

export default class HeaderTitle extends React.Component {    
    
    render () {                

        return (
            <DivHeader
                height={60 + theme.sizes.menuHeight * !this.props.isHeaderImageShown}
                doubleHeight={60 + theme.sizes.menuHeight * !this.props.isHeaderImageShown * 2}
            >
                <Title>{this.props.title}</Title>
                {this.props.subtitle &&
                    <Subtitle>{this.props.subtitle}</Subtitle>
                }
            </DivHeader>
        )
    }
}