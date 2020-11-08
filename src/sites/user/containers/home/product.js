import React from 'react'
import Product from '../../containers/product/product';
import OwlCarousel from 'react-owl-carousel2';

class SlideNews extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickDetail(){
        this.props.history.push({
            pathname:"/tin-dang",
            state:{product:this.props.slideItems}
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
                    <h2><a className={this.props.dataClasses?this.props.dataClasses:""} style={{fontWeight:600}} >{this.props.dataTitle? this.props.dataTitle:"Tin cho thuê dành cho bạn"}</a></h2>
                </div>


                <OwlCarousel ref="car" options={options} events={events} >
                    <div style={{padding: '0 4px'}}><img src="/images/house1.jpg" alt="The Last of us"/></div>
                    <div style={{padding: '0 4px'}}><img src="/images/house1.jpg" alt="GTA V"/></div>
                    <div style={{padding: '0 4px'}}><img src="/images/house1.jpg" alt="Mirror Edge"/></div>
                    <div style={{padding: '0 4px'}}><img src="/images/house1.jpg" alt="The Last of us"/></div>
                    <div style={{padding: '0 4px'}}><img src="/images/house1.jpg" alt="GTA V"/></div>
                    <div style={{padding: '0 4px'}}><img src="/images/house1.jpg" alt="Mirror Edge"/></div>
                </OwlCarousel>
            </div>
        )
    }

}
export default SlideNews