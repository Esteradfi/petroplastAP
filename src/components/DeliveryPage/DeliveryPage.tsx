import { useEffect } from "react";
import { changeTitle } from "../../redux/header-reducer";
import { useAppDispatch } from "../../redux/hooks";

const DeliveryPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeTitle("Страница доставки и оплаты на сайте"));
    }, []);

    return (
        <section>
            Coming soon...
        </section>
    )
}

export default DeliveryPage;