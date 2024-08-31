import { Route, Routes } from "react-router-dom"
import PageNotFound from "./pages/PageNotFound"
import Home from "./pages/Home"
import AllCountries from "./pages/AllCountries"
import Country from "./pages/Country"
import Loading from "./components/Loading"


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-countries/:name?" element={<AllCountries />} />
        <Route path="/country/:name" element={<Country />} />
        <Route path="/loading/:name" element={<Loading />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  )
}

export default App
