import { useAppDispatch } from "../../../../redux/hooks";
import styles from "./../../BannersPage.module.css";
import {deleteBannerThunk} from "../../../../redux/banners-reducer";

const Slide = (el) => {
    const dispatch = useAppDispatch()

    const onDeleteImage = () => {
        dispatch(deleteBannerThunk(el.el._id));
    }

    return (
        <>
            <img src={el.el.links[0]} className={styles.bannerImage} alt="Слайд" />
            <button onClick={onDeleteImage} className={styles.delete} type='button'>
                Удалить баннер
            </button>
        </>
    )
}

export default Slide;