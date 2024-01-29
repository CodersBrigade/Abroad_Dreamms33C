import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';

const ExtraNav = () => {
    return (
        <div className="bg-white py-2 hidden md:block">
            <div className="container-fluid">
                <div className="d-flex font-weight-bold text-black text-sm justify-content-between align-items-center">
                    <div className="d-flex gap-2 justify-content-center align-items-center">
                        <AiOutlineMail className="text-xl" />
                        <p className="m-0">abroad.dreams.com@gmail.com</p>
                    </div>

                    <div className="d-flex gap-2 justify-content-center align-items-center">
                        <BsTelephone className="text-xl" />
                        <p className="m-0">+977 1 45202020, 45202030</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraNav;
