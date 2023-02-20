import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/index";
import { Home, Search, TV } from "./Routes/index";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/minflix/tv" element={<TV />}>
          <Route path="/minflix/tv/:id" element={<TV />} />
        </Route>
        <Route path="/minflix/search" element={<Search />}>
          <Route path={`/minflix/search/movie/:id`} element={<Search />} />
          <Route path={`/minflix/search/tv/:id`} element={<Search />} />
        </Route>
        <Route path="/minflix" element={<Home />}>
          <Route path="/minflix/movies/:id" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
