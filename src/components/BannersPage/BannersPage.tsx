import { useEffect } from "react";
import { changeTitle } from "../../redux/header-reducer";
import { useAppDispatch } from "../../redux/hooks";

const BannersPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeTitle("Редактирование баннеров на сайте"));
    }, []);

    return (
        <section>
            Coming soon...
        </section>
    )
}

export default BannersPage;