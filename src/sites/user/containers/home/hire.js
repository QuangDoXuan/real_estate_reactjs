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
        productProvider.getAll().then(res => {
            console.log(res)
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
            navText: []

        };
         
        const events = {
            onDragged: function(event) {},
            onChanged: function(event) {}
        };
        return (
            <div className='container product-news-sold'>
                 <div className="box-title-hot">
                    <h2><a style={{fontWeight:600}} >Tin bán nhà dành cho bạn</a></h2>
                </div>
                <OwlCarousel ref="hire" options={options} events={events} >
                    {this.state.listHire.map((item, index)=>{
                        return(
                            <div style={{padding: '0 4px'}}><img src={item.remote_thumbnail} alt="The Last of us"/></div>
                        )
                    })}
                </OwlCarousel>
            </div>
        )
    }

}
export default SlideHire