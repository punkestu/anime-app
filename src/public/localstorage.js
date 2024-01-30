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
