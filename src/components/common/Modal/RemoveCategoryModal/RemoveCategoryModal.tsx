import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";

const RemoveCategoryModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
    }

    return (
        <div>
            <h3>
                Удалить категорию?
            </h3>
            <p>
                При удалении категории удаляются <strong>все товары</strong> в этой категории
            </p>
            <div>
                <button onClick={closeModal}>
                    Отмена
                </button>
                <button>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default RemoveCategoryModal;