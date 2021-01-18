export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('final-cut', 1);
        let db, tx, store; 

        request.onupgraded = function(e) {
            const db = request.result;

            db.createObjectStore('appt', {keyPath: '_id'});
            db.createObjectStore('booking', {keyPath: '_id'});
            db.createObjectStore('cart', {keyPath: '_id'});
        };
        request.onerror = function(e) {
            console.log('Something went wrong!');
        };
        request.onsuccess = function(e) {
            db = request.result;

            tx = db.transaction(storeName, 'readWrite');

            store = tx.objectStore(storeName);

            db.onerror = function(e) {
                console.log('error' e);
            };
            switch (method) {
                case 'put':
                    store.put(object);
                    resolve(object)l
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function() {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object._id);
                    break;
                default:
                    console.log('No valid method');
                    break;   
            }
            tx.oncomplete = function() {
                db.close();
            }
        }
    });
}