import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectItem from './Project'
import productCategoryProvider from '../../../../data-access/product-category-provider'

class Project extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listProject:[]
        }
    }

    componentDidMount(){
        this.loadAllProject()
    }

    loadAllProject(){
        productCategoryProvider.getAll().then(res=>{
            if(res&&res.Code&&res.Code==200){
                this.setState({
                    listProject: res.Data.filter(x=>x.ParentProductCategoryId=="DUAN")
                })
            }
        }).catch(e=>{
            console.log(e)
        })
    }

    render(){
        const {classes}=this.props
        console.log(this.state.listProject)
        return(
            <div className={classes.homeContent}>
                 <div style={{marginBottom:0}} className="row app-bar-breadcumb">
                    <div className="container ">
                        <ul className="col-md-3">
                            <li><a className="txt-color-blue3" title="Trang chủ"><i className="fas fa-home" /> Trang chủ</a> <span>></span></li>
                            <li className="pdl8"><a className="txt-color-blue3" title="Tin tức landber">Dự án</a></li>
                        </ul>
                    </div>
                </div>

                <div className={classes.headerNewsDetail}>
                    <div className="container">
                        <div className="fll">
                            <span className={classes.circle + " " + "txt-center fll font20 mgr10 mgt25 mgbt35"}>
                            <i className="far fa-building"></i>
                            </span>
                            <b className="fll font20 title-category"><a title="Dự án" className="ng-binding">Dự án</a></b>
                        </div>
                        <div className="flr">
                            {/* ngRepeat: catc in ndc.listCategories|filter:{parent: aliasCategoryParent} track by $index */}
                        </div>
                        <p className="clearboth" />
                    </div>
                </div>

                <div style={{marginTop:32}} className="list-project">
                    <div className="container">
                        <div className="row">
                            {/* {
                                [1,2,3,4,5,6,7,8,9,10].map((item,index)=>{
                                    return(
                                        <ProjectItem key={index}
                                        data= {item}
                                    />
                                    )
                                   
                                })
                            } */}
                            {this.state.listProject.map((item,index)=>{
                                return(
                                    <ProjectItem key={index}
                                                data = {item}
                                    />
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
        background:'#f5f5f5'
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
        lineHeight: '65px',
        background:'#fff'
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


Project.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Project));