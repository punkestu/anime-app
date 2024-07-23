function addCurrentlyWatch(anime) {
  const currentlyWatchs = localStorage.getItem("currentlyWatchs");
  if (!currentlyWatchs) {
    localStorage.setItem("currentlyWatchs", JSON.stringify([anime]));
    return;
  }
  const currentlyWatchsArr = JSON.parse(currentlyWatchs).filter((curr) => curr.id !== anime.id);
  currentlyWatchsArr.unshift(anime);
  localStorage.setItem("currentlyWatchs", JSON.stringify(currentlyWatchsArr));
  return;
}

function getCurrentlyWatchs() {
  const currentlyWatchs = localStorage.getItem("currentlyWatchs");
  if (!currentlyWatchs) {
    return [];
  }
  return JSON.parse(currentlyWatchs);
}

function addLike(anime) {
  const liked = localStorage.getItem("liked");
  if (!liked) {
    localStorage.setItem("liked", JSON.stringify([anime]));
    return;
  }
  const likedArr = JSON.parse(liked).filter((curr) => curr.id !== anime.id);
  likedArr.unshift(anime);
  localStorage.setItem("liked", JSON.stringify(likedArr));
  return;
}

function removeLike(id) {
  const liked = localStorage.getItem("liked");
  if (!liked) {
    return;
  }
  const likedArr = JSON.parse(liked).filter((curr) => curr.id !== id);
  localStorage.setItem("liked", JSON.stringify(likedArr));
  return;
}

function getLiked() {
  const liked = localStorage.getItem("liked");
  if (!liked) {
    return [];
  }
  return JSON.parse(liked);
}

function isLiked(id) {
  const liked = localStorage.getItem("liked");
  if (!liked) {
    return false;
  }
  return JSON.parse(liked).some((curr) => curr.id === id);
}