export const isValidEmail = (email: string): boolean => {
  
    const match = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  
    return !!match;
};


export const isValidBirthday = (date: string) => {
    const brithday = new Date(date);
    const today = new Date( Date.now() );

    return brithday <= today;
}

export const isValidPassword = (password: string) => {
  if( password.trim().length < 8 ) return false;
  // TODO: add more validations
  return true;
}

