import React from 'react'
import product_card from '../../data/product_data'
import './eshop.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Card  , Button} from "react-bootstrap";
import '../../App.css'
import {Link} from 'react-router-dom';

const MainContent = () => {
    console.log(product_card);
    const listItems = product_card.map((item) =>
    <>

 
        <Card className="item-card" key = {item.id}>
            <Card.Img variant="top" src={item.thumb} />
            <Card.Body className="item-body">
            <Card.Title className="item-title">{item.product_name}</Card.Title>
                <Card.Text className="item-text">
                    {/* <p className="item-info">{item.description}</p> */}
                </Card.Text>
                <p className= "item-price">{item.price}<span className="item-span">{item.currency}</span></p>
                <Link to="/Cart"><div className="item-view-btn">View Item</div> </Link>
            </Card.Body>       
        </Card>
      
            
    </>
    
    );
    return(
        <div className="main_content">
      
            {listItems}
        </div>
    )

}

export default MainContent;