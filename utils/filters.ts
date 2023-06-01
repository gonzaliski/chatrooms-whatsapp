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
    return Object.keys(value)[0] == id;
  });

  if (search) {
    return search[Object.keys(search)[0]];
  }
  return "";
}
export function getRoomsByName(q: string, rooms: Room[]) {
  return rooms.filter((room) => room[1].roomName.includes(q));
}
