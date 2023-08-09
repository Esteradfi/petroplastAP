import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { NewCategory, clearSelectedImage, postNewCategoryThunk, postNewImageThunk } from "../../redux/categories-reducer";
import { changeTitle } from "../../redux/header-reducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeIsDoneAddCategory, changeIsOpen } from "../../redux/modals-window-reducer";
import emptyImage from "./../../assets/images/emptyImage.jpg";
import styles from "./../ConfigCategoryAndProducts.module.css";

const AddCategoryPage = () => {
    let uploadedImage = useAppSelector(state => state.categories.selectedImage);
    let uploadedImageName = useAppSelector(state => state.categories.selectedImageName);
    let isDone = useAppSelector(state => state.categories.addCategoryDone);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeTitle('Добавление категории'));
    }, []);

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm<NewCategory>();

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileList = e.target.files as FileList;
        const formData = new FormData();
        formData.append('image', fileList[0]);

        dispatch(postNewImageThunk(formData));
        e.target.value = '';
    }

    const onSubmit: SubmitHandler<NewCategory> = (data) => {
        data.image = uploadedImage;
        dispatch(postNewCategoryThunk(data));
        reset({
            name: '',
            checkbox: false
        })
        dispatch(clearSelectedImage())
    }

    const onCancel = () => {
        dispatch(clearSelectedImage());
    }

    useEffect(() => {
        if(isDone) {
            dispatch(changeIsOpen(true));
            dispatch(changeIsDoneAddCategory(true));
        }
    })

    return (
        <article className={styles.article}>
            <div className={styles.wrapper}>
                <div className={styles.leftColumn}>
                    <img className={styles.image} src={uploadedImage ? uploadedImage : emptyImage} alt="Изображение" />
                    <label className={styles.inputFile}>
                        <span className={styles.inputFileText}>{uploadedImageName || 'Загрузите изображение'}</span>
                        <input onChange={uploadImage} type="file" accept="image/*" id="file"/>
                        <span className={styles.inputFileBtn}>Browse</span>
                    </label>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.rightColumn}>
                    <h2 className={styles.title}>Введите характеристики категории:</h2>
                    <div className={styles.inputs}>
                        <label className={styles.formElement}>
                            <input className={styles.input} type="text" {...register('name', {
                                    required: "Ошибка. Поле не заполнено"})} placeholder="Введите название категории"/>
                            {errors?.name && <p className="errorMessage2">{errors?.name?.message || "Ошибка заполнения"}</p>}
                        </label>
                        <label htmlFor="checkbox" className={"custom-checkboxes " + styles.formElement}>
                            <input type="checkbox" id="checkbox" {...register('checkbox')}/>
                            <span className="custom-checkboxes-span"></span>
                            <span className={styles.checkboxText}>
                                Хотите отобразить данную категорию на главной странице? Учтите, что вам необходимо убрать текущую отображающуюся категорию
                            </span>
                        </label>
                    </div>
                    <input className={styles.addButton} type="submit" disabled={!isValid || !uploadedImage} value="Добавить категорию" />
                </form>
            </div>
            <NavLink onClick={onCancel} className={styles.cancel} to="/">Отмена</NavLink>
        </article>
    )
}

export default AddCategoryPage;