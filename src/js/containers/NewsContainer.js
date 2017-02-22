import React from "react";
import ReactDOM from "react-dom"
import {connect} from 'react-redux'

import NewsFeed from "../components/NewsFeed"

import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider';
import {loadInitialData} from  '../actions/action'

import { graphql } from 'react-apollo'
import gql from "graphql-tag"

// import {List} from "immutable"

const mapStateToProps = (state = {}) => {
    // console.dir(state)
    return {...state};
};

let headStyle = {
    fontFamily: "'Roboto', sans-serif",
    color: '#00BCD4',
	textAlign:"center",	
}

let sourceStyle = {
	fontFamily: "'Roboto', sans-serif",
	textAlign:"right",
	paddingRight:10,
	color:"#90CAF9"
}

let progressStyle = {
	paddingLeft:"45%",
	paddingTop:"10%"
}

/******************************************************************************************************************
 *  GraphQL 
 ******************************************************************************************************************/
const MyQuery = gql`query {news {status,source,articles{title,description,urlToImage}}}`

/******************************************************************************************************************
 *  NewsContainer 
 ******************************************************************************************************************/

export  class NewsContainer extends React.Component{
   constructor(props)
   {
	   super(props)
	   const {dispatch,newsReducer} = this.props
	   //dispatch(loadInitialData())
   }

   componentWillUnmount() {

   }

   render(){	
       const {dispatch,newsReducer,data} = this.props
	   const {loading}  = data

	   let renderChild;
	   if (loading){
			renderChild = <CircularProgress size={80} thickness={7} style={progressStyle} />
		}
		else {
			const {articles} = data.news
			renderChild = <NewsFeed news={articles}  />
		}

		return (
			<div >
				<div style={{backgroundColor:"#1A237E"}}>
					<h1 style={headStyle}>News Feed from Google</h1>
					<h4 style={sourceStyle}>sourced from newsapi.org</h4>
					<Divider/>
				</div>
				{renderChild}		
			</div>
		);
	}
}

const NewsContainerWithData = graphql(MyQuery)(NewsContainer)
export default  connect(mapStateToProps)(NewsContainerWithData)
// export default  connect(mapStateToProps)(NewsContainer)
