import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import projectProvider from '../../../../data-access/project-provider'
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import { DrawingManager } from '@react-google-maps/api';
import productProvider from '../../../../data-access/product-provider'
import MarkerInfo from '../maps/MarkerInfo'

const containerStyle = {
    width: '900px',
    height: '600px'
  };
  
const center = {
    lat: 21.048095,
    lng: 105.785538
};
class Compare extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            compared: [],
            recommend: [],
            progress: false,
            lstProject: [],
            name: ''
        }
    }

    componentDidMount(){
        this.loadRecommendProject()
    }

    loadRecommendProject(){
        projectProvider.getAll({page: 1, per: 20}).then(res=>{
            console.log(res)
            this.setState({
                recommend: res
            })
        }).catch(e=>{
            console.log(e)
        })
    }
    addCompare(item) {
        this.setState({
            progress: true
        }, ()=>{this.state.compared.push(item)})
        
        this.setState({
            compared: this.state.compared,
            lstProject: [],
            name: ''
        })
        setTimeout(()=>{
            this.setState({progress: false})
        }, 300)
    }

    searchByName(name) {
        this.setState({
            name: name
        }, () => {this.search()})
    }

    search(){
        projectProvider.searchByName(this.state.name).then(res=>{
            console.log(res)
            this.setState({
                lstProject: res
            })
        }).catch(e=>{
            console.log(e)
        })
    }

    removeItem(index) {

        this.setState({
            progress: true
        }, ()=>{this.state.compared.splice(index, 1)})
        
        this.setState({
            compared: this.state.compared,
        })

        setTimeout(()=>{
            this.setState({progress: false})
        }, 300)
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.homeContent + " " +"compare"}>
                <div style={{ marginBottom: 0 }} className="row app-bar-breadcumb">
                    <div className="container ">
                        <ul className="col-md-3">
                            <li><a className="txt-color-blue3" title="Trang chủ"><i className="fas fa-home" /> Trang chủ</a> <span>></span></li>
                            <li className="pdl8"><a className="txt-color-blue3" title="Tin tức landber">So sánh dự án</a></li>
                        </ul>
                    </div>
                </div>

                <div className={classes.headerNewsDetail}>
                    <div className="container">
                        <div className="row row-first" style={{height: 350}}>
                            <div className="one-region-cp search-region">
                                <div className="item">
                                    <h3>
                                        <span className="icon-title-search" />
                                        <span className="title-search">Tìm kiếm</span>
                                    </h3>
                                        <a className="compare-logo" href="https://homedy.com/" title="Bất động sản" />
                                    <div className="box-input">
                                        <input onChange={(event)=> this.searchByName(event.target.value)} type="text" style={{outline: 'none'}} value={this.state.name} className="btn-search" placeholder="Tìm kiếm để so sánh" />
                                        <span className="icon-search" />
                                        <span className="search-close" />
                                        <span className="search-loading" />
                                    </div>
                                    <div className="suggestions" style={{position: 'relative' }}>
                                        {this.state.lstProject.length > 0 && this.state.name !== ''
                                            &&
                                            <div className="content-suggestions">
                                                {this.state.lstProject.map((item, index) =>{
                                                    return(
                                                        <div key={index} className="search-item" onClick={()=>this.addCompare(item)}>
                                                            <div className="title-project">{item.name}</div>
                                                            <div className="address">{item.address}</div>
                                                        </div>
                                                    )
                                                    
                                                }) }
                                            </div>
                                        }
                                    </div>
                                    <p className="note-compare">Chọn tối đa 3 dự án để so sánh.</p>
                                    <div className="icon-compare">
                                        <img src="https://static.homedy.com/src/images/du-an/compare/so-sanh-du-an.svg" alt="so sánh dự án" />
                                    </div>
                                </div>
                            </div>

                            <div className="one-region-cp first-item">
                                {this.state.compared.length > 0 ?
                                <div className="item-project" style={{position: 'relative'}}>
                                    <div className="compare-img">
                                        <a className href="/lumiere-riverside-pj43332956" title="Lumière Riverside">
                                            <img className="lazy img-defauts" src={this.state.compared[0].image} style={{}} />
                                        </a>
                                        <span className="close-compare" />
                                    </div>
                                    <div className="content-detail">
                                        <a href="/lumiere-riverside-pj43332956" title="Lumière Riverside">
                                            <p className="project-title">{this.state.compared[0].name}</p>
                                        </a>
                                        <p className="address">{this.state.compared[0].address}</p>
                                    </div>
                                    <div onClick={()=>this.removeItem(0)}  className="act-project"><img src="https://static.homedy.com/src/images/du-an/compare/close.svg"/></div>
                                </div>
                                :
                                <div className="item-project">
                                    <div className="icon-compare">
                                        <img src="https://static.homedy.com/src/images/du-an/compare/them-du-an1.svg" alt="so sánh dự án" />
                                        <p className="note-compare">Chọn dự án để so sánh.</p>
                                    </div>
                                </div>
                                }

                            </div>
                            <div className="one-region-cp second-item">
                                {this.state.compared.length == 2 ? 
                                    <div className="item-project" style={{position: 'relative'}}>
                                        <div className="compare-img">
                                            <a className href="/lumiere-riverside-pj43332956" title="Lumière Riverside">
                                                <img className="lazy img-defauts" src={this.state.compared[1].image} style={{}} />
                                            </a>
                                            <span className="close-compare" />
                                        </div>
                                        <div className="content-detail">
                                            <a href="/lumiere-riverside-pj43332956" title="Lumière Riverside">
                                                <p className="project-title">{this.state.compared[1].name}</p>
                                            </a>
                                            <p className="address">{this.state.compared[1].address}</p>
                                        </div>
                                    
                                        <div onClick={()=>this.removeItem(1)} className="act-project"><img src="https://static.homedy.com/src/images/du-an/compare/close.svg"/></div>
                                    </div>
                                :
                                <div className="item-project">
                                    <div className="icon-compare">
                                        <img src="https://static.homedy.com/src/images/du-an/compare/them-du-an1.svg" alt="so sánh dự án" />
                                        <p className="note-compare">Chọn dự án để so sánh.</p>
                                    </div>
                                </div> }
                            </div>

                            <div className="one-region-cp recommend">
                                <p className="title-suggestion">Goi y</p>
                                {this.state.recommend.length > 0 && this.state.recommend.map((item, index) => {
                                    return(
                                        <div key={index} className="item-suggestion">
                                            <div className="thumb-image">
                                                <a className title={item.name}>
                                                    <img className="lazy" src={item.image} style={{}} />
                                                </a>
                                            </div>
                                            <div className="suggestion-info">
                                                <a className="title-name">{item.name}</a>
                                                    <p className="title-address">{item.address}</p>
                                                <a onClick={()=>this.addCompare(item)} className="btn-add-compare">Thêm vào so sánh</a>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        {this.state.compared.length == 2 ? 
                        <div className="row row-compare" style={{marginTop: 12}}>
                            <div className="compare-content">
                                <div className="compare-detail">
                                <p className="compare-title">CHỦ ĐẦU TƯ</p>
                                <div className="table">
                                    <div className="item">
                                    <p className="title title-top">Năm thành lập</p>
                                    <p className="title">Dự án đã hoàn thành</p>
                                    <p className="title">Vốn điều lệ</p>
                                    <p className="title" />
                                    </div>
                                    {this.state.compared && this.state.compared.map((item, index)=>{
                                        return(
                                            <div className="item">
                                                <div className="item-top">
                                                    <a title={item.company_name}>
                                                    <div className="investor">
                                                        <div className="content-investor">
                                                            <span><img className="image-investor" src={item.company_image}/></span>
                                                            <span className="name">{item.company_name}</span>
                                                        </div>
                                                    </div>
                                                    </a>
                                                <p className="txt-text txt-year">{item.company_aniverse ||  'Đang cập nhật'}</p>
                                                </div>
                                                <p className="txt-text">Đang cập nhật</p>
                                                <p className="txt-text">{item.company_fund || 'Đang cập nhật'}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                </div>
                            </div>

                            <div className="compare-content" style={{marginTop: 12}}>
                                <div className="compare-detail">
                                <p className="compare-title">TỔNG QUAN DỰ ÁN</p>
                                <div className="table">
                                    <div className="item">
                                        <p className="title">Giá</p>
                                        <p className="title">Giá/m2</p>
                                        <p className="title">Tổng số vốn đầu tư</p>
                                        <p className="title">Diện tích khu đất</p>
                                        <p className="title">Trạng thái xây dựng</p>
                                        <p className="title">Mật độ xây dựng</p>
                                    </div>
                                    {this.state.compared.map((item, index)=>{
                                        return(
                                            <div key={index} className="item">
                                                <p className="txt-text">{item.price_range || 'Đang cập nhật'}</p>
                                                <p className="txt-text">{item.pricem2 || 'Đang cập nhật'}</p>
                                                <p className="txt-text">Đang cập nhật</p>
                                                <p className="txt-text">{item.total_area || 'Đang cập nhật'}</p>
                                                <p className="txt-text">{item.build_status || 'Đang cập nhật'}</p>
                                                <p className="txt-text">{item.scale || 'Đang cập nhật'}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                </div>
                            </div>

                        </div>
                        : 
                            <div className="row row-compare" style={{marginTop: 12, marginBottom: 80}}></div>
                        }
                        {this.state.compared.length == 2 && 
                            <div className="row row-compare">
                                <LoadScript
                                        googleMapsApiKey='AIzaSyBU20LsK6P6h4x7a41wAyDoOoEaqGr6GC4&libraries=drawing'
                                    >
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={12}
                                    >
                                        {this.state.compared.map((item, index)=>{
                                            return(
                                                <Marker
                                                    key={index}
                                                    position={{lat: parseFloat(item.lat), lng: parseFloat(item.lon)}}
                                                    title={item.name}
                                                    label={item.name}
                                                />   
                                            )
                                        })}
                                    
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                        }
                    </div>
                </div>
                {this.state.progress == true && 
                    <div className="loading-overlay">
                        <img src="/images/loading.webp"/>
                    </div>
                }

            </div>
        )
    }
}
const styles = theme => ({
    homeContent: {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'block',
        paddingTop: 120,
        background: '#f5f5f5',
        // height: '100%'
    },
    img: {
        width: '100%',
        height: 300
    },
    mgbt: {
        marginBottom: '0!important'
    },
    headerNewsDetail: {
        borderBottom: '1px solid #ccc',
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
        marginTop: 14,
    },
    span: {
        fontSize: 16,
        fontWeight: 600,
        padding: '20px 0',
        marginTop: 32
    }
});
function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}


Compare.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Compare));