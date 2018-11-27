import HeaderImage from '../components/HeaderImage'
import HeaderTitle from '../components/HeaderTitle'

export default class Header extends React.Component {    
    
    render () {
        
        const context = this.props.context
        
        return (
            
            <div className="header">
                
                {context == "home" &&
                    <div>
                        <HeaderTitle 
                            title="Games, curated."
                            subtitle="Game references for fans and game creators alike."
                            isHeaderImageShown={false}
                        />
                    </div>
                }
                
                {context == "games" &&
                    <div>
                        <HeaderTitle 
                            title="Games"
                            isHeaderImageShown={false}
                        />
                    </div>
                }
                
                {context == "game" &&
                    <div>
                        <HeaderImage 
                            imageUrl={this.props.game.urlImgHeader}
                        />
                        <HeaderTitle 
                            title={this.props.game.name} 
                            subtitle={this.props.game.numberOfGameshots + ' gameshots'}
                            isHeaderImageShown={true}
                        />
                    </div>
                }

                {context == "categories" &&
                    <div>
                        <HeaderTitle 
                            title="Categories"
                            isHeaderImageShown={false}
                        />   
                    </div>
                } 
                
                {context == "tag" &&
                    <div>
                        <HeaderTitle 
                            title={this.props.tag.name} 
                            subtitle={this.props.tag.numberOfGameshots + ' gameshots'}
                            isHeaderImageShown={false}
                        />
                    </div>
                }                
            </div>
        )
    }
}