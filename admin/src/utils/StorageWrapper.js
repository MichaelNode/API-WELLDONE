/**
 * Wrapper around storage for easy replace
 */
export default class StorageWrapper {

    /**
     * Define storage to use
     * @type {Storage}
     * @private
     */
    static _storage = window.localStorage;

    static saveValue(name, value) {
        StorageWrapper._storage.setItem(name, value);
    }

    static getValue(name, defaultValue = null) {
        const value = StorageWrapper._storage.getItem(name);

        if (value !== null) {
            return value;
        }

        return defaultValue;
    }

    static removeValue(name) {
        StorageWrapper._storage.removeItem(name);
    }
}
