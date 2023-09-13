import {useEffect} from "react";
import {changeTitle} from "../../redux/header-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import styles from "./BannersPage.module.css";
import emptyBanner from "./../../assets/images/emptyBanner.jpg";
import {
    changeSelectedImage,
    deleteBannerThunk,
    postBannerImageThunk,
    postNewBannerThunk
} from "../../redux/banners-reducer";
import {NavLink} from "react-router-dom";
import BannerSlider from "./Slider/BannerSlider";
import {
    changeIsDoneAddBanner,
    changeIsOpen,
} from "../../redux/modals-window-reducer";

const BannersPage = () => {
    const dispatch = useAppDispatch();
    const bannersList: any = useAppSelector(state => state.banners.bannersList);
    const selectedImage = useAppSelector(state => state.banners.selectedImage);
    let isDone = useAppSelector(state => state.banners.addBannerDone);

    useEffect(() => {
        dispatch(changeTitle("Редактирование баннеров на сайте"));
    }, []);

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileList = e.target.files as FileList;
        const formData = new FormData();
        formData.append('image', fileList[0]);

        dispatch(postBannerImageThunk(formData));
    }

    const addBanner = () => {
        if(selectedImage !== '') {
            let data = {
                image: selectedImage,
            }
            dispatch(postNewBannerThunk(data));
        }
    }

    const clearBannerPage = () => {
        dispatch(changeSelectedImage(''));
    }

    const onDeleteImage = () => {
        dispatch(deleteBannerThunk(bannersList[0]._id));
    }

    useEffect(() => {
        if(isDone) {
            dispatch(changeIsOpen(true));
            dispatch(changeIsDoneAddBanner(true));
        }
    }, [isDone])

    return (
        <section>
            <h2 className={"container " + styles.title}>
                Загрузите новый баннер
            </h2>
            <div className={"bannersSlider " + styles.sliderWrapper}>
                {bannersList.length === 0 ? <img className={styles.emptyImage} src={emptyBanner} alt="Загруженных баннеров нет"/>
                    : bannersList.length === 1 ? <img className={styles.bannerImage} src={bannersList[0].links[0]} alt="Баннер" /> : <BannerSlider {...[bannersList]} />}
                {
                    bannersList.length === 1 ? <button onClick={onDeleteImage} type='button' className={styles.delete}>
                        Удалить баннер
                    </button> : null
                }
            </div>
            <div className={"container " + styles.bannersConfig}>
                <label className={styles.inputFile}>
                    <span className={styles.inputFileText}>{selectedImage ? 'Загружено' : 'Загрузите изображение'}</span>
                    <input onChange={uploadImage} type="file" accept="image/*" id="file"/>
                    <span className={styles.inputFileBtn}>Browse</span>
                </label>
                {selectedImage && <img className={styles.bannerPreview} src={selectedImage} alt="Предпросмотр баннера"/>}
                <button onClick={addBanner} disabled={!selectedImage} className={styles.saveButton}>
                    Добавить
                </button>
                <NavLink onClick={clearBannerPage} className={styles.cancel} to="/">Отмена</NavLink>
            </div>
        </section>
    )
}

export default BannersPage;