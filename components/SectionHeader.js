import Link from 'next/link'
import theme from '../utils/theme'
import styled from 'styled-components'

const TextLink = styled.a`
    font-weight: 500;
    cursor: pointer;
    color: ${theme.colors.fontSecondary};
    padding: 8px;
    :hover {
        color: rgba(0, 0, 0, 0.64);
    }
`

export default class SectionHeader extends React.Component {    
    
    render () {
        
        const styles = {
            sectionHeader: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 36,
                marginBottom: 24,
                width: "100%",                  
            },
            title: {
                textTransform: "uppercase",
                fontSize: theme.fontSizes.s,                
                letterSpacing: 0.5,              
            }
        }        

        return (
            <div style={styles.sectionHeader}>
                <p style={styles.title}>
                    {this.props.title}
                </p>
                <Link 
                    prefetch passHref
                    href={this.props.href}
                >
                    <TextLink>
                        {this.props.link}
                    </TextLink>
                </Link>
            </div>
        )
    }  
}
    
