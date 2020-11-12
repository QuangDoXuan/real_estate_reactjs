import React from 'react'
import Product from '../../containers/product/product'
import OwlCarousel from 'react-owl-carousel2';
import productProvider from '../../../../data-access/product-provider'


class SlideHire extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listHire: []
        }
    }

    componentDidMount() {
        this.getListHire();
    }

    getListHire() {
        let param = {
            type: 2
        }
        productProvider.getAll(param).then(res => {
            this.setState({
                listHire: res
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
            navText: [],
            margin: 4

        };
         
        const events = {
            onDragged: function(event) {},
            onChanged: function(event) {}
        };
        return (
            <div className='container product-news-sold'>
                 <div className="box-title-hot">
                    <h2><a style={{fontWeight:600}} >Tin cho thuê dành cho bạn</a></h2>
                </div>
                <OwlCarousel ref="hire" options={options} events={events} >
                    {this.state.listHire.map((item, index)=>{
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
export default SlideHire