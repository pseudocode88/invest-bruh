import { Navbar } from "renderer/components/NavBar";

export const Home = () => {
    return (
        <main>
            <Navbar selected={'home'} />
            <h1>Home</h1>
        </main>
    );
}