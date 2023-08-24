import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { changeColors } from "../../../../../redux/products-reducer";
import anotherColor from "./../../../../../assets/icons/another-color.svg";
import whiteMarble from "./../../../../../assets/icons/white-marble.svg";
import styles from "./ColorItem.module.css";

interface ColorItemProps {
    el: string;
}

const ColorItem: React.FC<ColorItemProps> = (props) => {
    const dispatch = useAppDispatch();
    let selectedColors = useAppSelector(state => state.products.selectedColors);
    let isChecked = false;

    let index = selectedColors.indexOf(props.el);

    if(index !== -1) {
        isChecked = true;
    } else {
        isChecked = false;
    }

    let hex = {
        background: '',
        border: props.el === "Белый" ? "1px solid #000" : '1px solid transparent'
    };

    switch(props.el) {
        case 'Белый':
            hex.background = '#fff';
            break;
        case 'Черный':
            hex.background = '#000';
            break;
        case 'Графитовый':
            hex.background = '#5A4910';
            break;
        case 'Розовый':
            hex.background = '#FF77FA';
            break;
        case 'Фисташковый':
            hex.background = '#86F82C';
            break;
        case 'Коралловый':
            hex.background = '#FF452C';
            break;
        case 'Коричневый':
            hex.background = '#D07102';
            break;
        case 'Темно-коричневый':
            hex.background = '#9D5500';
            break;
        case 'Бежевый':
            hex.background = '#EEBD72';
            break;
        case 'Сиреневый':
            hex.background = '#C034F2';
            break;
        case 'Синий':
            hex.background = '#0057FF';
            break;
        case 'Голубой':
            hex.background = '#00FFFF';
            break;
        case 'Желтый':
            hex.background = '#FAFF00';
            break;
        case 'Серый':
            hex.background = '#9F9494';
            break;
        case 'Терракотовый':
            hex.background = '#DB541A';
            break;
        case 'Бирюзовый':
            hex.background = '#00A797';
            break;
        case 'Оливковый':
            hex.background = '#808000';
            break;
        case 'Красный':
            hex.background = '#D40209';
            break;
        case 'Зеленый':
            hex.background = '#0E930C';
            break;
        case 'Оранжевый':
            hex.background = '#FF7A00';
            break;
        case 'Фиолетовый':
            hex.background = '#9400B9';
            break;
        case 'Бесцветный':
            hex.background = 'transparent';
            break;
        default:
            hex.background = 'transparent';
    }

    const onCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeColors(e.target.value));
    }

    return (
        <div className={styles.item}>
            <label htmlFor={props.el} className={"custom-checkboxes " + styles.label}>
                <input onChange={onCheckbox} checked={isChecked} type="checkbox" value={props.el} id={props.el} />
                <span className={"custom-checkboxes-span " + styles.checkboxSpan}></span>
                {props.el === "Белый мрамор" ? <img className={styles.color} style={hex} src={whiteMarble} alt="Белый мрамор" /> : props.el === "Другой цвет" ? <img className={styles.color} style={hex} src={anotherColor} alt="Другой цвет" /> : <div className={styles.color} style={hex}></div>}
                <span className={styles.itemText}>{props.el}</span>
            </label>
        </div>
    )
}

export default ColorItem;