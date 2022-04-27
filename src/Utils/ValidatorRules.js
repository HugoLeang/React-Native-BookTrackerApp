export const loginRules = {
  from: {
    email: {
      message: "^Please enter a valid email address\n",
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^Please enter a password\n",
    },
  },
};

export const signupFormRules = {
  from: {
    email: {
      message: "^Please enter a valid email address\n",
    },
  },
  password: {
    length: {
      minimum: 6,
      message: "^Your passeword must be a least 6 characters\n",
    },
  },
  passwordConfirm: {
    equality: {
      attribute: "password",
      message: "^Passwords do not match \n",
      comparator: (v1, v2) => {
        return v1 === v2;
      },
    },
  },
};
