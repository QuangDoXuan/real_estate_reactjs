import React from 'react'
import {
    Card, CardImg, CardText, CardBody, Button,
    CardTitle, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption
} from 'reactstrap'
import Product from '../../containers/product/product'
const NUM_NEW_PER_SLIDE = 4

class SlideHire extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            animating: false,
            newsCarouselIndex: 0,
        }
    }

    getNewSlides = () => {
        let numSlides = this.getNumberNewsSlides()
        let items = []
        for (let i = 0; i < numSlides; i++) {
            let news = []
            let startIndex = i * NUM_NEW_PER_SLIDE
            for (let j = 0; j < NUM_NEW_PER_SLIDE; j++) {
                if (startIndex + j < this.props.slideItems.length) {
                    news.push(this.props.slideItems[startIndex + j])
                }
                // if (startIndex + j < 8) {
                //      news.push(this.props.slideItems[startIndex + j])
                // }
            }
            items.push(
                <CarouselItem key={i + 1} >
                    <Row>
                        {news.map((d, index) => {
                            return (
                                <div key={index} className="one-new col-sm-6 col-md-3">
                                <Product
                                    
                                    ProductThumbnail={d.ProductThumbnail}
                                    ProductPrice={d.ProductPrice}
                                    ProductName= {d.ProductName}
                                    ProductSummary={d.ProductSummary}
                                    ProductCreateDTime={d.ProductCreateDTime}
                                    data={d}
                                />
                                </div>
                            )
                        })}
                    </Row>
                </CarouselItem>
            )
        }
        return items
    }

    getNumberNewsSlides = () => {
        let totalNews = this.props.slideItems.length
        return totalNews % NUM_NEW_PER_SLIDE ? parseInt(totalNews / NUM_NEW_PER_SLIDE) + 1 : totalNews / NUM_NEW_PER_SLIDE
    }

    nextNewSlide = () => {
        let numberSlides = this.getNumberNewsSlides()
        let newsCarouselIndex = this.state.newsCarouselIndex
        if ((newsCarouselIndex + 1) < numberSlides) {
            newsCarouselIndex++
            this.setState({ newsCarouselIndex })
        }
    }

    prevNewSlide = () => {
        let newsCarouselIndex = this.state.newsCarouselIndex
        if ((newsCarouselIndex - 1) >= 0) {
            newsCarouselIndex--
            this.setState({ newsCarouselIndex })
        }
    }

    render() {
        return (
            <div className='container product-news-sold'>
                 <div className="box-title-hot">
                    <h2><a style={{fontWeight:600}} >Tin bán nhà dành cho bạn</a></h2>
                </div>
                
            </div>
        )
    }

}
export default SlideHire