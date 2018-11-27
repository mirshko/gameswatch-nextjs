import Link from 'next/link'
import theme from '../utils/theme'
import styled from 'styled-components'

const TextLink = styled.a`
    padding: 8px 12px;
    font-weight: 400;
    font-size: ${theme.fontSizes.m}px;
    display: inline-block;
    color: ${props => props.color};                
    opacity: ${props => props.opacity};
    cursor: pointer;
    :hover {
        opacity: ${props => props.opacityOnHover};
    }
`

export default class NavItem extends React.Component {    
    
    render () {                    

        return (
            <Link 
                prefetch passHref
                href={this.props.href}
            >
                <TextLink                    
                    target={this.props.target} 
                    rel={this.props.rel}
                    color={this.props.isHeaderImageShown ? "white" : theme.colors.fontMain}
                    opacity={this.props.activeNavItem == this.props.value ? "1" : "0.44"}
                    opacityOnHover={this.props.activeNavItem == this.props.value ? "1" : "0.74"}
                >
                    {this.props.title}
                </TextLink>
            </Link>
        )
    }  
}
    
