import { useEffect } from "react";
import { changeTitle } from "../../redux/header-reducer";
import { useAppDispatch } from "../../redux/hooks";

const AboutPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeTitle("Страница “О компании”"));
    }, []);

    return (
        <section>
            Coming soon...
        </section>
    )
}

export default AboutPage;