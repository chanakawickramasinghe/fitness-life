import React from "react";
import { Link } from 'react-router-dom';
import ChartistGraph from "react-chartist";
import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";

import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import thousands from "../utils/thousands";
import memberPercentage from "utils/stats";
import graphGen from "utils/graph";

function Dashboard() {

  const [newOrderList, setNewOrderList] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState([]);
  const [onlineTotalMembers, setOnlineTotalMembers] = useState([]);
  const [physicalTotalMembers, setPhysicalTotalMembers] = useState([]);
  const [newGraph, setNewGraph] = useState([]);
  const [newRevenueGraph, setRevenueGraph] = useState([]);
  const [salesGraph, setSalesGraph] = useState([]);

  const perc = [];

  const getNewOrders = () => {
    Axios.get("http://localhost:3001/orders/new").then((response) => {
      setNewOrderList(response.data);
    });
  };

  const getRevenue = () => {
    Axios.get("http://localhost:3001/orders/revenue").then((response) => {
      setRevenue(response.data);
    });
  };

  const getNewMembers = () => {
    Axios.get("http://localhost:3001/members/new").then((response) => {
      setNewMembers(response.data);
    });
  };

  const getTotalMembers = () => {
    Axios.get("http://localhost:3001/members/total").then((response) => {
      setTotalMembers(response.data);
    });
  };

  const getOnlineTotalMembers = () => {
    Axios.get("http://localhost:3001/members/online/total").then((response) => {
      setOnlineTotalMembers(response.data);
    });
  };

  const getPhysicalTotalMembers = () => {
    Axios.get("http://localhost:3001/members/physical/total").then((response) => {
      setPhysicalTotalMembers(response.data);
    });
  };

  const getNewGraph = () => {
    Axios.get("http://localhost:3001/members/newGraph").then((response) => {
      setNewGraph(response.data);
    });
  };

  const getRevenueGraph = () => {
    Axios.get("http://localhost:3001/shop/graph/revenue").then((response) => {
      setRevenueGraph(response.data);
    });
  };

  const getSalesGraph = () => {
    Axios.get("http://localhost:3001/orders/graph/sales").then((response) => {
      setSalesGraph(response.data);
    });
  };

  useEffect(() => {
    getNewOrders();
    getRevenue();
    getNewMembers();
    getTotalMembers();
    getOnlineTotalMembers();
    getPhysicalTotalMembers();
    getNewGraph();
    getRevenueGraph();
    getSalesGraph();
  }, []);

  function findTotalRevenue(){

    let r = 0;
    revenue.map(({price, quantity}) => r = r + price*quantity)
    return r;
  }  

  const totalRevenue = thousands(findTotalRevenue());

  onlineTotalMembers.map((val, key) => {
    perc.push(val.count);
  })

  physicalTotalMembers.map((val, key) => {
    perc.push(val.count);
  })

  const percentage = memberPercentage(perc[0], perc[1]);

  console.log(salesGraph);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-store"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">New Orders</p>

                      {newOrderList.map((val, key) => {
                        return (
                          <Card.Title as="h4">{val.count}</Card.Title>
                        );
                        })}

                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                <i className="far fa-calendar-alt mr-1"></i>
                  Today
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-hand-holding-usd"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">Rs. {totalRevenue}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last 30 days
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i className="fas fa-user-plus"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">New Members</p>

                      {newMembers.map((val, key) => {
                        return (
                          <Card.Title as="h4">{val.count}</Card.Title>
                        );
                        })}

                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                <i className="far fa-calendar-alt mr-1"></i>
                  Last 7 days
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i className="fas fa-users"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Members</p>
                      
                      {totalMembers.map((val, key) => {
                        return (
                          <Card.Title as="h4">{val.count}</Card.Title>
                        );
                        })}

                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                <i className="far fa-arrow-alt-circle-right"></i>
                <Link to="/admin/members" >View More</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Total Revenue</Card.Title>
                <p className="card-category">Past 7 Days</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                      ],
                      series: [
                        [5000, 10000, 7500, 15000, 20000, 18000, 8000, 25000],
                        [11000, 8000, 5000, 8900, 12000, 10000, 25000, 16000],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 30000,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: false,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-primary"></i>
                  Fitness Center <i className="fas fa-circle text-secondary"></i>
                  Online Store
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 5 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Member Statistics</Card.Title>
                <p className="card-category">All Members</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [percentage, 100-percentage],
                      series: [percentage, 100-percentage],
                    }}
                    type="Pie"
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-primary"></i>
                  Online Members <i className="fas fa-circle text-secondary"></i>
                  Gym Members
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Updated 1 hour ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Online Sales</Card.Title>
                <p className="card-category">Last 14 Days</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: graphGen(salesGraph)[1],
                      series: [
                        graphGen(salesGraph)[0],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  More info
                  <i class="far fa-arrow-alt-circle-right"></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
          <Card>
              <Card.Header>
                <Card.Title as="h4">New Members</Card.Title>
                <p className="card-category">Last 7 Days</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: graphGen(newGraph)[1],
                      series: [
                        graphGen(newGraph)[0],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  More info
                  <i class="far fa-arrow-alt-circle-right"></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
