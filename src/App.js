import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";
import AdminToolbar from "./components/AdminToolbar";

//hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import MenuLayout from "./layouts/ProductsLayout";

// pages
import "./default.scss";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Homepage from "./pages/Homepage";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Regular from "./pages/Regular";
import Special from "./pages/Special";
import Details from "./pages/DeliveryDetails";
import OrderList from "./pages/OrderList";
import Payment from "./components/Payment";
import FAQ from "./pages/FAQ/faq";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <div className="main">
        <AdminToolbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            )}
          />
          <Route
            path="/registration"
            render={() => (
              <MainLayout>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
          <Route
            path="/recovery"
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
          <Route
            path="/dashboard"
            render={() => (
              <WithAuth>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </WithAuth>
            )}
          />
          <Route
            path="/admin"
            render={() => (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </WithAdminAuth>
            )}
          />
          <Route
            path="/orders"
            render={() => (
              <WithAdminAuth>
                <AdminLayout>
                  <OrderList />
                </AdminLayout>
              </WithAdminAuth>
            )}
          />

          <Route
            path="/about"
            render={() => (
              <MainLayout>
                <About />
              </MainLayout>
            )}
          />
          <Route
            path="/regular"
            render={() => (
              <MenuLayout>
                <Regular />
              </MenuLayout>
            )}
          />
          <Route
            path="/special"
            render={() => (
              <MenuLayout>
                <Special />
              </MenuLayout>
            )}
          />
          <Route
            path="/details"
            render={() => (
              <WithAuth>
                <DashboardLayout>
                  <Details />
                </DashboardLayout>
              </WithAuth>
            )}
          />
          <Route
            path="/payment"
            render={() => (
              <WithAuth>
                <DashboardLayout>
                  <Payment />
                </DashboardLayout>
              </WithAuth>
            )}
          />
          <Route
            path="/faq"
            render={() => (
              <MenuLayout>
                <FAQ />
              </MenuLayout>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
