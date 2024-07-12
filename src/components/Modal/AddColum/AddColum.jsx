import FormBtn from '../FormBtn/FormBtn';

import { useState } from 'react';
import Modal from '../Modal';
import CustomRadio from './CustomRadio/CustomRadio';

const INITIAL_STATE = {
  title: '',
};

const AddColum = ({ isOpen, onClose, onSubmit }) => {
  const [columState, setColumState] = useState(INITIAL_STATE);
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleRadioChange = e => {
    setSelectedValue(e.target.value);
  };

  const handelChange = ({ target }) => {
    const { name, value } = target;
    setColumState({ [name]: value });
  };

  const handelSubmit = e => {
    e.preventDefault();
    onClose(false);
    onSubmit(columState);
    setColumState(INITIAL_STATE);
  };
  const {title} = columState
  return (
    <Modal isOpen={isOpen} onClose={onClose} titel={'Add Column'}>
      <form onSubmit={handelSubmit}>
        {/* className={css.form} */}
        <input
          value={title}

          type="text"
          name="title"
          required
          onChange={handelChange}
          placeholder="Title "
        ></input>
        {/* className={css.input} */}
        <div>
          <CustomRadio
            name="example"
            value="option1"
            checked={selectedValue === 'option1'}
            onChange={handleRadioChange}
            svgIcon={
              <svg width="24" height="24">
                <circle cx="12" cy="12" r="10" stroke="black" fill="none" />
              </svg>
            }
          />
          <CustomRadio
            name="example"
            value="option2"
            checked={selectedValue === 'option2'}
            onChange={handleRadioChange}
            svgIcon={
              <svg width="24" height="24">
                <circle cx="12" cy="12" r="10" fill="black" />
              </svg>
            }
          />
        </div>

        <FormBtn textBtn={'Add'} />
      </form>
    </Modal>
  );
};

export default AddColum;
