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
