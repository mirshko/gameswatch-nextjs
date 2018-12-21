const theme = {
    breakpoints: {
        fullWidthLayout: 480,
        breakTheMenu: 600,
    },
    colors: {
        fontSecondary: "rgba(0,0,0,0.54)",
        fontMain: "rgba(0,0,0,0.87)",
        gameshotTemp: "#F7F7F7",
        tint: "#4FFFB5",
    },
    fonts: {
        main: "SF Pro Text"
    },
    fontSizes: {
        s: 15, 
        m: 17,        
        xl: 20,
        xxl: 24,
        xxxl: 36,
    },
    opacities: {
        hoverOnImage: 0.9,
    },
    sizes: {
        menuHeight: 72,
        heightMenuShrank: 72 * 2,
        thumbCategoryWidth: 360,
        heightHeaderImage: 300, 
        heightInputSearch: 42,       
        heightThumbTag: 180,
        heightGameThumbnailInGameshot: 68,
        gapHorizontalThumbCategory: 20,
        gapHorizontalThumbGame: 20,
        gapHorizontalThumbGameshot: 20,
        gapVerticalThumbCategory: 40,
        gapVerticalThumbGame: 30,
        gapVerticalThumbGameshot: 32,
        gapVerticalThumbTag: 40,
        gapVerticalPage: 20,
        maxWidthModalGameshot: 1040, 
        widthThumbGame: 310,
        widthThumbGameshot: 360,        
    },    
    url: {
        metaImage: "https://cdn.sanity.io/images/foij3hbc/production/0dabbb11d32002fd086386468807c8dc51cde868-800x600.png",
    },
    variables: {
        numberOfGameshotsToGet: 30, // 30
        numberOfGamesToGet: 42, // 8
        numberOfTagsToGet: 36,
    }
}

export default theme