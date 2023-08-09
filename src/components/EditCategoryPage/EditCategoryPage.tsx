import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, Navigate } from "react-router-dom";
import { CategoriesItem, clearSelectedCategory, clearSelectedImage, postNewImageThunk, updateCategoryThunk } from "../../redux/categories-reducer";
import { changeTitle } from "../../redux/header-reducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeIsDoneEditCategory, changeIsOpen, changeIsRemoveCategory, setModalData } from "../../redux/modals-window-reducer";
import emptyImage from "./../../assets/images/emptyImage.jpg";
import styles from "./../ConfigCategoryAndProducts.module.css";

const EditCategoryPage = () => {
    let uploadedImage = useAppSelector(state => state.categories.selectedImage);
    let selectedCategory = useAppSelector(state => state.categories.selectedCategory);
    let image = selectedCategory.image;
    let isEditDone = useAppSelector(state => state.categories.editCategoryDone);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeTitle('Редактирование категории'));
    }, []);

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm<CategoriesItem>({defaultValues: {
        checkbox: selectedCategory.checkbox,
        name: selectedCategory.name,
        image: selectedCategory.image,
      }});

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileList = e.target.files as FileList;
        const formData = new FormData();
        formData.append('image', fileList[0]);

        dispatch(postNewImageThunk(formData));
    }

    const onSubmit: SubmitHandler<CategoriesItem> = (data) => {
        data._id = selectedCategory._id;
        data.image = uploadedImage !== '' ? uploadedImage : data.image;
        dispatch(updateCategoryThunk(data));
        reset({
            name: '',
            checkbox: false
        })
        dispatch(clearSelectedImage());
        dispatch(clearSelectedCategory());
    }

    const openRemoveCategoryModal = () => {
        dispatch(setModalData(selectedCategory._id));
        dispatch(changeIsOpen(true));
        dispatch(changeIsRemoveCategory(true));
    }

    useEffect(() => {
        if(isEditDone) {
            dispatch(changeIsOpen(true));
            dispatch(changeIsDoneEditCategory(true));
        }
    })

    if(!image) {
        return <Navigate to='/' />
    }

    return (
        <article className={styles.article}>
            <div className={styles.wrapper}>
                <div className={styles.leftColumn}>
                    <img className={styles.image} src={image || emptyImage} alt="Изображение" />
                    <label className={styles.inputFile}>
                        <span className={styles.inputFileText}>{uploadedImage || 'Загрузите изображение'}</span>
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
                    <input disabled={!isValid || !image} className={styles.addButton} type="submit" value="Сохранить" />
                </form>
            </div>
            <div className={styles.buttons}>
                <NavLink className={styles.cancel} to="/">Отмена</NavLink>
                <button onClick={openRemoveCategoryModal} className={styles.cancel}>Удалить категорию</button>
            </div>
        </article>
    )
}

export default EditCategoryPage;