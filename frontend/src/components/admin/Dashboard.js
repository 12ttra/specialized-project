import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Doughnut, Line, Radar } from "react-chartjs-2";

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import ChartIncome from './ChartIncome';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    // status order
    let da_dat_hang = 0;
    let dang_van_chuyen = 0;
    let da_giao_hang = 0;
    orders &&
        orders.forEach((order) => {
            if (order.orderStatus === "Đã đặt hàng") {
                da_dat_hang += 1;
            }
            if (order.orderStatus === "Đang vận chuyển") {
                dang_van_chuyen += 1;
            }
            if (order.orderStatus === "Đã giao hàng") {
                da_giao_hang += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch]);

    let totalAmountall = 0;
    orders &&
        orders.forEach((product) => {
            totalAmountall += product.totalPrice;
        });
    // Chart Line tính tổng doanh thu
    const lineState = {
        labels: ["Số tiền ban đầu", "Tổng danh thu hiện tại"],
        datasets: [
            {
                label: "TỔNG DANH THU",
                backgroundColor: ["blue"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmountall],
            },
        ],
    };
    // Doughnut tính số lượng hàng còn và hết hàng
    const doughnutState = {
        labels: ["Hết hàng", "Còn hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#FF1493", "#FFD700"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    // Doughnut thống kê trạng thái đơn hàng
    const doughnutStateOrder = {
        labels: ["Đã đặt hàng", "Đang vận chuyển", "Đã giao hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4", "#FF7F50"],
                hoverBackgroundColor: ["#FF1493", "#00FA9A", "#FFD700"],
                data: [da_dat_hang, dang_van_chuyen, da_giao_hang],
            },
        ],
    };
    // radar chart
    let Secondhand = 0;
    let New_Clothing = 0;
    let Man = 0;
    let Woman = 0;
    let Unisex = 0;
    let Dress = 0;
    let T_Shirt = 0;
    let Somi = 0;
    let Pant = 0;
    products &&
        products.forEach((product) => {
            if (product.category === "Secondhand") {
                Secondhand += 1;
            }
            if (product.category === "New Clothing") {
                New_Clothing += 1;
            }
            if (product.category === "Man") {
                Man += 1;
            }
            if (product.category === "Woman") {
                Woman += 1;
            }
            if (product.category === "Unisex") {
                Unisex += 1;
            }
            if (product.category === "Dress") {
                Dress += 1;
            }
            if (product.category === "T-Shirt") {
                T_Shirt += 1;
            }
            if (product.category === "Somi") {
                Somi += 1;
            }
            if (product.category === "Pant") {
                Pant += 1;
            }
        });
    const data = {
        labels: [
            'Secondhand',
            'New Clothing',
            'Man',
            'Woman',
            'Unisex',
            'Dress',
            'T-Shirt',
            'Somi',
            'Pant'
        ],
        datasets: [{
            label: 'Danh mục sản phẩm',
            data: [Secondhand, New_Clothing, Man, Woman, Unisex, Dress, T_Shirt, Somi, Pant],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    return (
        <Fragment>
            <div class="grid-bg ba-grid anim mg-top">
                <div class="inner">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-10">
                            <h1 className="my-4">OVERVIEW</h1>

                            {loading ? <Loader /> : (
                                <Fragment>
                                    <MetaData title={'Admin Dashboard'} />

                                    <div className="row-1 height-auto   gap5" >
                                        <div className="col-xl-3-1 ">
                                            <div className="card text-white bg-primary o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">TOTAL REVENUE<br /> <b>$ {totalAmount && totalAmount.toLocaleString()} </b>
                                                    </div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                    <span className="float-left">View Details</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3-1 ">
                                            <div className="card text-white bg-success o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">TOTAL PRODUCTS<br /> <b>{products && products.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                                    <span className="float-left">View Details</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>


                                        <div className="col-xl-3-1 ">
                                            <div className="card text-white bg-danger o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng hóa đơn<br /> <b>{orders && orders.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>


                                        <div className="col-xl-3-1 ">
                                            <div className="card text-white bg-info o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">TOTAL USER<br /> <b>{users && users.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                    <span className="float-left">View Details</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-xl-3-1">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    {/* Doughnut Chart */}
                                                    <h6 className='text-dark'>QUANTITY PRODUCT STATUS</h6>
                                                    <div className="doughnutChart">
                                                        <Doughnut data={doughnutState} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3-1 ">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    {/* Doughnut Chart */}
                                                    <h6 className='text-dark'>ORDER STATUS</h6>
                                                    {/* Doughnut Chart */}
                                                    <div className="doughnutChart">
                                                        <Doughnut data={doughnutStateOrder} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-sm-12 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    <h6 className='text-dark'>TOTAL REVENUE</h6>
                                                    {/* Line chart */}
                                                    <div className="lineChart">
                                                        <Line
                                                            data={lineState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Fragment>
                            )}

                            <div className='row'>

                                <div className='col-md-6'>
                                    <ChartIncome />
                                </div>
                                <div className='radar col-md-5 card text-white bg-light'>

                                    <Radar
                                        data={data}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default Dashboard
