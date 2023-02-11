import { writable } from "svelte/store";

export const KEY_SETTINGS: string = 'keySettings';

export let keys = writable(['', '', '', '']);
export let fps = writable(144);
export let volume = writable(50);