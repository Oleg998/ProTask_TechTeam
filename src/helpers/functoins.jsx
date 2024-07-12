export const pending = state => {
  state.isLoading = true;
  state.error = null;
};

export const rejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const getBase64 = (file, setImage) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    setImage(reader.result);
  };

  reader.onerror = function (error) {
    console.error('ErrorPage:', error);
  };
};
