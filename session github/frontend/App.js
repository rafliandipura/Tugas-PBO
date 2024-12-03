import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./src/features/pages/Dashboard";
import Login from "./components/Login";
import Users from "./src/features/pages/Users";
import Products from "./src/features/pages/Products";
import AddUser from "./src/features/pages/AddUser";
import EditUser from "./src/features/pages/EditUser";
import AddProduct from "./src/features/pages/AddProduct";
import EditProduct from "./src/features/pages/EditProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;