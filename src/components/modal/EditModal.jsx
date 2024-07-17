import Modal from './Modal.jsx'
import Input from '../Input.jsx'
import Button from '../Button.jsx'
import Alert from '../Alert'

const EditModal = (props) => {

    return (
        <Modal show={props.show} onClose={props.onClose}>
            <h4 className="text-sm font-semibold leading-6 text-gray-900">
                {props.title}
            </h4>
            {props.alert.show &&
                <Alert
                    messages={props.alert.messages}
                    show={props.alert.show}
                    setAlert={props.setAlert}
                />
            }
            <form
                className='space-y-2'
                onSubmit={props.onSubmit}
            >
                <Input htmlFor="name" label="Name" type="text" value={props.nameValue} onChange={props.onNameChange} />
                <Input htmlFor="email" label="Email" type="email" value={props.emailValue} onChange={props.onEmailChange} />
                <Input htmlFor="number" label="Phone Number" type="number" value={props.phoneNumberValue} onChange={props.onPhoneNumberChange} />
                <div className='space-x-2'>
                    <Button type="submit" text="Save" />
                    <Button text="Cancel" onClick={props.onClose} />
                </div>
            </form>
        </Modal>
    )

}

export default EditModal