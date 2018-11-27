import theme from '../utils/theme'
import styled from 'styled-components'

const DivWrapper = styled.div`
    
    display: block;
    width: 100%;
    max-width: ${props => props.maxWidth}px;
    
    @media (max-width: ${props => props.breakpointForTurningOnVerticalPadding}px) {
        padding-left: ${theme.sizes.gapVerticalPage}px;
        padding-right: ${theme.sizes.gapVerticalPage}px;
    }
`

export default class Wrapper extends React.Component {    
    
    render () {                

        return (    
            <DivWrapper
                maxWidth={this.props.maxWidth}
                breakpointForTurningOnVerticalPadding={this.props.breakpointForTurningOnVerticalPadding}                
            >
                {this.props.children}
            </DivWrapper>
        )
    }  
}
    
