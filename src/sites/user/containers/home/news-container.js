import React from 'react'

import NewsItem from './news-hot-item';
import newsProvider from  '../../../../data-access/news-provider'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
class NewsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            listNews:[]
        }
    }

    componentDidMount(){
        this.getListNews()
    }

    getListNews(){
        newsProvider.getAll().then(res=>{
            console.log(res)
            if(res.Code==200){
                this.setState({
                    listNews:res.Data
                })
            }
        }).catch(e=>{console.log(e)})
    }

    render() {
        const  {listNews} = this.state
        return (
            <div className="container mgbt30 pdt50" >
                <div className="row">
                    <div className="col-sm-12 box-news-hot">

                        <div className="box-title-hot fll">
                            <span><i className="fal fa-newspaper" /></span>
                            <h2>Tin tức</h2>
                        </div>
                        {/* to={{ pathname: '/tin-dang', state: { product: this.props.data }, }}  */}
                        <Link to={{pathname:'/tin-tuc',state:{new : this.state.listNews}}} title="tin tức" className="flr line-height45 see-all">Xem tất cả<i className="fal fa-chevron-double-right mgl5 font10" /></Link>
                        <p className="clb"></p>
                        {
                            listNews.slice(0,5).map((item, index) => {
                                return (
                                    <NewsItem 
                                    time = {item.CreateDtime}
                                    title= {item.NewName}
                                    image={item.NewImage}
                                    data={item}
                                    key={index} />
                                    
                                )

                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
}
export default NewsContainer