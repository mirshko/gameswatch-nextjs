import Header from './Header'
import Menu from './Menu'

export default class Page extends React.Component {    
    
    render () {
        
        return (
            <div className="page">                
                <Menu                     
                    context={this.props.context} 
                    isHeaderImageShown={this.props.isHeaderImageShown}
                    activeNavItem={this.props.activeNavItem}
                />
                <Header 
                    context={this.props.context} 
                    category={this.props.category}                    
                    game={this.props.game} 
                    tag={this.props.tag}                    
                />
                {this.props.children}                
        </div>
        )
    }  
}
    
