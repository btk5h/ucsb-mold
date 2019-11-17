import React, { Suspense } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom"
import tw from "tailwind.macro"

const SearchPage = React.lazy(() => import("pages/Search"))

const PageWrapper = tw.div`
  bg-gray-100
  h-full min-h-screen
  max-w-full
`

const App: React.FC = () => {
  return (
    <Router>
      <PageWrapper>
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Redirect exact from="/" to="/search" />
            <Route exact path="/search" component={SearchPage} />
          </Switch>
        </Suspense>
      </PageWrapper>
    </Router>
  )
}

export default App
