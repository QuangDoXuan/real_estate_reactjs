import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SlideNews from '../new/news-slide'
import NewItem from './new-thumbnail'
import newsProvider from '../../../../data-access/news-provider'



class NewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            latestNews:{},
            hotNews:[],
            listNews:[]
        }
    }

    componentDidMount(){
        this.loadPage()
    }

    loadPage(){
        newsProvider.getAll({page: 1, per: 199}).then(res =>{
            console.log(res)
            this.setState({
                latestNews:res.filter(x=>x.is_present == 1),
                listNews: res,
                hotNews: res.filter(x=>x.is_hot == 1)
            })
        }).catch(e=>{
            console.log(e)
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.homeContent + " " + "content"}>
                <div className="row app-bar-breadcumb">
                    <div className="container ">
                        <ul className="col-md-3">
                            <li><a className="txt-color-blue3" title="Trang chủ"><i className="fas fa-home" /> Trang chủ</a> <span>></span></li>
                            <li className="pdl8"><a className="txt-color-blue3" title="Tin tức landber">Tin tức</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container new-box">

                    <div className="row">
                        <div style={{ display: 'flex' }} className=" col-md-8">
                            <div className="item-box-new-hot">
                                {/* {this.state.latestNews.thumnail != null && */}
                                { this.state.listNews.filter(x=>x.is_present == 1).map((item, index)=> {
                                    return (
                                        <NewItem image={item.thumnail.url}
                                        title={item.title}
                                        data={item}
                                    />
                                    )
                                }) }
                                
                                {/* } */}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <a  target="_blank" rel="nofollow">
                                <img ng-src="https://s3-ap-southeast-1.amazonaws.com/landber/1f27bee2-21ac-437b-8c2e-ab9b3c66c2a0.jpg" alt="" src="https://s3-ap-southeast-1.amazonaws.com/landber/1f27bee2-21ac-437b-8c2e-ab9b3c66c2a0.jpg" />
                            </a>

                        </div>
                        <div className="col-md-8">
                            <SlideNews slideItems={this.state.listNews}
                                hideTitle={true}
                            />

                        </div>
                    </div>
                </div>

                <div className="container news-center">
                    <div className="row row-center">
                    <div className="col-xs-12 col-md-7 cover-box-news">
                        <div className="header-title-new dplflex mgbt10 ">
                        <span className="cycle-icon icon-blue mgr20"><i className="far fa-building"></i></span>
                        <h4 className="title-box-news">Tin tức thị trường</h4>
                        </div>
                        
                        <div className="row">
                            {this.state.listNews?this.state.listNews.map((item,index)=>{
                            return(
                                <div className="col-xs-12 col-md-6 one-news-hot">
                                <NewItem key={index}
                                        image={item.thumnail.url}
                                        title={item.name}
                                        description={item.description}
                                        data={item}
                                />
                                </div>
                            )
                            }):''}
                          

                        </div>
                    </div>
                    
                    <div className="col-md-1"></div>
                    
                    <div className="col-xs-12 col-md-4 tin-noibat">
                            <div className="title-tinnoibat">
                                <h4>Tin nổi bật</h4>
                            </div>

                            {this.state.hotNews.map((item,index)=>{
                                return(
                                    <div className="col-xs-12 col-md-12">
                                    <NewItem key={index}
                                             title={item.title}
                                             image={item.thumnail.url}
                                             description={item.description}
                                             data={item}
                                    />
                                    </div>
                                    
                                )
                            })}
                    </div>
                    </div>
                </div>

            </div>
        )
    }
}

const styles = theme => ({
    homeContent: {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'block',
        paddingTop: 50,
    }
});


NewContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewContainer);