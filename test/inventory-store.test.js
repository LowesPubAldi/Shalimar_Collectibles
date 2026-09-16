const assert = require("node:assert/strict");
const test = require("node:test");

async function loadCreateInventoryStore() {
    const { createInventoryStore } = await import("../scripts/state/inventory-store.mjs");
    return createInventoryStore;
}

test("inventory store sequences render requests", async () => {
    const createInventoryStore = await loadCreateInventoryStore();
    const store = createInventoryStore();

    assert.equal(store.getState().beginRender(), 1);
    assert.equal(store.getState().beginRender(), 2);
    assert.equal(store.getState().renderRequestId, 2);
});

test("inventory store replaces, appends, and resets pagination", async () => {
    const createInventoryStore = await loadCreateInventoryStore();
    const store = createInventoryStore();

    store.getState().completePage(48, true);
    assert.deepEqual(
        { cardsShown: store.getState().cardsShown, canLoadMore: store.getState().canLoadMore },
        { cardsShown: 48, canLoadMore: true }
    );

    store.getState().setCanLoadMore(false);
    assert.equal(store.getState().canLoadMore, false);

    store.getState().completePage(24, false, true);
    assert.deepEqual(
        { cardsShown: store.getState().cardsShown, canLoadMore: store.getState().canLoadMore },
        { cardsShown: 72, canLoadMore: false }
    );

    store.getState().resetPagination();
    assert.deepEqual(
        { cardsShown: store.getState().cardsShown, canLoadMore: store.getState().canLoadMore },
        { cardsShown: 0, canLoadMore: false }
    );
});