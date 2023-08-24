import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { NavLink, useParams } from "react-router-dom";
import { changeTitle } from "../../../../redux/header-reducer";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeIsDoneEditProduct, changeIsOpen, changeIsRemoveProduct, setModalData, setModalDataCategory } from "../../../../redux/modals-window-reducer";
import { Product, changeColor, clearColors, clearSelectedImages, deleteImage, patchProductThunk, postNewProductsImageThunk } from "../../../../redux/products-reducer";
import emptyImage from "./../../../../assets/images/emptyImage.jpg";
import styles from "./../../../ConfigCategoryAndProducts.module.css";
import ColorItem from "./../AddProductPage/ColorItem/ColorItem";
import Slider from "./../AddProductPage/Slider/Slider";
import slideStyles from "./../AddProductPage/Slider/Slider.module.css";

const EditProductPage = () => {
    const dispatch = useAppDispatch();
    let uploadedImages = useAppSelector(state => state.products.selectedImages);
    let selectedColors = useAppSelector(state => state.products.selectedColors);
    let color = useAppSelector(state => state.products.color);
    let colorsList = useAppSelector(state => state.products.colorsList);
    let category = useParams();
    let isDone = useAppSelector(state => state.products.editProductDone);
    let product = useAppSelector(state => state.products.selectedProduct);

    let colorItems = colorsList.map((el: string) => <ColorItem key={el} el={el} />)

    useEffect(() => {
        dispatch(changeTitle("Редактирование товара"));
    }, []);

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm<Product>({
        mode: "onChange",
        defaultValues: {
            category: product.category,
            article: product.article,
            name: product.name,
            colors:  product.colors,
            material: product.material,
            height: product.height,
            width: product.width,
            length: product.length,
            weightBrutto: product.weightBrutto,
            weightNetto: product.weightNetto,
            retailPrice: product.retailPrice,
            wholesalePrice: product.wholesalePrice,
            quantityPerPackage: product.quantityPerPackage,
            stockBalance: product.stockBalance,
            images: product.images,
            individualBarcode: product.individualBarcode,
            generalBarcode: product.generalBarcode,
            description: product.description,
            volume: product.volume,
            discount: product.discount,
            productHeight: product.productHeight,
            productWidth: product.productWidth,
            productLength: product.productLength,
            packageHeight: product.packageHeight,
            packageWidth: product.packageWidth,
            packageLength: product.packageLength,
            __v: product.__v,
            _id: product._id
        }
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
        data.weightNetto = +(data.weightNetto.toString().split(',').join('.'));
        data.weightBrutto = +(data.weightBrutto.toString().split(',').join('.'));
        data.retailPrice = +(data.retailPrice).toString().split(',').join('.');
        data.wholesalePrice = +(data.wholesalePrice.toString().split(',').join('.'));
        data.quantityPerPackage = +(data.quantityPerPackage.toString().split(',').join('.'));
        data.stockBalance = +(data.stockBalance.toString().split(',').join('.'));
        data.volume = +(data.volume.toString().split(',').join('.'));
        data.packageLength = +(data.packageLength.toString().split(',').join('.'));
        data.packageWidth = +(data.packageWidth.toString().split(',').join('.'));
        data.packageHeight = +(data.packageHeight.toString().split(',').join('.'));
        dispatch(patchProductThunk(data));
    }

    const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeColor(e.target.value));
    }

    const onAddColor = () => {
        dispatch(changeColor(''));
    }

    const onDeleteImage = () => {
        dispatch(deleteImage(uploadedImages[0]));
    }

    const onClearAddProductPage = () => {
        dispatch(clearColors());
        dispatch(clearSelectedImages());
    }

    useEffect(() => {
        if(isDone) {
            dispatch(changeIsOpen(true));
            dispatch(changeIsDoneEditProduct(true));
            dispatch(setModalData(category.products || ''));
        }
    })

    const openRemoveProductModal = () => {
        if(product._id !== undefined) {
            dispatch(setModalData(product._id));
            dispatch(setModalDataCategory(product.category));
            dispatch(changeIsOpen(true));
            dispatch(changeIsRemoveProduct(true));
        }
    }

    const onClearColors = () => {
        dispatch(clearColors());
    }

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
                    <input className={styles.addProduct} disabled={!isValid || uploadedImages.length === 0 || selectedColors.length === 0} type="submit" value="Сохранить" /
                    >
                </div>
                <div>
                    <h3 className={styles.title}>
                        Отредактируйте характеристики товара
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
                                    message: 'Введите только числа',
                                },
                            })}/>
                            {errors?.quantityPerPackage && <p className="errorMessage2">{errors?.quantityPerPackage?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <label className={styles.formElement}>
                            <input className={styles.input} type="text" placeholder="Остаток на складе (шт.)" {...register('stockBalance', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Введите только числа',
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
                                    message: 'Введите только числа',
                                },
                            })} />
                            {errors?.individualBarcode && <p className="errorMessage2">{errors?.individualBarcode?.message || "Ошибка заполнения"}</p>}
                            </label>
                            <label className={styles.formElement}>
                                    <input className={styles.input} type="text" placeholder="Групповой" {...register('generalBarcode', {
                                required: "Ошибка. Поле не заполнено",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Введите только числа',
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
                <button onClick={openRemoveProductModal} className={styles.cancel}>Удалить товар</button>
            </div>
        </div>
    )
}

export default EditProductPage;