import { TbAlertOctagonFilled } from 'react-icons/tb';

import HomeComponentCss from '../../style/ComponentStyle.module.css';

const CustomModal = ({ closeModal }) => {
    const handleCheckAdmin = (inputValue) => {
        if (inputValue === 'iamadmin') {
            closeModal();
            localStorage.setItem('authenticAdmin', JSON.stringify('authenticAdmin'));
        }
    };
    return (
        <div className={`${HomeComponentCss.modal}`}>
            <div>
                <div style={{
                    color: 'white',
                    background: 'crimson',
                    border: '2px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white items-center gap-x-2"><span><TbAlertOctagonFilled size={30} color={'black'}></TbAlertOctagonFilled></span> <span>Hey, Attention please!</span></h3>

                    <h3 className="flex justify-center text-white my-2">If you are authenticated, you should obviously know the secret password. Type it below to procceed.</h3>

                    <textarea onChange={(e) => handleCheckAdmin(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " />

                </div>
            </div>
        </div>
    );
};

export default CustomModal;
