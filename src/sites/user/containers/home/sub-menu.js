import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import productProvider from '../../../../data-access/product-provider'


class SubMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isOpen: false,
            menuItem : [],
            listProductSearch:[]
        }
    }

    search=(item)=>{
        console.log(item)
        let param = {
            ParentProductCategoryId: item.ParentProductCategoryId,
            ProductCategoryId: item.ProductCategoryId
        }
        productProvider.search(param).then(res=>{
            console.log(res)
            if (res.Code == 200) {
                this.setState({
                    listProductSearch: res.Data
                }, () => {
                    this.props.history.push({
                        pathname: '/san-pham',
                        state: {
                            data: this.state.listProductSearch,
                            productAddress: "Thành phố Hà Nội",
                            // lat: this.state.lat,
                            // lon: this.state.lon
                        }
                    })
                })
            }
        }).catch(e=>{
            console.log(e)
        })
    }



    render(){
        return (
            <div className="sub-home-trangchu sub-home-header" >
                <ul className="ul-home-trangchu">
                    {this.props.data&& this.props.data.length>=1? 
                        this.props.data.map((item,index)=>{
                            return(
                                <li onClick={()=>this.search(item)} title={item.ProductCategoryTitle} key={index} className={"li-home-trangchu menu-item-title"}><a title={item.ProductCategoryTitle} >{item.ProductCategoryTitle}</a></li>
                            )
                        })
                    :""}
                </ul>
            </div>
        )
    }

}

const styles = theme => ({
    subMenu:{
        position:'absolute',
        background:'#fff',
        zIndex:10,
        boxShadow:'0 8px 15px 1px rgba(0,0,0,0.3)',
        top:54
    },
    ul:{
        listStyle:'none',
        minWidth:280,
        padding: '8px 16px',
        margin:0,
        width:280
    },
    li:{
        padding:4,
        lineHeight:'40px',
        height:40
    }
});

SubMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withRouter)(SubMenu);