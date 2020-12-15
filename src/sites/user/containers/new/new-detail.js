import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment'
import NewItem from './new-thumbnail'

import newsProvider from '../../../../data-access/news-provider'
import NewHotItem from './new-hot-item'

const resource_url = "http://localhost:3001"
class NewsDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotNews: []
        }
    }


    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.location.state!== {}) {
    //         // do stuffs
    //         window.location.reload()
    //         // window.scrollTo(0)
    //     }
    // }

    componentDidMount() {
        this.loadPage()
    }

    loadPage() {
        newsProvider.getAll({page: 1, per: 200}).then(res => {
            this.setState({
                latestNews: res[0],
                listNews: res,
                hotNews: res.filter(item => item.is_hot == 1)
            })
        }).catch(e => {
            console.log(e)
        })
    }


    render() {
        const { classes } = this.props
        return (
            <div className={classes.homeContent + " " + "content"}>
                <div className={"row app-bar-breadcumb " + classes.mgbt}>
                    <div className="container">
                        <ul className="col-md-5">
                            <li><a className="txt-color-blue3" title="Trang chủ"><i className="fas fa-home" /> Trang chủ</a> <span>></span></li>
                            <li className="pdl8"><a className="txt-color-blue3" title="Tin tức landber">Tin tức</a><span>></span></li>
                            <li className="pdl8"><a className="txt-color-blue3" title="Tin tức landber">Cẩm nang</a></li>
                        </ul>
                    </div>

                </div>
                <div className={classes.headerNewsDetail}>
                    <div className="container">
                        <div className="fll">
                            <span className={classes.circle + " " + "txt-center fll font20 mgr10 mgt25 mgbt35"}>
                                <i className="far fa-bookmark"></i>
                            </span>
                            <b className="fll font20 title-category"><a title="Cẩm nang" className="ng-binding">Cẩm nang</a></b>
                        </div>
                        <div className="flr">
                            {/* ngRepeat: catc in ndc.listCategories|filter:{parent: aliasCategoryParent} track by $index */}
                        </div>
                        <p className="clearboth" />
                    </div>
                </div>

                <div className="container news-detail-container">
                    <div className="row">
                        <div className="col-md-7">
                            <h2 style={{ fontSize: 26, fontWeight: 'bold', color: "#283c5a" }}>{this.props.location.state.product.title}</h2>
        <p class="user-date mgbt10"><i class="fal fa-clock mgr5" aria-hidden="true"></i>{moment(this.props.location.state.product.created_at).format("DD-MM-YYYY")}</p>


                            <span className={classes.span}>{this.props.location.state.product.NewDescription}</span>
                            <div style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: this.props.location.state.product.content }} className="content-news">

                            </div>
                        </div>
                        <div className="col-md-1"></div>


                        <div style={{ height: '100%' }} className="col-xs-12 col-md-4 tin-noibat">
                            <div className="title-tinnoibat">
                                <h4>Tin nổi bật</h4>
                            </div>
                            <div className="list-tin-noi-bat">
                                {this.state.hotNews.slice(0,5).map((item, index) => {
                                    if (index === 0) {
                                        return (
                                            <div className="col-xs-12 col-md-12">
                                                <NewItem key={index}
                                                    title={item.title}
                                                    image={item.thumnail.url}
                                                    createDtime={item.created_at}
                                                    data={item}
                                                // description={item.NewDescription}
                                                />
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div className="col-xs-12 col-md-12">
                                                <NewHotItem key={index}
                                                    title={item.title}
                                                    image={item.thumnail.url}
                                                    createDtime={item.created_at}
                                                    data={item}
                                                // description={item.NewDescription}
                                                />
                                            </div>

                                        )
                                    }

                                })}
                            </div>

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

    },
    img: {
        width: '100%',
        height: 300
    },
    mgbt: {
        marginBottom: '0!important'
    },
    headerNewsDetail: {
        height: 65,
        borderBottom: '1px solid #ccc',
        lineHeight: '48px'
    },
    circle: {
        background: '#3897f1',
        color: '#fff',
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: '41px',
        marginTop: 4,
    },
    span: {
        fontSize: 16,
        fontWeight: 600,
        padding: '20px 0',
        marginTop: 32
    }

});


NewsDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsDetail);