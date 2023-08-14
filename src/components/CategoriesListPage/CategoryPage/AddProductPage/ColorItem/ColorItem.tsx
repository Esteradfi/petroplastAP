import { useAppDispatch } from "../../../../../redux/hooks";
import { deleteColor } from "../../../../../redux/products-reducer";
import deleteImage from "./../../../../../assets/icons/deleteColor.svg";
import styles from "./ColorItem.module.css";

const ColorItem = (props: any) => {
    const dispatch = useAppDispatch();

    const onDeleteColor = () => {
        dispatch(deleteColor(props.el));
    }

    return (
        <div className={styles.item}>
            {props.el}
            <button onClick={onDeleteColor} type="button">
                <img src={deleteImage} alt="Удалить" />
            </button>
        </div>
    )
}

export default ColorItem;