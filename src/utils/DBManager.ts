class DBManager {
  private db: IDBDatabase | null = null;

  constructor(private dbName: string, private storeName: string) {}

  public async openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onsuccess = (event) => {
        this.db = (event.target as any).result as IDBDatabase;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject((event.target as any).error);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as any).result as IDBDatabase;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  public async saveData<T>(key: string, data: T): Promise<void> {
    if (!this.db) {
      await this.openDatabase();
    }

    const transaction = this.db!.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);
    objectStore.put(data, key);
  }
}

export default DBManager;
