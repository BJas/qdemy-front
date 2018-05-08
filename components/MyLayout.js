import Header from './Header/Header';
import Footer from './Footer/Footer';
import Head from 'next/head';
import stylesheet from '../styles/index.scss';
import Data from '../meta.json';

const MyLayout = ({ children, title = 'Qdemy', route, ogTitle = Data[0].index.ogTitle, ogUrl = Data[0].index.ogUrl, ogImage = Data[0].index.ogImage, ogImageWidth = "640", ogImageHeight = "480", description = Data[0].index.description }) => (
	<div className="layout">
		<Head>
	    <title>{ title + ' - Qdemy'}</title>
	    <meta charSet='utf-8' />
	    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
	    <meta name="description" content={ description }/>
    	<meta property="og:type" content="website"/>
	    <meta property="og:url" content={ ogUrl }/>
	    <meta property="og:site_name" content="Dar.kz"/>
	    <meta property="og:title" content={ ogTitle }/>
	    <meta property="og:description" content={ description }/>
	    <meta property="og:image" content={ ogImage }/>
	    <meta property="og:image:width" content={ ogImageWidth }/>
	    <meta property="og:image:height" content={ ogImageHeight }/>
    	<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    	<link rel="shortcut icon" href="../static/logo.png" type="image/png"/>
		<link rel="stylesheet" href="https://video-react.github.io/assets/video-react.css" />
	  </Head>
	  { route !== "index" ? <Header route={route} className="header"/> : null }
	  <div>
	  	<main role="main" className={route !== "index" ? "content" : null}>
			{children}
	  	</main>
	  { route !== "index" ? <Footer route={route} className="footer"/> : null }	  
	  </div>
	</div>
)

export default MyLayout;