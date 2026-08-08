import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MainLayout() {
    const navigate = useNavigate();
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <header>
                <button onClick={() => navigate(-1)}>Back</button>
            </header>

            <main style={{ flex: 1, border: "1px solid white" }}>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}