import React from "react";
import Modal from "./Modal";

function OptionSelectionModal({
  open,
  setOpen,
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  onConfirm,
}) {
  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option) // 이미 선택된 경우 제거
        : [...prev, option] // 선택된 경우 추가
    );
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <div>
        <h3>{title}</h3>
        <div>
          {options.map((option) => (
            <label key={option} style={{ display: "block", margin: "10px 0" }}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => onConfirm(selectedOptions)}>확인</button>
          <button onClick={() => setOpen(false)}>취소</button>
        </div>
      </div>
    </Modal>
  );
}

export default OptionSelectionModal;