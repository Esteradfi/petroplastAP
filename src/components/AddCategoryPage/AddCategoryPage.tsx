import { useEffect } from "react";
import { changeTitle } from "../../redux/header-reducer";
import { useAppDispatch } from "../../redux/hooks";
import { NavLink } from "react-router-dom";

const AddCategoryPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeTitle('Добавление категории'));
    }, []);

    return (
        <article>
            <NavLink to="/">back</NavLink>
        </article>
    )
}

export default AddCategoryPage;