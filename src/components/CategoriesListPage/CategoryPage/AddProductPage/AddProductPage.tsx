import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { NavLink, useParams } from "react-router-dom";
import { changeTitle } from "../../../../redux/header-reducer";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeIsDoneAddProduct, changeIsOpen, setModalData } from "../../../../redux/modals-window-reducer";
import { Product, clearColors, clearSelectedImages, deleteImage, postNewProductThunk, postNewProductsImageThunk } from "../../../../redux/products-reducer";
import emptyImage from "./../../../../assets/images/emptyImage.jpg";
import styles from "./../../../ConfigCategoryAndProducts.module.css";
import ColorItem from "./ColorItem/ColorItem";
import Slider from "./Slider/Slider";
import slideStyles from "./Slider/Slider.module.css";

const AddProductPage = () => {
    const dispatch = useAppDispatch();
    let uploadedImages = useAppSelector(state => state.products.selectedImages);
    let colorsList = useAppSelector(state => state.products.colorsList);
    let selectedColors = useAppSelector(state => state.products.selectedColors);
    let category = useParams();
    let isDone = useAppSelector(state => state.products.addProductDone);


    let colorItems = colorsList.map((el: string) => <ColorItem key={el} el={el} />)

    useEffect(() => {
        dispatch(changeTitle("Добавление товара"));
    }, []);

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm<Product>({
        mode: "onChange"
    });

    const sendFile = (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        dispatch(postNewProductsImageThunk(formData));
    }

    const uploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileList = e.target.files as FileList;
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            sendFile(file);
        }
        e.target.value = '';
    }

    const onSubmit: SubmitHandler<any> = (data) => {
        data.images = uploadedImages;
        data.colors = selectedColors;
        data.category = category.products;
        data.width = +(data.width.split(',').join('.'));
        data.length = +(data.length.split(',').join('.'));
        data.height = +(data.height.split(',').join('.'));
        data.weightNetto = +(data.weightNetto.split(',').join('.'));
        data.weightBrutto = +(data.weightBrutto.split(',').join('.'));
        data.retailPrice = +(data.retailPrice).split(',').join('.');
        data.wholesalePrice = +(data.wholesalePrice.split(',').join('.'));
        data.quantityPerPackage = +(data.quantityPerPackage.split(',').join('.'));
        data.stockBalance = +(data.stockBalance.split(',').join('.'));
        data.volume = +(data.volume.split(',').join('.'));
        data.packageLength = +(data.packageLength.split(',').join('.'));
        data.packageWidth = +(data.packageWidth.split(',').join('.'));
        data.packageHeight = +(data.packageHeight.split(',').join('.'));
        dispatch(postNewProductThunk(data));
    }

    const onDeleteImage = () => {
        dispatch(deleteImage(uploadedImages[0]));
    }

    const onClearAddProductPage = () => {
        dispatch(clearColors());
        dispatch(clearSelectedImages());
    }

    const onClearColors = () => {
        dispatch(clearColors());
    }

    useEffect(() => {
        if(isDone) {
            dispatch(changeIsOpen(true));
            dispatch(changeIsDoneAddProduct(true));
            dispatch(setModalData(category.products || ''));
        }
    })

    return (
        <div className={"container " + styles.pageForm}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.firstColumn}>
                    {
                        uploadedImages.length === 0 ? <img className={styles.image} src={emptyImage} alt="Заглушка" />
                        : uploadedImages.length === 1 ? <img className={styles.image} src={uploadedImages[0]} alt="Картинка" />
                        :   <div className={ styles.sliderWrapper}><Slider {...[uploadedImages]} /></div>
                    }
                    {
                        uploadedImages.length === 1 ? <button onClick={onDeleteImage} type='button' className={slideStyles.delete}>
                                                            Удалить фото
                                                        </button> : null
                    }
                    <label className={uploadedImages.length >= 1 ? (styles.inputFile + " " + styles.inputFiles) : styles.inputFile}>
                        <span className={styles.inputFileText}>{'Загрузите изображения'}</span>
                        <input onChange={uploadImages} type="file"  multiple accept="image/*" id="file"/>
                        <span className={styles.inputFileBtn}>Browse</span>
                    </label>
                    <label className={styles.formElement}>
                        <textarea className={styles.input + " " + styles.textarea} placeholder="Описание товара" {...register('description', {
                                required: "Ошибка. Поле не заполнено"
                            })}></textarea>
                            {errors?.description && <p className="errorMessage2">{errors?.description?.message || "Ошибка заполнения"}</p>}
                    </label>
                    <input className={styles.addProduct} disabled={!isValid || uploadedImages.length === 0 || selectedColors.length === 0} type="submit" value="Добавить товар" /
                    >
                </div>
                <div>
                    <h3 className={styles.title}>
                        Введите характеристики товара
                    </h3>
                    <div className={styles.columns}>
                        <div className={styles.column}>
                            <label className={styles.formElement}>
                                <input className={styles.input} type="text" placeholder="Название товара" {...register('name', {
                                    required: "Ошибка. Поле не заполнено"
                                })}/>
                                {errors?.name && <p className="errorMessage2">{errors?.name?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <label className={styles.formElement}>
                                <input className={styles.input} type="text" placeholder="Артикул" {...register('article', {
                                    required: "Ошибка. Поле не заполнено"
                                })}/>
                                {errors?.article && <p className="errorMessage2">{errors?.article?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <label className={styles.formElement}>
                                <input className={styles.input} type="text" placeholder="Ёмкость" {...register('volume', {
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                            {errors?.volume && <p className="errorMessage2">{errors?.volume?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <div className={styles.block}>
                                <h4 className={styles.subtitle}>Параметры изделия <br/> (Длина х Ширина х Высота):</h4>
                                <label className={styles.formElement}>
                                <div className={styles.inputsGroup}>
                                    <input className={styles.input} type="text" placeholder="Д" {...register('length', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                            {errors?.length || errors?.width || errors?.height ? <p className="errorMessage2">{errors?.length?.message || errors?.width?.message || errors?.height?.message ||  "Ошибка заполнения"}</p> : null}
                                    <input className={styles.input} type="text" placeholder="Ш" {...register('width', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                                    <input className={styles.input} type="text" placeholder="В" {...register('height', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                                </div>
                                </label>
                            </div>
                            <label className={styles.formElement}>
                                <input className={styles.input} type="text" placeholder="Материал" {...register('material', {
                                    required: "Ошибка. Поле не заполнено",
                                })}/>
                                {errors?.material && <p className="errorMessage2">{errors?.material?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <div className={styles.block}>
                                <h4 className={styles.subtitle}>Параметры упаковки <br/> (Длина х Ширина х Высота):</h4>
                                <label className={styles.formElement}>
                                    <div className={styles.inputsGroup}>
                                        <input className={styles.input} type="text" placeholder="Д" {...register('packageLength', {
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })} />
                            {errors?.packageLength || errors?.packageWidth || errors?.packageHeight ? <p className="errorMessage2">{errors?.packageLength?.message || errors?.packageWidth?.message || errors?.packageHeight?.message ||  "Ошибка заполнения"}</p> : null}
                                        <input className={styles.input} type="text" placeholder="Ш" {...register('packageWidth', {
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                                        <input className={styles.input} type="text" placeholder="В" {...register('packageHeight', {
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                                    </div>
                                </label>
                            </div>
                            <div className={styles.block + " " + styles.colorParam}>
                                <h4 className={styles.subtitle}>Параметры цвета:</h4>
                                <div className={styles.colorBlock}>
                                    <div className={styles.inner}>
                                        {colorItems}
                                    </div>
                                    <button onClick={onClearColors} className={styles.colorReset} type="button">
                                        Сбросить
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.block}>
                                <h4 className={styles.subtitle}>Вес изделия и упаковки:</h4>
                                <label className={styles.formElement}>
                                <div className={styles.inputsGroup + " " + styles.inputsGroupSecond}>
                                    <input className={styles.input} type="text" placeholder="Нетто" {...register('weightNetto', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                            {errors?.weightNetto || errors?.weightBrutto ? <p className="errorMessage2">{errors?.weightNetto?.message || errors?.weightBrutto?.message || "Ошибка заполнения"}</p> : null}
                                    <input className={styles.input} type="text" placeholder="Брутто" {...register('weightBrutto', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                                </div>
                                </label>
                            </div>
                            <label className={styles.formElement}>
                            <input className={styles.input} type="text" placeholder="Цена за шт. (руб)" {...register('retailPrice', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                            {errors?.retailPrice && <p className="errorMessage2">{errors?.retailPrice?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <label className={styles.formElement}>
                            <input className={styles.input} type="text" placeholder="Цена за пак опт." {...register('wholesalePrice', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^(?!(0+[.,]0+)$)(\d+([.,]\d+)?)$/,
                                    message: 'Введите только числа',
                                },
                            })}/>
                            {errors?.wholesalePrice && <p className="errorMessage2">{errors?.wholesalePrice?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <label className={styles.formElement}>
                            <input className={styles.input} type="text" placeholder="Кол-во шт. в упаковке" {...register('quantityPerPackage', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Введите только целые числа',
                                },
                            })}/>
                            {errors?.quantityPerPackage && <p className="errorMessage2">{errors?.quantityPerPackage?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <label className={styles.formElement}>
                            <input className={styles.input} type="text" placeholder="Остаток на складе (шт.)" {...register('stockBalance', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Введите только целые числа',
                                },
                            })}/>
                            {errors?.stockBalance && <p className="errorMessage2">{errors?.stockBalance?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <div className={styles.block}>
                                <h4 className={styles.subtitle}>Штрихкоды</h4>
                                <div>
                                <label className={styles.formElement}>
                                    <input className={styles.input} type="text" placeholder="Индивидуальный" {...register('individualBarcode', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Введите только целые числа',
                                },
                            })} />
                            {errors?.individualBarcode && <p className="errorMessage2">{errors?.individualBarcode?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <label className={styles.formElement}>
                                    <input className={styles.input} type="text" placeholder="Групповой" {...register('generalBarcode', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Введите только целые числа',
                                },
                            })}/>
                            {errors?.generalBarcode && <p className="errorMessage2">{errors?.generalBarcode?.message || "Ошибка заполнения"}</p>}
                            </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className={styles.buttons}>
                <NavLink onClick={onClearAddProductPage} className={styles.cancel} to={'/categories/' + category.products}>Отмена</NavLink>
            </div>
        </div>
    )
}

export default AddProductPage;