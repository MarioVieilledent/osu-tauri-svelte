import { writable } from "svelte/store";

export const KEY_SETTINGS: string = 'keySettings';

export let keys = writable(['', '', '', '']);
export let fps = writable(144);