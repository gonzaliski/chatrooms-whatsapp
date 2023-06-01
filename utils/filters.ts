export function getMessageSource(
  id: string,
  array: { name: string; userId: string }[]
) {
  let search = array.find((value) => value.userId == id);
  if (search) {
    return search.name;
  }
  return "";
}

export function getProfilePicture(
  id: string,
  array: { [a: string]: string }[]
) {
  let search = array.find((value) => {
    console.log(id);

    return Object.keys(value)[0] == id;
  });
  console.log(search);

  if (search) {
    console.log(search[Object.keys(search)[0]]);
    return search[Object.keys(search)[0]];
  }
  return "";
}
