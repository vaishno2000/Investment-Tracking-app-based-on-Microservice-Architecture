import React from 'react'
import { Container,Button,Row,Col,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'
import image from './image.png'
const Home = () => {
  return (
    <div id="homeContainer">
      <div className="row" style={{height:"700px"}}>
        <div className="col-md-5" >
          <img src="https://www.clipartkey.com/mpngs/m/73-733187_saving-investment-clipart-png-download-importancia-de-pedir.png" alt=""  style={{height:"70%", marginTop:"4%"}}/>
        </div>




        <div className="col-md-7">
          {/* Hero Section */}
      <div className="homepage">
      <div className="background-image"></div>
      <div className="content">
      <h1 className="display-4">Empower Your Investments with Investment Tracker</h1>
      <p className="lead">Track, Analyze, and Grow Your Investments with Ease</p>
      <Button variant="primary" href='#features' size="lg">Get Started</Button>
      </div>
      </div>
        </div>
      </div>
      

      {/* Features Section */}
      <section id='features' className="features-section">
      <Container>
        <h2 className="text-center mb-5">Key Features</h2>
        <Row>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <h3>Real-time Portfolio Tracking</h3>
                <p className='fs-5'>Easily monitor and manage all your investments in one place. Track stocks, mutual funds, cryptocurrencies, and more. Gain real-time insights into your portfolio's performance.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <h3>Real-time Market Data</h3>
                <p className='fs-5'>Offer real-time updates on stock prices, market trends, and investment news. Enable users to make informed decisions by staying up-to-date with the latest market movements.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card fs-5 text-center">
              <Card.Body>
                <h3>Educational Resources</h3>
                <p>Offer educational resources such as articles, videos, and tutorials on investment strategies, market analysis, and financial planning. Empower users with knowledge to make informed decisions.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>

      {/* About Us Section */}
      <section className="about-section mt-5 mb-5">
        <Container className='rounded'  style={{ background: "rgb(74, 18, 105)",color:"white",padding:"20px" }}>
          <h2 className="text-center mb-4">About Us</h2>
          <Row>
            {/* <Col className='trial' md={6} >
              <img src="https://png.pngtree.com/png-clipart/20200401/original/pngtree-modern-flat-design-concept-of-team-work-design-with-characters-in-png-image_5332904.jpg" id='aboutUsImage' className="img-fluid rounded" alt="Our App Logo" />
            </Col> */}
            <Col md={12}>
              <p className='fs-5'>
              At Investment Tracker, we recognize the value of your hard-earned money. Our platform is crafted to simplify the investment process, allowing you to focus on what truly matters – your goals. Experience the ease of managing your portfolio, backed by advanced algorithms and personalized insights, ensuring your investments align perfectly with your dreams.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section text-center py-4">
        <Container>
          <h2 className="mb-4">Ready to Take Control of Your Investments?</h2>
          <Button variant="primary" size="lg">
          <Link to='/register' id='registerNowBtn' className='text-white text-decorat'>Register Now</Link>
          </Button>
        </Container>
      </section>
    </div>
  )
}

export default Home
