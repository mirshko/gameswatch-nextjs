import sanityClient from '@sanity/client'

console.log(process.env.REACT_APP_SANITY_TOKEN)

export default sanityClient({
    projectId: 'foij3hbc',
    dataset: 'production',
    token: process.env.REACT_APP_SANITY_TOKEN,
    useCdn: true
})