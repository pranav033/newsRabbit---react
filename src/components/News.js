import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country : 'in',
        pageSize : '15',
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string.isRequired,
        pageSize : PropTypes.number.isRequired,
        category : PropTypes.string.isRequired,
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    

    constructor(props){
        super(props);
        console.log("constructor..");
        this.state = {
            articles : [],
            loading : true,
            page : 1,
            totalResults : 0
        }
        document.title = `NewsRabbit - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews(){
        this.props.setProgress(10);
        console.log("cdm");
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=25f4c945cb2c43e9adba74a0ef99d323&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({loading : true});
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({articles : parsedData.articles,totalResults : parsedData.totalResults,
        loading : false});
        this.props.setProgress(100);
    }


    async componentDidMount(){
        // console.log("cdm");
        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=25f4c945cb2c43e9adba74a0ef99d323&page=1&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        // this.setState({loading : true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles : parsedData.articles,totalResults : parsedData.totalResults,
        // loading : false});
        this.updateNews();
    }

    handlePrevClick = async ()=>{
    //     console.log("prev");
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=25f4c945cb2c43e9adba74a0ef99d323&page=${this.state.page-1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    //     this.setState({loading : true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({articles : parsedData.articles,
    //     page: this.state.page-1,
    // loading : false});
    this.setState({page : this.state.page - 1});
    this.updateNews();
    }

    handleNextClick = async ()=>{
    //     console.log("next");
        
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=25f4c945cb2c43e9adba74a0ef99d323&page=${this.state.page+1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    //     this.setState({loading : true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({articles : parsedData.articles,
    //     page: this.state.page+1,
    // loading : false});
    this.setState({page : this.state.page + 1});
        this.updateNews();

    }
    fetchMoreData =  async () => {
        
        console.log("cdm");
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=25f4c945cb2c43e9adba74a0ef99d323&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        // this.setState({loading : true});
        this.setState({page : this.state.page + 1});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : this.state.articles.concat(parsedData.articles),totalResults : parsedData.totalResults,
        loading : false});
      };

  render() {
      
    return (
      <div>
        <h1 className='text-center' style={{margin:'70px 10px'}}>NewsRabbit - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{return <div key={element.url} className="col-md-4"><Newsitem   title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/></div>})}
            
            
        
        
        </div>
        </div>
        </InfiniteScroll>
        
        
       
      </div>
    // <>
    //             <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
    //             {this.state.loading && <Spinner />}
    //             <InfiniteScroll
    //                 dataLength={this.state.articles.length}
    //                 next={this.fetchMoreData}
    //                 hasMore={this.state.articles.length !== this.state.totalResults}
    //                 loader={<Spinner/>}
    //             > 
    //                 <div className="container">
                         
    //                 <div className="row">
    //                     {this.state.articles.map((element) => {
    //                         return <div className="col-md-4" key={element.url}>
    //                             <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
    //                         </div>
    //                     })}
    //                 </div>
    //                 </div> 
    //             </InfiniteScroll>

    //         </>
    )
  }
}

export default News
