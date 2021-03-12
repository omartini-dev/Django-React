import React from "react";
import { Route } from "react-router-dom";

import Homepart from './homepart';
import Proprofile from './profile/proprofile';
import Companies from './companis/companies/layout';
import Companyprofile from './companis/companyprofile/layout';
import Jobs from './jobs/layout';
import Proposal from './proposal/layout';
import CreatePerson from './companis/create/layout1';
import CreateCom from './companis/create/layout';
import Postcom from './companis/post/layout';
import Postlist from './companis/post/postlist';
import Postdetail from './companis/post/postdetail';
import Message from './message/layout';
import Article from './articles/layout';
import Artdetail from './articles/articledetail'
import Upgrade from './upgrade/layout';
import Document from './docs/layout'
import Docdetail from './docs/docdetail'
import Welcome from './welcome'

const BaseRouter = (props) => (
  <div>
    <Route exact path="/" render={() => <Homepart  {...props}/>} />
    <Route exact path="/welcome" render={() => <Welcome  {...props}/>} />
    {/* <Route exact path="/profile" render={() => <Proprofile {...props}/>} /> */}
    <Route exact path="/profile/:id" render={() => <Proprofile {...props}/>} />
    <Route exact path="/companies" render={() => <Companies {...props}/>} />
    <Route exact path="/companyprofile" render={() => <Companyprofile {...props}/>} />
    <Route exact path="/jobs" render={() => <Jobs {...props}/>} />
    <Route exact path="/proposal/:id" render={() => <Proposal {...props}/>} />
    <Route exact path="/postcom" render={() => <Postcom {...props}/>} />
    <Route exact path="/postlist" render={() => <Postlist {...props}/>} />
    <Route exact path="/postdetail/:id" render={() => <Postdetail {...props}/>} />
    <Route exact path ="/message/:id" render = {() => <Message {...props}/>} />
    <Route exact path ="/article" render = {() => <Article {...props}/>} />
    <Route exact path ="/companyedit" render = {() => <CreateCom {...props}/>} />
    <Route exact path ="/personedit" render = {() => <CreatePerson {...props}/>} />
    <Route exact path ="/upgrade" render = {() => <Upgrade {...props}/>} />
    <Route exact path ="/document" render = {() => <Document {...props}/>} />
    <Route exact path ="/artdetail/:id" render = {() => <Artdetail {...props}/>} />
    <Route exact path ="/docdetail/:id" render = {() => <Docdetail {...props}/>} />
  </div>
);

export default BaseRouter;
