function addCurrentlyWatch(id) {
  const currentlyWatchs = localStorage.getItem("currentlyWatchs");
  if (!currentlyWatchs) {
    localStorage.setItem("currentlyWatchs", JSON.stringify([id]));
    return;
  }
  const currentlyWatchsArr = JSON.parse(currentlyWatchs);
  if (!currentlyWatchsArr.includes(id)) {
    currentlyWatchsArr.unshift(id);
    localStorage.setItem("currentlyWatchs", JSON.stringify(currentlyWatchsArr));
    return;
  }
  return;
}
