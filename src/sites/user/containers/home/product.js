import React from 'react'
import Product from '../../containers/product/product';
import OwlCarousel from 'react-owl-carousel2';
import productProvider from '../../../../data-access/product-provider'

class SlideNews extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            listSell: []
        }
    }

    componentDidMount(){
        this.getListSell();
    }

    onClickDetail(){
        this.props.history.push({
            pathname:"/tin-dang",
            state:{ product:this.props.slideItems}
        })
    }

    getListSell(){
        let param = {
            type: 1
        }
        productProvider.getAll(param).then(res => {
            this.setState({
                listSell: res
            })
        }).catch(e => {
            console.log(e)
        })
    }


    render() {
        const options = {
            items: 4,
            nav: true,
            rewind: true,
            autoplay: true,
            navText: []

        };
         
        const events = {
            onDragged: function(event) {},
            onChanged: function(event) {}
        };
        return (
            <div className='container product-news-sold'>
                <div className="box-title-hot">                    
                    <h2><a className={this.props.dataClasses?this.props.dataClasses:""} style={{fontWeight:600}} >Tin bán nhà dành cho bạn</a></h2>
                </div>


                <OwlCarousel ref="car" options={options} events={events} >
                    {this.state.listSell.map((item, index)=>{
                        return(
                            <Product
                                key={index}
                                ProductThumbnail={item.remote_thumbnail}
                                ProductPrice={item.price01}
                                ProductName= {item.name}
                                ProductSummary={item.short_description}
                                ProductCreateDTime={item.created_at}
                                data={item}
                           />
                        )
                    })}
                </OwlCarousel>
            </div>
        )
    }

}
export default SlideNews