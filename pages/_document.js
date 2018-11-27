// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  
  static async getInitialProps(ctx) {

    const initialProps = await Document.getInitialProps(ctx)
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()    

    return {...initialProps, ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>     
          {this.props.styleTags}     
            <style dangerouslySetInnerHTML={{__html: `            
              
              @import url("//hello.myfonts.net/count/37c421");

              @font-face {
                font-family: 'Neurial Grotesk';
                src: url('../static/fonts/37C421_0_0.eot');
                src: url('../static/fonts/37C421_0_0.eot?#iefix') format('embedded-opentype'),
                     url('../static/fonts/37C421_0_0.woff2') format('woff2'),
                     url('../static/fonts/37C421_0_0.woff') format('woff'),
                     url('../static/fonts/37C421_0_0.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
              }
               
              @font-face {
                font-family: 'Neurial Grotesk';
                src: url('../static/fonts/37C421_1_0.eot');
                src: url('../static/fonts/37C421_1_0.eot?#iefix') format('embedded-opentype'),
                      url('../static/fonts/37C421_1_0.woff2') format('woff2'),
                      url('../static/fonts/37C421_1_0.woff') format('woff'),
                      url('../static/fonts/37C421_1_0.ttf') format('truetype');
                font-weight: bold;
                font-style: normal;
              }    

              * { 
                  margin: 0;
                  padding: 0;                    
                  box-sizing: border-box;                    
                  color: rgba(0,0,0,0.87);
              }                

              a:link, a:visited {                    
                  text-decoration: none;                    
              }
              body {
                  line-height: 1;                      
                  font-family: 'Neurial Grotesk', -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif;
              }
              ul {
                list-style-type: none;
              }  
               
            `}}/>                            
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>      
            <link rel="apple-touch-icon" sizes="57x57" href="../static/img/favicon/apple-icon-57x57.png"></link>
            <link rel="apple-touch-icon" sizes="60x60" href="../static/img/favicon/apple-icon-60x60.png"></link>
            <link rel="apple-touch-icon" sizes="72x72" href="../static/img/favicon/apple-icon-72x72.png"></link>
            <link rel="apple-touch-icon" sizes="76x76" href="../static/img/favicon/apple-icon-76x76.png"></link>
            <link rel="apple-touch-icon" sizes="114x114" href="../static/img/favicon/apple-icon-114x114.png"></link>
            <link rel="apple-touch-icon" sizes="120x120" href="../static/img/favicon/apple-icon-120x120.png"></link>
            <link rel="apple-touch-icon" sizes="144x144" href="../static/img/favicon/apple-icon-144x144.png"></link>
            <link rel="apple-touch-icon" sizes="152x152" href="../static/img/favicon/apple-icon-152x152.png"></link>
            <link rel="apple-touch-icon" sizes="180x180" href="../static/img/favicon/apple-icon-180x180.png"></link>
            <link rel="icon" type="image/png" sizes="192x192" href="../static/img/favicon/android-icon-192x192.png"></link>
            <link rel="icon" type="image/png" sizes="32x32" href="../static/img/favicon/favicon-32x32.png"></link>
            <link rel="icon" type="image/png" sizes="96x96" href="../static/img/favicon/favicon-96x96.png"></link>
            <link rel="icon" type="image/png" sizes="16x16" href="../static/img/favicon/favicon-16x16.png"></link>
            <link rel="manifest" href="../static/img/favicon/manifest.json"></link>
        </Head>
        <body id="body" className="body_modal_closed">
          <Main />
          <NextScript />
        </body>        
      </html>
    )
  }
}