import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, changeIsRemoveProduct, setModalData, setModalDataCategory } from "../../../../redux/modals-window-reducer";
import { setColors, setEditProduct, setImages } from "../../../../redux/products-reducer";
import styles from "./../CategoryPage.module.css";

const ProductItem = ({...el}) => {

    const dispatch = useAppDispatch();

    const openRemoveCategoryModal = () => {
        dispatch(setModalData(el._id));
        dispatch(setModalDataCategory(el.category));
        dispatch(changeIsOpen(true));
        dispatch(changeIsRemoveProduct(true));
    }

    const onSetEditProduct = () => {
        let product = {
            category: el.category,
            article: el.article,
            name: el.name,
            material: el.material,
            colors:  el.colors,
            height: el.height,
            width: el.width,
            length: el.length,
            weightBrutto: el.weightBrutto,
            weightNetto: el.weightNetto,
            retailPrice: el.retailPrice,
            wholesalePrice: el.wholesalePrice,
            quantityPerPackage: el.quantityPerPackage,
            stockBalance: el.stockBalance,
            images: el.images,
            individualBarcode: el.individualBarcode,
            generalBarcode: el.generalBarcode,
            description: el.description,
            volume: el.volume,
            discount: el.discount,
            productHeight: el.productHeight,
            productWidth: el.productWidth,
            productLength: el.productLength,
            packageHeight: el.packageHeight,
            packageWidth: el.packageWidth,
            packageLength: el.packageLength,
            __v: el.__v,
            _id: el._id
        };
        dispatch(setEditProduct(product));
        dispatch(setColors(product.colors));
        dispatch(setImages(product.images));
    }

    function formatNumber(value: number): string {
        const isDecimal = value % 1 !== 0; // проверяем, является ли число десятичным
        const formattedValue = isDecimal ? value.toString().replace('.', ',') : value.toString(); // преобразуем точку в запятую в десятичных числах
        const parts = formattedValue.split(','); // разделяем число на целую и десятичную части
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // добавляем пробелы для тысячных и бОльших разрядов целой части числа

        if (isDecimal) {
          return `${integerPart}, ${parts[1]}`;
        } else {
          return integerPart;
        }
    }

    return (
        <tr>
            <td>{el.name || 'x'}</td>
            <td>{el.article || 'x'}</td>
            <td><img src={el.images[0]} alt="Товар" /></td>
            <td className={styles.barcode}>{el.individualBarcode ? el.individualBarcode : 'x'}</td>
            <td className={styles.barcode}>{el.generalBarcode ?  el.generalBarcode : 'x'}</td>
            <td className={styles.productPriceRow}>{el.volume ? formatNumber(el.volume) : 'x'}</td>
            <td className={styles.productPriceRow}>{el.length && el.width && el.height ? (formatNumber(el.length) + " x " + formatNumber(el.width) + " x " + formatNumber(el.height) + ' см') : 'x'}</td>
            <td className={styles.productPriceRow}>{el.packageLength && el.packageWidth && el.packageHeight ? (formatNumber(el.packageLength) + " x " + formatNumber(el.packageWidth) + " x " + formatNumber(el.packageHeight) + ' см') : 'x'}</td>
            <td>
                {el.weightNetto && el.weightBrutto ? (
                    <>
                    <span className={styles.productPriceRow}>{formatNumber(el.weightNetto) + " кг"}</span>
                    <br />
                    <span className={styles.productPriceRow}>{formatNumber(el.weightBrutto) + " кг"}</span>
                    </>
                ) : "x"}
            </td>
            <td>{
                    <>
                        <span className={styles.productPriceRow}>{el.retailPrice ? formatNumber(el.retailPrice) + " руб" : "x"}</span>
                        <br />
                        <span className={styles.productPriceRow}>{el.wholesalePrice ? formatNumber(el.wholesalePrice) + " руб" : "x"}</span>
                    </>
                }
            </td>
            <td>{el.quantityPerPackage ? (el.quantityPerPackage + " шт.") : "x"}</td>
            <td>{el.stockBalance ? el.stockBalance : "x"}</td>
            <td><NavLink to={"/categories/" + el.category + "/edit"} onClick={onSetEditProduct} className={styles.itemButton + " " + styles.editButton}>Редактировать</NavLink></td>
            <td><button onClick={openRemoveCategoryModal} className={styles.itemButton + " " + styles.deleteButton}>Удалить</button></td>
        </tr>
    )
}

export default ProductItem;