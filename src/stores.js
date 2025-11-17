import { writable } from "svelte/store";

export const params = writable([0, 0, 0, 0, 0, 0, 0, 0, 0]);
export const selectedNode = writable(null);