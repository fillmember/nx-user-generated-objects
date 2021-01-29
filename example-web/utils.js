function useRefAddress(...refStrings) {
  return Vue.computed(() => refStrings.map(Vue.unref).join("/"));
}
function useRefDatabaseRef(database, refAddress, onValue) {
  const dbRef = Vue.computed(() => {
    if (!refAddress.value) return null;
    const ref = database.ref(refAddress.value);
    if (onValue) {
      ref.on("value", onValue);
    }
    return ref;
  });
  Vue.watch(dbRef, (newDBRef, oldDBRef) => {
    if (oldDBRef) {
      oldDBRef.off("value", onValue);
    }
  });
  return dbRef;
}
function rand(a = 0, b = 1, int = true) {
  const v = b - a;
  let result = a + v * Math.random();
  if (int) {
    result = Math.round(result);
  }
  return result;
}
function generateRandomObject({ user_id }) {
  return {
    user_id,
    object_id: `o-${"0123456789a"[rand(0, 10)]}`,
    matrix: [rand(-2, 2, false).toFixed(2), rand(-2, 2, false).toFixed(2)].toString(),
  };
}
