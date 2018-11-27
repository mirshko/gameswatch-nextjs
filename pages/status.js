import sanity from '../lib/sanity'
import styled from 'styled-components'
import theme from '../utils/theme'

const Container = styled.div`
    padding: 20px;
`

const Td = styled.td`
    padding: 4px;
    text-align: ${props => props.textAlign};
`

const Note = styled.p`
    color: ${theme.colors.fontSecondary};
    margin-top: 20px;
`

export default class Status extends React.Component {    

    static async getInitialProps(req) {

        const query = '{' +            
            '"numberOfAllGames": count(*[_type == "game" && !(_id in path("drafts.**"))]),' +                                
            '"numberOfAllGameshots": count(*[_type == "gameshot" && !(_id in path("drafts.**"))]),' +                         
            '"numberOfAllTags": count(*[_type == "tag" && !(_id in path("drafts.**"))]),' +                                       
        '}'                        
        
        const data = await sanity.fetch(query)

        return {
            numberOfAllGameshots: data.numberOfAllGameshots,
            numberOfAllGames: data.numberOfAllGames,
            numberOfAllTags: data.numberOfAllTags,
        }
    }

    render() {   
        
        return (
            <Container>                
                <table>
                    <tbody>
                        <tr>
                            <Td textAlign="right">{this.props.numberOfAllGameshots}</Td>
                            <Td textAlign="left">gameshots</Td>
                        </tr>                        
                        <tr>
                            <Td textAlign="right">{this.props.numberOfAllTags}</Td>
                            <Td textAlign="left">tags</Td>
                        </tr>
                        <tr>
                            <Td textAlign="right">{this.props.numberOfAllGames}</Td>
                            <Td textAlign="left">games</Td>
                        </tr>
                    </tbody>                
                </table>                
                <Note>Drafts not included in the count.</Note>
                {/* <Link prefetch href='/'>
                    <a href="">Back Home</a>
                </Link> */}
                
            </Container>
        )
    }
}