import Link from 'next/link'
import theme from '../utils/theme'
import styled from 'styled-components'

const Tag = styled.div`
    background-color: #F2F2F2;                                                
    margin-right: 4px;
    margin-bottom: 8px;
    border-radius: 100px;
    font-size: ${theme.fontSizes.s}px;
    display: inline-block;
    :hover {
        background-color: #e8e8e8;
    }
`

const TagText = styled.a`
    color: ${theme.colors.fontSecondary};
    display: block;
    padding: 8px 12px; 
    cursor: pointer;  
    :hover {
        color: rgba(0,0,0,0.64);
    } 
`

export default class TagToken extends React.Component {    
    
    render () {                

        return (    
            <Tag key={this.props.index}>
                <Link 
                    prefetch passHref
                    href={'/tag?id=' + this.props.tag.id}
                    as={'/tag/' + this.props.tag.id}
                > 
                    <TagText onClick={this.props.onClick}>                        
                        {this.props.tag.name}
                    </TagText>
                </Link>
            </Tag>
        )
    }  
}
    
