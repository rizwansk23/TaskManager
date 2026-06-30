import { useLocation } from "react-router-dom";

export const GetPath = (): string => {
        const location = useLocation();

        const paths: string = location.pathname.split("/").filter(Boolean).join();

        return paths
    };