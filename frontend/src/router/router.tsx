import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={HomePage} />
            </Routes>
        </BrowserRouter>
    );
}
