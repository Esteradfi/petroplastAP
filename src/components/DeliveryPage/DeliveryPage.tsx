import React, {useEffect} from "react";
import {changeTitle} from "../../redux/header-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import styles from "./DeliveryPage.module.css";
import red from "./../../assets/icons/text-red.svg";
import semibold from "./../../assets/icons/text-bold.svg";
import numList from "./../../assets/icons/num-list.svg";
import unnumList from "./../../assets/icons/unnum-list.svg";
import pickup from "./../../assets/icons/pickup.svg";
import delivery from "./../../assets/icons/delivery.svg";
import deliveryRus from "./../../assets/icons/delivery-rus.svg";
import payment from "./../../assets/icons/payment.svg";
import {
    changeDeliveryRusText,
    changeDeliveryText,
    changePaymentText,
    changePickupText
} from "../../redux/delivery-reducer";

const DeliveryPage = () => {
    const dispatch = useAppDispatch();
    const pickupContent = useAppSelector(state => state.delivery.pickupContent);
    const deliveryContent = useAppSelector(state => state.delivery.deliveryContent);
    const deliveryRusContent = useAppSelector(state => state.delivery.deliveryRusContent);
    const paymentContent = useAppSelector(state => state.delivery.paymentContent);

    useEffect(() => {
        dispatch(changeTitle("Страница доставки и оплаты на сайте"));
    }, []);

    const onChangePickupText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changePickupText(e.target.value));
    }

    const onChangeDeliveryText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changeDeliveryText(e.target.value));
    }

    const onChangeDeliveryRusText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changeDeliveryRusText(e.target.value));
    }

    const onChangePaymentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changePaymentText(e.target.value));
    }

    return (
        <section className={"container"}>
            <h3 className={styles.deliverySubtitle}>
                Введите новые данные о доставке и оплате
            </h3>
            <div className={styles.category}>
                <h3 className={styles.categoryTitle}>
                    Информация о доставке
                </h3>
                <div className={styles.categoryItem}>
                    <header className={styles.categoryHeader}>
                        <h4 className={styles.categoryItemTitle}>
                            Самовывоз со склада
                        </h4>
                        <div className={styles.refactorButtons}>
                            <button className={styles.refactorButton} title="Выделить красным">
                                <img src={red} alt="Выделить красным"/>
                            </button>
                            <button className={styles.refactorButton} title="Выделить полужирным">
                                <img src={semibold} alt="Выделить полужирным"/>
                            </button>
                            <button className={styles.refactorButton} title="Вставить нумированный список">
                                <img src={numList} alt="Вставить нумированный список"/>
                            </button>
                            <button className={styles.refactorButton} title="Вставить ненумированный список">
                                <img src={unnumList} alt="Вставить ненумированный список"/>
                            </button>
                        </div>
                    </header>
                    <div className={styles.categoryItemBlock}>
                        <div className={styles.imageBlock}>
                            <img src={pickup} alt="Самовывоз"/>
                        </div>
                        <textarea value={pickupContent.text} onChange={onChangePickupText}
                                  className={styles.textarea}></textarea>
                    </div>
                    {
                        pickupContent.text.length > 0 ?
                            <div className={styles.categoryPreview}>
                                <h4 className={styles.categoryPreviewTitle}>
                                    Превью
                                </h4>
                                <div dangerouslySetInnerHTML={{__html: pickupContent.text}}></div>
                            </div>
                            : null
                    }
                </div>
                <div className={styles.categoryItem}>
                    <header className={styles.categoryHeader}>
                        <h4 className={styles.categoryItemTitle}>
                            Доставка по Санкт-Петербургу и Лен. обл.
                        </h4>
                        <div className={styles.refactorButtons}>
                            <button className={styles.refactorButton} title="Выделить красным">
                                <img src={red} alt="Выделить красным"/>
                            </button>
                            <button className={styles.refactorButton} title="Выделить полужирным">
                                <img src={semibold} alt="Выделить полужирным"/>
                            </button>
                            <button className={styles.refactorButton} title="Вставить нумированный список">
                                <img src={numList} alt="Вставить нумированный список"/>
                            </button>
                            <button className={styles.refactorButton} title="Вставить ненумированный список">
                                <img src={unnumList} alt="Вставить ненумированный список"/>
                            </button>
                        </div>
                    </header>
                    <div className={styles.categoryItemBlock}>
                        <div className={styles.imageBlock}>
                            <img src={delivery} alt="Доставка"/>
                        </div>
                        <textarea value={deliveryContent.text} onChange={onChangeDeliveryText}
                                  className={styles.textarea}></textarea>
                    </div>
                    {
                        deliveryContent.text.length > 0 ?
                            <div className={styles.categoryPreview}>
                                <h4 className={styles.categoryPreviewTitle}>
                                    Превью
                                </h4>
                                <div dangerouslySetInnerHTML={{__html: deliveryContent.text}}></div>
                            </div>
                            : null
                    }
                </div>
                <div className={styles.categoryItem}>
                    <header className={styles.categoryHeader}>
                        <h4 className={styles.categoryItemTitle}>
                            Доставка по России
                        </h4>
                        <div className={styles.refactorButtons}>
                            <button className={styles.refactorButton} title="Выделить красным">
                                <img src={red} alt="Выделить красным"/>
                            </button>
                            <button className={styles.refactorButton} title="Выделить полужирным">
                                <img src={semibold} alt="Выделить полужирным"/>
                            </button>
                            <button className={styles.refactorButton} title="Вставить нумированный список">
                                <img src={numList} alt="Вставить нумированный список"/>
                            </button>
                            <button className={styles.refactorButton} title="Вставить ненумированный список">
                                <img src={unnumList} alt="Вставить ненумированный список"/>
                            </button>
                        </div>
                    </header>
                    <div className={styles.categoryItemBlock}>
                        <div className={styles.imageBlock}>
                            <img src={deliveryRus} alt="Самовывоз"/>
                        </div>
                        <textarea value={deliveryRusContent.text} onChange={onChangeDeliveryRusText}
                                  className={styles.textarea}></textarea>
                    </div>
                    {
                        deliveryRusContent.text.length > 0 ?
                            <div className={styles.categoryPreview}>
                                <h4 className={styles.categoryPreviewTitle}>
                                    Превью
                                </h4>
                                <div dangerouslySetInnerHTML={{__html: deliveryRusContent.text}}></div>
                            </div>
                            : null
                    }
                </div>
            </div>
            <div className={styles.category}>
                <h3 className={styles.categoryTitle}>
                    Информация об оплате
                </h3>
                <div className={styles.categoryItem}>
                    <header className={styles.categoryHeader}>
                        <h4 className={styles.categoryItemTitle + ' ' + styles.emptyTitle}>
                        </h4>
                        <div className={styles.refactorButtons}>
                            <button className={styles.refactorButton} title="Выделить красным">
                                <img src={red} alt="Выделить красным"/>
                            </button>
                            <button className={styles.refactorButton} title="Выделить полужирным">
                                <img src={semibold} alt="Выделить полужирным"/>
                            </button>
                            <button className={styles.refactorButton} title="Вставить нумированный список">
                                <img src={numList} alt="Вставить нумированный список"/>
                            </button>
                            <button className={styles.refactorButton} title="Вставить ненумированный список">
                                <img src={unnumList} alt="Вставить ненумированный список"/>
                            </button>
                        </div>
                    </header>
                    <div className={styles.categoryItemBlock}>
                        <div className={styles.imageBlock}>
                            <img src={payment} alt="Самовывоз"/>
                        </div>
                        <textarea value={paymentContent.text} onChange={onChangePaymentText}
                                  className={styles.textarea}></textarea>
                    </div>
                    {
                        paymentContent.text.length > 0 ?
                            <div className={styles.categoryPreview}>
                                <h4 className={styles.categoryPreviewTitle}>
                                    Превью
                                </h4>
                                <div dangerouslySetInnerHTML={{__html: paymentContent.text}}></div>
                            </div>
                            : null
                    }
                </div>
            </div>
        </section>
    )
}

export default DeliveryPage;