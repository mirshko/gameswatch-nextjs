import Link from 'next/link'
import React from 'react'
import Search from '../components/Search'
import theme from '../utils/theme'
import NavItem from './NavItem';
import styled from 'styled-components'

const DivMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-content: stretch;
    height: ${theme.sizes.menuHeight}px;
    width: 100%;
    position: absolute;
    padding-left: 8px;
    padding-right: 8px;
    z-index: 1;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        height: ${theme.sizes.menuHeight * 2}px;
        flex-direction: column;
    }
`
const DivMenuLeft = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-grow: 1;
    height: 100%;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        width: 100%;
    }
`

const Logo = styled.div`
    height: 28px; 
    width: 195px;
    background-image: url(${props => props.urlLogoComplete});
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
    border-image-width: 0;    
    @media (max-width: ${theme.breakpoints.breakTheMenu + 100}px) {
        background-image: url(${props => props.urlLogoShort});
        width: 30px;
        height: 30px;
    }
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    padding-left: 12px;                
    padding-right: 12px; 
    height: 100%;
    @media (max-width: ${theme.breakpoints.breakTheMenu}px) {
        width: 100%;
        justify-content: space-between;
    }
`

export default class Menu extends React.Component {
    
    render() {

        const style = {                    
            logo: {
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 12,
                paddingBottom: 12,
                marginRight: 12,                 
            }
        }        

        return (
            <DivMenu> 
                <DivMenuLeft>
                    <Link 
                        prefetch 
                        href="/"
                    >
                        <a style={style.logo}>                            
                            <Logo 
                                urlLogoComplete={this.props.isHeaderImageShown ? "/static/icons/logo-complete-invert.svg" : "/static/icons/logo-complete.svg"}
                                urlLogoShort={this.props.isHeaderImageShown ? "/static/icons/logo-short-invert.svg" : "/static/icons/logo-short.svg"}
                            />
                        </a>
                    </Link>
                    <Search                         
                        isHeaderImageShown={this.props.isHeaderImageShown}>
                    </Search>
                </DivMenuLeft>
                <Nav>                                        
                    <NavItem
                        activeNavItem={this.props.activeNavItem}
                        value={"games"}
                        isHeaderImageShown={this.props.isHeaderImageShown}
                        href="/games"
                        title="Games"
                    ></NavItem>                                        
                    <NavItem
                        activeNavItem={this.props.activeNavItem}
                        value={"categories"}
                        isHeaderImageShown={this.props.isHeaderImageShown}
                        href="/categories/e3460957-0043-4f8b-8991-19b4ee5f9868"                        
                        title="Categories"
                    ></NavItem>
                    <NavItem
                        activeNavItem={this.props.activeNavItem}
                        value={"about"}
                        isHeaderImageShown={this.props.isHeaderImageShown}
                        href="/about"
                        title="About"
                        // target="_blank"
                        // rel="noreferrer"
                    ></NavItem>
                </Nav>
            </DivMenu>
        )
    }    
}

