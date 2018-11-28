import Autosuggest from 'react-autosuggest'
import theme from "../utils/theme";
import Router from 'next/router'
import sanity from '../lib/sanity'

const queryForSearchResults = 
    '{' +
        '"games": *[_type == "game" && name match $query && !(_id in path("drafts.**")) ] {' +
            'name,' +
            '"id": _id,' +
            '"type": _type' +
        '} | order(name asc) [0...4],' +
        '"tags": *[_type == "tag" && name match $query && !(_id in path("drafts.**")) ] {' +
            'name,' +
            '"id": _id,' +
            '"type": _type' +
        '} | order(name asc) [0...4]' +
    '}'

export default class Search extends React.Component {    

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            test: null,
        }
    }    

    componentDidMount () {
        Router.prefetch('/tag')
        Router.prefetch('/game')
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        })
    }

    escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }

    getSuggestions = async ({value}) => {
        
        const escapedValue = this.escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
          return [];
        }
              
        const smallEscapedValue = escapedValue.toLowerCase()

        const data = await sanity.fetch(queryForSearchResults, {query: smallEscapedValue + "*"})

        const searchResults = [
            {
                title: "games",
                searchResults: data.games
            }, {
                title: "tags",
                searchResults: data.tags
            }
        ]
        
        this.setState({
            suggestions: searchResults.filter(section => section.searchResults.length > 0)
        })        
    }
    
    getSuggestionValue = (suggestion) => suggestion.name

    getSectionSuggestions = (section) => section.searchResults
    
    renderSuggestion = (suggestion) => (        
        <div             
            style={{
                display: "flex", 
                flexDirection: "row", 
                alignItems: "center",
                height: "100%",
                paddingLeft: 12,
                cursor: "pointer",
            }}>
            {suggestion.name}
        </div>        
    )

    renderSectionTitle = (section) => ( null )

    onSuggestionsFetchRequested = (value) => {
        this.getSuggestions(value)
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }
    
    onSuggestionSelected = (event, {suggestion}) => {        
        if (suggestion.type == "game") {        
            const href = '/game?id=' + suggestion.id        
            const as = '/game/' + suggestion.id        
            Router.push(href, as)
        } else if (suggestion.type == "tag") {
            const href = '/tag?id=' + suggestion.id        
            const as = '/tag/' + suggestion.id        
            Router.push(href, as)
        }
    }

    render () { 
        
        const style = {
            search: {
                flexGrow: 2,
                height: theme.sizes.heightInputSearch,
            },            
        }

        const autosuggestTheme = {
            container: {
                width: "100%",
                height: "100%",                
            },
            input: {
                width: "100%",
                height: "100%",
                backgroundColor: this.props.isHeaderImageShown ? "white" : "rgba(0, 0, 0, 0.08)",
                border: "none",
                borderRadius: 4,
                fontSize: theme.fontSizes.s,
                paddingLeft: 16,
                color: theme.colors.fontSecondary,
                fontFamily: "Neurial Grotesk",
            },
            inputOpen: {
                borderRadius: "4px 4px 0px 0px",                
            },
            inputFocused: {
                outline: "none",                
                color: theme.colors.fontMain,
            },
            suggestionsContainer: {
                backgroundColor: "#fff",                
                borderRadius: 4,    
                zIndex: 1000,
                position: "relative",        
            },
            suggestionsContainerOpen: {
                border: "1px solid #ddd",
                borderRadius: "0px 0px 4px 4px",                
            },
            suggestion: {
                height: 36,
                fontSize: theme.fontSizes.s,            
            },
            suggestionHighlighted: {
                backgroundColor: "rgba(0,0,0,0.06)"
            }
        }

        const {value} = this.state

        const inputProps = {
            placeholder: "Search",
            value,
            onChange: this.onChange,
            spellCheck: false
        }

        return (
            <div style={style.search}>
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    theme={autosuggestTheme}
                    highlightFirstSuggestion={true}
                    onSuggestionSelected={this.onSuggestionSelected}                    
                    multiSection={true}                    
                    renderSectionTitle={this.renderSectionTitle}
                    getSectionSuggestions={this.getSectionSuggestions}
                />
            </div>
        )
    }  
}
    
