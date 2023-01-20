
export const isValidEmail = (email: string): boolean => {
  
    const match = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  
    return !!match;
};


export const isValidBirthday = (date: string) => {
  // const birthday = new Date(date);
  // const today = new Date(Date.now());

  // return (today.getTime() - birthday.getTime()) > 0;

  return true;
}

export const isValidPassword = (password: string) => {
  if( password.trim().length < 8 ) return false;
  // TODO: add more validations
  return true;
}

export const isValidName = (name: string) => {
  return name.trim().length > 0 && name.trim().length <= 50;
}

export const isValidBio = (bio: string) => {
  return bio.trim().length > 0 && bio.trim().length <= 160;
}

export const isValidLocation = (location: string) => {
  return location.trim().length > 0 && location.trim().length <= 30;
}

export const isValidWebsite = (website: string) => {
  // TODO: Add more validations
  return website.trim().length > 0 && website.trim().length <= 100;
}
