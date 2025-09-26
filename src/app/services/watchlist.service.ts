// src/app/services/watchlist.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const KEY = 'sw-watchlist-v1';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private _items = new BehaviorSubject<number[]>(this.load());
  items$ = this._items.asObservable();

  private load(): number[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  private save(arr: number[]) {
    localStorage.setItem(KEY, JSON.stringify(arr));
  }

  toggle(episode: number) {
    const arr = this._items.value.slice();
    const idx = arr.indexOf(episode);
    if (idx >= 0) arr.splice(idx, 1); else arr.push(episode);
    this._items.next(arr);
    this.save(arr);
  }

  has(episode: number) {
    return this._items.value.includes(episode);
  }
}
