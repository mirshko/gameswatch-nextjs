import styled, { keyframes } from 'styled-components'
import theme from '../utils/theme';

const breakTheModal = theme.sizes.maxWidthModalGameshot + 160

const slideUpModal = keyframes`
    from {
        margin-top: 60px;
        opacity: 0;
    }
    to {
        margin-top: 20px;
        opacity: 100%;
    }
`

const fadeInOverlay = keyframes`
    from {
        background: rgba(0, 0, 0, 0);
    }
    to {
        background: rgba(0, 0, 0, 0.8);
    }
`

const DivOverlay = styled.div`
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%;
    height: 100%; 
    background: rgba(0, 0, 0, 0.8);
    z-index: 3;
    overflow-y: scroll;                
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${fadeInOverlay} 0.15s ease-in;    
    @media (max-width: ${breakTheModal}px) {
        overflow: hidden;
    }
`

const DivModal = styled.div`    
    background: #fff;
    padding: 20px;
    box-sizing: border-box; 
    margin-top: 20px;
    margin-bottom: 20px;    
    z-Index: 4;
    width: ${theme.sizes.maxWidthModalGameshot}px;
    border-radius: 8px;
    animation: ${slideUpModal} 0.15s ease-in;
    @media (max-width: ${breakTheModal}px) {
        width: 100%;
        height: auto;        
        border-radius: 0;
        margin-top: 0;
        margin-bottom: 0; 
        padding-left: 0;
        padding-right: 0;
        padding-top: ${20 + 40 + 20}px;
        position: absolute;
        bottom: 0;
        top: 0;
        overflow-y: scroll;  
        overflow-x: hidden;  
    }
`

const LinkClose = styled.a`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #fff;
    position: fixed;
    right: 30px;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media (max-width: ${breakTheModal}px) {
        position: absolute;
        right: 20px;
    }
`

const LinkPrevious = styled.a`
    width: 40px;
    height: 40px;                                
    position: fixed;
    left: 20px;
    top: 50%;
    display: ${props => props.display};
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media (max-width: ${breakTheModal}px) {
        display: none;
    }
`

const LinkNext = styled.a`
    width: 40px;
    height: 40px;                               
    position: fixed;
    right: 20px;
    top: 50%;
    display: ${props => props.display};
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export default class Modal extends React.Component {        

    render () {                       
                
        const displayPrevLink = this.props.indexOfGameshotInModal == 0 ? "none" : "flex"
        const displayNextLink = this.props.indexOfGameshotInModal == this.props.numberOfGameshots - 1 ? "none" : "flex"

        return (
            <DivOverlay 
                onClick={this.props.hideModalByClickingOnOverlay} 
                id={"overlay"}
            >
                <LinkPrevious
                    onClick={this.props.handlePrevGameshot}
                    display={displayPrevLink}
                >
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                        <path fill="#fff" d="M9.41421356,12 L15.7071068,18.2928932 C16.0976311,18.6834175 16.0976311,19.3165825 15.7071068,19.7071068 C15.3165825,20.0976311 14.6834175,20.0976311 14.2928932,19.7071068 L7.29289322,12.7071068 C6.90236893,12.3165825 6.90236893,11.6834175 7.29289322,11.2928932 L14.2928932,4.29289322 C14.6834175,3.90236893 15.3165825,3.90236893 15.7071068,4.29289322 C16.0976311,4.68341751 16.0976311,5.31658249 15.7071068,5.70710678 L9.41421356,12 Z" id="arrow_left"></path>                    
                    </svg>                    
                </LinkPrevious>                                
                <LinkNext
                    onClick={this.props.handleNextGameshot}
                    display={displayNextLink}
                >
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                        <path fill="#fff" d="M10.4142136,12 L16.7071068,18.2928932 C17.0976311,18.6834175 17.0976311,19.3165825 16.7071068,19.7071068 C16.3165825,20.0976311 15.6834175,20.0976311 15.2928932,19.7071068 L8.29289322,12.7071068 C7.90236893,12.3165825 7.90236893,11.6834175 8.29289322,11.2928932 L15.2928932,4.29289322 C15.6834175,3.90236893 16.3165825,3.90236893 16.7071068,4.29289322 C17.0976311,4.68341751 17.0976311,5.31658249 16.7071068,5.70710678 L10.4142136,12 Z" id="arrow_right" transform="translate(12.500000, 12.000000) scale(-1, 1) translate(-12.500000, -12.000000) "></path>                    
                    </svg>                    
                </LinkNext>                                                
                <DivModal>
                    <LinkClose onClick={this.props.hideModal}>                     
                        <svg width="24px" height="24px" viewBox="0 0 24 24">                                
                            <path fill="rgba(0,0,0,0.87)" d="M18.295,5.705 L18.295,5.705 C17.9056393,5.31563925 17.2743607,5.31563925 16.885,5.705 L12,10.59 L7.115,5.705 C6.72563925,5.31563925 6.09436075,5.31563925 5.705,5.705 L5.705,5.705 C5.31563925,6.09436075 5.31563925,6.72563925 5.705,7.115 L10.59,12 L5.705,16.885 C5.31563925,17.2743607 5.31563925,17.9056393 5.705,18.295 L5.705,18.295 C6.09436075,18.6843607 6.72563925,18.6843607 7.115,18.295 L12,13.41 L16.885,18.295 C17.2743607,18.6843607 17.9056393,18.6843607 18.295,18.295 L18.295,18.295 C18.6843607,17.9056393 18.6843607,17.2743607 18.295,16.885 L13.41,12 L18.295,7.115 C18.6843607,6.72563925 18.6843607,6.09436075 18.295,5.705 Z" id="close"></path>
                        </svg>
                    </LinkClose>                    
                    {this.props.children}
                </DivModal>
            </DivOverlay>
        )
    }
}