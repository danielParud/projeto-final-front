import { Route, Routes } from "react-router-dom";
import { AuthRouteProtector } from "./components/AuthRouteProtector";
import { AuthContextComponent } from "./contexts/authContext";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import { VIEWS } from "./utils/routes";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import SingleProject from "./pages/SingleProject";
import CreateProject from "./pages/CreateProject";
import CreateBoard from "./pages/CreateBoard";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path={VIEWS.HOME} element={<Home />} />
          <Route path={VIEWS.SIGNUP} element={<Signup />} />
          <Route path={VIEWS.SIGNIN} element={<Login />} />
          <Route path={VIEWS.USER} element={<AuthRouteProtector />}>
            <Route path={VIEWS.DASHBOARD} element={<Profile />} />
            <Route path={VIEWS.CREATEBOARD} element={<CreateBoard />} />
            <Route path={VIEWS.PROJECTS} element={<Projects />} />
            <Route path={VIEWS.CREATEPROJECT} element={<CreateProject />} />
            <Route path={VIEWS.SINGLEPROJECT} element={<SingleProject />} />
            <Route path={VIEWS.TEAM} element={<Team />} />
          </Route>
          <Route path={VIEWS.PAGENOTFOUND404} element={<Error />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
