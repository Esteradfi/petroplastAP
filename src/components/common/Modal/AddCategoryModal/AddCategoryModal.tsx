import { useAppDispatch } from "../../../../redux/hooks";
import { changeIsOpen, clearModals } from "../../../../redux/modals-window-reducer";

const AddCategoryModal = () => {

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(changeIsOpen(false));
        dispatch(clearModals());
    }

    return (
        <div>
            <h3>
                Добавить категорию?
            </h3>
            <p>
                При добавлении категории нужно будет ввести ее данные.
            </p>
            <div>
                <button onClick={closeModal}>
                    Отмена
                </button>
                <button>
                    Перейти
                </button>
            </div>
        </div>
    )
}

export default AddCategoryModal;