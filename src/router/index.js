import React, {useContext, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import MainLayout from "../layouts/mainlayout"
import LoginLayout from "../layouts/loginlayout"
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import AppRoute from "./approutelayout";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgotpassword"
import ResetPassword from "../pages/resetpassword"
import CreateDiar from "../pages/creatediar"
import EditDiar from "../pages/editdiar"
import UserDiar from "../pages/userdiar";
import ChangePassword from "../pages/changepassword";
import UserProfile from "../pages/userprofile";
import DiarDetail from "../pages/diardetail";
import Admindashboard from "../pages/admindashboard";

import AuthStore from "../store/authStateProvider"
import DiaryStore from "../store/diaryStateProvider";
import UserStore from "../store/userStateProvider";

export default function Routers() {
    return (
        <Router>
            <DiaryStore>
                <AppRoute path="/my-diar"  layout={MainLayout} component={UserDiar}
                          routeProtection={true}/>
                <AppRoute path="/" exact layout={MainLayout} component={Dashboard} routeProtection={true}/>
                <AppRoute path="/create-diar"
                          layout={MainLayout}
                          component={CreateDiar}
                          routeProtection={true}/>
                <AppRoute path="/diar-detail/:diarId"
                          layout={MainLayout}
                          component={DiarDetail}
                          routeProtection={true}/>
                <AppRoute path="/edit-diar/:diarId"
                          layout={MainLayout}
                          component={EditDiar}
                          routeProtection={true}/>
            </DiaryStore>
            <AuthStore>
                <UserStore>
                    <AppRoute path="/admin-dashboard"
                              layout={MainLayout}
                              component={Admindashboard}
                              routeProtection={true}/>
                    <AppRoute path="/profile" exact
                              layout={MainLayout}
                              component={UserProfile}
                              routeProtection={true}/>
                    <AppRoute path="/change-password"
                              layout={MainLayout}
                              component={ChangePassword}
                              routeProtection={true}/>

                    <AppRoute path="/resetpassword/:token" header={"Yeni Parola Oluştur"}
                              footerurl={"/login"}

                              footertext={""}
                              footer={""} layout={LoginLayout}
                              component={ResetPassword}
                              routeProtection={false}/>

                    <AppRoute path="/forgotpassword" header={"Parola Sıfırlama"}
                              footerurl={"/login"}
                              footertext={"Geri Dön"}
                              footer={"Giriş Yap"} layout={LoginLayout}
                              component={ForgotPassword}
                              routeProtection={false}/>
                    <AppRoute path="/login" header={"Giriş Yap"}
                              footertext={"Hesabın Yok Mu ?"}
                              footerurl={"/register"}
                              footer={"Kayıt Ol"} layout={LoginLayout} component={Login}
                              routeProtection={false}/>
                    <AppRoute path="/register" header={"Kayıt Ol"}
                              footerurl={"/login"}
                              footertext={"Hesabın Var Mı ?"}

                              footer={"Giriş Yap"} layout={LoginLayout} component={Register}
                              routeProtection={false}/>
                </UserStore>
            </AuthStore>
            {/*   <Redirect from='*' to='/login' />*/}
        </Router>
    )
}
