/*
* node modal
* */
import { Routes,Route} from "react-router-dom"
/*
* Components
* */
import { Toaster } from "@/components/ui/sonner"

/*
* Pages
* */
import ProductList   from "./pages/ProductList.tsx";
import DashboadOrder from "@/pages/DashboadOrder.tsx";
const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element = {<ProductList/>}/>
                <Route path="/DashBoard" element={<DashboadOrder/>}/>
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;