import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";
import { Show } from "./components/Show"


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Show/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
