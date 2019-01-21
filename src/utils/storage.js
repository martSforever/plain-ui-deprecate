const $storage = {
    storageKey: 'LV',
    storage: JSON.parse(localStorage.getItem('LV')) || {},
    get(key) {
        return this.storage[key]
    },
    set(key, val) {
        this.storage[key] = val
        localStorage.setItem(this.storageKey, JSON.stringify(this.storage))
    },
}

export default $storage