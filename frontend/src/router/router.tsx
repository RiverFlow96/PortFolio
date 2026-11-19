import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

export function Router() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path="/" Component={HomePage} />
            </Routes>
        </BrowserRouter>
    );
}
