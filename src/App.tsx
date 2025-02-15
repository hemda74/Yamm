// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import { RefundOrders } from './pages/RefundOrders';
import { OrderDetail } from './pages/OrderDetail/OrderDetail';
import { ThemeProvider } from './styles/ThemeProvider';
import { SidebarProvider } from './context/SidebarContext';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<RefundOrders />} />
                            <Route path="/refunds" element={<RefundOrders />} />
                            <Route path="/orders/:id" element={<OrderDetail />} />
                        </Routes>
                    </Layout>
                </Router>
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default App;