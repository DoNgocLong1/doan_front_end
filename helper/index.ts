export const setCookie = (type: string, value: string) => {
  if (type && value) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${type}=${value};${expires};path=/`;
  } else {
    document.cookie = `${type}=;path=/`;
  };
};
export const getCookie = (name: string, cookiesParam?: any) => {
  let cookies = cookiesParam || (typeof document !== 'undefined' && document.cookie);
  const value = `; ${cookies}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(';').shift();
};
