import React from "react";
import Modal from "react-modal";

const Comp = ({ address, privateKey, onClose }) => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <>
            <Modal isOpen={false} onRequestClose={onClose}>
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content has-text-centered">
                        <header className="modal-card-head">
                            <p className="modal-card-title">WIF / Private Key</p>
                            <button className="delete" onClick={() => setIsOpen(false)} aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <p>Address</p>
                            <p>{address}</p>
                            <br />
                            <p>WIF / Private Key</p>
                            <p>{privateKey}</p>
                        </section>
                    </div>
                </div>
            </Modal>
        </>
    );

}

export default Comp;