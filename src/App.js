import "@fontsource/poppins";
import 'react-loading-skeleton/dist/skeleton.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.min.css';
import {
  AdminForm, BankSampahForm, PohonForm, RTHForm, TPAForm, TPSForm
} from "./components/forms";
import Logout from "./components/Logout";
import {
  AdminMapPage, AdminPage, BankSampahPage, Dashboard,
  FullMapPage, NotFound, PohonPage,
  RTHPage, TPAPage, TPSPage
} from "./components/pages";
import { getCurrentUser } from "./services/authService";
import TablePrintTemplate from "./components/TablePrintTemplate";


function App() {
  const user = getCurrentUser();

  const protectAuthElement = (Element) => {
    return user ? Element : <Navigate to={"/not-found"} replace={true} />;
  };

  const isUserSuperAdmin = () => {
    if (user)
      return user.role.label === "Super Admin";

    return false;
  }

  return (
    <div 
      id="main-wrapper" data-layout="vertical" 
      data-navbarbg="skin5" data-sidebartype="full"
      data-sidebar-position="absolute" data-header-position="absolute" 
      data-boxed-layout="full"
    >
      <Routes>
        <Route path="/" element={<FullMapPage />} />
        <Route path='/login' element={user ? <Navigate to={"/dashboard"} /> : <FullMapPage />} />
        <Route path='/logout' element={user ? <Logout /> : <Navigate to={"/not-found"} replace={true} />} />
        <Route path='/dashboard' element={protectAuthElement(<Dashboard />)} />
        <Route path='/admin'>
          <Route path="" element={isUserSuperAdmin() ?  <AdminPage /> : <Navigate to={"/not-found"} replace={true} />} />
          <Route path=":_id" element={isUserSuperAdmin() ? <AdminForm />: <Navigate to={"/not-found"} replace={true} />} />
        </Route>
        <Route path='/pohon'>
          <Route path="" element={protectAuthElement(<PohonPage />)} />
          <Route path=":_id" element={protectAuthElement(<PohonForm />)} />
        </Route>
        <Route path='/bankSampah'>
          <Route path="" element={protectAuthElement(<BankSampahPage />)} />
          <Route path=":_id" element={protectAuthElement(<BankSampahForm />)} />
        </Route>
        <Route path='/tempatPembuanganSampah'>
          <Route path=""  element={protectAuthElement(<TPSPage />)} />
          <Route path=":_id"  element={protectAuthElement(<TPSForm />)} />
        </Route>
        <Route path='/tempatPembuanganAkhir'>
          <Route path="" element={protectAuthElement(<TPAPage />)} />
          <Route path=":_id" element={protectAuthElement(<TPAForm />)} />
        </Route>
        <Route path='/ruangTerbukaHijau'>
          <Route path="" element={protectAuthElement(<RTHPage />)}/>
          <Route path=":_id" element={protectAuthElement(<RTHForm />)}/>
        </Route>
        <Route path="/peta" element={protectAuthElement(<AdminMapPage />)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
