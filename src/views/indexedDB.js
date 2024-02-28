const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const dbReq = indexedDB.open('exhibition', 1);
    let db;

    dbReq.addEventListener('success', function (event) {
      db = event.target.result;
      resolve(db);
    });

    dbReq.addEventListener('error', function (event) {
      const error = event.target.error;
      console.error('Error opening database:', error.name);
      reject(error);
    });

    dbReq.addEventListener('upgradeneeded', function (event) {
      db = event.target.result;
      let oldVersion = event.oldVersion;
      if (oldVersion < 1) {
        db.createObjectStore('shoppingCart', { keyPath: 'id', autoIncrement: true });
      }
    });
  });
};

const getDB = async () => {
  try {
    const db = await openDatabase();
    return db;
  } catch (error) {
    throw error;
  }
};

export { getDB };
