import React from "react";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserProfile,
} from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { SignedInLandingPage } from "./pages/SignedInLandingPage";
import { SignedOutLandingPage } from "./pages/SignedOutLandingPage";
import { Layout } from "./components/Layout";
import { EditForm } from "./pages/EditForm";
import { Island } from "./pages/Island";

const clerkFrontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
  return (
    <Router>
      <ClerkProviderWithNavigate>
        <Switch>
          <Route path="/sign-in/(.*)?">
            <Layout>
              <SignIn routing="path" path="/sign-in" />
            </Layout>
          </Route>
          <Route path="/sign-up/(.*)?">
            <Layout>
              <SignUp routing="path" path="/sign-up" />
            </Layout>
          </Route>

          <PrivateRoute path="/user/(.*)?">
            <Layout>
              <UserProfile routing="path" path="/user" />
            </Layout>
          </PrivateRoute>

          <PrivateRoute path="/edit/(.*)?">
            <Layout>
              <EditForm />
            </Layout>
          </PrivateRoute>

          <Route path="/island/(.*)?">
            <Layout>
              <Island />
            </Layout>
          </Route>

          {/* Catch-all route will render if no other route renders */}
          <Route>
            <Layout>
              <SignedIn>
                <SignedInLandingPage></SignedInLandingPage>
              </SignedIn>
              <SignedOut>
                <SignedOutLandingPage />
              </SignedOut>
            </Layout>
          </Route>
        </Switch>
      </ClerkProviderWithNavigate>
    </Router>
  );
}

function PrivateRoute(props) {
  // If the route matches but the user is not signed in, redirect to /sign-in
  return (
    <>
      <SignedIn>
        <Route {...props} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function ClerkProviderWithNavigate({ children }) {
  const { push } = useHistory();
  return (
    <ClerkProvider frontendApi={clerkFrontendApi} navigate={(to) => push(to)}>
      {children}
    </ClerkProvider>
  );
}

export default App;
