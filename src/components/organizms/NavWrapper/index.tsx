import { NavBar } from "@/components/molecules";

type INavWrapper = {
    children: React.ReactNode;
}

const NavWrapper = ({ children }: INavWrapper) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>

    )
}
export default NavWrapper;