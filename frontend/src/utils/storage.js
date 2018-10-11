export function verifyToken(key) {
  if(!key) return null;
  try {
    const val = localStorage.getItem(key);
    if(val) {
      return JSON.parse(val)
    } else {
      return null;
    }
  } catch(err) {
    return null;
  }
}

export function setToken(key, obj) {
  if(!key) {
   console.error('Error: Key is missing.');
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj))
  } catch(err) {
    console.error(err);
  }
}
