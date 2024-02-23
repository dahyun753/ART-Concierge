// indexedDB 생성
function createDB() {
  if (window.indexedDB) {
    const databaseName = "cart";
    const version = 1;

    const request = indexedDB.open(databaseName, version);

    request.onupgradeneeded = function () {
      request.result.createObjectStore("items", { keyPath: "id" });
      request.result.createObjectStore("nowBuy", { keyPath: "id" });
    };

    request.onsuccess = function () {};
    request.onerror = function (event) {
      alert(event.target.errorCode);
    };
  }
}