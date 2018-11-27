import styled, { keyframes } from 'styled-components'
import theme from '../utils/theme'
var Color = require('color')

const AButton = styled.a`
    line-height: 64px;
    display: inline-block;
    background-color: ${props => props.backgroundColor};
    border: ${props => props.border};
    border-radius: 4px;
    padding-right: 24px;
    padding-left: 24px;
    font-weight: 600;
    margin-top: ${props => props.marginTop}px;
    :hover {
        /* background-color: ${Color(theme.colors.tint).darken(0.24).hex()}; */
        background-color: ${props => props.backgroundColorHover};
        border: ${props => props.borderHover};
        box-shadow: ${props => props.boxShadowHover};
    }
` 

export default class Button extends React.Component {    
    
    render () {   
        
        let backgroundColor
        let backgroundColorHover
        let border
        let borderHover   
        let boxShadowHover     
        
        switch (this.props.emphasis) {
            case "main":
                backgroundColor = theme.colors.tint
                break
            case "secondary":
                backgroundColor = "white"
                break
        }
        
        switch (this.props.emphasis) {
            case "main":
                backgroundColorHover = "#42F7AB"
                break
            case "secondary":
                backgroundColor = "white"
                break
        }

        switch (this.props.emphasis) {
            case "main":
                border = ""
                break
            case "secondary":
                border = "1px solid #ccc"
                break
        }

        switch (this.props.emphasis) {
            case "main":
                borderHover = ""
                break
            case "secondary":
                borderHover = "1px solid #aaa"
                break
        }        
        
        switch (this.props.emphasis) {
            case "main":
                boxShadowHover = ""
                break
            case "secondary":
                boxShadowHover = "0px 2px 3px rgba(0, 0, 0, 0.1)"
                break
        }        

        return (
            
            <AButton 
                href={this.props.href} 
                target={this.props.target} 
                backgroundColor={backgroundColor}
                backgroundColorHover={backgroundColorHover}
                border={border}
                boxShadowHover={boxShadowHover}
                borderHover={borderHover}
                marginTop={this.props.marginTop}
            >
                {this.props.children}
            </AButton>
        )
    }
}