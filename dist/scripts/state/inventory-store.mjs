import { createStore } from "https://esm.sh/zustand@5/vanilla";

export function createInventoryStore() {
    return createStore((set) => ({
        renderRequestId: 0,
        cardsShown: 0,
        canLoadMore: false,
        beginRender: () => {
            let requestId;
            set((state) => {
                requestId = state.renderRequestId + 1;
                return { renderRequestId: requestId };
            });
            return requestId;
        },
        resetPagination: () => set({
            cardsShown: 0,
            canLoadMore: false
        }),
        setCanLoadMore: (canLoadMore) => set({
            canLoadMore: Boolean(canLoadMore)
        }),
        completePage: (itemCount, canLoadMore, append = false) => set((state) => ({
            cardsShown: append ? state.cardsShown + itemCount : itemCount,
            canLoadMore: Boolean(canLoadMore)
        }))
    }));
}

export const inventoryStore = createInventoryStore();