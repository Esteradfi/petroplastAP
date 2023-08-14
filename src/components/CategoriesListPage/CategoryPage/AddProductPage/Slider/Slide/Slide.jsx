import { useAppDispatch } from "../../../../../../redux/hooks";
import { deleteImage } from "../../../../../../redux/products-reducer";
import styles from "./../../../../../ConfigCategoryAndProducts.module.css";
import slideStyles from "./../Slider.module.css";

const Slide = (el) => {
    const dispatch = useAppDispatch()

    const onDelete = () => {
        dispatch(deleteImage(el.el));
    }

    return (
        <>
            <img src={el.el} className={styles.image} alt="Слайд" />
            <button onClick={onDelete} type='button' className={slideStyles.delete}>
                Удалить фото
            </button>
        </>
    )
}

export default Slide;