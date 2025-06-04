import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import UserRegister from  "./components/UserRegister";
import UserHome from  "./components/UserHome";
import UserProfile from './components/UserProfile';
import EditUserProfile from './components/EditUserProfile';
import Index from './components/Index';
import AdminHome from './components/AdminHome';
import ViewUserAdmin from './components/ViewUserAdmin';
import PostComplaint from './components/PostComplaint';
import ResetPassword from './components/ResetPassword';
import UserLogin from './components/UserLogin';
import UpdateComplaint from './components/UpdateComplaint';
import FeedbackUser from './components/FeedbackUser';
import UpdateStatusOfficer from './components/UpdateStatusOfficer';
import ViewFeedback from './components/ViewFeedback';
import MyFeedback from './components/MyFeedback';
import AdminProfile from './components/AdminProfile';
import UpdateAdminProfile from './components/UpdateAdminProfile';
import PostLocation from './components/PostLocation';
import UpdateLocationAdmin from './components/UpdateLocationAdmin';
import PostAgent from './components/PostAgent';
import ViewAgentAdmin from './components/ViewAgentAdmin';
import UpdateAgentAdmin from './components/UpdateAgentAdmin';
import PostInsurancePlanAdmin from './components/PostInsurancePlanAdmin';
import ViewInsurancePlanAdmin from './components/ViewInsurancePlanAdmin';
import UpdatePlanAdmin from './components/UpdatePlanAdmin';
import ViewInsuranceUser from './components/ViewInsuranceUser';
import ApplyInsuranceUser from './components/ApplyInsuranceUser';
import ViewAppliedInsuranceUser from './components/ViewAppliedInsuranceUser';
import AgentLogin from './components/AgentLogin';
import AgentHome from './components/AgentHome';
import ViewInsuranceAgent from './components/ViewInsuranceAgent';
import ViewCustomerInsuranceAgent from './components/ViewCustomerInsuranceAgent';
import ApplyClaimUser from './components/ApplyClaimUser';
import ViewClaimUser from './components/ViewClaimUser';
import PostFeedbackUser from './components/PostFeedbackUser';
import ViewContactUser from './components/ViewContactUser';
import AgentProfile from './components/AgentProfile';
import ViewClaimAgent from './components/ViewClaimAgent';
import ViewInsuranceAdmin from './components/ViewInsuranceAdmin';
import ViewClaimAdmin from './components/ViewClaimAdmin';
import ViewUserAgent from './components/ViewUserAgent';



function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
      
            <Route path='/' element={<Index />} />
            <Route path='/view_user_admin' element={<ViewUserAdmin />} />
            <Route path='/user_profile' element={<UserProfile />} />
            <Route path='/edit_user_profile/:id' element={<EditUserProfile />} />
            <Route path='/user_home' element={<UserHome />} />         
            <Route path='/user_register' element={<UserRegister />} />
            <Route path='/admin_login' element={<AdminLogin />} />
            <Route path='/admin_home' element={<AdminHome />} />
            <Route path='/post_complaint' element={<PostComplaint/>}/>
            <Route path='/reset_password' element={<ResetPassword/>}/>
            <Route path='/user_login' element={<UserLogin/>}/>
            
            <Route path='/update_complaint/:id' element={<UpdateComplaint/>} />
            <Route path='/feedback_user' element={<FeedbackUser/>}/>
            <Route path='/agent_login' element={<AgentLogin/>}/>
            <Route path='/agent_home' element={<AgentHome/>}/>
            <Route path='/update_status_officer/:id' element={<UpdateStatusOfficer/>} />
            <Route path='/view_feedback' element={<ViewFeedback/>}/>
            
            <Route path='/agent_profile' element={<AgentProfile/>}/>      
            <Route path='/my_feedback' element={<MyFeedback/>}/>
            <Route path='/admin_profile' element={<AdminProfile/>}/>
            
            <Route path='/update_admin_profile/:id' element={<UpdateAdminProfile/>}/>
            <Route path='/post_location' element={<PostLocation/>}/>
            <Route path='/update_location_admin/:id' element={<UpdateLocationAdmin/>}/>
            <Route path='/post_agent' element={<PostAgent/>}/>
            <Route path='/view_agent_admin' element={<ViewAgentAdmin/>}/>
            <Route path='/update_agent_admin/:id' element={<UpdateAgentAdmin/>}/>
            <Route path='/post_insurance_plan_admin' element={<PostInsurancePlanAdmin/>}/>
            <Route path='/view_insurance_plan_admin' element={<ViewInsurancePlanAdmin/>}/>
             <Route path='/update_plan_admin/:id' element={<UpdatePlanAdmin/>}/>
            <Route path='/view_insurance_user' element={<ViewInsuranceUser/>}/>
              <Route path="/apply_insurance_user" element={<ApplyInsuranceUser />} />
               <Route path='/view_applied_insurance_user' element={<ViewAppliedInsuranceUser/>}/>
               <Route path='/view_insurance_agent' element={<ViewInsuranceAgent/>}/>
             <Route path='/view_customer_insurance_agent' element={<ViewCustomerInsuranceAgent/>}/>
              <Route path="/apply_claim_user" element={<ApplyClaimUser />} />
              <Route path="/view_claim_user" element={<ViewClaimUser />} />
              <Route path="/post_feedback_user" element={<PostFeedbackUser />} />
              <Route path="/view_contact_user" element={<ViewContactUser />} />
              <Route path="/view_claim_agent" element={<ViewClaimAgent />} />
              <Route path="/view_insurance_admin" element={<ViewInsuranceAdmin />} />
              <Route path="/view_claim_admin" element={<ViewClaimAdmin />} />
              <Route path="/view_user_agent" element={<ViewUserAgent />} />
        </Routes>
        </BrowserRouter>
      </div>
    );
}



export default App;

{/*
unused 
import Viewlist from "./assets/unused/Viewlist";
import Edit from "./assets/unused/Edit";
import CreateBusiness from "./assets/unused/CreateBusiness";
import ViewAxios from "./assets/unused/ViewAxios";

<Route path='/viewtest' element={<Viewlist />} />            
<Route path='/axios' element={<ViewAxios />} />
<Route path='/create' element={<CreateBusiness />} />          
<Route path='/edit/:id' element={<Edit />} />

*/}