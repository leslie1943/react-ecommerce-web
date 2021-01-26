import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import UserDashboard from './components/admin/UserDashboard'
import PrivateRoute from './components/admin/PrivateRoute'
import Home from './components/core/Home'
import Shop from './components/core/Shop'
import SignIn from './components/core/SignIn'
import SignUp from './components/core/SignUp'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminRoute from './components/admin/AdminRoute'
import AddCategory from './components/admin/AddCategory'
import AddProduct from './components/admin/AddProduct'
import Login from './components/epro/Login'
import CategoryList from './components/admin/CategoryList'
import ProductDetail from './components/core/ProductDetail'
import Cart from './components/core/Cart'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        {/* 一般路由 */}
        <Route path="/epro/login" component={Login} />
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/product/:productId" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        {/* 受保护的路由: 非登录状态下不可访问 */}
        <PrivateRoute path="/user/dashboard" component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/create/category" component={AddCategory} />
        <AdminRoute path="/category/list" component={CategoryList} />
        <AdminRoute path="/create/product" component={AddProduct} />
        {/* Epro */}
        <Route path="/epro/login" component={Login} />
      </Switch>
    </HashRouter>
  )
}

export default Routes
